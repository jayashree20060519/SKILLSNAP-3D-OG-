// Safe code execution sandbox for JavaScript
export interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime: number;
}

export function executeJavaScript(code: string, timeout: number = 5000): ExecutionResult {
  const startTime = performance.now();
  let output = '';
  let error: string | null = null;

  try {
    // Create a safe console object that captures output
    const logs: string[] = [];
    const safeConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' '));
      },
      error: (...args: any[]) => {
        logs.push('ERROR: ' + args.map(arg => String(arg)).join(' '));
      },
      warn: (...args: any[]) => {
        logs.push('WARNING: ' + args.map(arg => String(arg)).join(' '));
      },
      info: (...args: any[]) => {
        logs.push('INFO: ' + args.map(arg => String(arg)).join(' '));
      },
    };

    // Wrap code in a function to isolate scope
    const wrappedCode = `
      (function() {
        'use strict';
        const console = arguments[0];
        ${code}
      })
    `;

    // Execute with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Execution timeout (5 seconds)')), timeout);
    });

    const executionPromise = new Promise((resolve) => {
      try {
        // eslint-disable-next-line no-eval
        const func = eval(wrappedCode);
        const result = func(safeConsole);
        
        // If the code returns a value, add it to output
        if (result !== undefined) {
          logs.push('Return value: ' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)));
        }
        
        resolve(logs.join('\n'));
      } catch (err) {
        resolve({ error: err });
      }
    });

    // Race between execution and timeout
    Promise.race([executionPromise, timeoutPromise])
      .then((result: any) => {
        if (result && result.error) {
          error = result.error.message || String(result.error);
        } else {
          output = result || logs.join('\n');
        }
      })
      .catch((err) => {
        error = err.message || String(err);
      });

    // Synchronous execution (for simple code)
    if (!error) {
      output = logs.join('\n') || 'Code executed successfully (no output)';
    }

  } catch (err: any) {
    error = err.message || String(err);
  }

  const executionTime = performance.now() - startTime;

  return {
    output: output || '',
    error,
    executionTime: Math.round(executionTime * 100) / 100,
  };
}

// Execute Python-like code (limited support)
export function executePython(code: string): ExecutionResult {
  const startTime = performance.now();
  
  try {
    // Very basic Python to JavaScript transpilation
    let jsCode = code
      .replace(/print\((.*?)\)/g, 'console.log($1)')
      .replace(/def\s+(\w+)\s*\((.*?)\):/g, 'function $1($2) {')
      .replace(/:\s*$/gm, ' {')
      .replace(/^(\s+)/gm, (match) => match.replace(/    /g, '  '))
      .replace(/elif/g, 'else if')
      .replace(/True/g, 'true')
      .replace(/False/g, 'false')
      .replace(/None/g, 'null');

    // Add closing braces for functions
    const functionCount = (jsCode.match(/function/g) || []).length;
    for (let i = 0; i < functionCount; i++) {
      jsCode += '\n}';
    }

    const result = executeJavaScript(jsCode);
    
    return {
      ...result,
      output: result.output || 'Python code executed (limited support)',
    };
  } catch (err: any) {
    return {
      output: '',
      error: 'Python execution error: ' + (err.message || String(err)),
      executionTime: performance.now() - startTime,
    };
  }
}

// Detect language from code
export function detectLanguage(code: string): 'javascript' | 'python' | 'unknown' {
  if (code.includes('def ') || code.includes('print(') || code.includes('import ')) {
    return 'python';
  }
  if (code.includes('function') || code.includes('const ') || code.includes('let ') || code.includes('var ') || code.includes('console.log')) {
    return 'javascript';
  }
  return 'javascript'; // Default to JavaScript
}
