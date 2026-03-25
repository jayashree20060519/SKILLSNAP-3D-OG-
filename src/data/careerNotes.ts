export interface CareerNotes {
  whatIs: string;
  whyLearn: string;
  realWorld: string;
  requiredSkills: string;
  toolsTech: string;
  dailyLife: string;
  industryDemand: string;
  beginner: {
    title: string;
    description: string;
    concepts: string[];
  };
  intermediate: {
    title: string;
    description: string;
    concepts: string[];
  };
  advanced: {
    title: string;
    description: string;
    concepts: string[];
  };
}

export interface CareerPracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const careerNotesData: Record<string, CareerNotes> = {
  'software-engineer': {
    whatIs: `A Software Engineer is a professional who applies engineering principles to design, develop, test, and maintain software systems. Unlike just "coding," software engineering involves the entire software development lifecycle - from understanding user requirements to deploying and maintaining production systems.

Software engineers solve real-world problems using technology. They write code, but they also design system architectures, collaborate with teams, review code, debug issues, optimize performance, and ensure software quality. They work on everything from mobile apps and websites to operating systems, databases, and artificial intelligence systems.

The role requires both technical skills (programming, algorithms, system design) and soft skills (communication, teamwork, problem-solving). Software engineers are creative problem-solvers who build the digital products and services that power modern life.`,

    whyLearn: `Software Engineering is one of the most rewarding and future-proof careers available today. Here's why you should consider it:

**High Demand**: Every industry needs software - from healthcare and finance to entertainment and transportation. The U.S. Bureau of Labor Statistics projects 22% growth in software development jobs through 2030, much faster than average.

**Excellent Compensation**: Software engineers earn competitive salaries globally. In India, entry-level engineers earn ₹3-8 LPA, mid-level ₹8-20 LPA, and senior engineers ₹20-60+ LPA. In the US, salaries range from $70K to $200K+.

**Creative Problem-Solving**: You get to build things that millions of people use. Whether it's a mobile app, a website, or a complex system, you're creating tangible products that solve real problems.

**Flexibility**: Software engineering offers remote work opportunities, flexible schedules, and the ability to work from anywhere in the world. Many companies offer work-from-home options permanently.

**Continuous Learning**: Technology evolves rapidly, so you're always learning new tools, languages, and frameworks. This keeps the work interesting and intellectually stimulating.

**Multiple Career Paths**: You can specialize in frontend, backend, mobile, DevOps, machine learning, security, or become a tech lead, architect, or CTO. The possibilities are endless.

**Entrepreneurship**: Software engineers have the skills to build their own products and startups. Many successful tech entrepreneurs started as engineers.`,

    realWorld: `Software engineers work on projects that impact millions of lives daily:

**Social Media**: Engineers at Facebook, Instagram, and Twitter build features that connect billions of people worldwide. They handle massive scale - billions of posts, photos, and messages daily.

**E-commerce**: Amazon and Flipkart engineers build recommendation systems, payment processing, inventory management, and delivery tracking systems that handle millions of transactions.

**Healthcare**: Software engineers develop electronic health records, telemedicine platforms, and AI systems that help doctors diagnose diseases and save lives.

**Finance**: Banking apps, payment systems like Paytm and Google Pay, and trading platforms are built by software engineers. They ensure security and handle billions of rupees in transactions.

**Transportation**: Uber, Ola, and Tesla engineers build ride-sharing platforms and autonomous vehicle systems that are revolutionizing transportation.

**Entertainment**: Netflix engineers build streaming systems that deliver 4K video to millions of users simultaneously. Gaming companies create immersive virtual worlds.

**Space Exploration**: SpaceX and NASA engineers write software that controls rockets, satellites, and Mars rovers.

**Education**: EdTech platforms like Coursera, Khan Academy, and Byju's are built by engineers, making education accessible to millions.

Real-world software engineering involves working in teams, using version control (Git), following agile methodologies, writing tests, conducting code reviews, and continuously deploying updates. Engineers collaborate with product managers, designers, and other stakeholders to build products that users love.`,

    requiredSkills: `To become a successful software engineer, you need a combination of technical and soft skills:

**Programming Languages**: Master at least one language deeply (Python, JavaScript, Java, C++, or Go). Understand syntax, data types, control structures, functions, and object-oriented programming.

**Data Structures & Algorithms**: Essential for writing efficient code and passing technical interviews. Learn arrays, linked lists, stacks, queues, trees, graphs, hash tables, sorting algorithms, searching algorithms, and dynamic programming.

**System Design**: Understand how to design scalable, reliable systems. Learn about databases, caching, load balancing, microservices, APIs, and distributed systems.

**Web Development**: For full-stack roles, learn HTML, CSS, JavaScript, React/Angular/Vue for frontend, and Node.js/Django/Spring for backend.

**Databases**: Understand SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases. Learn how to design schemas, write queries, and optimize performance.

**Version Control**: Master Git and GitHub for code collaboration. Learn branching, merging, pull requests, and code reviews.

**Testing**: Write unit tests, integration tests, and end-to-end tests. Learn testing frameworks like Jest, Pytest, or JUnit.

**DevOps Basics**: Understand CI/CD pipelines, Docker containers, cloud platforms (AWS, Azure, GCP), and deployment processes.

**Problem-Solving**: Ability to break down complex problems into smaller, manageable pieces. Practice on LeetCode, HackerRank, and CodeForces.

**Communication**: Explain technical concepts clearly to non-technical stakeholders. Write clear documentation and collaborate effectively with teams.

**Debugging**: Ability to identify and fix bugs efficiently. Learn to use debuggers, read error messages, and trace code execution.

**Continuous Learning**: Technology changes rapidly. Stay updated with new frameworks, tools, and best practices through blogs, courses, and conferences.`,

    toolsTech: `Software engineers use a wide variety of tools and technologies:

**IDEs & Editors**: Visual Studio Code (most popular), IntelliJ IDEA, PyCharm, Sublime Text, Vim. These provide code completion, debugging, and integration with other tools.

**Version Control**: Git (essential), GitHub, GitLab, Bitbucket. Used for code collaboration, version tracking, and code reviews.

**Programming Languages**: 
- Frontend: JavaScript, TypeScript, HTML, CSS
- Backend: Python, Java, C++, Go, Ruby, PHP
- Mobile: Swift (iOS), Kotlin (Android), React Native, Flutter

**Frameworks & Libraries**:
- Frontend: React, Angular, Vue.js, Svelte
- Backend: Node.js/Express, Django, Flask, Spring Boot, Ruby on Rails
- Mobile: React Native, Flutter, SwiftUI

**Databases**:
- SQL: PostgreSQL, MySQL, SQLite, Oracle
- NoSQL: MongoDB, Redis, Cassandra, DynamoDB

**Cloud Platforms**: AWS (most popular), Google Cloud Platform, Microsoft Azure. Services include EC2, S3, Lambda, RDS, and more.

**DevOps Tools**: Docker (containerization), Kubernetes (orchestration), Jenkins (CI/CD), GitHub Actions, Terraform (infrastructure as code).

**Testing Frameworks**: Jest, Mocha, Pytest, JUnit, Selenium, Cypress.

**Project Management**: Jira, Trello, Asana, Linear for tracking tasks and sprints.

**Communication**: Slack, Microsoft Teams, Zoom for team collaboration.

**Monitoring & Logging**: Datadog, New Relic, Sentry, ELK Stack for tracking application performance and errors.

**Design Tools**: Figma, Adobe XD for understanding UI/UX designs.

The specific tools you use depend on your role and company, but Git, an IDE, and a programming language are universal.`,

    dailyLife: `A typical day in the life of a software engineer varies by company and role, but here's a general overview:

**Morning (9:00 AM - 12:00 PM)**:
- Start with a daily standup meeting (15 minutes) where the team shares what they worked on yesterday, what they'll work on today, and any blockers.
- Check emails, Slack messages, and pull requests that need review.
- Review code written by teammates. Provide feedback, suggest improvements, and approve changes.
- Work on assigned tasks from the sprint backlog. This might involve writing new features, fixing bugs, or refactoring code.
- Take short breaks to avoid burnout. Many engineers follow the Pomodoro technique (25 minutes work, 5 minutes break).

**Afternoon (1:00 PM - 5:00 PM)**:
- Continue coding on your tasks. Write clean, well-documented code following team standards.
- Write unit tests for your code to ensure it works correctly and doesn't break in the future.
- Debug issues reported by QA or users. Use debugging tools, logs, and error tracking systems to identify root causes.
- Attend meetings: sprint planning (bi-weekly), retrospectives (bi-weekly), design discussions, or one-on-ones with your manager.
- Collaborate with product managers to understand requirements and with designers to implement UI/UX correctly.

**Evening (5:00 PM - 6:00 PM)**:
- Push your code to GitHub and create a pull request for review.
- Update task status in Jira or your project management tool.
- Document your work - write README files, API documentation, or technical specs.
- Learn something new: read tech blogs, watch tutorials, or work on personal projects.

**Flexible Schedule**: Many tech companies offer flexible hours. You might start at 10 AM or 11 AM, or work from home. Some engineers prefer deep work in the morning, others in the evening.

**Remote Work**: With remote work becoming common, you might work from home, a co-working space, or even while traveling. Communication happens via Slack, Zoom, and GitHub.

**On-Call Rotation**: Some teams have on-call rotations where engineers are responsible for fixing production issues outside work hours. This is usually compensated with extra pay or time off.

**Continuous Learning**: Engineers spend time learning new technologies, attending conferences, or contributing to open-source projects. Companies often provide learning budgets.

The work is intellectually challenging, collaborative, and rewarding. You're constantly solving problems, learning new things, and building products that users love.`,

    industryDemand: `The demand for software engineers is at an all-time high and continues to grow:

**Global Demand**: According to the U.S. Bureau of Labor Statistics, software developer employment is projected to grow 22% from 2020 to 2030, much faster than the average for all occupations. This translates to about 189,200 new jobs annually.

**India's Tech Boom**: India's IT industry employs over 5 million people and is expected to add 1 million jobs by 2026. Companies like TCS, Infosys, Wipro, and startups are constantly hiring.

**Startup Ecosystem**: India has 100+ unicorns (startups valued at $1B+) including Flipkart, Paytm, Ola, Swiggy, and Zomato. These companies are aggressively hiring engineers.

**Remote Opportunities**: With remote work normalized, Indian engineers can work for companies worldwide. Many US and European companies hire Indian engineers for their talent and cost-effectiveness.

**Salary Growth**: Software engineering salaries have grown significantly:
- Entry-level (0-2 years): ₹3-8 LPA
- Mid-level (3-7 years): ₹8-20 LPA
- Senior (8-12 years): ₹20-40 LPA
- Staff/Principal (12+ years): ₹40-60+ LPA
- Top companies (FAANG): ₹30-80+ LPA even for mid-level

**Emerging Technologies**: Demand is especially high for engineers skilled in:
- Cloud Computing (AWS, Azure, GCP)
- Machine Learning & AI
- Blockchain & Web3
- Cybersecurity
- DevOps & Site Reliability Engineering
- Mobile Development (iOS, Android, React Native)
- Full-Stack Development

**Job Security**: Software engineering is one of the most recession-proof careers. Even during economic downturns, companies continue hiring engineers to build and maintain their digital products.

**Global Opportunities**: Software engineers can easily relocate to other countries. The US, Canada, UK, Germany, and Australia actively recruit Indian engineers with visa sponsorships.

**Freelancing & Consulting**: Experienced engineers can earn ₹2,000-10,000+ per hour as freelancers on platforms like Upwork, Toptal, and Freelancer.

**Entrepreneurship**: Many successful startups are founded by engineers who identified problems and built solutions. Examples: WhatsApp (Brian Acton, Jan Koum), Instagram (Kevin Systrom, Mike Krieger).

The demand for software engineers will only increase as more industries digitize, AI becomes mainstream, and new technologies emerge. It's a future-proof career with endless opportunities.`,

    beginner: {
      title: 'Beginner Level (0-6 months)',
      description: 'Build a strong foundation in programming fundamentals, basic data structures, and problem-solving. Focus on writing clean code and understanding core concepts.',
      concepts: [
        '**Programming Basics**: Learn variables, data types (integers, strings, booleans), operators, and input/output. Understand how computers execute code line by line.',
        '**Control Structures**: Master if-else statements for decision-making, loops (for, while) for repetition, and switch statements. Learn when to use each.',
        '**Functions**: Understand how to write reusable code using functions. Learn parameters, return values, and scope. Practice breaking problems into smaller functions.',
        '**Arrays & Lists**: Learn to store multiple values in arrays/lists. Understand indexing, iteration, and common operations like sorting and searching.',
        '**Basic Algorithms**: Implement linear search, binary search, bubble sort, and selection sort. Understand time complexity (O(n), O(log n)).',
        '**Object-Oriented Programming**: Learn classes, objects, inheritance, and encapsulation. Understand how to model real-world entities in code.',
        '**Version Control**: Master Git basics - clone, commit, push, pull, branches. Learn to collaborate using GitHub.',
        '**Web Basics**: Learn HTML for structure, CSS for styling, and basic JavaScript for interactivity. Build simple static websites.',
        '**Problem-Solving**: Practice on HackerRank, LeetCode Easy problems. Focus on understanding problems before coding.',
        '**Projects**: Build a calculator, to-do list app, personal portfolio website, and a simple game (tic-tac-toe, snake).'
      ]
    },

    intermediate: {
      title: 'Intermediate Level (6-18 months)',
      description: 'Deepen your knowledge with advanced data structures, algorithms, and frameworks. Start building full-stack applications and contribute to real projects.',
      concepts: [
        '**Advanced Data Structures**: Master linked lists, stacks, queues, trees (binary trees, BST, AVL), graphs, hash tables, and heaps. Understand when to use each.',
        '**Algorithm Design**: Learn dynamic programming, greedy algorithms, backtracking, and divide-and-conquer. Solve medium-level LeetCode problems.',
        '**Backend Development**: Build REST APIs using Node.js/Express, Django, or Spring Boot. Learn request handling, routing, middleware, and authentication.',
        '**Databases**: Design database schemas, write complex SQL queries (joins, subqueries, aggregations), and optimize queries. Learn about indexes and transactions.',
        '**Frontend Frameworks**: Master React, Vue, or Angular. Learn component-based architecture, state management (Redux, Context API), and routing.',
        '**System Design Basics**: Understand client-server architecture, load balancing, caching, and database replication. Design simple systems like URL shortener.',
        '**Testing**: Write unit tests, integration tests, and end-to-end tests. Learn TDD (Test-Driven Development) and achieve good code coverage.',
        '**DevOps Basics**: Learn Docker for containerization, CI/CD pipelines with GitHub Actions, and deploy applications to cloud platforms (AWS, Heroku).',
        '**Code Quality**: Follow SOLID principles, design patterns (Singleton, Factory, Observer), and write clean, maintainable code. Conduct code reviews.',
        '**Projects**: Build a full-stack e-commerce site, social media clone, real-time chat app, or a project management tool with authentication and database.'
      ]
    },

    advanced: {
      title: 'Advanced Level (18+ months)',
      description: 'Master system design, scalability, and advanced topics. Lead projects, mentor juniors, and contribute to architectural decisions.',
      concepts: [
        '**System Design**: Design scalable systems like Twitter, Netflix, or Uber. Learn about microservices, message queues (Kafka, RabbitMQ), and distributed systems.',
        '**Performance Optimization**: Profile and optimize code for speed and memory. Learn about caching strategies (Redis, Memcached), database indexing, and query optimization.',
        '**Cloud Architecture**: Master AWS services (EC2, S3, Lambda, RDS, CloudFront). Design highly available, fault-tolerant systems using multiple availability zones.',
        '**Security**: Implement authentication (JWT, OAuth), authorization (RBAC), input validation, SQL injection prevention, XSS protection, and HTTPS.',
        '**Concurrency**: Understand multi-threading, async/await, promises, and parallel processing. Handle race conditions and deadlocks.',
        '**Advanced Algorithms**: Master advanced graph algorithms (Dijkstra, Floyd-Warshall), string algorithms (KMP, Rabin-Karp), and solve hard LeetCode problems.',
        '**Architecture Patterns**: Learn MVC, MVVM, event-driven architecture, CQRS, and hexagonal architecture. Choose the right pattern for each project.',
        '**Leadership**: Lead technical projects, mentor junior engineers, conduct design reviews, and make architectural decisions. Communicate with stakeholders.',
        '**Open Source**: Contribute to popular open-source projects. Understand large codebases, follow contribution guidelines, and collaborate with global teams.',
        '**Specialization**: Choose a specialization - machine learning, blockchain, mobile development, DevOps, or security. Become an expert in your chosen field.'
      ]
    }
  },

  'data-analyst': {
    whatIs: `A Data Analyst is a professional who collects, processes, and analyzes data to help organizations make informed business decisions. They transform raw data into actionable insights through statistical analysis, data visualization, and reporting.

Data analysts work with large datasets to identify trends, patterns, and anomalies. They use tools like Excel, SQL, Python, and visualization platforms (Tableau, Power BI) to extract meaningful information from data. Unlike data scientists who build predictive models, data analysts focus on descriptive and diagnostic analytics - understanding what happened and why.

The role involves cleaning messy data, performing statistical analysis, creating dashboards and reports, and presenting findings to stakeholders. Data analysts bridge the gap between technical data and business strategy, helping companies optimize operations, increase revenue, and improve customer satisfaction.`,

    whyLearn: `Data Analysis is one of the most in-demand and versatile careers in the modern economy:

**Universal Demand**: Every industry generates data - healthcare, finance, retail, technology, sports, government. All need analysts to make sense of it. The demand spans across sectors.

**Strong Compensation**: Data analysts earn competitive salaries. In India: Entry-level ₹3-6 LPA, Mid-level ₹6-15 LPA, Senior ₹15-30+ LPA. In the US: $60K-$120K+.

**Low Barrier to Entry**: Unlike software engineering, you don't need a computer science degree. Many successful analysts come from business, economics, or even non-technical backgrounds.

**Immediate Impact**: Your analysis directly influences business decisions. You might identify cost-saving opportunities, optimize marketing campaigns, or improve product features.

**Diverse Applications**: Work on diverse problems - customer segmentation, sales forecasting, fraud detection, A/B testing, market research, or operational efficiency.

**Career Growth**: Data analysis is a stepping stone to data science, business intelligence, product analytics, or management roles. You can specialize or broaden your scope.

**Remote-Friendly**: Most data analysis work can be done remotely. Many companies offer flexible work arrangements.

**Continuous Learning**: New tools and techniques emerge regularly, keeping the work interesting. You're always learning new ways to extract insights from data.`,

    realWorld: `Data analysts solve real business problems across industries:

**E-commerce**: Amazon and Flipkart analysts analyze customer behavior, optimize pricing strategies, and improve recommendation systems. They identify which products to stock, when to offer discounts, and how to reduce cart abandonment.

**Finance**: Bank analysts detect fraudulent transactions, assess credit risk, and analyze investment portfolios. They help banks make lending decisions and identify suspicious activities.

**Healthcare**: Hospital analysts track patient outcomes, optimize resource allocation, and identify disease patterns. They help improve treatment protocols and reduce costs.

**Marketing**: Digital marketing analysts measure campaign effectiveness, calculate ROI, and optimize ad spending. They use A/B testing to improve conversion rates and customer acquisition.

**Sports**: Sports analysts use data to evaluate player performance, develop game strategies, and scout talent. Teams like Mumbai Indians use analytics to make strategic decisions.

**Retail**: Retail analysts forecast demand, optimize inventory, and analyze customer foot traffic. They help stores decide what to stock and when to reorder.

**Technology**: Product analysts at companies like Google and Facebook analyze user behavior, measure feature adoption, and identify areas for improvement.

**Supply Chain**: Logistics analysts optimize delivery routes, reduce shipping costs, and predict demand. Companies like Zomato and Swiggy use analytics to improve delivery times.

Real-world data analysis involves working with messy, incomplete data. Analysts spend 60-70% of their time cleaning and preparing data, 20-30% analyzing it, and 10% presenting findings. They collaborate with business teams, engineers, and executives to drive data-informed decisions.`,

    requiredSkills: `To become a successful data analyst, you need a mix of technical and business skills:

**Excel**: Master advanced Excel - pivot tables, VLOOKUP, INDEX-MATCH, conditional formatting, charts, and macros. Excel is still the most widely used tool for data analysis.

**SQL**: Essential for querying databases. Learn SELECT, WHERE, JOIN, GROUP BY, HAVING, subqueries, and window functions. Practice on real datasets.

**Statistics**: Understand descriptive statistics (mean, median, mode, standard deviation), probability, hypothesis testing, correlation, and regression. Know when to use each.

**Data Visualization**: Create clear, compelling charts and dashboards. Learn principles of visual design - choosing the right chart type, using color effectively, and telling stories with data.

**Python/R**: Learn Python (Pandas, NumPy, Matplotlib) or R for data manipulation and analysis. Automate repetitive tasks and perform advanced statistical analysis.

**Business Intelligence Tools**: Master Tableau, Power BI, or Looker for creating interactive dashboards. These tools are widely used in industry.

**Data Cleaning**: Learn to handle missing values, outliers, duplicates, and inconsistent data. This is a critical skill as real-world data is messy.

**Critical Thinking**: Ask the right questions, identify patterns, and draw meaningful conclusions. Understand business context and translate data into actionable insights.

**Communication**: Explain technical findings to non-technical stakeholders. Create clear reports, presentations, and visualizations that drive decision-making.

**Domain Knowledge**: Understand the industry you're working in - e-commerce, finance, healthcare, etc. This helps you ask better questions and provide relevant insights.

**Problem-Solving**: Break down complex business problems into analytical questions. Design experiments (A/B tests) to validate hypotheses.

**Attention to Detail**: Ensure data accuracy, validate results, and catch errors. Small mistakes can lead to wrong conclusions and bad decisions.`,

    toolsTech: `Data analysts use a variety of tools depending on their role and industry:

**Spreadsheets**: Microsoft Excel, Google Sheets. Used for quick analysis, reporting, and data manipulation. Essential for every analyst.

**SQL Databases**: PostgreSQL, MySQL, SQL Server, BigQuery. Used to query large datasets stored in databases. SQL is the most important skill for data analysts.

**Programming Languages**:
- Python: Pandas (data manipulation), NumPy (numerical computing), Matplotlib/Seaborn (visualization), Scikit-learn (basic ML)
- R: dplyr, ggplot2, tidyr for data analysis and visualization

**Business Intelligence Tools**:
- Tableau: Industry-leading visualization tool, drag-and-drop interface
- Power BI: Microsoft's BI tool, integrates well with Excel and Azure
- Looker: Google's BI platform, SQL-based
- Metabase: Open-source, easy to use

**Data Warehouses**: Snowflake, Amazon Redshift, Google BigQuery. Store and query massive datasets efficiently.

**Statistical Tools**: SPSS, SAS, Stata for advanced statistical analysis (more common in research and academia).

**Collaboration Tools**: Jupyter Notebooks for sharing analysis, Git for version control, Confluence for documentation.

**Data Collection**: Google Analytics (web analytics), Mixpanel (product analytics), Segment (data integration).

**ETL Tools**: Airflow, Talend, Informatica for extracting, transforming, and loading data.

**Cloud Platforms**: AWS (S3, Athena), Google Cloud (BigQuery), Azure for storing and processing data at scale.

Most entry-level roles require Excel and SQL. As you advance, you'll learn Python, Tableau, and cloud platforms. The specific tools depend on your company's tech stack.`,

    dailyLife: `A typical day for a data analyst involves a mix of analysis, meetings, and communication:

**Morning (9:00 AM - 12:00 PM)**:
- Check emails and Slack for urgent requests from stakeholders.
- Attend daily standup (if working in an agile team) to share progress and blockers.
- Review dashboards and reports for anomalies. If sales dropped yesterday, investigate why.
- Work on ongoing analysis projects. This might involve writing SQL queries to extract data, cleaning data in Python, or building visualizations in Tableau.
- Respond to ad-hoc data requests from business teams. "Can you pull last month's sales by region?"

**Afternoon (1:00 PM - 5:00 PM)**:
- Deep work on analysis projects. Explore data, run statistical tests, and identify insights.
- Create visualizations and dashboards. Design charts that clearly communicate findings.
- Attend meetings with stakeholders to understand their questions and present findings. Explain what the data shows and recommend actions.
- Collaborate with data engineers to improve data pipelines or fix data quality issues.
- Document your analysis - write SQL queries, Python scripts, and explanations so others can reproduce your work.

**Evening (5:00 PM - 6:00 PM)**:
- Prepare reports and presentations for upcoming meetings.
- Update dashboards with the latest data.
- Learn new tools or techniques - watch tutorials, read blogs, or take online courses.
- Plan tomorrow's work - prioritize tasks and set goals.

**Weekly Activities**:
- **Monday**: Planning meetings to prioritize the week's work.
- **Mid-week**: Deep analysis work, building dashboards, and stakeholder meetings.
- **Friday**: Wrap up projects, send weekly reports, and prepare for next week.

**Project Examples**:
- Analyze why customer churn increased last quarter and recommend retention strategies.
- Build a dashboard showing real-time sales performance by product and region.
- Conduct A/B test analysis to determine if a new website design improves conversions.
- Forecast next quarter's revenue based on historical trends and market conditions.

**Work Environment**: Most analysts work in offices or remotely. The work is a mix of independent analysis and collaborative meetings. You'll interact with product managers, marketers, executives, and engineers.

**Flexibility**: Many companies offer flexible hours and remote work. You might have focused work time in the morning and meetings in the afternoon, or vice versa.

The work is intellectually stimulating, with a mix of technical analysis and business problem-solving. You're constantly learning about the business and finding ways to improve it through data.`,

    industryDemand: `The demand for data analysts is growing rapidly across all industries:

**Market Growth**: The global data analytics market is expected to grow from $23 billion in 2020 to $132 billion by 2026, a 33% annual growth rate.

**Job Openings**: LinkedIn lists data analyst as one of the top 10 most in-demand jobs. In India alone, there are 50,000+ data analyst job openings at any given time.

**India's Data Economy**: India's data analytics industry employs over 1 million professionals and is growing at 25% annually. Companies like Mu Sigma, Fractal Analytics, and Tiger Analytics are major employers.

**Salary Trends**: Data analyst salaries have increased significantly:
- Entry-level (0-2 years): ₹3-6 LPA
- Mid-level (3-5 years): ₹6-15 LPA
- Senior (6-10 years): ₹15-30 LPA
- Lead/Manager (10+ years): ₹30-50+ LPA

**Industry Demand**:
- **E-commerce**: Flipkart, Amazon, Myntra hire hundreds of analysts annually
- **Finance**: Banks, insurance companies, and fintech startups need analysts for risk assessment and fraud detection
- **Consulting**: Deloitte, PwC, EY, McKinsey hire analysts for client projects
- **Technology**: Google, Microsoft, Meta, and Indian startups need product analysts
- **Healthcare**: Hospitals and pharma companies use analytics for patient care and drug development

**Remote Opportunities**: Many data analyst roles are fully remote, allowing you to work for companies worldwide. US and European companies hire Indian analysts for their skills and cost-effectiveness.

**Career Paths**: Data analysts can progress to:
- Senior Data Analyst → Lead Analyst → Analytics Manager
- Data Scientist (with ML skills)
- Business Intelligence Developer
- Product Analyst
- Data Engineer (with engineering skills)
- Analytics Consultant

**Freelancing**: Experienced analysts can earn ₹1,000-5,000+ per hour on platforms like Upwork and Toptal, working on projects like market research, financial modeling, or dashboard development.

**Job Security**: Data-driven decision-making is here to stay. Companies that don't use data effectively fall behind competitors. This makes data analysis a recession-resistant career.

**Emerging Areas**: High demand for analysts skilled in:
- Product Analytics (understanding user behavior)
- Marketing Analytics (measuring campaign ROI)
- Financial Analytics (risk modeling, fraud detection)
- Healthcare Analytics (patient outcomes, operational efficiency)
- Supply Chain Analytics (optimization, forecasting)

The demand for data analysts will continue growing as more companies adopt data-driven strategies, IoT devices generate more data, and AI/ML require quality data for training.`,

    beginner: {
      title: 'Beginner Level (0-6 months)',
      description: 'Build foundational skills in Excel, SQL, and basic statistics. Learn to clean data, perform simple analyses, and create basic visualizations.',
      concepts: [
        '**Excel Fundamentals**: Master formulas (SUM, AVERAGE, IF, VLOOKUP), pivot tables, charts, and conditional formatting. Practice with real datasets.',
        '**SQL Basics**: Learn SELECT, WHERE, ORDER BY, LIMIT, and basic JOINs. Practice querying databases to extract specific information.',
        '**Descriptive Statistics**: Understand mean, median, mode, range, variance, and standard deviation. Learn when to use each measure.',
        '**Data Cleaning**: Handle missing values, remove duplicates, fix inconsistent formatting, and deal with outliers. This is 60% of the job.',
        '**Basic Visualization**: Create bar charts, line charts, pie charts, and scatter plots. Learn which chart type to use for different data.',
        '**Data Types**: Understand numerical (continuous, discrete), categorical (nominal, ordinal), and datetime data. Know how to work with each.',
        '**Filtering & Sorting**: Learn to filter data based on conditions and sort by multiple columns. Essential for exploring datasets.',
        '**Aggregation**: Use GROUP BY in SQL and pivot tables in Excel to summarize data by categories (e.g., sales by region).',
        '**Basic Reporting**: Create simple reports with tables and charts. Learn to present findings clearly and concisely.',
        '**Projects**: Analyze sales data to find top products, customer demographics to identify target segments, or website traffic to understand user behavior.'
      ]
    },

    intermediate: {
      title: 'Intermediate Level (6-18 months)',
      description: 'Advance to complex SQL queries, Python/R for analysis, statistical testing, and interactive dashboards. Work on real business problems.',
      concepts: [
        '**Advanced SQL**: Master complex JOINs, subqueries, window functions (ROW_NUMBER, RANK, LAG, LEAD), CTEs, and query optimization.',
        '**Python for Data Analysis**: Learn Pandas for data manipulation, NumPy for numerical operations, and Matplotlib/Seaborn for visualization.',
        '**Statistical Testing**: Understand hypothesis testing, p-values, confidence intervals, t-tests, chi-square tests, and ANOVA. Know when to use each.',
        '**Correlation & Regression**: Analyze relationships between variables. Perform linear regression to predict outcomes and understand drivers.',
        '**Data Visualization Tools**: Master Tableau or Power BI. Create interactive dashboards with filters, drill-downs, and dynamic visualizations.',
        '**A/B Testing**: Design and analyze experiments. Calculate sample sizes, determine statistical significance, and make recommendations.',
        '**Time Series Analysis**: Analyze trends over time, identify seasonality, and perform basic forecasting using moving averages.',
        '**Data Modeling**: Design star schemas and snowflake schemas for data warehouses. Understand fact and dimension tables.',
        '**Business Metrics**: Learn key metrics for different industries - CAC, LTV, churn rate, conversion rate, ROI, ARPU, etc.',
        '**Projects**: Build a sales dashboard with KPIs, perform customer segmentation using clustering, analyze marketing campaign effectiveness, or forecast demand.'
      ]
    },

    advanced: {
      title: 'Advanced Level (18+ months)',
      description: 'Master advanced analytics, machine learning basics, and strategic thinking. Lead projects, mentor juniors, and drive business strategy.',
      concepts: [
        '**Advanced Statistics**: Master multivariate analysis, logistic regression, survival analysis, and Bayesian statistics. Understand assumptions and limitations.',
        '**Machine Learning Basics**: Learn classification, regression, clustering, and decision trees. Use Scikit-learn to build predictive models.',
        '**Big Data Tools**: Work with Spark, Hadoop, or cloud data warehouses (BigQuery, Redshift) to analyze datasets too large for Excel or Python.',
        '**Advanced Visualization**: Create storytelling dashboards that guide users through insights. Use advanced features like parameters, calculated fields, and LOD expressions.',
        '**Predictive Analytics**: Build forecasting models using ARIMA, Prophet, or machine learning. Predict sales, demand, or customer behavior.',
        '**Cohort Analysis**: Analyze user behavior over time. Track retention, engagement, and lifetime value by cohort.',
        '**Attribution Modeling**: Determine which marketing channels drive conversions. Use multi-touch attribution to allocate budget effectively.',
        '**Experimentation**: Design complex experiments with multiple variants, stratification, and sequential testing. Understand statistical power and effect sizes.',
        '**Data Strategy**: Define KPIs, build data roadmaps, and align analytics with business goals. Communicate with executives and influence strategy.',
        '**Leadership**: Lead analytics projects, mentor junior analysts, and collaborate with cross-functional teams. Present to C-level executives and drive decision-making.'
      ]
    }
  }
};

// Practice questions for each career
export const careerQuestions: Record<string, CareerPracticeQuestion[]> = {
  'software-engineer': [
    {
      id: 1,
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctAnswer: 1,
      explanation: 'Binary search has O(log n) time complexity because it divides the search space in half with each iteration, making it very efficient for sorted arrays.'
    },
    {
      id: 2,
      question: 'Which data structure uses LIFO (Last In First Out) principle?',
      options: ['Queue', 'Stack', 'Array', 'Tree'],
      correctAnswer: 1,
      explanation: 'A Stack follows the LIFO principle where the last element added is the first one to be removed, like a stack of plates.'
    },
    {
      id: 3,
      question: 'What does API stand for?',
      options: ['Application Programming Interface', 'Advanced Programming Integration', 'Automated Program Interaction', 'Application Process Integration'],
      correctAnswer: 0,
      explanation: 'API stands for Application Programming Interface. It defines how software components should interact and allows different applications to communicate with each other.'
    },
    {
      id: 4,
      question: 'Which HTTP method is used to update existing data?',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      correctAnswer: 2,
      explanation: 'PUT is used to update existing resources. POST creates new resources, GET retrieves data, and DELETE removes resources.'
    },
    {
      id: 5,
      question: 'What is the purpose of version control systems like Git?',
      options: ['To compile code', 'To track changes and collaborate', 'To deploy applications', 'To test code'],
      correctAnswer: 1,
      explanation: 'Version control systems like Git track code changes over time, enable collaboration among developers, and allow reverting to previous versions if needed.'
    },
    {
      id: 6,
      question: 'Which of the following is NOT a programming paradigm?',
      options: ['Object-Oriented', 'Functional', 'Procedural', 'Sequential'],
      correctAnswer: 3,
      explanation: 'Sequential is not a programming paradigm. The main paradigms are Object-Oriented, Functional, Procedural, and Declarative.'
    },
    {
      id: 7,
      question: 'What does SQL stand for?',
      options: ['Structured Query Language', 'Simple Question Language', 'Standard Query Logic', 'System Query Language'],
      correctAnswer: 0,
      explanation: 'SQL stands for Structured Query Language. It is used to communicate with and manipulate databases.'
    },
    {
      id: 8,
      question: 'Which design pattern ensures a class has only one instance?',
      options: ['Factory', 'Singleton', 'Observer', 'Strategy'],
      correctAnswer: 1,
      explanation: 'The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.'
    }
  ],

  'data-analyst': [
    {
      id: 1,
      question: 'Which SQL clause is used to filter rows?',
      options: ['SELECT', 'WHERE', 'GROUP BY', 'ORDER BY'],
      correctAnswer: 1,
      explanation: 'The WHERE clause is used to filter rows based on specified conditions. It determines which rows are included in the result set.'
    },
    {
      id: 2,
      question: 'What is the median of the dataset: 3, 7, 9, 12, 15?',
      options: ['7', '9', '12', '15'],
      correctAnswer: 1,
      explanation: 'The median is the middle value when data is sorted. In this dataset of 5 numbers, the middle value (3rd position) is 9.'
    },
    {
      id: 3,
      question: 'Which chart type is best for showing trends over time?',
      options: ['Pie Chart', 'Bar Chart', 'Line Chart', 'Scatter Plot'],
      correctAnswer: 2,
      explanation: 'Line charts are ideal for showing trends over time because they clearly display how values change across a continuous time period.'
    },
    {
      id: 4,
      question: 'What does ETL stand for in data processing?',
      options: ['Extract, Transform, Load', 'Evaluate, Test, Launch', 'Execute, Transfer, Log', 'Export, Translate, Link'],
      correctAnswer: 0,
      explanation: 'ETL stands for Extract, Transform, Load. It is the process of extracting data from sources, transforming it into a usable format, and loading it into a destination database.'
    },
    {
      id: 5,
      question: 'Which Python library is primarily used for data manipulation?',
      options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
      correctAnswer: 1,
      explanation: 'Pandas is the primary Python library for data manipulation and analysis. It provides DataFrames for working with structured data.'
    },
    {
      id: 6,
      question: 'What is the purpose of a JOIN in SQL?',
      options: ['To sort data', 'To combine data from multiple tables', 'To filter rows', 'To aggregate data'],
      correctAnswer: 1,
      explanation: 'JOIN is used to combine rows from two or more tables based on a related column between them, allowing you to query data across multiple tables.'
    },
    {
      id: 7,
      question: 'Which measure of central tendency is most affected by outliers?',
      options: ['Mean', 'Median', 'Mode', 'Range'],
      correctAnswer: 0,
      explanation: 'The mean (average) is most affected by outliers because it includes all values in its calculation. Extreme values can significantly skew the mean.'
    },
    {
      id: 8,
      question: 'What is A/B testing used for?',
      options: ['Database backup', 'Comparing two versions to see which performs better', 'Data encryption', 'Code debugging'],
      correctAnswer: 1,
      explanation: 'A/B testing is an experimental method where two versions (A and B) are compared to determine which one performs better based on a specific metric.'
    }
  ]
};
