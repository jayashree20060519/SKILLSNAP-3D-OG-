import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code, Briefcase, DollarSign, ExternalLink, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CareerRole {
  id: string;
  title: string;
  description: string;
  why: string[];
  where: string[];
  skills: string[];
  tools: string[];
  roadmap: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  workflow: string[];
  salary: {
    entry: string;
    mid: string;
    senior: string;
  };
  videos: Array<{
    title: string;
    videoId: string;
  }>;
  resources: Array<{
    name: string;
    url: string;
  }>;
}

const careerData: Record<string, CareerRole> = {
  'software-engineer': {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Software Engineers design, develop, test, and maintain software applications and systems. They work across the full software development lifecycle, from gathering requirements to deployment and maintenance. Software engineers solve complex problems using programming languages, frameworks, and tools to create efficient, scalable, and user-friendly solutions.',
    why: [
      'High demand across all industries - every company needs software',
      'Excellent salary potential with strong career growth',
      'Creative problem-solving and building tangible products',
      'Remote work opportunities and flexible schedules',
      'Continuous learning and working with cutting-edge technologies',
      'Ability to make real-world impact through technology',
      'Strong job security and multiple career paths',
      'Collaborative environment with talented professionals'
    ],
    where: [
      'Tech Companies - Google, Microsoft, Amazon, Meta, Apple',
      'Startups - Fast-paced environment with diverse responsibilities',
      'Financial Services - Banks, fintech companies, trading firms',
      'Healthcare - Medical software, health tech, telemedicine',
      'E-commerce - Online retail platforms and marketplaces',
      'Gaming Industry - Game development studios',
      'Consulting Firms - Accenture, Deloitte, IBM',
      'Freelance/Contract - Independent projects and consulting'
    ],
    skills: [
      'Programming Languages (Python, JavaScript, Java, C++)',
      'Data Structures and Algorithms',
      'Object-Oriented Programming (OOP)',
      'Database Management (SQL, NoSQL)',
      'Version Control (Git, GitHub)',
      'Web Development (HTML, CSS, React, Node.js)',
      'API Design and Integration',
      'Testing and Debugging',
      'Problem-Solving and Analytical Thinking',
      'Communication and Teamwork',
      'Agile/Scrum Methodologies',
      'Cloud Platforms (AWS, Azure, GCP)'
    ],
    tools: [
      'IDEs: VS Code, IntelliJ IDEA, PyCharm',
      'Version Control: Git, GitHub, GitLab',
      'Databases: PostgreSQL, MongoDB, MySQL',
      'Frameworks: React, Angular, Django, Spring Boot',
      'Cloud: AWS, Azure, Google Cloud',
      'DevOps: Docker, Kubernetes, Jenkins',
      'Testing: Jest, Pytest, Selenium',
      'Project Management: Jira, Trello, Asana'
    ],
    roadmap: {
      beginner: [
        'Learn programming fundamentals with Python or JavaScript',
        'Master HTML, CSS, and basic web development',
        'Understand data structures (arrays, linked lists, stacks, queues)',
        'Learn basic algorithms (sorting, searching)',
        'Practice on coding platforms (LeetCode, HackerRank)',
        'Build simple projects (calculator, to-do list, portfolio website)',
        'Learn Git and GitHub for version control',
        'Understand basic database concepts and SQL'
      ],
      intermediate: [
        'Master a backend framework (Node.js/Express, Django, Spring)',
        'Learn a frontend framework (React, Vue, or Angular)',
        'Study advanced data structures (trees, graphs, heaps)',
        'Practice algorithm problems (medium difficulty)',
        'Build full-stack projects (blog, e-commerce site)',
        'Learn RESTful API design and implementation',
        'Understand authentication and authorization',
        'Deploy applications to cloud platforms',
        'Learn testing (unit tests, integration tests)',
        'Contribute to open-source projects'
      ],
      advanced: [
        'Master system design and architecture patterns',
        'Learn microservices architecture',
        'Study distributed systems and scalability',
        'Practice advanced algorithms and competitive programming',
        'Understand DevOps and CI/CD pipelines',
        'Learn containerization (Docker) and orchestration (Kubernetes)',
        'Master cloud architecture (AWS/Azure/GCP)',
        'Study security best practices and implementation',
        'Lead technical projects and mentor junior developers',
        'Contribute to technical decision-making and architecture'
      ]
    },
    workflow: [
      '1. Requirements Gathering - Meet with stakeholders to understand project needs',
      '2. Design - Create technical specifications and architecture diagrams',
      '3. Development - Write clean, efficient, and maintainable code',
      '4. Code Review - Review peers\' code and get feedback on your code',
      '5. Testing - Write and run unit tests, integration tests, and end-to-end tests',
      '6. Debugging - Identify and fix bugs in the codebase',
      '7. Documentation - Document code, APIs, and system architecture',
      '8. Deployment - Deploy code to staging and production environments',
      '9. Monitoring - Monitor application performance and user feedback',
      '10. Maintenance - Fix bugs, add features, and optimize performance'
    ],
    salary: {
      entry: '₹4 LPA - ₹8 LPA',
      mid: '₹8 LPA - ₹15 LPA',
      senior: '₹15 LPA - ₹50+ LPA'
    },
    videos: [
      {
        title: 'Software Engineering Complete Course 2026',
        videoId: 'zOjov-2OZ0E'
      },
      {
        title: 'Day in the Life of a Software Engineer',
        videoId: 'yIPbE7BssOs'
      },
      {
        title: 'How to Become a Software Engineer in 2026',
        videoId: 'sIkNWdiQPAU'
      }
    ],
    resources: [
      { name: 'GeeksforGeeks - Data Structures', url: 'https://www.geeksforgeeks.org/data-structures/' },
      { name: 'W3Schools - Web Development', url: 'https://www.w3schools.com/' },
      { name: 'FreeCodeCamp - Full Stack', url: 'https://www.freecodecamp.org/' },
      { name: 'LeetCode - Coding Practice', url: 'https://leetcode.com/' },
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
      { name: 'GitHub - Open Source', url: 'https://github.com/explore' }
    ]
  },
  'data-analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Data Analysts collect, process, and analyze data to help organizations make informed business decisions. They work with large datasets, create visualizations, generate reports, and identify trends and patterns. Data analysts bridge the gap between raw data and actionable business insights.',
    why: [
      'High demand across all industries for data-driven decision making',
      'Excellent career growth with clear progression to senior roles',
      'Directly impact business strategy and outcomes',
      'Work with cutting-edge analytics tools and technologies',
      'Combination of technical and business skills',
      'Competitive salaries with strong job security',
      'Opportunities in diverse industries and domains',
      'Remote work friendly with flexible arrangements'
    ],
    where: [
      'Tech Companies - Analytics teams at Google, Meta, Amazon',
      'Financial Services - Banks, investment firms, insurance companies',
      'Healthcare - Hospital systems, pharmaceutical companies',
      'Retail & E-commerce - Amazon, Walmart, Target',
      'Consulting Firms - McKinsey, BCG, Deloitte Analytics',
      'Marketing Agencies - Digital marketing and advertising firms',
      'Government - Public sector data analysis and policy',
      'Startups - Growth analytics and business intelligence'
    ],
    skills: [
      'SQL and Database Querying',
      'Excel and Spreadsheet Analysis',
      'Statistical Analysis and Mathematics',
      'Data Visualization (Tableau, Power BI)',
      'Python for Data Analysis (Pandas, NumPy)',
      'R Programming',
      'Business Intelligence Tools',
      'Data Cleaning and Preprocessing',
      'Critical Thinking and Problem Solving',
      'Communication and Storytelling with Data',
      'Domain Knowledge and Business Acumen',
      'A/B Testing and Experimentation'
    ],
    tools: [
      'SQL: PostgreSQL, MySQL, SQL Server',
      'Visualization: Tableau, Power BI, Looker',
      'Programming: Python, R',
      'Spreadsheets: Excel, Google Sheets',
      'BI Tools: Metabase, Redash',
      'Cloud: AWS, Google BigQuery, Snowflake',
      'Version Control: Git, GitHub',
      'Collaboration: Slack, Notion, Confluence'
    ],
    roadmap: {
      beginner: [
        'Master Excel fundamentals and advanced formulas',
        'Learn SQL basics and database concepts',
        'Understand descriptive statistics and probability',
        'Practice data cleaning and preprocessing',
        'Create basic charts and visualizations',
        'Learn Python basics and Pandas library',
        'Work on small datasets and practice analysis',
        'Build a portfolio with simple projects'
      ],
      intermediate: [
        'Master advanced SQL (joins, subqueries, window functions)',
        'Learn data visualization tools (Tableau or Power BI)',
        'Study inferential statistics and hypothesis testing',
        'Practice Python for data analysis (Pandas, NumPy, Matplotlib)',
        'Learn A/B testing and experimentation',
        'Work on real-world datasets and case studies',
        'Create interactive dashboards and reports',
        'Understand business metrics and KPIs',
        'Learn data storytelling and presentation skills'
      ],
      advanced: [
        'Master advanced analytics techniques',
        'Learn machine learning basics for predictive analytics',
        'Study advanced statistical methods',
        'Work with big data tools (Spark, Hadoop)',
        'Master cloud data platforms (AWS, GCP, Azure)',
        'Lead analytics projects and mentor junior analysts',
        'Develop domain expertise in specific industries',
        'Create automated reporting and ETL pipelines',
        'Contribute to data strategy and governance',
        'Present insights to C-level executives'
      ]
    },
    workflow: [
      '1. Define Problem - Understand business questions and objectives',
      '2. Data Collection - Gather data from databases, APIs, and other sources',
      '3. Data Cleaning - Handle missing values, outliers, and inconsistencies',
      '4. Exploratory Analysis - Discover patterns, trends, and relationships',
      '5. Statistical Analysis - Apply statistical methods to validate findings',
      '6. Visualization - Create charts, graphs, and dashboards',
      '7. Interpretation - Draw insights and conclusions from data',
      '8. Reporting - Present findings to stakeholders',
      '9. Recommendations - Suggest actionable business strategies',
      '10. Monitoring - Track metrics and update analyses regularly'
    ],
    salary: {
      entry: '₹3 LPA - ₹6 LPA',
      mid: '₹6 LPA - ₹12 LPA',
      senior: '₹12 LPA - ₹30+ LPA'
    },
    videos: [
      {
        title: 'What Does a Data Analyst Actually Do?',
        videoId: 'yZvFH7B6gKI'
      },
      {
        title: 'Data Analyst Roadmap 2026',
        videoId: '9kPxqzlqKhs'
      },
      {
        title: 'Day in the Life of a Data Analyst',
        videoId: 'Jw5bAh0WFAQ'
      }
    ],
    resources: [
      { name: 'GeeksforGeeks - SQL Tutorial', url: 'https://www.geeksforgeeks.org/sql-tutorial/' },
      { name: 'W3Schools - SQL', url: 'https://www.w3schools.com/sql/' },
      { name: 'FreeCodeCamp - Data Analysis', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/' },
      { name: 'Kaggle - Datasets & Competitions', url: 'https://www.kaggle.com/' },
      { name: 'Mode Analytics - SQL Tutorial', url: 'https://mode.com/sql-tutorial/' },
      { name: 'Tableau Public - Learn Viz', url: 'https://public.tableau.com/' }
    ]
  },
  'full-stack-developer': {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    description: 'Full Stack Developers are versatile engineers who work on both frontend (client-side) and backend (server-side) of web applications. They handle everything from user interface design to database management, API development, and deployment. Full stack developers are the Swiss Army knives of software development, capable of building complete web applications from scratch.',
    why: [
      'Highest demand in tech industry - every startup needs full stack developers',
      'Complete ownership of projects from idea to deployment',
      'Excellent salary potential with rapid career growth',
      'Flexibility to work on diverse technologies and frameworks',
      'Strong freelancing opportunities with high hourly rates',
      'Ability to build your own products and startups',
      'Work on both creative (frontend) and logical (backend) aspects',
      'Remote work friendly with global opportunities'
    ],
    where: [
      'Startups - Build MVPs and scale products rapidly',
      'Tech Giants - Google, Amazon, Microsoft, Meta',
      'E-commerce - Flipkart, Amazon, Shopify',
      'Fintech - Paytm, PhonePe, Razorpay, Stripe',
      'SaaS Companies - Notion, Slack, Zoom, Atlassian',
      'Consulting Firms - TCS, Infosys, Wipro, Accenture',
      'Product Companies - Swiggy, Zomato, Ola, Uber',
      'Freelance/Contract - Build websites and web apps for clients'
    ],
    skills: [
      'Frontend: HTML, CSS, JavaScript, React/Vue/Angular',
      'Backend: Node.js, Python/Django, Java/Spring, PHP',
      'Databases: MongoDB, PostgreSQL, MySQL, Redis',
      'APIs: RESTful APIs, GraphQL',
      'Version Control: Git, GitHub, GitLab',
      'DevOps: Docker, Kubernetes, CI/CD',
      'Cloud: AWS, Azure, Google Cloud',
      'Authentication: JWT, OAuth, Session Management',
      'Testing: Jest, Mocha, Pytest, Selenium',
      'UI/UX Design Principles',
      'Problem Solving and Debugging',
      'Agile/Scrum Methodologies'
    ],
    tools: [
      'Frontend: React, Next.js, Tailwind CSS, TypeScript',
      'Backend: Node.js/Express, Django, Spring Boot',
      'Databases: MongoDB, PostgreSQL, Supabase, Firebase',
      'IDEs: VS Code, WebStorm, IntelliJ IDEA',
      'Version Control: Git, GitHub, GitLab',
      'Cloud: AWS, Vercel, Netlify, Heroku',
      'DevOps: Docker, Kubernetes, Jenkins, GitHub Actions',
      'Testing: Jest, Cypress, Postman'
    ],
    roadmap: {
      beginner: [
        'Master HTML, CSS, and JavaScript fundamentals',
        'Learn responsive design with Flexbox and Grid',
        'Build static websites and landing pages',
        'Learn Git and GitHub for version control',
        'Understand how the internet works (HTTP, DNS, browsers)',
        'Learn a CSS framework (Bootstrap or Tailwind CSS)',
        'Build 5-10 frontend projects (portfolio, calculator, to-do app)',
        'Learn basic command line and terminal usage'
      ],
      intermediate: [
        'Master React.js or Vue.js for frontend development',
        'Learn Node.js and Express.js for backend',
        'Understand RESTful API design and implementation',
        'Learn database fundamentals (SQL and NoSQL)',
        'Build full-stack projects (blog, e-commerce, social media)',
        'Learn authentication and authorization (JWT, OAuth)',
        'Understand state management (Redux, Context API)',
        'Deploy applications to cloud platforms (Vercel, Netlify, Heroku)',
        'Learn testing (unit tests, integration tests)',
        'Contribute to open-source projects'
      ],
      advanced: [
        'Master advanced React patterns (hooks, context, performance)',
        'Learn Next.js for server-side rendering and SEO',
        'Study microservices architecture and design patterns',
        'Master database optimization and indexing',
        'Learn DevOps: Docker, Kubernetes, CI/CD pipelines',
        'Understand system design and scalability',
        'Learn GraphQL for efficient data fetching',
        'Master cloud services (AWS Lambda, S3, EC2, RDS)',
        'Implement real-time features (WebSockets, Socket.io)',
        'Lead technical projects and mentor junior developers'
      ]
    },
    workflow: [
      '1. Requirements Analysis - Understand project requirements and user needs',
      '2. UI/UX Design - Create wireframes and mockups for user interface',
      '3. Frontend Development - Build responsive and interactive user interfaces',
      '4. Backend Development - Create APIs, business logic, and database schemas',
      '5. Database Design - Design efficient database structures and relationships',
      '6. API Integration - Connect frontend with backend APIs',
      '7. Testing - Write and run tests for both frontend and backend',
      '8. Debugging - Fix bugs across the entire stack',
      '9. Deployment - Deploy application to production servers',
      '10. Monitoring & Maintenance - Monitor performance and fix issues'
    ],
    salary: {
      entry: '₹3.5 LPA - ₹7 LPA',
      mid: '₹7 LPA - ₹18 LPA',
      senior: '₹18 LPA - ₹60+ LPA'
    },
    videos: [
      {
        title: 'Full Stack Development Complete Course 2026',
        videoId: 'nu_pCVPKzTk'
      },
      {
        title: 'MERN Stack Tutorial for Beginners',
        videoId: 'O3BUHwfHf84'
      },
      {
        title: 'How to Become a Full Stack Developer in 2026',
        videoId: 'WG5ikvJ2TKA'
      }
    ],
    resources: [
      { name: 'FreeCodeCamp - Full Stack', url: 'https://www.freecodecamp.org/' },
      { name: 'The Odin Project', url: 'https://www.theodinproject.com/' },
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
      { name: 'React Documentation', url: 'https://react.dev/' },
      { name: 'Node.js Documentation', url: 'https://nodejs.org/docs/' },
      { name: 'Full Stack Open', url: 'https://fullstackopen.com/' }
    ]
  },
  'ux-designer': {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'UX (User Experience) Designers create intuitive, accessible, and delightful digital experiences. They research user needs, design interfaces, create prototypes, and test solutions to ensure products are user-friendly and meet business goals. UX designers bridge the gap between users and technology.',
    why: [
      'High demand as companies prioritize user experience',
      'Creative and impactful work that directly affects users',
      'Excellent salary potential (₹4-25+ LPA in India)',
      'Combination of creativity, psychology, and technology',
      'Remote work friendly with global opportunities',
      'Work on diverse projects across industries',
      'Strong freelancing and consulting opportunities',
      'Essential role in product development teams'
    ],
    where: [
      'Tech Companies - Google, Microsoft, Amazon, Adobe',
      'Product Companies - Swiggy, Zomato, Paytm, PhonePe',
      'Design Agencies - IDEO, Frog Design, R/GA',
      'Startups - Fast-paced environment with diverse projects',
      'E-commerce - Flipkart, Amazon, Myntra',
      'Fintech - Banking apps, payment platforms',
      'SaaS Companies - Notion, Slack, Zoom, Atlassian',
      'Freelance/Contract - Design websites and apps for clients'
    ],
    skills: [
      'User Research and Testing',
      'Wireframing and Prototyping',
      'UI Design Principles',
      'Information Architecture',
      'Interaction Design',
      'Usability Testing',
      'Design Thinking',
      'Visual Design',
      'Accessibility (WCAG)',
      'Communication and Presentation',
      'Empathy and User Psychology',
      'Collaboration with Developers'
    ],
    tools: [
      'Design: Figma, Adobe XD, Sketch',
      'Prototyping: Figma, InVision, Framer',
      'Research: UserTesting, Hotjar, Google Analytics',
      'Wireframing: Balsamiq, Whimsical, Miro',
      'Collaboration: FigJam, Miro, Notion',
      'Graphics: Adobe Illustrator, Photoshop',
      'Handoff: Zeplin, Figma Dev Mode',
      'Testing: Maze, Optimal Workshop'
    ],
    roadmap: {
      beginner: [
        'Learn UX fundamentals and design thinking process',
        'Study UI design principles (typography, color, layout)',
        'Master Figma or Adobe XD for design',
        'Understand user research methods',
        'Learn wireframing and low-fidelity prototyping',
        'Study information architecture basics',
        'Build 3-5 simple UI designs (mobile app screens)',
        'Learn basic HTML/CSS to understand development'
      ],
      intermediate: [
        'Master high-fidelity prototyping in Figma',
        'Conduct user research and usability testing',
        'Learn interaction design and micro-interactions',
        'Study accessibility guidelines (WCAG)',
        'Build complete app/website designs (case studies)',
        'Learn design systems and component libraries',
        'Practice presenting and defending design decisions',
        'Collaborate with developers on real projects',
        'Build a strong portfolio with 5-8 projects',
        'Contribute to design communities and get feedback'
      ],
      advanced: [
        'Master advanced prototyping and animations',
        'Lead end-to-end UX projects',
        'Conduct advanced user research (ethnography, A/B testing)',
        'Create and maintain design systems',
        'Learn product strategy and business metrics',
        'Mentor junior designers',
        'Specialize in an area (mobile, web, AR/VR, voice)',
        'Understand front-end development deeply',
        'Lead design workshops and design sprints',
        'Contribute to UX strategy and product vision'
      ]
    },
    workflow: [
      '1. Research - Understand users, competitors, and business goals',
      '2. Define - Create user personas, user journeys, and problem statements',
      '3. Ideate - Brainstorm solutions and sketch initial concepts',
      '4. Wireframe - Create low-fidelity layouts and information architecture',
      '5. Prototype - Build interactive prototypes for testing',
      '6. Test - Conduct usability testing with real users',
      '7. Iterate - Refine designs based on feedback',
      '8. Design - Create high-fidelity UI designs',
      '9. Handoff - Prepare assets and specifications for developers',
      '10. Validate - Test implemented designs and gather user feedback'
    ],
    salary: {
      entry: '₹3 LPA - ₹6 LPA',
      mid: '₹6 LPA - ₹15 LPA',
      senior: '₹15 LPA - ₹35+ LPA'
    },
    videos: [
      {
        title: 'UX Design Full Course 2026',
        videoId: 'uL2ZB7XXIgg'
      },
      {
        title: 'UI/UX Design Tutorial for Beginners',
        videoId: 'c9Wg6Cb_YlU'
      },
      {
        title: 'How to Become a UX Designer in 2026',
        videoId: 'cKZEgtQUxlU'
      }
    ],
    resources: [
      { name: 'Nielsen Norman Group', url: 'https://www.nngroup.com/' },
      { name: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/' },
      { name: 'Figma Learn', url: 'https://www.figma.com/resources/learn-design/' },
      { name: 'Laws of UX', url: 'https://lawsofux.com/' },
      { name: 'UX Design Institute', url: 'https://www.uxdesigninstitute.com/' },
      { name: 'Dribbble - Design Inspiration', url: 'https://dribbble.com/' }
    ]
  }
};

export default function CareerRolePage() {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();

  const role = roleId ? careerData[roleId] : null;

  if (!role) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card3D className="text-center py-12">
            <p className="text-muted-foreground">Career role not found</p>
            <Button onClick={() => navigate('/career')} className="mt-4">
              Back to Career Hub
            </Button>
          </Card3D>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/career')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Career Hub
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">{role.title}</h1>
          <p className="text-muted-foreground text-lg">{role.description}</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-card w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Why Learn This */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                Why Learn {role.title}?
              </h2>
              <ul className="space-y-2">
                {role.why.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </Card3D>

            {/* Where to Work */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-secondary" />
                Where Can You Work?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {role.where.map((place, index) => (
                  <div key={index} className="p-3 bg-accent rounded-lg">
                    <p className="text-sm">{place}</p>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Skills Required */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </Card3D>

            {/* Tools & Technologies */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">Tools & Technologies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {role.tools.map((tool, index) => (
                  <div key={index} className="p-2 border rounded-lg text-sm">
                    {tool}
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Workflow */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">Real-World Workflow</h2>
              <div className="space-y-2">
                {role.workflow.map((step, index) => (
                  <div key={index} className="p-3 bg-accent rounded-lg">
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Salary Overview */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-500" />
                Salary Overview (Indian Market)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-500/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Entry Level</p>
                  <p className="text-xl font-bold text-green-600">{role.salary.entry}</p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Mid Level</p>
                  <p className="text-xl font-bold text-blue-600">{role.salary.mid}</p>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Senior Level</p>
                  <p className="text-xl font-bold text-purple-600">{role.salary.senior}</p>
                </div>
              </div>
            </Card3D>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            {/* Beginner */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 text-green-600">🌱 Beginner Level</h2>
              <div className="space-y-2">
                {role.roadmap.beginner.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-500/5 rounded-lg">
                    <span className="text-green-600 font-bold">{index + 1}.</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Intermediate */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 text-blue-600">🚀 Intermediate Level</h2>
              <div className="space-y-2">
                {role.roadmap.intermediate.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-lg">
                    <span className="text-blue-600 font-bold">{index + 1}.</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Advanced */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 text-purple-600">⭐ Advanced Level</h2>
              <div className="space-y-2">
                {role.roadmap.advanced.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-purple-500/5 rounded-lg">
                    <span className="text-purple-600 font-bold">{index + 1}.</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card3D>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            {/* Learning Videos */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Play className="h-6 w-6 text-red-500" />
                Learning Videos
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {role.videos.map((video, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-semibold">{video.title}</h3>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* External Resources */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ExternalLink className="h-6 w-6 text-primary" />
                External Learning Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {role.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border rounded-lg hover:bg-accent transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium">{resource.name}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </Card3D>

            {/* Call to Action */}
            <Card3D hover={false} className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Ready to Start Your Journey?</h2>
                <p className="text-muted-foreground">
                  Begin learning today and build your career as a {role.title}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate('/university')}>
                    Start Learning
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/ai-mentor')}>
                    Ask AI Mentor
                  </Button>
                </div>
              </div>
            </Card3D>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
