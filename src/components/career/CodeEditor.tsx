import { useState } from 'react';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, RotateCcw, Code } from 'lucide-react';
import { toast } from 'sonner';

interface CodeEditorProps {
  language: 'javascript' | 'python' | 'html' | 'sql';
  initialCode?: string;
  title?: string;
}

const examples = {
  javascript: `// JavaScript Example
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));
console.log(2 + 2);
console.log([1, 2, 3].map(x => x * 2));`,
  
  python: `# Python Example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
print(2 + 2)
print([x * 2 for x in [1, 2, 3]])`,
  
  html: `<!-- HTML Example -->
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: #3b82f6; }
        .box { background: #f0f9ff; padding: 15px; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>Welcome!</h1>
    <div class="box">
        <p>This is a styled paragraph.</p>
        <button onclick="alert('Hello!')">Click Me</button>
    </div>
</body>
</html>`,
  
  sql: `-- SQL Example
SELECT name, age, department
FROM employees
WHERE age > 25
ORDER BY name ASC
LIMIT 10;

-- Note: SQL execution is simulated
-- In real scenarios, this would query a database`
};

export function CodeEditor({ language, initialCode, title }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode || examples[language]);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    try {
      if (language === 'javascript') {
        // Capture console.log output
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        // Execute code
        // eslint-disable-next-line no-eval
        eval(code);

        // Restore console.log
        console.log = originalLog;

        setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        toast.success('Code executed successfully!');
      } else if (language === 'python') {
        // Python simulation (basic)
        setOutput('Python execution is simulated.\n\nIn a real environment, this would execute Python code.\n\nExample output:\nHello, World!\n4\n[2, 4, 6]');
        toast.info('Python simulation - use a real Python environment for actual execution');
      } else if (language === 'html') {
        // HTML preview
        setOutput('HTML Preview:\n\nHTML code would be rendered in a preview pane.\nIn a production app, use an iframe or sandbox for safe rendering.');
        toast.success('HTML code ready for preview!');
      } else if (language === 'sql') {
        // SQL simulation
        setOutput('SQL Query Result (Simulated):\n\n| name       | age | department  |\n|------------|-----|-------------|\n| Alice      | 28  | Engineering |\n| Bob        | 30  | Marketing   |\n| Charlie    | 26  | Sales       |\n\n3 rows returned');
        toast.success('SQL query executed (simulated)');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setOutput(`Error: ${errorMessage}`);
      toast.error('Code execution failed');
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode || examples[language]);
    setOutput('');
    toast.info('Code reset to example');
  };

  const getLanguageColor = () => {
    switch (language) {
      case 'javascript': return 'text-yellow-500';
      case 'python': return 'text-blue-500';
      case 'html': return 'text-orange-500';
      case 'sql': return 'text-green-500';
      default: return 'text-primary';
    }
  };

  return (
    <Card3D hover={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className={`h-5 w-5 ${getLanguageColor()}`} />
            <h3 className="text-xl font-bold">
              {title || `${language.toUpperCase()} Code Editor`}
            </h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetCode}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={runCode} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        </div>

        {/* Code Input */}
        <div>
          <label className="text-sm font-medium mb-2 block">Code:</label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm min-h-[300px] bg-slate-950 text-green-400"
            placeholder={`Write your ${language} code here...`}
          />
        </div>

        {/* Output */}
        {output && (
          <div>
            <label className="text-sm font-medium mb-2 block">Output:</label>
            <div className="p-4 bg-slate-950 rounded-lg border">
              <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
                {output}
              </pre>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="p-3 bg-accent rounded-lg text-sm text-muted-foreground">
          <p><strong>Tip:</strong> {
            language === 'javascript' ? 'Use console.log() to see output. Try modifying the code and run it!' :
            language === 'python' ? 'Use print() to display output. Python execution is simulated in this demo.' :
            language === 'html' ? 'Write HTML with inline CSS and JavaScript. Preview shows the rendered result.' :
            'Write SQL queries to practice. Execution is simulated with sample data.'
          }</p>
        </div>
      </div>
    </Card3D>
  );
}
