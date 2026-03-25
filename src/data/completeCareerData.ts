export interface CareerData {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  
  notes: {
    beginner: {
      whatIs: string;
      basicConcepts: string[];
      requiredSkills: string[];
      examples: string[];
    };
    intermediate: {
      coreConcepts: string[];
      toolsTech: string[];
      realWorld: string[];
      explanations: string[];
    };
    advanced: {
      industryPractices: string[];
      realProjects: string[];
      advancedTools: string[];
      careerGrowth: string[];
    };
  };
  
  practiceChallenges: {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    timeEstimate: string;
    tasks: string[];
    hints: string[];
  }[];
  
  hackathonChallenges: {
    title: string;
    description: string;
    timeLimit: number; // in minutes
    requirements: string[];
  }[];
  
  videos: {
    title: string;
    videoId: string;
    duration: string;
    description: string;
  }[];
  
  roadmap: {
    stage: string;
    icon: string;
    duration: string;
    skills: string[];
    tools: string[];
    outcome: string;
  }[];
  
  salary: {
    entry: string;
    mid: string;
    senior: string;
  };
}

export const careersData: Record<string, CareerData> = {
  'software-engineer': {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Build applications, systems, and software that power the digital world',
    icon: 'Code',
    gradient: 'from-blue-500 to-cyan-500',
    
    notes: {
      beginner: {
        whatIs: `A Software Engineer is a professional who designs, develops, tests, and maintains software applications. Think of them as architects and builders of the digital world - they create the apps on your phone, websites you visit, and systems that run businesses.

**Real-World Example**: When you use WhatsApp to send a message, software engineers built the app interface, the system that sends your message to the server, stores it in a database, and delivers it to your friend's phone - all in milliseconds!

Software engineers don't just write code - they solve problems. They understand what users need, design solutions, write clean code, test it thoroughly, and deploy it for millions to use. It's a creative and logical profession that combines problem-solving with technology.`,
        
        basicConcepts: [
          '**Variables & Data Types**: Think of variables as labeled boxes that store information. Just like you label a box "Books" or "Toys", in programming you create variables like "userName" or "age". Data types tell you what kind of information is in the box - text (string), numbers (integer), true/false (boolean), etc. Example: `let userName = "Alice"` stores the text "Alice" in a variable called userName.',
          
          '**Functions**: Functions are like recipes - a set of instructions you can reuse. Instead of writing the same code multiple times, you create a function once and call it whenever needed. Example: A function `calculateTotal(price, tax)` can be used to calculate the total cost for any purchase, just by providing different prices and tax rates.',
          
          '**Loops**: Loops let you repeat actions without writing the same code over and over. Like doing 50 push-ups - you don\'t write "do push-up" 50 times, you write "repeat 50 times: do push-up". Example: `for (let i = 0; i < 10; i++)` repeats code 10 times, perfect for processing a list of items.',
          
          '**Conditional Statements (if/else)**: These let your program make decisions, like "if it\'s raining, take an umbrella, else wear sunglasses". Example: `if (age >= 18) { allow entry } else { deny entry }` - the program checks the condition and executes different code based on the result.',
          
          '**Arrays & Lists**: Arrays store multiple related items in one place, like a shopping list. Instead of creating separate variables for item1, item2, item3, you create one array: `shoppingList = ["milk", "bread", "eggs"]`. You can easily add, remove, or access items using their position (index).'
        ],
        
        requiredSkills: [
          '**Problem-Solving**: Break down complex problems into smaller, manageable steps. Like solving a puzzle - you don\'t try to complete it all at once, you work on one section at a time.',
          
          '**Logical Thinking**: Understand cause and effect. If you do X, what happens? If the user clicks this button, what should the app do? This helps you design program flow.',
          
          '**Attention to Detail**: One missing semicolon or misspelled variable name can break your entire program. Software engineers must be meticulous and catch small errors.',
          
          '**Basic Math**: You don\'t need advanced calculus, but understanding basic arithmetic, percentages, and logic (AND, OR, NOT) is essential for writing algorithms.',
          
          '**Patience & Persistence**: Code rarely works perfectly the first time. You\'ll encounter errors (bugs) and need to debug them. This requires patience and the determination to keep trying until it works.'
        ],
        
        examples: [
          '**Hello World Program**: Your first program! It simply displays "Hello, World!" on the screen. This teaches you the basic syntax of a programming language. In JavaScript: `console.log("Hello, World!");` - This is like saying "Computer, please print this message."',
          
          '**Calculator**: Build a simple calculator that adds, subtracts, multiplies, and divides two numbers. This teaches you functions, user input, and basic operations. Example: User enters 5 and 3, selects "add", program outputs 8.',
          
          '**To-Do List**: Create a list where users can add tasks, mark them as complete, and delete them. This teaches you arrays (to store tasks), loops (to display all tasks), and conditional logic (to mark tasks complete).',
          
          '**Guess the Number Game**: Computer picks a random number between 1-100, user guesses, and computer says "too high" or "too low" until user guesses correctly. This teaches random number generation, loops, and conditionals.',
          
          '**Personal Portfolio Website**: Build a simple website with your name, photo, skills, and contact info using HTML (structure), CSS (styling), and basic JavaScript (interactivity like a "Contact Me" button).'
        ]
      },
      
      intermediate: {
        coreConcepts: [
          '**Object-Oriented Programming (OOP)**: Organize code into "objects" that represent real-world things. A "Car" object has properties (color, model, speed) and methods (start, stop, accelerate). This makes code reusable and easier to maintain. Example: Instead of separate variables for car1Color, car1Model, car2Color, car2Model, you create Car objects.',
          
          '**APIs (Application Programming Interfaces)**: APIs let different software talk to each other. Like a waiter in a restaurant - you (the app) tell the waiter (API) what you want, the waiter tells the kitchen (server), and brings back your food (data). Example: Weather apps use weather APIs to get current temperature data.',
          
          '**Databases**: Store and retrieve data permanently. Like a digital filing cabinet. SQL databases (PostgreSQL, MySQL) store data in tables with rows and columns. NoSQL databases (MongoDB) store data in flexible documents. Example: When you create a Facebook account, your info is stored in a database.',
          
          '**Version Control (Git)**: Track changes to your code over time. Like "Track Changes" in Microsoft Word, but much more powerful. You can see who changed what, when, and why. You can also revert to previous versions if something breaks. Essential for team collaboration.',
          
          '**Algorithms & Data Structures**: Efficient ways to solve problems and organize data. Sorting algorithms arrange data in order. Search algorithms find specific items quickly. Data structures (arrays, linked lists, trees, graphs) organize data for fast access. Example: Google uses complex algorithms to search billions of web pages in milliseconds.'
        ],
        
        toolsTech: [
          '**Frontend Frameworks (React, Vue, Angular)**: Build interactive user interfaces efficiently. Instead of writing plain JavaScript to update the page, these frameworks handle it automatically. React is most popular - used by Facebook, Instagram, Netflix. Example: When you "like" a post, React updates the like count instantly without reloading the page.',
          
          '**Backend Frameworks (Node.js, Django, Spring Boot)**: Handle server-side logic - user authentication, database operations, business logic. Node.js (JavaScript) is fast and popular for real-time apps. Django (Python) is great for rapid development. Spring Boot (Java) is enterprise-grade for large systems.',
          
          '**Docker**: Package your application with all its dependencies into a "container" that runs anywhere. Like a shipping container - it doesn\'t matter if you\'re shipping by truck, train, or ship, the container works the same. This ensures your app runs identically on your laptop, testing server, and production.',
          
          '**Cloud Platforms (AWS, Azure, GCP)**: Run your applications on powerful servers in the cloud instead of buying and maintaining your own hardware. AWS (Amazon Web Services) is the market leader. Services include: EC2 (virtual servers), S3 (file storage), RDS (databases), Lambda (serverless functions).',
          
          '**Testing Frameworks (Jest, Pytest, JUnit)**: Automatically test your code to catch bugs before users do. Unit tests check individual functions. Integration tests check how components work together. End-to-end tests simulate real user interactions. Example: Test that the login function correctly validates passwords.'
        ],
        
        realWorld: [
          '**E-commerce Platform**: Build an online store like Amazon. Features: product catalog with search and filters, shopping cart, checkout with payment processing, order tracking, user reviews, recommendation system. Technologies: React frontend, Node.js backend, PostgreSQL database, Stripe for payments, AWS for hosting.',
          
          '**Social Media App**: Create a platform like Instagram. Features: user profiles, photo/video uploads, feed with infinite scroll, likes and comments, follow/unfollow, direct messaging, notifications. Technologies: React Native for mobile, Node.js backend, MongoDB for flexible data storage, AWS S3 for media storage, Redis for caching.',
          
          '**Project Management Tool**: Build a tool like Trello or Asana. Features: create projects and tasks, assign to team members, set deadlines, track progress with boards/lists, real-time collaboration, file attachments. Technologies: React frontend, Django backend, PostgreSQL database, WebSockets for real-time updates.',
          
          '**Video Streaming Service**: Create a platform like Netflix. Features: video upload and encoding, streaming with adaptive quality, user authentication, watchlist, recommendations, search. Technologies: React frontend, microservices backend, CDN for video delivery, machine learning for recommendations.',
          
          '**Banking Application**: Build a secure banking app. Features: account management, money transfers, transaction history, bill payments, security with 2FA. Technologies: Angular frontend, Spring Boot backend, Oracle database, encryption for security, compliance with financial regulations.'
        ],
        
        explanations: [
          '**How Web Apps Work**: When you visit a website, your browser (client) sends a request to a server. The server processes the request, queries the database if needed, and sends back HTML/CSS/JavaScript. Your browser renders this into the page you see. For dynamic apps, JavaScript updates the page without full reloads.',
          
          '**RESTful APIs**: A standard way for apps to communicate. Uses HTTP methods: GET (retrieve data), POST (create new data), PUT (update data), DELETE (remove data). Example: GET /users/123 retrieves user with ID 123. POST /users creates a new user. APIs return data in JSON format.',
          
          '**Authentication vs Authorization**: Authentication is proving who you are (login with username/password). Authorization is determining what you\'re allowed to do (admin can delete users, regular users cannot). JWT (JSON Web Tokens) are commonly used - server gives you a token after login, you include it in subsequent requests.',
          
          '**Microservices Architecture**: Instead of one large application, split it into small, independent services. Each service handles one specific function (user service, payment service, notification service). They communicate via APIs. Benefits: easier to scale, update, and maintain. Used by Netflix, Amazon, Uber.',
          
          '**CI/CD (Continuous Integration/Continuous Deployment)**: Automatically test and deploy code changes. When you push code to GitHub, automated tests run. If tests pass, code is automatically deployed to production. This enables rapid, reliable releases. Tools: GitHub Actions, Jenkins, CircleCI.'
        ]
      },
      
      advanced: {
        industryPractices: [
          '**Agile/Scrum Methodology**: Work in 2-week sprints. Sprint planning (decide what to build), daily standups (15-min sync), sprint review (demo to stakeholders), retrospective (what went well, what to improve). This enables rapid iteration and adaptation to changing requirements. Used by 70%+ of tech companies.',
          
          '**Code Reviews**: Before merging code, teammates review it for bugs, readability, and best practices. This catches errors early, shares knowledge, and maintains code quality. Use tools like GitHub Pull Requests. Good reviews are constructive, specific, and kind.',
          
          '**Design Patterns**: Proven solutions to common problems. Singleton (one instance of a class), Factory (create objects without specifying exact class), Observer (notify multiple objects of changes), Strategy (swap algorithms at runtime). These make code more maintainable and scalable.',
          
          '**Performance Optimization**: Make apps fast. Techniques: caching (store frequently accessed data in memory), lazy loading (load content only when needed), code splitting (break large files into smaller chunks), database indexing (speed up queries), CDN (serve static files from servers close to users).',
          
          '**Security Best Practices**: Protect against attacks. Use HTTPS (encrypt data in transit), hash passwords (never store plain text), validate all user input (prevent SQL injection, XSS), implement rate limiting (prevent abuse), keep dependencies updated (patch vulnerabilities), follow principle of least privilege.'
        ],
        
        realProjects: [
          '**Scalable Chat Application**: Build a real-time chat app handling millions of users. Challenges: WebSocket connections for real-time messaging, message persistence, online/offline status, typing indicators, read receipts, group chats, file sharing. Use Redis for pub/sub, MongoDB for message storage, load balancers for scaling.',
          
          '**Distributed E-commerce System**: Build a system like Flipkart. Microservices: user service, product catalog, inventory management, order processing, payment gateway, shipping integration. Handle high traffic (millions of requests/second during sales), ensure data consistency, implement caching, use message queues for async processing.',
          
          '**AI-Powered Recommendation Engine**: Build a system that recommends products/content to users. Collect user behavior data (views, clicks, purchases), use collaborative filtering (users who liked X also liked Y), content-based filtering (recommend similar items), hybrid approaches. Implement with Python, TensorFlow, and big data tools.',
          
          '**Real-Time Analytics Dashboard**: Build a dashboard showing live business metrics. Ingest data from multiple sources, process in real-time (Apache Kafka, Spark), store in time-series database, visualize with interactive charts. Handle millions of events per second, provide sub-second query response times.',
          
          '**Multi-Tenant SaaS Platform**: Build a platform where multiple companies use the same application with isolated data. Challenges: data isolation, custom branding per tenant, usage-based billing, role-based access control, scalability. Examples: Salesforce, Shopify, Slack.'
        ],
        
        advancedTools: [
          '**Kubernetes**: Orchestrate Docker containers at scale. Automatically deploy, scale, and manage containerized applications. Handle load balancing, self-healing (restart failed containers), rolling updates (deploy new versions without downtime). Essential for running microservices in production.',
          
          '**GraphQL**: Modern alternative to REST APIs. Clients request exactly the data they need (no over-fetching or under-fetching). Single endpoint instead of multiple. Real-time subscriptions. Used by Facebook, GitHub, Shopify. Example: `query { user(id: 123) { name, email, posts { title } } }`',
          
          '**Terraform**: Infrastructure as Code. Define your cloud infrastructure (servers, databases, networks) in code files. Version control your infrastructure, easily replicate environments, automate provisioning. Works with AWS, Azure, GCP. Example: Define 10 servers, a load balancer, and a database in a config file.',
          
          '**Monitoring & Observability (Datadog, New Relic, Prometheus)**: Track application performance, errors, and user behavior in production. Set up alerts for issues (high error rate, slow response times). Distributed tracing shows request flow through microservices. Essential for maintaining reliable systems.',
          
          '**Message Queues (RabbitMQ, Apache Kafka)**: Handle asynchronous communication between services. Producer sends messages to queue, consumers process them independently. Benefits: decouple services, handle traffic spikes, ensure message delivery. Example: Order service sends message to queue, email service picks it up and sends confirmation email.'
        ],
        
        careerGrowth: [
          '**Junior → Mid-Level (2-4 years)**: Master your tech stack, take ownership of features end-to-end, mentor interns, participate in design discussions, improve code quality through reviews. Salary growth: ₹3-8 LPA → ₹8-15 LPA.',
          
          '**Mid-Level → Senior (4-7 years)**: Lead projects, design system architecture, make technical decisions, mentor junior engineers, improve team processes, handle on-call responsibilities. Develop expertise in a domain (payments, search, ML). Salary: ₹15-25 LPA.',
          
          '**Senior → Staff/Principal (7-12 years)**: Drive technical strategy across multiple teams, solve complex cross-cutting problems, set engineering standards, influence product roadmap, represent engineering in leadership meetings. Deep technical expertise + business acumen. Salary: ₹25-50 LPA.',
          
          '**Technical Leadership Track**: Staff Engineer → Principal Engineer → Distinguished Engineer → CTO. Focus on technical excellence, architecture, and innovation. Influence company-wide technical decisions. Work on hardest problems. Salary: ₹50 LPA - ₹1 Cr+.',
          
          '**Management Track**: Senior Engineer → Engineering Manager → Director → VP Engineering → CTO. Lead teams (5-50+ engineers), hire and develop talent, set roadmaps, manage budgets, align engineering with business goals. Balance technical and people skills. Salary: ₹30 LPA - ₹1 Cr+.'
        ]
      }
    },
    
    practiceChallenges: [
      {
        title: 'Build a Login Page',
        description: 'Create a functional login page with email/password validation',
        difficulty: 'easy',
        timeEstimate: '30 minutes',
        tasks: [
          'Create HTML form with email and password fields',
          'Add CSS styling with modern design',
          'Implement JavaScript validation (email format, password length)',
          'Show error messages for invalid inputs',
          'Display success message on valid submission'
        ],
        hints: [
          'Use HTML5 input types for better validation',
          'Regular expressions can validate email format',
          'Prevent form submission if validation fails',
          'Use CSS for visual feedback (red border for errors)'
        ]
      },
      {
        title: 'Create a REST API',
        description: 'Build a simple REST API for managing a todo list',
        difficulty: 'medium',
        timeEstimate: '1 hour',
        tasks: [
          'Set up Express.js server',
          'Create endpoints: GET /todos, POST /todos, PUT /todos/:id, DELETE /todos/:id',
          'Store todos in an array (in-memory)',
          'Implement proper HTTP status codes',
          'Test with Postman or curl'
        ],
        hints: [
          'Use express.json() middleware to parse JSON',
          'Return 404 for non-existent todos',
          'Use array methods: push, findIndex, splice',
          'Each todo should have id, title, completed fields'
        ]
      },
      {
        title: 'Build a CRUD App',
        description: 'Create a full-stack application for managing contacts',
        difficulty: 'hard',
        timeEstimate: '2 hours',
        tasks: [
          'Build frontend with React (list, add, edit, delete contacts)',
          'Create backend API with Node.js/Express',
          'Connect to database (MongoDB or PostgreSQL)',
          'Implement all CRUD operations',
          'Add search and filter functionality'
        ],
        hints: [
          'Use useState for managing contact list',
          'Create separate components for ContactList and ContactForm',
          'Use fetch or axios for API calls',
          'Handle loading and error states'
        ]
      },
      {
        title: 'Authentication System',
        description: 'Implement user registration and login with JWT',
        difficulty: 'hard',
        timeEstimate: '2 hours',
        tasks: [
          'Create registration endpoint (hash passwords with bcrypt)',
          'Create login endpoint (verify password, return JWT)',
          'Implement middleware to verify JWT on protected routes',
          'Create frontend login/register forms',
          'Store JWT in localStorage and include in API requests'
        ],
        hints: [
          'Never store passwords in plain text',
          'JWT should include user ID and expiration time',
          'Use Authorization header: Bearer <token>',
          'Redirect to login if token is invalid or expired'
        ]
      }
    ],
    
    hackathonChallenges: [
      {
        title: 'Build a Weather Dashboard',
        description: 'Create a dashboard that shows weather for multiple cities',
        timeLimit: 60,
        requirements: [
          'Fetch weather data from a public API',
          'Display current temperature, conditions, and forecast',
          'Allow users to add/remove cities',
          'Show weather icons and animations',
          'Responsive design for mobile and desktop'
        ]
      },
      {
        title: 'Real-Time Chat Application',
        description: 'Build a simple chat app with WebSockets',
        timeLimit: 90,
        requirements: [
          'Multiple users can join and send messages',
          'Messages appear in real-time for all users',
          'Show who is currently online',
          'Display timestamps for messages',
          'Basic styling with modern UI'
        ]
      },
      {
        title: 'Task Management System',
        description: 'Create a Trello-like board for managing tasks',
        timeLimit: 120,
        requirements: [
          'Create, edit, and delete tasks',
          'Organize tasks in columns (To Do, In Progress, Done)',
          'Drag and drop tasks between columns',
          'Add due dates and priority levels',
          'Filter and search tasks'
        ]
      }
    ],
    
    videos: [
      {
        title: 'Software Engineer Roadmap 2026 (Full Blueprint)',
        videoId: 'avdDEZCcluo',
        duration: '18:30',
        description: 'Complete roadmap to become a software engineer in 2026 with skills, tools, and career guidance. Step-by-step blueprint covering programming fundamentals, frameworks, databases, and job preparation.'
      },
      {
        title: 'What Do Software Engineers ACTUALLY Do?',
        videoId: 'iIxZrYzJJ7I',
        duration: '12:45',
        description: 'Understand the real role of software engineers. Discover daily tasks, responsibilities, and what the job actually involves beyond just coding.'
      },
      {
        title: 'Future of Software Engineering in AI Era',
        videoId: 'a83mfwd_6nU',
        duration: '15:20',
        description: 'Explore how AI is shaping the future of software engineering. Learn about emerging trends, new tools, and how to stay relevant in the AI-driven tech landscape.'
      }
    ],
    
    roadmap: [
      {
        stage: 'Foundation',
        icon: 'GraduationCap',
        duration: '2-3 months',
        skills: ['Programming basics (Python/JavaScript)', 'HTML, CSS fundamentals', 'Git version control', 'Problem-solving'],
        tools: ['VS Code', 'Git/GitHub', 'Chrome DevTools'],
        outcome: 'Build simple programs and static websites'
      },
      {
        stage: 'Core Development',
        icon: 'Code',
        duration: '4-6 months',
        skills: ['Data structures & algorithms', 'Object-oriented programming', 'Database basics (SQL)', 'Web development (React)'],
        tools: ['React', 'Node.js', 'PostgreSQL', 'Postman'],
        outcome: 'Create full-stack web applications'
      },
      {
        stage: 'Advanced Skills',
        icon: 'Rocket',
        duration: '4-6 months',
        skills: ['System design', 'Cloud platforms (AWS)', 'Testing & CI/CD', 'Microservices'],
        tools: ['Docker', 'Kubernetes', 'AWS', 'Jest'],
        outcome: 'Build scalable, production-ready systems'
      },
      {
        stage: 'Specialization',
        icon: 'Target',
        duration: '3-6 months',
        skills: ['Choose: Frontend/Backend/Mobile/DevOps/ML', 'Advanced frameworks', 'Performance optimization', 'Security'],
        tools: ['Specialized tools for chosen path', 'Monitoring tools', 'Advanced frameworks'],
        outcome: 'Become expert in your chosen specialization'
      },
      {
        stage: 'Job Ready',
        icon: 'Briefcase',
        duration: '2-3 months',
        skills: ['Interview preparation', 'Portfolio projects', 'Open source contributions', 'Networking'],
        tools: ['LeetCode', 'GitHub', 'LinkedIn', 'Resume builders'],
        outcome: 'Land your dream software engineering job'
      }
    ],
    
    salary: {
      entry: '₹3-8 LPA',
      mid: '₹8-20 LPA',
      senior: '₹20-60+ LPA'
    }
  },

  'data-analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Transform data into actionable insights that drive business decisions',
    icon: 'BarChart',
    gradient: 'from-green-500 to-emerald-500',
    
    notes: {
      beginner: {
        whatIs: `A Data Analyst is a professional who collects, cleans, analyzes, and visualizes data to help businesses make informed decisions. Think of them as detectives who find patterns and insights hidden in numbers.

**Real-World Example**: When Flipkart wants to know which products to stock for the festive season, data analysts analyze last year's sales data, customer behavior, and market trends to recommend which products will sell best. This helps Flipkart avoid overstocking items that won't sell and ensures popular items are always available.

Data analysts don't just work with numbers - they tell stories. They translate complex data into simple visualizations (charts, dashboards) that anyone can understand. They answer questions like "Why did sales drop last month?" or "Which marketing campaign brought the most customers?"`,
        
        basicConcepts: [
          '**Data Types**: Data comes in different forms. **Numerical data** (numbers like age, price, temperature) can be counted or measured. **Categorical data** (categories like gender, city, product type) groups things into categories. **Time-series data** (sales over months, website traffic over days) shows how things change over time. Understanding data types helps you choose the right analysis method.',
          
          '**Descriptive Statistics**: These are simple calculations that summarize data. **Mean** (average) adds all numbers and divides by count - useful for finding typical values. **Median** (middle value) is better when you have outliers. **Mode** (most common value) shows what appears most often. **Standard deviation** shows how spread out data is. Example: Average salary in a company is ₹5 LPA, but if one person earns ₹50 LPA, median gives a better picture.',
          
          '**Data Cleaning**: Real-world data is messy! It has missing values (blank cells), duplicates (same record twice), inconsistencies (Mumbai vs Bombay), and errors (age = 200). Data cleaning fixes these issues. You might fill missing values with averages, remove duplicates, standardize formats, and remove outliers. This step takes 60-70% of an analyst\'s time but is crucial for accurate analysis.',
          
          '**Spreadsheets (Excel/Google Sheets)**: The most basic tool for data analysis. You can organize data in rows and columns, use formulas (=SUM, =AVERAGE, =IF), create pivot tables to summarize data, and make charts. Example: Track monthly expenses in a spreadsheet, use SUM to calculate total, create a pie chart to see where money goes.',
          
          '**Basic SQL**: SQL (Structured Query Language) lets you query databases to get the data you need. Basic commands: SELECT (choose columns), FROM (specify table), WHERE (filter rows), ORDER BY (sort results). Example: `SELECT name, salary FROM employees WHERE department = "Sales" ORDER BY salary DESC` gets all sales employees sorted by salary, highest first.'
        ],
        
        requiredSkills: [
          '**Curiosity**: Always ask "why?" Don\'t just accept numbers at face value. If sales dropped, dig deeper - was it a specific product? A particular region? A certain time period? Good analysts are naturally curious and love solving puzzles.',
          
          '**Attention to Detail**: Small errors can lead to wrong conclusions. A misplaced decimal point or wrong formula can make millions of rupees difference. Double-check your work, validate results, and ensure data accuracy.',
          
          '**Communication**: You must explain technical findings to non-technical people. Use simple language, tell stories with data, create clear visualizations. Your analysis is useless if stakeholders don\'t understand it.',
          
          '**Business Understanding**: Know the industry you\'re analyzing. If you\'re analyzing e-commerce data, understand how online shopping works, what metrics matter (conversion rate, cart abandonment), and what drives customer behavior.',
          
          '**Basic Math & Statistics**: You don\'t need advanced calculus, but understand percentages, ratios, averages, and basic probability. Know when to use mean vs median, understand correlation vs causation.'
        ],
        
        examples: [
          '**Sales Analysis**: Analyze a store\'s sales data to find best-selling products. Use Excel to calculate total sales per product, create a bar chart showing top 10 products, identify seasonal trends (ice cream sells more in summer). Recommend which products to promote and which to discontinue.',
          
          '**Customer Segmentation**: Group customers based on behavior. Use data like purchase frequency, average order value, and product preferences. Create segments: "High-value frequent buyers", "Occasional shoppers", "One-time buyers". This helps marketing team target each group differently.',
          
          '**Survey Analysis**: Analyze survey responses to understand customer satisfaction. Calculate average ratings, identify common complaints, find patterns (customers in City A are less satisfied than City B). Create visualizations showing key findings and recommend improvements.',
          
          '**Website Traffic Analysis**: Use Google Analytics to understand website visitors. How many visitors? Which pages are most popular? Where do visitors come from (Google, social media, direct)? How long do they stay? This helps improve website design and content.',
          
          '**Budget Tracking**: Create a personal or business budget tracker in Excel. Track income and expenses by category, calculate totals, create charts showing spending patterns, identify areas to cut costs. Set up formulas to automatically calculate remaining budget.'
        ]
      },
      
      intermediate: {
        coreConcepts: [
          '**Advanced SQL**: Master complex queries. **JOINs** combine data from multiple tables (like matching customers with their orders). **Subqueries** are queries within queries. **Window functions** (ROW_NUMBER, RANK, LAG, LEAD) perform calculations across rows. **CTEs** (Common Table Expressions) make complex queries readable. Example: Find top 3 products per category using RANK() OVER (PARTITION BY category ORDER BY sales DESC).',
          
          '**Data Visualization Principles**: Choose the right chart type. **Bar charts** compare categories. **Line charts** show trends over time. **Scatter plots** show relationships between two variables. **Pie charts** show parts of a whole (use sparingly). **Heatmaps** show patterns in large datasets. Use color wisely - avoid red/green for colorblind users. Keep it simple - don\'t clutter with unnecessary elements.',
          
          '**Statistical Testing**: Determine if differences are real or just random chance. **Hypothesis testing** tests assumptions (Is conversion rate really higher for Version A?). **P-value** shows probability results are due to chance (p < 0.05 means 95% confident). **T-tests** compare two groups. **Chi-square tests** test relationships between categorical variables. **Confidence intervals** show range of likely values.',
          
          '**Python for Data Analysis**: Python with Pandas library is powerful for data manipulation. Load data from CSV/Excel/databases, clean and transform data, perform calculations, create visualizations. Example: `df.groupby("category")["sales"].sum()` calculates total sales per category. NumPy handles numerical operations. Matplotlib/Seaborn create visualizations.',
          
          '**Business Intelligence Tools**: Tableau and Power BI create interactive dashboards. Connect to databases, drag-and-drop to create visualizations, add filters and parameters for interactivity, publish dashboards for stakeholders to explore. These tools make it easy to create professional dashboards without coding.'
        ],
        
        toolsTech: [
          '**Tableau**: Industry-leading visualization tool. Drag-and-drop interface makes it easy to create beautiful dashboards. Connect to multiple data sources (Excel, SQL databases, cloud services). Create interactive dashboards with filters, drill-downs, and tooltips. Share dashboards online. Used by companies like Walmart, Coca-Cola, and LinkedIn.',
          
          '**Power BI**: Microsoft\'s BI tool. Integrates seamlessly with Excel and other Microsoft products. Similar to Tableau but often cheaper for organizations already using Microsoft. Create reports and dashboards, schedule automatic data refreshes, share with team. Strong for financial analysis and reporting.',
          
          '**Python (Pandas, NumPy, Matplotlib)**: Pandas is the go-to library for data manipulation in Python. Load data, clean it, transform it, analyze it - all with simple commands. NumPy handles numerical operations efficiently. Matplotlib and Seaborn create publication-quality visualizations. Jupyter Notebooks let you combine code, visualizations, and explanations.',
          
          '**SQL Databases (PostgreSQL, MySQL, BigQuery)**: Store and query large datasets. PostgreSQL is powerful and open-source. MySQL is widely used for web applications. BigQuery (Google) handles massive datasets (terabytes) with fast query performance. Learn to write efficient queries, understand indexes, and optimize performance.',
          
          '**Google Analytics**: Track website and app usage. See how many visitors, which pages they visit, how long they stay, where they come from. Set up goals to track conversions. Create custom reports. Essential for digital marketing analysis. Free for most use cases.'
        ],
        
        realWorld: [
          '**E-commerce Analytics**: Analyze Flipkart/Amazon data. Track metrics: conversion rate (visitors who buy), average order value, cart abandonment rate, customer lifetime value. Identify which products are trending, which categories are growing, which marketing campaigns drive sales. Use cohort analysis to track customer retention. Build dashboards showing real-time sales, top products, and regional performance.',
          
          '**Marketing Campaign Analysis**: Measure effectiveness of marketing campaigns. Calculate ROI (return on investment) - did the campaign bring more revenue than it cost? Use A/B testing to compare two versions of an ad or email. Track metrics: click-through rate, conversion rate, cost per acquisition. Recommend which channels (Google Ads, Facebook, email) to invest more in.',
          
          '**Financial Analysis**: Analyze company financial data. Track revenue, expenses, profit margins over time. Identify cost-saving opportunities. Forecast future revenue based on historical trends. Create financial dashboards for executives showing key metrics: revenue growth, profit margins, cash flow. Perform variance analysis (actual vs budget).',
          
          '**Customer Churn Analysis**: Identify why customers stop using a product/service. Analyze customer behavior before they churned. Find patterns: customers who don\'t use feature X are more likely to churn. Build predictive models to identify at-risk customers. Recommend retention strategies: offer discounts, improve onboarding, add features.',
          
          '**Supply Chain Optimization**: Analyze inventory and logistics data. Optimize stock levels - avoid overstocking (ties up money) and understocking (lost sales). Forecast demand for products. Analyze delivery times and identify bottlenecks. Recommend warehouse locations to minimize shipping costs and time.'
        ],
        
        explanations: [
          '**How Dashboards Work**: Dashboards connect to data sources (databases, spreadsheets, APIs) and automatically refresh. You design the layout with charts, tables, and filters. Users can interact - click on a region to see details, change date ranges, filter by category. Dashboards update in real-time or on schedule. They provide at-a-glance view of key metrics.',
          
          '**A/B Testing Process**: Split users into two groups randomly. Group A sees Version A (control), Group B sees Version B (variant). Measure a metric (conversion rate, click-through rate). After collecting enough data, use statistical tests to determine if the difference is significant. If Version B is significantly better, roll it out to everyone. Example: Test two email subject lines to see which gets more opens.',
          
          '**Data Pipeline**: Data flows from sources (databases, APIs, files) through ETL (Extract, Transform, Load) processes. Extract: Pull data from sources. Transform: Clean, combine, and reshape data. Load: Store in data warehouse. Analysts query the warehouse for analysis. Pipelines run on schedules (daily, hourly) to keep data fresh. Tools: Apache Airflow, Talend.',
          
          '**Correlation vs Causation**: Correlation means two things move together (ice cream sales and drowning deaths both increase in summer). Causation means one causes the other. Just because things correlate doesn\'t mean one causes the other (ice cream doesn\'t cause drowning - hot weather causes both). Always look for confounding variables and use experiments to establish causation.',
          '**Cohort Analysis**: Group users by when they started (e.g., users who signed up in January 2026). Track their behavior over time (retention, revenue, engagement). Compare cohorts to see if newer users behave differently. This helps identify if product changes improved user experience. Example: January cohort has 60% retention after 3 months, February cohort has 70% - something improved!'
        ]
      },
      
      advanced: {
        industryPractices: [
          '**Data Governance**: Establish rules for data quality, security, and usage. Define who owns each dataset, who can access it, how long to retain it. Implement data quality checks (automated tests for missing values, outliers, inconsistencies). Document data definitions (what does "active user" mean?). Ensure compliance with regulations (GDPR, data privacy laws).',
          
          '**Predictive Analytics**: Use historical data to predict future outcomes. Techniques: regression (predict continuous values like sales), classification (predict categories like will customer churn?), time series forecasting (predict future values based on past trends). Tools: Python (Scikit-learn), R, specialized tools (Prophet for forecasting).',
          
          '**Data Storytelling**: Present insights in a compelling narrative. Start with the business question, show the analysis process, highlight key findings, provide actionable recommendations. Use visualizations to support the story. Tailor the message to the audience (executives want high-level insights, analysts want details). Practice presenting and handling questions.',
          
          '**Experimentation Framework**: Build a systematic approach to A/B testing. Define success metrics, calculate required sample size, ensure random assignment, run tests for appropriate duration, analyze results with statistical rigor, document learnings. Create a culture of experimentation where teams regularly test ideas.',
          
          '**Data Quality Management**: Implement processes to ensure data accuracy. Set up automated data quality checks (alerts for missing data, unexpected values). Create data validation rules. Regularly audit data sources. Work with data engineers to fix upstream issues. Document known data issues and workarounds.'
        ],
        
        realProjects: [
          '**Customer Lifetime Value (LTV) Model**: Build a model to predict how much revenue a customer will generate over their lifetime. Use historical data on customer purchases, engagement, and churn. Segment customers by LTV. Help marketing team focus on high-LTV customers. Calculate customer acquisition cost (CAC) and ensure LTV > CAC for profitability.',
          
          '**Demand Forecasting System**: Predict future demand for products. Use historical sales data, seasonality, trends, and external factors (holidays, weather, economic indicators). Build models using time series methods (ARIMA, Prophet) or machine learning. Provide forecasts at different levels (product, category, region). Help supply chain team optimize inventory.',
          
          '**Real-Time Analytics Dashboard**: Build a dashboard showing live business metrics. Ingest data from multiple sources in real-time (website events, transactions, app usage). Process and aggregate data quickly. Display key metrics with second-by-second updates. Set up alerts for anomalies (sudden drop in sales, spike in errors). Use tools like Apache Kafka, Spark, and real-time databases.',
          
          '**Recommendation System**: Build a system that recommends products to users. Use collaborative filtering (users who bought X also bought Y), content-based filtering (recommend similar products), or hybrid approaches. Implement in Python using libraries like Surprise or build custom models. Measure success with metrics like click-through rate and conversion rate.',
          
          '**Fraud Detection System**: Identify fraudulent transactions in real-time. Analyze patterns in transaction data (amount, location, time, user behavior). Build models to flag suspicious transactions. Balance false positives (legitimate transactions flagged as fraud) and false negatives (fraud not detected). Use anomaly detection techniques and machine learning.'
        ],
        
        advancedTools: [
          '**Apache Spark**: Process massive datasets (terabytes) quickly using distributed computing. Write code in Python (PySpark) or Scala. Perform data transformations, aggregations, and machine learning at scale. Used by companies like Netflix and Uber for big data processing.',
          
          '**dbt (Data Build Tool)**: Transform data in your warehouse using SQL. Write modular, reusable SQL transformations. Test data quality automatically. Document data models. Version control your transformations. Makes data transformation more like software engineering - testable, documented, version-controlled.',
          
          '**Looker**: Google\'s BI platform. Define data models in LookML (a modeling language). Create reusable metrics and dimensions. Build dashboards and reports. Embed analytics in other applications. Strong governance - ensure everyone uses the same definitions.',
          
          '**Snowflake**: Cloud data warehouse. Store and query massive datasets with fast performance. Separate storage and compute - scale them independently. Share data securely with other organizations. Pay only for what you use. Integrates with all major BI tools.',
          
          '**Airflow**: Orchestrate data pipelines. Define workflows as code (DAGs - Directed Acyclic Graphs). Schedule jobs, handle dependencies, retry failures, monitor execution. Widely used for ETL pipelines. Open-source and highly customizable.'
        ],
        
        careerGrowth: [
          '**Junior → Mid-Level (2-3 years)**: Master SQL and one BI tool (Tableau/Power BI). Learn Python for data analysis. Take ownership of dashboards and reports. Understand business metrics deeply. Proactively identify insights. Salary growth: ₹3-6 LPA → ₹6-12 LPA.',
          
          '**Mid-Level → Senior (3-5 years)**: Lead analysis projects end-to-end. Mentor junior analysts. Build predictive models. Design data architecture. Influence business strategy with insights. Develop expertise in a domain (marketing, product, finance). Salary: ₹12-20 LPA.',
          
          '**Senior → Lead/Principal (5-8 years)**: Define analytics strategy for the company. Lead a team of analysts. Build data infrastructure and processes. Partner with executives on strategic decisions. Establish data culture. Salary: ₹20-35 LPA.',
          
          '**Specialization Paths**: **Data Scientist** (build ML models, requires strong math/stats), **Analytics Engineer** (build data pipelines, requires engineering skills), **Product Analyst** (focus on product metrics and user behavior), **Business Intelligence Developer** (build BI infrastructure), **Data Consultant** (work with multiple clients).',
          
          '**Management Track**: Analytics Manager → Director of Analytics → VP of Analytics → Chief Data Officer. Lead teams (5-50+ people), set strategy, manage budgets, hire talent, align analytics with business goals. Balance technical and leadership skills. Salary: ₹25 LPA - ₹80 LPA+.'
        ]
      }
    },
    
    practiceChallenges: [
      {
        title: 'Data Cleaning Challenge',
        description: 'Clean a messy sales dataset and prepare it for analysis',
        difficulty: 'easy',
        timeEstimate: '30 minutes',
        tasks: [
          'Load the dataset (CSV with missing values, duplicates, inconsistencies)',
          'Identify and handle missing values (fill with mean/median or remove)',
          'Remove duplicate records',
          'Standardize formats (dates, currency, text)',
          'Remove outliers (values that don\'t make sense)',
          'Export cleaned dataset'
        ],
        hints: [
          'Use Excel or Python Pandas for cleaning',
          'Check for negative prices or quantities',
          'Ensure date formats are consistent',
          'Document what you cleaned and why'
        ]
      },
      {
        title: 'Sales Dashboard Creation',
        description: 'Build an interactive dashboard showing key sales metrics',
        difficulty: 'medium',
        timeEstimate: '1 hour',
        tasks: [
          'Connect to sales data (Excel/CSV)',
          'Calculate KPIs: total sales, average order value, top products',
          'Create visualizations: sales trend line chart, top products bar chart, regional sales map',
          'Add filters for date range and product category',
          'Format dashboard professionally'
        ],
        hints: [
          'Use Tableau Public or Power BI Desktop (free)',
          'Choose appropriate chart types for each metric',
          'Use consistent colors and fonts',
          'Add titles and labels to all charts'
        ]
      },
      {
        title: 'SQL Query Practice',
        description: 'Write SQL queries to answer business questions',
        difficulty: 'medium',
        timeEstimate: '45 minutes',
        tasks: [
          'Find top 10 customers by total purchase amount',
          'Calculate monthly sales growth rate',
          'Identify products with declining sales',
          'Find customers who haven\'t purchased in 6 months',
          'Calculate average order value by customer segment'
        ],
        hints: [
          'Use JOINs to combine customer and order tables',
          'Use GROUP BY for aggregations',
          'Use window functions for growth calculations',
          'Use HAVING to filter aggregated results'
        ]
      },
      {
        title: 'A/B Test Analysis',
        description: 'Analyze results of an A/B test and make recommendations',
        difficulty: 'hard',
        timeEstimate: '1 hour',
        tasks: [
          'Load A/B test data (two groups, conversion rates)',
          'Calculate conversion rate for each group',
          'Perform statistical test (t-test or chi-square)',
          'Determine if difference is statistically significant',
          'Create visualization comparing groups',
          'Write recommendation based on results'
        ],
        hints: [
          'Use Python scipy.stats for statistical tests',
          'Check if sample size is large enough',
          'P-value < 0.05 indicates significant difference',
          'Consider practical significance, not just statistical'
        ]
      }
    ],
    
    hackathonChallenges: [
      {
        title: 'Customer Segmentation Analysis',
        description: 'Segment customers based on purchase behavior and create personas',
        timeLimit: 60,
        requirements: [
          'Analyze customer purchase data (frequency, recency, monetary value)',
          'Create 3-5 customer segments using clustering or manual rules',
          'Name each segment and describe characteristics',
          'Create visualizations showing segment differences',
          'Recommend marketing strategies for each segment'
        ]
      },
      {
        title: 'Sales Forecasting Model',
        description: 'Build a model to forecast next quarter\'s sales',
        timeLimit: 90,
        requirements: [
          'Analyze historical sales data (at least 2 years)',
          'Identify trends and seasonality',
          'Build forecasting model (moving average, exponential smoothing, or ML)',
          'Generate forecast for next 3 months',
          'Visualize historical data and forecast',
          'Calculate forecast accuracy metrics'
        ]
      },
      {
        title: 'Business Insights Report',
        description: 'Analyze a dataset and present actionable insights',
        timeLimit: 120,
        requirements: [
          'Explore dataset and identify interesting patterns',
          'Perform statistical analysis to validate findings',
          'Create 5-7 visualizations showing key insights',
          'Write executive summary with recommendations',
          'Build interactive dashboard (optional)',
          'Present findings in clear, non-technical language'
        ]
      }
    ],
    
    videos: [
      {
        title: 'The Complete Data Analyst Roadmap',
        videoId: 'YRJbhFLLPyE',
        duration: '16:30',
        description: 'Complete roadmap to become a data analyst. Step-by-step guide covering essential skills, tools, and career path from beginner to professional.'
      },
      {
        title: 'Become Data Analyst From Scratch 2026 | Full Course',
        videoId: 'Ul4BUSvMhT4',
        duration: '45:20',
        description: 'Learn data analysis from scratch step by step. Comprehensive course covering Excel, SQL, Python, and data visualization for beginners.'
      },
      {
        title: 'Real Life of a Data Analyst | Day in the Life',
        videoId: 'RrposkzcNcs',
        duration: '10:15',
        description: 'Understand real-world data analyst workflow. See actual daily tasks, tools used, and what the job involves beyond theory.'
      }
    ],
    
    roadmap: [
      {
        stage: 'Foundation',
        icon: 'GraduationCap',
        duration: '1-2 months',
        skills: ['Excel basics', 'Descriptive statistics', 'Data cleaning', 'Basic charts'],
        tools: ['Microsoft Excel', 'Google Sheets'],
        outcome: 'Perform basic data analysis and create simple reports'
      },
      {
        stage: 'SQL Mastery',
        icon: 'Database',
        duration: '2-3 months',
        skills: ['SQL queries', 'JOINs', 'Aggregations', 'Subqueries', 'Window functions'],
        tools: ['PostgreSQL', 'MySQL', 'SQLite'],
        outcome: 'Query databases efficiently and extract insights'
      },
      {
        stage: 'Visualization',
        icon: 'BarChart',
        duration: '2-3 months',
        skills: ['Tableau/Power BI', 'Dashboard design', 'Data storytelling', 'Chart selection'],
        tools: ['Tableau', 'Power BI', 'Looker'],
        outcome: 'Create interactive dashboards and present insights'
      },
      {
        stage: 'Python Analytics',
        icon: 'Code',
        duration: '3-4 months',
        skills: ['Python basics', 'Pandas', 'NumPy', 'Matplotlib', 'Statistical analysis'],
        tools: ['Python', 'Jupyter', 'Pandas', 'Seaborn'],
        outcome: 'Automate analysis and perform advanced statistics'
      },
      {
        stage: 'Job Ready',
        icon: 'Briefcase',
        duration: '2-3 months',
        skills: ['Portfolio projects', 'Business acumen', 'Communication', 'Interview prep'],
        tools: ['GitHub', 'LinkedIn', 'Portfolio website'],
        outcome: 'Land your dream data analyst job'
      }
    ],
    
    salary: {
      entry: '₹3-6 LPA',
      mid: '₹6-15 LPA',
      senior: '₹15-30+ LPA'
    }
  },

  'full-stack-developer': {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    description: 'Master both frontend and backend to build complete web applications',
    icon: 'Layers',
    gradient: 'from-purple-500 to-pink-500',
    
    notes: {
      beginner: {
        whatIs: `A Full Stack Developer is someone who can build both the frontend (what users see) and backend (server, database, logic) of web applications. They're like a one-person army who can create a complete product from scratch.

**Real-World Example**: When you use Zomato to order food, a full stack developer built the entire system - the mobile app interface you interact with, the server that processes your order, the database storing restaurant menus, and the payment integration. They handle everything!

Full stack developers are versatile and in high demand because they understand the complete picture. They can work independently on projects or collaborate with specialized frontend/backend teams.`,
        
        basicConcepts: [
          '**HTML (Structure)**: HTML is the skeleton of web pages. It defines structure using tags like <h1> for headings, <p> for paragraphs, <div> for containers, <img> for images. Think of it as the blueprint of a house - it defines where things go.',
          
          '**CSS (Styling)**: CSS makes websites beautiful. It controls colors, fonts, spacing, layouts. You can make text blue, add shadows, create responsive layouts. Think of it as interior design - HTML is the structure, CSS is the decoration.',
          
          '**JavaScript (Interactivity)**: JavaScript makes websites interactive. It handles button clicks, form submissions, animations, and dynamic content updates. When you click "Like" on Facebook and the count increases without page reload - that\'s JavaScript.',
          
          '**Frontend vs Backend**: Frontend is what users see and interact with (HTML, CSS, JavaScript, React). Backend is the server-side logic users don\'t see (Node.js, Python, databases). Full stack developers know both.',
          
          '**Client-Server Model**: When you visit a website, your browser (client) sends a request to a server. The server processes it, queries the database if needed, and sends back a response. Your browser displays it. This is how the web works.'
        ],
        
        requiredSkills: [
          '**HTML/CSS Fundamentals**: Build responsive layouts, understand flexbox and grid, create forms, style elements. Practice by recreating existing websites.',
          
          '**JavaScript Proficiency**: Understand variables, functions, arrays, objects, DOM manipulation, async/await, promises. This is the foundation of modern web development.',
          
          '**Problem-Solving**: Break down features into smaller tasks. Plan before coding. Debug systematically when things don\'t work.',
          
          '**Version Control (Git)**: Track code changes, collaborate with teams, manage branches, resolve conflicts. Essential for any developer.',
          
          '**Basic Design Sense**: Understand what makes a UI look good - spacing, alignment, color harmony, typography. You don\'t need to be a designer, but should create decent-looking interfaces.'
        ],
        
        examples: [
          '**Personal Portfolio**: Build a website showcasing your projects, skills, and contact info. Use HTML for structure, CSS for styling, JavaScript for smooth scrolling and animations. Deploy on GitHub Pages or Netlify.',
          
          '**Todo List App**: Create a full-stack todo app. Frontend: React with add/delete/complete tasks. Backend: Node.js API with Express. Database: MongoDB to store tasks. Users can create accounts and their todos persist.',
          
          '**Weather App**: Build an app that shows weather for any city. Frontend: Search box and weather display. Backend: Fetch data from weather API. Learn API integration, async JavaScript, and error handling.',
          
          '**Blog Platform**: Create a simple blogging platform. Users can write posts, edit them, delete them. Frontend: React with rich text editor. Backend: Node.js API. Database: PostgreSQL. Implement authentication so only authors can edit their posts.',
          
          '**Recipe Finder**: Build an app to search recipes. Frontend: Search interface and recipe cards. Backend: API that queries recipe database. Add features like save favorites, filter by ingredients, rate recipes.'
        ]
      },
      
      intermediate: {
        coreConcepts: [
          '**React/Vue/Angular**: Modern frontend frameworks make building complex UIs easier. React uses components - reusable pieces of UI. State management handles data flow. Hooks (useState, useEffect) manage component lifecycle. Virtual DOM makes updates fast.',
          
          '**RESTful APIs**: Standard way for frontend and backend to communicate. HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove). Endpoints like /api/users, /api/products. Return JSON data. Status codes indicate success/failure.',
          
          '**Node.js & Express**: JavaScript on the server. Express is a framework for building APIs. Define routes, handle requests, send responses. Middleware processes requests (authentication, logging). Connect to databases, integrate third-party services.',
          
          '**Databases (SQL & NoSQL)**: SQL databases (PostgreSQL, MySQL) store structured data in tables with relationships. NoSQL (MongoDB) stores flexible documents. Learn when to use each. Design schemas, write queries, optimize performance.',
          
          '**Authentication & Authorization**: Authentication proves identity (login). Authorization determines permissions (what user can do). Implement with JWT tokens, sessions, or OAuth. Hash passwords with bcrypt. Never store plain text passwords.'
        ],
        
        toolsTech: [
          '**MERN Stack**: MongoDB (database), Express (backend framework), React (frontend), Node.js (runtime). Popular stack for building modern web apps. JavaScript everywhere - same language for frontend and backend.',
          
          '**Next.js**: React framework with server-side rendering, file-based routing, API routes, and optimizations. Great for SEO and performance. Used by TikTok, Twitch, Nike.',
          
          '**TypeScript**: JavaScript with types. Catch errors before runtime. Better IDE support with autocomplete. Makes large codebases more maintainable. Industry standard for serious projects.',
          
          '**Tailwind CSS**: Utility-first CSS framework. Style elements with classes like "bg-blue-500 text-white p-4". Faster than writing custom CSS. Consistent design system. Highly customizable.',
          
          '**Prisma/Sequelize**: ORMs (Object-Relational Mappers) let you interact with databases using JavaScript instead of SQL. Define models, Prisma generates type-safe queries. Migrations handle schema changes.'
        ],
        
        realWorld: [
          '**E-commerce Store**: Build a full-featured online store. Product catalog with search/filters, shopping cart, checkout with Stripe, order management, admin dashboard. Handle inventory, shipping, taxes. Implement email notifications.',
          
          '**Social Network**: Create a Twitter/Instagram clone. User profiles, posts with images, likes/comments, follow system, feed algorithm, notifications, direct messaging. Handle file uploads, real-time updates with WebSockets.',
          
          '**Learning Management System**: Build a platform like Udemy. Course creation, video hosting, student enrollment, progress tracking, quizzes, certificates. Payment integration for course purchases. Admin panel for instructors.',
          
          '**Project Management Tool**: Create a Trello/Asana alternative. Boards, lists, cards, drag-and-drop, team collaboration, file attachments, due dates, comments. Real-time updates when team members make changes.',
          
          '**Booking System**: Build an Airbnb-like platform. Property listings with photos, search by location/dates, booking calendar, payment processing, reviews, host dashboard. Handle availability, pricing, cancellations.'
        ],
        
        explanations: [
          '**Component-Based Architecture**: Break UI into reusable components. A Button component can be used everywhere. Props pass data to components. State manages component data. This makes code modular, testable, and maintainable.',
          
          '**API Design Best Practices**: Use meaningful URLs (/api/users/:id), proper HTTP methods, consistent response format, error handling with appropriate status codes, versioning (/api/v1/), pagination for large datasets, rate limiting to prevent abuse.',
          
          '**State Management**: In complex apps, managing state (data) becomes challenging. Solutions: React Context (built-in), Redux (centralized store), Zustand (lightweight). Choose based on app complexity. Keep state minimal and derived data computed.',
          '**Database Relationships**: One-to-Many (one user has many posts), Many-to-Many (users can follow many users), One-to-One (user has one profile). Use foreign keys to link tables. Understand joins to query related data efficiently.',
          
          '**Deployment Pipeline**: Code → Git → CI/CD (automated tests) → Build → Deploy to server. Use platforms like Vercel (frontend), Railway/Render (backend), or AWS. Set up environment variables, configure domains, enable HTTPS.'
        ]
      },
      
      advanced: {
        industryPractices: [
          '**Microservices Architecture**: Split monolithic apps into small, independent services. Each service handles one domain (users, payments, notifications). Communicate via APIs or message queues. Benefits: independent scaling, technology flexibility, fault isolation.',
          
          '**Server-Side Rendering (SSR)**: Render pages on server instead of client. Better SEO (search engines see content), faster initial load. Next.js and Nuxt.js make SSR easy. Trade-off: more server load, complexity.',
          
          '**Progressive Web Apps (PWA)**: Web apps that work offline, can be installed, send push notifications. Use service workers to cache assets. Provide app-like experience on web. Examples: Twitter Lite, Starbucks.',
          
          '**GraphQL**: Alternative to REST. Clients request exactly the data they need. Single endpoint, no over-fetching. Real-time subscriptions. Type-safe with schema. Used by Facebook, GitHub, Shopify.',
          
          '**Performance Optimization**: Code splitting (load only needed code), lazy loading (load images when visible), caching (Redis, CDN), database indexing, query optimization, compression, minification. Aim for <3s load time.'
        ],
        
        realProjects: [
          '**Real-Time Collaboration Tool**: Build Google Docs-like collaborative editing. Multiple users edit simultaneously, see each other\'s cursors, changes sync instantly. Use WebSockets or WebRTC. Handle conflict resolution. Implement presence indicators.',
          
          '**Streaming Platform**: Create a Netflix-like service. Video upload and transcoding, adaptive bitrate streaming, CDN integration, recommendation algorithm, watch history, continue watching, multiple profiles. Handle massive video files efficiently.',
          
          '**Multi-Tenant SaaS**: Build a platform where multiple companies use the same app with isolated data. Implement tenant identification, data isolation, custom branding per tenant, usage-based billing, admin panel for each tenant.',
          
          '**Marketplace Platform**: Create an Etsy/Fiverr-like marketplace. Seller onboarding, product/service listings, search and discovery, escrow payments, dispute resolution, ratings and reviews, messaging between buyers and sellers.',
          
          '**IoT Dashboard**: Build a dashboard for IoT devices. Real-time data ingestion from sensors, time-series database, real-time charts, alerts for anomalies, device management, historical data analysis. Handle high-frequency data streams.'
        ],
        
        advancedTools: [
          '**Docker & Kubernetes**: Containerize apps with Docker. Orchestrate containers with Kubernetes. Auto-scaling, load balancing, self-healing. Deploy microservices efficiently. Industry standard for production deployments.',
          
          '**Redis**: In-memory data store. Use for caching (reduce database load), session storage, real-time analytics, pub/sub messaging, rate limiting. Extremely fast (microsecond latency).',
          
          '**Elasticsearch**: Search engine for full-text search. Index documents, search with complex queries, fuzzy matching, autocomplete. Used by GitHub, Stack Overflow for search functionality.',
          
          '**WebSockets/Socket.io**: Real-time bidirectional communication. Server can push updates to clients instantly. Use for chat, notifications, live updates, collaborative editing. Socket.io adds fallbacks for older browsers.',
          
          '**Serverless (AWS Lambda, Vercel Functions)**: Run code without managing servers. Pay only for execution time. Auto-scaling, no infrastructure management. Great for APIs, background jobs, webhooks.'
        ],
        
        careerGrowth: [
          '**Junior → Mid-Level (2-3 years)**: Master MERN/MEAN stack, build complete projects independently, understand deployment, write clean code, participate in code reviews. Salary: ₹4-8 LPA → ₹8-15 LPA.',
          
          '**Mid-Level → Senior (3-5 years)**: Lead feature development, mentor juniors, make architectural decisions, optimize performance, handle complex bugs, improve development processes. Salary: ₹15-25 LPA.',
          
          '**Senior → Lead/Architect (5-8 years)**: Design system architecture, set technical direction, evaluate technologies, lead multiple projects, establish best practices, interview candidates. Salary: ₹25-40 LPA.',
          
          '**Specialization Options**: Frontend Specialist (React expert, UI/UX focus), Backend Specialist (APIs, databases, scalability), DevOps Engineer (deployment, infrastructure), Mobile Developer (React Native, Flutter).',
          
          '**Entrepreneurship**: Full stack skills enable you to build products independently. Many successful startups founded by full stack developers who built MVPs themselves. Examples: Pieter Levels (Nomad List), Sahil Lavingia (Gumroad).'
        ]
      }
    },
    
    practiceChallenges: [
      {
        title: 'Build a Login System',
        description: 'Create complete authentication with registration and login',
        difficulty: 'medium',
        timeEstimate: '1.5 hours',
        tasks: [
          'Create registration form (email, password, confirm password)',
          'Build backend API to register users (hash passwords with bcrypt)',
          'Create login form and API endpoint',
          'Generate JWT token on successful login',
          'Store token in localStorage',
          'Create protected route that requires authentication',
          'Add logout functionality'
        ],
        hints: [
          'Never store passwords in plain text',
          'Validate email format and password strength',
          'JWT should include user ID and expiration',
          'Check token validity on protected routes'
        ]
      },
      {
        title: 'Build a REST API',
        description: 'Create a complete CRUD API for a blog',
        difficulty: 'medium',
        timeEstimate: '1.5 hours',
        tasks: [
          'Set up Express server with MongoDB',
          'Create Post model (title, content, author, date)',
          'Implement endpoints: GET /posts, GET /posts/:id, POST /posts, PUT /posts/:id, DELETE /posts/:id',
          'Add validation and error handling',
          'Test all endpoints with Postman'
        ],
        hints: [
          'Use Mongoose for MongoDB',
          'Return appropriate status codes (200, 201, 404, 500)',
          'Validate required fields before saving',
          'Handle database connection errors'
        ]
      },
      {
        title: 'Create a Real-Time Chat',
        description: 'Build a chat application with Socket.io',
        difficulty: 'hard',
        timeEstimate: '2 hours',
        tasks: [
          'Set up Socket.io server and client',
          'Create chat UI with message list and input',
          'Emit messages from client to server',
          'Broadcast messages to all connected clients',
          'Show who is online',
          'Add typing indicators',
          'Store messages in database'
        ],
        hints: [
          'Use socket.emit for sending, socket.on for receiving',
          'socket.broadcast.emit sends to all except sender',
          'Track connected users with socket IDs',
          'Disconnect event handles user leaving'
        ]
      },
      {
        title: 'Build an E-commerce Cart',
        description: 'Create shopping cart with add/remove/checkout',
        difficulty: 'hard',
        timeEstimate: '2 hours',
        tasks: [
          'Create product listing page',
          'Implement add to cart functionality',
          'Build cart page showing items, quantities, total',
          'Allow quantity updates and item removal',
          'Create checkout form',
          'Process order and save to database',
          'Send confirmation email (simulated)'
        ],
        hints: [
          'Use React Context or Redux for cart state',
          'Calculate total dynamically',
          'Validate stock availability before checkout',
          'Clear cart after successful order'
        ]
      }
    ],
    
    hackathonChallenges: [
      {
        title: 'Build a URL Shortener',
        description: 'Create a service like bit.ly',
        timeLimit: 60,
        requirements: [
          'User enters long URL, gets short URL',
          'Short URL redirects to original URL',
          'Track click count for each URL',
          'Show analytics (clicks, creation date)',
          'Custom short URLs (optional)'
        ]
      },
      {
        title: 'Social Media Feed',
        description: 'Build a Twitter-like feed',
        timeLimit: 90,
        requirements: [
          'Users can create posts with text and images',
          'Feed shows posts from all users',
          'Like and comment functionality',
          'Real-time updates when new posts are added',
          'User profiles showing their posts'
        ]
      },
      {
        title: 'Task Management Board',
        description: 'Create a Kanban board like Trello',
        timeLimit: 120,
        requirements: [
          'Multiple boards with lists and cards',
          'Drag and drop cards between lists',
          'Add, edit, delete cards',
          'Card details with description and due date',
          'Persist data in database'
        ]
      }
    ],
    
    videos: [
      {
        title: 'How to Become a Full Stack Developer | Web Development Explained',
        videoId: '5QzzeYHApV0',
        duration: '12:30',
        description: 'Learn full stack development from scratch. Comprehensive guide explaining frontend, backend, databases, and the complete development process.'
      },
      {
        title: 'Front End Web Development Tutorial for Beginners (Tamil)',
        videoId: '7dSJubxFWv0',
        duration: '3:45:20',
        description: 'Beginner-friendly frontend tutorial in Tamil. Learn HTML, CSS, and JavaScript fundamentals to build responsive websites from scratch.'
      }
    ],
    
    roadmap: [
      {
        stage: 'Frontend Basics',
        icon: 'Layout',
        duration: '2-3 months',
        skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Responsive design', 'Git'],
        tools: ['VS Code', 'Chrome DevTools', 'Git/GitHub'],
        outcome: 'Build responsive, interactive websites'
      },
      {
        stage: 'Frontend Framework',
        icon: 'Zap',
        duration: '2-3 months',
        skills: ['React/Vue', 'Component architecture', 'State management', 'Routing', 'API integration'],
        tools: ['React', 'Redux/Context', 'React Router', 'Axios'],
        outcome: 'Build complex single-page applications'
      },
      {
        stage: 'Backend Development',
        icon: 'Server',
        duration: '3-4 months',
        skills: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Database design'],
        tools: ['Node.js', 'Express', 'MongoDB/PostgreSQL', 'Postman'],
        outcome: 'Build scalable backend services'
      },
      {
        stage: 'Full Stack Integration',
        icon: 'Layers',
        duration: '2-3 months',
        skills: ['Connect frontend to backend', 'Deployment', 'Testing', 'DevOps basics'],
        tools: ['Docker', 'Vercel/Netlify', 'Railway/Render', 'Jest'],
        outcome: 'Deploy complete full-stack applications'
      },
      {
        stage: 'Job Ready',
        icon: 'Briefcase',
        duration: '2-3 months',
        skills: ['Portfolio projects', 'System design', 'Interview prep', 'Open source'],
        tools: ['GitHub', 'LeetCode', 'LinkedIn'],
        outcome: 'Land full stack developer job'
      }
    ],
    
    salary: {
      entry: '₹4-10 LPA',
      mid: '₹10-25 LPA',
      senior: '₹25-50+ LPA'
    }
  },

  'ux-designer': {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Design intuitive, user-friendly experiences that people love',
    icon: 'Palette',
    gradient: 'from-orange-500 to-red-500',
    
    notes: {
      beginner: {
        whatIs: `A UX (User Experience) Designer creates digital products that are easy, enjoyable, and efficient to use. They focus on how users interact with apps and websites, ensuring every click, swipe, and tap feels natural.

**Real-World Example**: When you use Instagram, everything feels intuitive - double-tap to like, swipe to see stories, pull down to refresh. UX designers spent months researching, testing, and refining these interactions to make them feel effortless. They studied how people hold phones, what gestures feel natural, and how to minimize confusion.

UX designers are problem-solvers who advocate for users. They conduct research, create wireframes and prototypes, test designs with real users, and iterate based on feedback. They work closely with product managers, developers, and stakeholders to build products people love.`,
        
        basicConcepts: [
          '**User-Centered Design**: Always design with users in mind. Understand their needs, goals, pain points, and context. Don\'t design based on personal preferences - design based on user research. Ask: "What problem does this solve for users?"',
          
          '**Usability**: A usable product is easy to learn, efficient to use, and error-tolerant. Users should accomplish tasks quickly without confusion. Good usability means users don\'t need instructions - the interface guides them naturally.',
          
          '**Information Architecture**: Organize content logically. Group related items, create clear hierarchies, use intuitive labels. Like organizing a library - books are grouped by genre, then author, with clear signs. Users should find what they need quickly.',
          
          '**Visual Hierarchy**: Guide users\' attention with size, color, contrast, and spacing. Important elements should stand out. Primary actions (like "Buy Now") should be more prominent than secondary actions (like "Save for Later").',
          
          '**Wireframes vs Mockups vs Prototypes**: Wireframes are low-fidelity sketches showing layout and structure (black and white, no details). Mockups are high-fidelity designs with colors, fonts, images. Prototypes are interactive - users can click through flows to test functionality.'
        ],
        
        requiredSkills: [
          '**Empathy**: Understand users\' feelings, frustrations, and motivations. Put yourself in their shoes. Good designers care deeply about making users\' lives easier.',
          
          '**Visual Design Basics**: Understand color theory, typography, spacing, alignment. You don\'t need to be an artist, but should create clean, professional designs.',
          
          '**Communication**: Explain design decisions to stakeholders. Present ideas clearly. Collaborate with developers. Write clear documentation. Good designers are great communicators.',
          
          '**Critical Thinking**: Question assumptions. Ask "why" repeatedly. Identify root problems, not just symptoms. Evaluate multiple solutions before choosing one.',
          
          '**Attention to Detail**: Notice small inconsistencies. Ensure pixel-perfect alignment. Check all edge cases. Small details make big differences in user experience.'
        ],
        
        examples: [
          '**Redesign a Signup Form**: Take a complex signup form and simplify it. Remove unnecessary fields, use clear labels, add helpful error messages, show progress for multi-step forms. Test with users to see if it\'s easier.',
          
          '**Mobile App Wireframes**: Sketch wireframes for a simple app (like a weather app). Show main screens, navigation flow, key interactions. Focus on layout and functionality, not visual design yet.',
          
          '**Icon Design**: Create a set of consistent icons for common actions (home, search, profile, settings). Ensure they\'re recognizable, consistent in style, and work at small sizes.',
          
          '**User Flow Diagram**: Map out how users complete a task (like booking a flight). Show each step, decision points, and possible paths. Identify where users might get stuck or confused.',
          
          '**Accessibility Audit**: Review an existing website for accessibility issues. Check color contrast, keyboard navigation, screen reader compatibility, alt text for images. Suggest improvements.'
        ]
      },
      
      intermediate: {
        coreConcepts: [
          '**User Research**: Understand users through interviews, surveys, usability testing, and analytics. Ask open-ended questions. Observe how people actually use products (often different from what they say). Identify patterns across multiple users.',
          
          '**Personas**: Create fictional characters representing user types. Include demographics, goals, frustrations, behaviors, and context. Personas help team empathize with users and make design decisions. Example: "Sarah, 28, busy professional who shops online during lunch breaks."',
          
          '**User Journey Mapping**: Visualize the complete user experience from awareness to post-purchase. Show touchpoints, emotions, pain points, and opportunities. Identify where experience breaks down and where to improve.',
          
          '**Interaction Design**: Design how users interact with products. Define what happens when users click, hover, swipe, type. Create micro-interactions (like a heart animation when liking). Ensure feedback for every action (loading spinners, success messages).',
          
          '**Design Systems**: Create reusable components and guidelines. Define colors, typography, spacing, button styles, form elements. Ensures consistency across product. Speeds up design and development. Examples: Material Design (Google), Human Interface Guidelines (Apple).'
        ],
        
        toolsTech: [
          '**Figma**: Industry-standard design tool. Create wireframes, mockups, prototypes. Real-time collaboration (like Google Docs for design). Component libraries, auto-layout, plugins. Free for individuals. Used by Uber, Microsoft, Airbnb.',
          
          '**Adobe XD**: Adobe\'s UX design tool. Similar to Figma. Create designs and prototypes. Integrates with other Adobe products. Repeat grids for lists. Voice prototyping. Good for Adobe ecosystem users.',
          
          '**Sketch**: Mac-only design tool. Popular before Figma. Symbols for reusable components. Plugins for extended functionality. Many design systems built in Sketch. Still used by many companies.',
          
          '**Miro/FigJam**: Collaborative whiteboarding. Great for brainstorming, user journey mapping, workshops. Sticky notes, diagrams, voting. Remote-friendly. Helps teams ideate together.',
          
          '**UsabilityHub/Maze**: User testing platforms. Get feedback on designs from real users. Run preference tests, first-click tests, navigation tests. Quantitative data on design effectiveness.'
        ],
        
        realWorld: [
          '**E-commerce Checkout Redesign**: Reduce cart abandonment by simplifying checkout. Research why users abandon (unexpected costs, complex forms, lack of trust). Design streamlined flow: guest checkout, progress indicator, clear CTAs, multiple payment options. Test with users and measure conversion rate improvement.',
          
          '**Mobile Banking App**: Design secure, easy-to-use banking app. Key features: account overview, quick transfers, bill payments, transaction history. Challenges: balance security with convenience, design for various tech literacy levels, handle errors gracefully (network issues, insufficient funds).',
          
          '**Healthcare Patient Portal**: Design portal for patients to view records, book appointments, message doctors. Research patient needs and pain points. Ensure accessibility (many users are elderly). Simplify medical jargon. Design for stressful contexts (people use when sick).',
          
          '**SaaS Dashboard**: Design dashboard for business software. Show key metrics at a glance. Allow customization. Design for power users (keyboard shortcuts, bulk actions) and beginners (onboarding, tooltips). Handle large datasets with filters and search.',
          
          '**Social Media Feature**: Design new feature for existing social platform. Research user needs, competitive analysis, define success metrics. Create user flows, wireframes, high-fidelity mockups. Test with users, iterate based on feedback. Work with PM and engineers to ship.'
        ],
        
        explanations: [
          '**Design Thinking Process**: 1) Empathize (understand users), 2) Define (frame the problem), 3) Ideate (brainstorm solutions), 4) Prototype (build quick mockups), 5) Test (get user feedback), 6) Iterate (refine based on learnings). Non-linear - you\'ll loop back as you learn.',
          
          '**Gestalt Principles**: How humans perceive visual elements. Proximity (close items are related), Similarity (similar items are grouped), Closure (we complete incomplete shapes), Continuity (we follow lines), Figure-Ground (we distinguish objects from background). Use these to create intuitive designs.',
          
          '**Hick\'s Law**: More choices = longer decision time. Reduce cognitive load by limiting options. Use progressive disclosure (show advanced options only when needed). Group related options. Provide defaults.',
          
          '**Fitts\'s Law**: Time to reach a target depends on size and distance. Make important buttons larger and closer. Put related actions near each other. Consider thumb zones on mobile (bottom corners easiest to reach).',
          
          '**Accessibility (WCAG)**: Design for people with disabilities. Ensure sufficient color contrast (4.5:1 for text). Support keyboard navigation. Provide alt text for images. Don\'t rely on color alone to convey information. Design for screen readers. Benefits everyone, not just disabled users.'
        ]
      },
      
      advanced: {
        industryPractices: [
          '**Design Ops**: Streamline design processes. Establish workflows, maintain design systems, manage tools and licenses, facilitate collaboration. Scale design team efficiency. Create templates, automate repetitive tasks, document processes.',
          
          '**Metrics-Driven Design**: Define success metrics before designing. Track task completion rate, time on task, error rate, satisfaction scores, conversion rate. Use analytics to identify problems. A/B test design changes. Make data-informed decisions.',
          
          '**Inclusive Design**: Design for diverse users - different abilities, ages, cultures, languages, devices, contexts. Consider edge cases. Test with diverse user groups. Avoid assumptions. Design flexibility (users can customize).',
          
          '**Design Critique**: Give and receive constructive feedback. Focus on problems, not solutions. Ask questions to understand intent. Be specific ("This button is hard to see" vs "I don\'t like it"). Separate personal preference from user needs.',
          
          '**Stakeholder Management**: Align design with business goals. Communicate design value to executives. Navigate conflicting requirements. Build trust through transparency. Educate stakeholders on UX process. Get buy-in for user research.'
        ],
        
        realProjects: [
          '**Complete Product Redesign**: Lead redesign of existing product. Conduct user research (interviews, surveys, analytics). Identify pain points and opportunities. Create new information architecture. Design new visual language. Build design system. Create high-fidelity prototypes. Conduct usability testing. Work with engineers on implementation. Measure impact post-launch.',
          
          '**Design System Creation**: Build comprehensive design system from scratch. Audit existing designs for patterns. Define design principles. Create component library (buttons, forms, cards, navigation). Document usage guidelines. Build Figma library with variants and auto-layout. Create code components with developers. Ensure accessibility. Maintain and evolve system.',
          
          '**0-to-1 Product Design**: Design new product from concept to launch. Conduct market research and competitive analysis. Define target users and use cases. Create user personas and journey maps. Ideate solutions. Design and test multiple concepts. Refine based on feedback. Create detailed specifications for development. Support implementation. Plan post-launch improvements.',
          
          '**Enterprise Software UX**: Design complex software for business users. Handle intricate workflows, large datasets, power user features. Balance flexibility with simplicity. Design for long sessions (reduce eye strain, provide shortcuts). Create comprehensive onboarding. Design for collaboration (multiple users, permissions, version control).',
          
          '**Cross-Platform Experience**: Design consistent experience across web, iOS, Android, tablet. Respect platform conventions while maintaining brand. Adapt layouts for different screen sizes. Design for different input methods (mouse, touch, keyboard). Ensure feature parity where appropriate.'
        ],
        
        advancedTools: [
          '**Principle/ProtoPie**: Advanced prototyping tools. Create complex animations and interactions. Test realistic prototypes on devices. Useful for demonstrating micro-interactions and transitions.',
          
          '**Zeplin/Avocode**: Design handoff tools. Generate specs for developers (spacing, colors, fonts). Export assets. Inspect designs. Streamline designer-developer collaboration.',
          
          '**Hotjar/FullStory**: User behavior analytics. Session recordings show how users actually interact with product. Heatmaps show where users click. Identify usability issues at scale.',
          
          '**Optimal Workshop**: Information architecture testing. Card sorting (how users group content), tree testing (can users find content in navigation), first-click testing. Validate IA decisions with data.',
          
          '**Dovetail/Airtable**: User research repositories. Store interview notes, insights, quotes. Tag and analyze qualitative data. Share findings with team. Build institutional knowledge.'
        ],
        
        careerGrowth: [
          '**Junior → Mid-Level (2-3 years)**: Master design tools, conduct user research independently, design complete features, collaborate effectively with engineers and PMs, build portfolio. Salary: ₹3-6 LPA → ₹6-12 LPA.',
          
          '**Mid-Level → Senior (3-5 years)**: Lead design projects, mentor junior designers, contribute to design system, influence product strategy, present to stakeholders, balance user needs with business goals. Salary: ₹12-20 LPA.',
          
          '**Senior → Lead/Principal (5-8 years)**: Set design vision, lead multiple projects, establish design processes, hire and grow team, partner with leadership, drive design culture. Salary: ₹20-35 LPA.',
          
          '**Specialization Paths**: UX Researcher (focus on user research), Interaction Designer (focus on micro-interactions), Design Systems Designer (build and maintain systems), Content Designer (focus on UX writing), Service Designer (design end-to-end services).',
          
          '**Management Track**: Senior Designer → Design Manager → Design Director → VP of Design → Chief Design Officer. Lead teams (5-50+ designers), set strategy, manage budgets, hire talent, represent design in leadership. Salary: ₹25 LPA - ₹80 LPA+.'
        ]
      }
    },
    
    practiceChallenges: [
      {
        title: 'Redesign a Signup Flow',
        description: 'Improve the user experience of a complex signup process',
        difficulty: 'easy',
        timeEstimate: '45 minutes',
        tasks: [
          'Analyze current signup flow and identify pain points',
          'Reduce number of required fields',
          'Create clear, helpful error messages',
          'Design progress indicator for multi-step form',
          'Add social login options',
          'Create wireframes in Figma'
        ],
        hints: [
          'Ask only essential information upfront',
          'Use inline validation for immediate feedback',
          'Show password strength indicator',
          'Explain why you need each piece of information'
        ]
      },
      {
        title: 'Design a Mobile App Screen',
        description: 'Create a high-fidelity mockup for a food delivery app',
        difficulty: 'medium',
        timeEstimate: '1 hour',
        tasks: [
          'Design restaurant listing screen with filters',
          'Create card design for each restaurant',
          'Design search and filter interface',
          'Add visual hierarchy (featured restaurants, ratings)',
          'Ensure thumb-friendly tap targets',
          'Use consistent spacing and typography'
        ],
        hints: [
          'Use high-quality food images',
          'Show key info: rating, delivery time, cuisine',
          'Make filters easily accessible',
          'Consider loading states and empty states'
        ]
      },
      {
        title: 'Create a Design System Component',
        description: 'Build a reusable button component with variants',
        difficulty: 'medium',
        timeEstimate: '1 hour',
        tasks: [
          'Design button variants: primary, secondary, outline, text',
          'Create size variants: small, medium, large',
          'Design states: default, hover, active, disabled, loading',
          'Add icon support (left icon, right icon, icon only)',
          'Document usage guidelines',
          'Build as Figma component with variants'
        ],
        hints: [
          'Ensure sufficient color contrast for accessibility',
          'Use consistent padding and border radius',
          'Loading state should show spinner',
          'Disabled state should be visually distinct'
        ]
      },
      {
        title: 'User Flow Diagram',
        description: 'Map the complete user journey for booking a hotel',
        difficulty: 'hard',
        timeEstimate: '1.5 hours',
        tasks: [
          'Identify all steps from search to confirmation',
          'Show decision points and alternate paths',
          'Include error states and edge cases',
          'Highlight pain points and opportunities',
          'Create visual diagram in Miro or Figma',
          'Add annotations explaining each step'
        ],
        hints: [
          'Consider: search, filters, hotel details, room selection, guest info, payment, confirmation',
          'What if no results? What if payment fails?',
          'Show where users might abandon',
          'Include post-booking experience (confirmation email, cancellation)'
        ]
      }
    ],
    
    hackathonChallenges: [
      {
        title: 'Redesign a Checkout Experience',
        description: 'Improve conversion rate for an e-commerce checkout',
        timeLimit: 60,
        requirements: [
          'Simplify form fields and reduce steps',
          'Add guest checkout option',
          'Show clear progress indicator',
          'Design trust signals (security badges, return policy)',
          'Create mobile-optimized version',
          'Present before/after comparison'
        ]
      },
      {
        title: 'Design a Dashboard',
        description: 'Create an analytics dashboard for business users',
        timeLimit: 90,
        requirements: [
          'Show key metrics at a glance',
          'Design data visualizations (charts, graphs)',
          'Add filters and date range selector',
          'Create responsive layout',
          'Design empty states and loading states',
          'Ensure information hierarchy'
        ]
      },
      {
        title: 'Complete App Design',
        description: 'Design a fitness tracking mobile app',
        timeLimit: 120,
        requirements: [
          'Create user flows for key features',
          'Design 5-7 main screens',
          'Build interactive prototype',
          'Include onboarding flow',
          'Design consistent visual language',
          'Present design rationale'
        ]
      }
    ],
    
    videos: [
      {
        title: 'UI/UX Design Course For Beginners',
        videoId: 'pyQAiRuqUSM',
        duration: '1:45:30',
        description: 'Comprehensive beginner course covering UI/UX fundamentals, design principles, user research, wireframing, and prototyping. Perfect starting point for aspiring designers.'
      },
      {
        title: 'UI UX Design Roadmap 2026',
        videoId: 'G0xCiXihUGQ',
        duration: '18:45',
        description: 'Complete learning path from beginner to professional UX designer. Covers essential skills, tools, portfolio building, and career guidance for 2026.'
      },
      {
        title: 'Day in the Life of a UX Designer',
        videoId: 'gEYq6GFAFCs',
        duration: '12:20',
        description: 'Real-world view of UX designer daily work - user research, wireframing, prototyping, testing, and collaboration with cross-functional teams.'
      },
      {
        title: 'UX Case Study Walkthrough',
        videoId: 'JhlCgYAoTec',
        duration: '22:15',
        description: 'Professional UX case study presentation showing research methods, problem-solving process, design decisions, and how to present your work effectively.'
      },
      {
        title: 'Figma Tutorial for Beginners - Complete Course',
        videoId: 'jwCmIBJ8Jtc',
        duration: '2:34:26',
        description: 'Master Figma, the industry-standard design tool. Learn to create wireframes, mockups, prototypes, and design systems from scratch.'
      },
      {
        title: 'Design System Tutorial - Build from Scratch',
        videoId: 'wc5krC28ynQ',
        duration: '45:33',
        description: 'Create a complete design system with reusable components, color schemes, typography, and documentation. Essential for consistent design.'
      }
    ],
    
    roadmap: [
      {
        stage: 'Design Fundamentals',
        icon: 'Palette',
        duration: '1-2 months',
        skills: ['Visual design basics', 'Color theory', 'Typography', 'Layout principles', 'Figma basics'],
        tools: ['Figma', 'Adobe XD', 'Sketch'],
        outcome: 'Create clean, professional designs'
      },
      {
        stage: 'UX Principles',
        icon: 'Users',
        duration: '2-3 months',
        skills: ['User research', 'Personas', 'User flows', 'Wireframing', 'Information architecture'],
        tools: ['Miro', 'FigJam', 'Optimal Workshop'],
        outcome: 'Design user-centered experiences'
      },
      {
        stage: 'Interaction Design',
        icon: 'Zap',
        duration: '2-3 months',
        skills: ['Prototyping', 'Micro-interactions', 'Animation', 'Usability testing', 'Accessibility'],
        tools: ['Figma prototyping', 'Principle', 'ProtoPie'],
        outcome: 'Create interactive, accessible prototypes'
      },
      {
        stage: 'Advanced Skills',
        icon: 'Layers',
        duration: '3-4 months',
        skills: ['Design systems', 'Design ops', 'Metrics & analytics', 'Stakeholder management'],
        tools: ['Design systems', 'Hotjar', 'Google Analytics'],
        outcome: 'Lead design projects and build systems'
      },
      {
        stage: 'Job Ready',
        icon: 'Briefcase',
        duration: '2-3 months',
        skills: ['Portfolio creation', 'Case studies', 'Presentation skills', 'Interview prep'],
        tools: ['Portfolio websites', 'Behance', 'Dribbble'],
        outcome: 'Land UX designer job with strong portfolio'
      }
    ],
    
    salary: {
      entry: '₹3-7 LPA',
      mid: '₹7-18 LPA',
      senior: '₹18-40+ LPA'
    }
  }
};
