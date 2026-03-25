# Requirements Document

## 1. Application Overview

### 1.1 Application Name
SkillSnap 3D

### 1.2 Application Description
A production-ready, high-end web platform designed for students to manage their academic life and career growth in one place. Features a premium futuristic 3D dashboard-style UI with glassmorphism, soft shadows, gradients, floating cards, smooth animations, and real-world educational tools. Career Hub is a comprehensive learning and practice platform with full structured notes from Beginner to Advanced, coding practice lab, hackathon mode, and real working video resources. Includes a fully fixed authentication system, advanced AI Mentor with intelligent fallback, in-app code execution, complete chat history, and an Admin Panel for platform management.

---

## 2. Core Features

### 2.1 Landing Page
- Hero Section:
  - Title: SkillSnap 3D
  - Tagline: Your AI-Powered Student Productivity Hub
  - Subtext: Manage your academic life and career growth in one futuristic platform
- Animated dashboard preview
- Buttons:
  - Login
  - Sign Up
  - Get Started Free
- Button Logic:
  - Get Started Free → Login/Signup page (NOT directly to Home)
  - After successful login → redirect to Home (Dashboard)
  - Remove Go to Home button before login
  - Maintain proper authentication state using localStorage/session
- Feature Cards:
  - University Hub
  - Career Hub
  - Job Hub
  - AI Mentor
- Hover animations and glass effect on all cards

### 2.2 Background Experience
- Gradient mix: soft blue + lavender + subtle purple + slight pink glow
- Balanced gradient (not too dark, not too light)
- Layered gradients + blur + radial highlights for depth
- Animated floating blobs/orbs
- Soft light glow behind main sections
- Subtle parallax effect on mouse move
- Premium and calm emotional impact

### 2.3 Authentication System (FULLY FIXED)

#### 2.3.1 Signup
- Fields:
  - Full Name
  - Email address
  - Password
  - Confirm Password
- Email-only authentication (no username field)
- Password validation rules (enforced in real time):
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 number
  - At least 1 special character
- Show/hide password toggle
- Inline validation error messages per field
- On success → redirect to Home

#### 2.3.2 Login
- Fields:
  - Email address
  - Password
- Email + Password authentication only
- Show/hide password toggle
- Inline error messages for invalid credentials
- On success → redirect to Home

#### 2.3.3 Google Sign-In
- Implemented via OSS Google login
- On click → show available Google accounts picker
- User selects account → authenticated and redirected to Home
- If Google login fails → show friendly error message, do not crash

#### 2.3.4 Authentication State
- Auth state persisted in localStorage/session
- Protected routes: all pages except Landing, Login, Signup require authentication
- Unauthenticated users redirected to Login page
- Logout clears session and redirects to Landing page

### 2.4 Home Page (Dashboard)
Renamed: Dashboard → Home

Central dashboard with 3D interactive cards:
- University Hub
- Career Hub
- Job Hub
- AI Mentor Chat
- Study Timer (Start / Pause / Reset — fully functional)
- Learning Tips (real tips displayed dynamically)
- Daily Goals
- Skill Progress
- Motivational Quotes (daily rotating quotes)
- Daily Challenge (1 coding/learning challenge per day)
- Progress Tracker (% completion per subject and skill progress bars)
- Smart Suggestion section (personalized recommendations)
- Achievement Badges section (summary display)

Each card:
- Glassmorphism UI
- Animate on hover (scale + 3D tilt effect)
- Navigates to respective page
- Smooth transitions and micro animations
- All buttons and features fully functional

### 2.5 University Hub

#### 2.5.1 Main Tabs
- Assignments
- Exams
- Notes
- Timetable
- CGPA

#### 2.5.2 Notes Section
3 subject cards:
1. Cloud Computing
2. IoT (Internet of Things)
3. Advanced Networking

Each subject card:
- Gradient background
- Glow effect
- Hover animation
- Clickable → opens Subject Detail Page

#### 2.5.3 Subject Detail Page — Split View Layout

Layout:
- Desktop: 60% notes (left panel) + 40% 3D visualization (right panel)
- Mobile/Tablet: stacked vertically
- Modern gradient background (soft blue to lavender)
- Glassmorphism cards for notes sections
- Soft shadows and smooth transitions

**Left Panel: Full Structured Deep Notes**

Cloud Computing:
- Introduction: What is cloud computing, real-world context, why it matters
- Core Concepts: IaaS, PaaS, SaaS, public/private/hybrid cloud models
- Architecture: Multi-tier cloud architecture, service layers breakdown
- Components: Compute resources, storage systems, networking infrastructure, security layers
- How it Works: Step-by-step flow from user request to cloud processing to response delivery
- Real-world Examples: Netflix streaming, Google Drive storage, Salesforce CRM
- Advantages and Limitations: Scalability, cost efficiency, security concerns, vendor lock-in
- Industry Use Cases: E-commerce, data analytics, AI/ML workloads
- Interview-level understanding points
- Levels: Beginner → Intermediate → Advanced

Advanced Networking:
- Introduction: Network fundamentals, OSI model, modern networking landscape
- Core Concepts: Routing protocols, switching mechanisms, network topologies, TCP/IP stack
- Architecture: Enterprise network design, data center networking, SDN concepts
- Components: Routers, switches, firewalls, load balancers, network interfaces
- How it Works: Packet journey from source to destination, routing decisions, switching logic
- Real-world Examples: Corporate networks, ISP infrastructure, data center interconnects
- Advantages and Limitations: Performance optimization, redundancy, complexity challenges
- Industry Use Cases: Banking networks, telecom infrastructure, cloud provider backbones
- Interview-level understanding points
- Levels: Beginner → Intermediate → Advanced

Internet of Things (IoT):
- Introduction: IoT ecosystem overview, connected devices revolution, smart systems
- Core Concepts: Sensors, actuators, connectivity protocols, edge computing, cloud integration
- Architecture: IoT stack layers (device, gateway, cloud, application), data flow patterns
- Components: Sensors, gateways, communication modules, cloud platforms
- How it Works: Sensor data collection → gateway aggregation → cloud processing → user application feedback loop
- Real-world Examples: Smart homes, wearables, industrial automation, smart cities
- Advantages and Limitations: Automation benefits, data insights, security vulnerabilities, interoperability issues
- Industry Use Cases: Healthcare monitoring, agriculture optimization, manufacturing efficiency
- Interview-level understanding points
- Levels: Beginner → Intermediate → Advanced

Notes style: detailed, practical, teacher-style narrative, professional educational quality, structured headings, examples, real-world use cases.

**Right Panel: Interactive 3D Educational Visualization**
Using @react-three/fiber, @react-three/drei, and Three.js.

Cloud Computing 3D Visualization:
- User devices layer (bottom): Laptop model, mobile phone model
- Internet layer: Animated connection lines flowing upward
- Cloud servers cluster: Multiple server blocks in AWS-style architecture (middle)
- Database node: Cylinder shape (top)
- Animated data flow: Particles/lines flowing devices → internet → cloud → database → back
- Color coding: Blue for devices, purple for internet, gradient for cloud, green for database
- Interactive: Zoom (mouse wheel), Rotate (drag), Pan (right-click drag), Hover labels + glow, Click device → highlight data path, Click cloud server → show server details panel, Click database → show storage info

Advanced Networking 3D Visualization:
- Network topology: Router nodes (octahedron + glowing edges), Switch nodes (box with connection points), Server nodes (tower shapes), Client device nodes
- Animated connection lines showing packet flow
- Packet animation: Small glowing spheres traveling along paths
- Active path highlighting when packet flows
- Interactive: Zoom, Rotate, Pan, Hover labels, Click router → routing table info, Click switch → connected devices, Click connection line → bandwidth/latency info, Hover node → highlight all connected paths
- CRITICAL: View Details button must NOT redirect to Home; must show full content consistently with other subjects

IoT 3D Visualization:
- Smart devices layer: Temperature sensor, motion sensor, smart bulb, wearable device
- Gateway node: Central hub connecting all sensors
- Cloud platform: Cloud shape with processing indicators
- User application: Mobile app icon/screen
- Data flow animation: Sensor → Gateway → Cloud → App (continuous loop)
- Real-time pulsing effects on active sensors
- Color coding: Orange for sensors, blue for gateway, purple for cloud, green for app
- Interactive: Zoom, Rotate, Pan, Hover labels, Click sensor → sensor data panel, Click gateway → connected devices list, Click cloud → processing status, Click app → UI preview, Animated signal waves from sensors to gateway

3D Scene Technical Requirements (all subjects):
- OrbitControls: Zoom, Rotate, Pan
- Ambient light + 2–3 point lights for depth
- Colorful glowing nodes with distinct colors per component type
- Smooth animations using useFrame hook
- Animated edges/connections with flowing particles
- Glowing materials with emissive properties
- Lazy load 3D scene (only when subject page opens)
- Optimized geometry, instanced meshes where applicable
- Smooth 60fps animation, no lag
- NOT simple cubes; use meaningful styled geometries

Interactive Features (all subjects):
- Zoom in/out, Rotate, Pan
- Hover → glow effect + scale up slightly + label appears
- Click node → explanation panel below canvas showing: Component name, Function description, Technical details, Role in system
- React useState to track selected node
- Smooth transitions between states

#### 2.5.4 Quiz System
- Select subject first
- Timer: 60 seconds
- 5 MCQs per subject (real subject-based questions)
- Show score + correct answers after completion

#### 2.5.5 Other Modules
- Assignment Tracker
- Exam Countdown
- Class Timetable
- CGPA Calculator

Each module opens inside a modern card-style interface.

### 2.6 Career Hub — Complete Learning and Practice Platform

#### 2.6.1 Career Path Cards
Roles:
- Software Engineer
- Data Analyst
- Full Stack Developer
- UX Designer

Each card:
- Skills list (chips)
- Hover animation
- View Details button (fully functional, navigates to Career Role Detail Page — NOT to Home or Landing)

#### 2.6.2 Career Role Detail Page — Complete Tab Structure

**Tab 1: Overview**
1. What is this career?
2. Why learn it?
3. Real-world usage
4. Required skills
5. Tools and technologies used
6. Daily work life
7. Industry demand
8. Salary overview (Software Engineering: Indian ₹4 LPA – ₹20 LPA, year 2026)

**Tab 2: Notes**
Full structured notes from Beginner to Advanced for each career.

Beginner Level:
- What is this career
- Basic concepts
- Required skills
- Simple examples

Intermediate Level:
- Core concepts
- Tools and technologies
- Real-world usage
- Mini explanations

Advanced Level:
- Industry practices
- Real-world projects
- Advanced tools
- Career growth path

Each topic includes: clear explanation, real-world example, easy teaching style, structured headings.

**Tab 3: Practice Lab**

Software Engineer and Full Stack Developer:
- Build Login Page
- Create REST API
- Build CRUD App
- Authentication System

Data Analyst:
- Data cleaning task
- Visualization task
- SQL queries practice

UX Designer:
- Design challenge
- Wireframe task
- UI improvement task

Code Execution (CRITICAL FIX):
- All coding challenges must run inside the app
- Show output and errors inline
- Do NOT ask user to run code externally
- Do NOT show only static code
- In-app code editor with run button, output panel, and error display

**Tab 4: Hackathon Mode**
- Timer: 30 min / 1 hour (user selects)
- Random challenge generator
- Submit button
- Show result with basic feedback
- Challenge types:
  - Coding challenges (Software Engineer, Full Stack Developer)
  - SQL practice (Data Analyst)
  - Web tasks (developers)
  - Problem-solving questions
- Code execution inside app (same as Practice Lab)

**Tab 5: Learning Roadmap (Visual)**
Visual step-by-step journey:

Beginner → Learner → Builder → Job Ready

Each stage includes:
- Skills to learn
- Tools to use
- Outcome

Visual card-based or timeline-based layout (not plain text).

**Tab 6: Learning Videos (UPDATED)**

Video Section Rules:
- Keep all existing working videos as-is; do NOT remove any video that is currently playable
- Remove only videos that show Video unavailable or are confirmed broken
- All videos are displayed in their respective separate domain sections (see below)
- No Video Unavailable placeholder cards; broken video cards are removed entirely
- Topic title must match video content exactly
- Add a short description below each video explaining why it is useful
- Updated to 2025–2026 context

Video Card Layout and Design:
- Clean card layout using a responsive grid system
- Equal spacing between all video cards
- Consistent card design: same border radius, same shadow style, same card dimensions
- Responsive layout: multi-column grid on desktop, single column on mobile
- No mismatched titles, no layout issues, no empty cards
- All cards aligned properly

**Section: Software Engineer Learning**
- What is Software Engineering
  - Description: Understand the fundamentals and scope of software engineering
- Roadmap 2026
  - Description: Complete learning path for aspiring software engineers
- Day in life
  - Description: Real insights into daily work of software engineers
- Full course
  - Description: Comprehensive course covering core concepts
- Software Engineer Roadmap 2026 (Full Blueprint)
  - Embed URL: https://www.youtube.com/embed/avdDEZCcluo
  - Description: Complete roadmap to become a software engineer in 2026

**Section: Data Analyst Learning**
- The Complete Data Analyst Roadmap
  - Embed URL: https://www.youtube.com/embed/YRJbhFLLPyE
  - Description: Complete roadmap to become a data analyst
- Become Data Analyst From Scratch 2026 | Full Course
  - Embed URL: https://www.youtube.com/embed/Ul4BUSvMhT4
  - Description: Learn data analysis from scratch step by step
- Real Life of a Data Analyst | Day in the Life
  - Embed URL: https://www.youtube.com/embed/RrposkzcNcs
  - Description: Understand real-world data analyst workflow
- Note: All previously existing Data Analyst video cards that are confirmed broken or show Video unavailable must be removed entirely; only the three videos listed above are guaranteed entries; any previously working Data Analyst videos that remain playable must also be retained

**Section: Full Stack Developer Learning**
- MERN stack full course
  - Description: Complete guide to MongoDB, Express, React, Node.js
- Frontend + Backend guide
  - Description: Understanding both sides of web development
- How to Become a Full Stack Developer | Web Development Explained
  - Embed URL: https://www.youtube.com/embed/5QzzeYHApV0
  - Description: Learn full stack development from scratch
- Front End Web Development Tutorial for Beginners (Tamil)
  - Embed URL: https://www.youtube.com/embed/7dSJubxFWv0
  - Description: Beginner-friendly frontend tutorial in Tamil
- Note: All previously existing Full Stack Developer video cards that are confirmed broken or show Video unavailable must be removed entirely; all working videos must be retained

**Section: UX Designer Learning**
- UX Design basics
  - Description: Learn UI/UX from scratch
- UX Roadmap
  - Description: Understand UX roadmap
- Designer workflow
  - Description: Explore real designer workflow
- Case study walkthrough
  - Description: Learn case study presentation

Section Independence Rules:
- Each domain (Software Engineer, Data Analyst, Full Stack Developer, UX Designer) has its own clearly titled, independent section
- Sections must NOT be mixed together
- Each section uses the same responsive grid layout, consistent card design, equal spacing, and short description below each video card
- No cross-section video mixing under any circumstance

Enforcement rule for ALL domains:
- IF YouTube video exists and is playable → embed correctly with description below
- IF NOT → remove that topic card completely
- No exceptions; no fallback placeholder cards

**Tab 7: External Learning Links**
- GeeksforGeeks
- W3Schools
- FreeCodeCamp
- Other relevant resources

**Tab 8: Practice Questions**
- 5–10 MCQs per domain
- Timer (optional)
- Show score at end
- Show correct answers after completion
- Questions relevant to career domain
- Each role has unique questions (no repeated content)

#### 2.6.3 Resume Builder
- Input fields: Name, Education, Skills, Projects, Experience
- Live preview (functional)
- Edit option (functional)
- Download as PDF (functional)
- Clean modern template

#### 2.6.4 Skill Recommendation (Updated)

Removed:
- Data Analyst (already in Career Hub)
- Cloud Computing (already in University Hub)

Skills available:
- Python Programming
- Communication Skills
- Leadership
- Time Management
- Problem Solving
- Interview Preparation

Each skill is clickable and opens a full detail page including:
- What is it
- Why important
- How to learn
- Tools
- Learning steps
- Notes
- Roadmap
- Videos (real working YouTube embeds, relevant only, with explanation above each; remove all Video Unavailable)
- Practice

Special Feature for Communication and Leadership:
- AI Mentor integration embedded in skill page
- Text chat interface
- Voice input (optional)
- Gives personalized feedback
- Suggests improvements
- Interactive learning experience

#### 2.6.5 Real Learning Feel — Smart Navigation Fix

Navigation Rules (CRITICAL FIX):
- Start Learning button → navigates directly to the relevant learning content page (Notes tab, Beginner level) — NEVER redirects to Home or Landing
- View Challenge button → navigates directly to the relevant Practice Lab or Daily Challenge page
- Explore Career button → navigates directly to the Career Role Detail Page
- Continue Reading button → navigates directly to the last-read notes section

Each action button must open the correct destination:
- Notes → opens Notes tab at correct level (Beginner/Intermediate/Advanced)
- 3D Diagram / Visual → opens Subject Detail Page right panel
- Practice Lab → opens Practice Lab tab
- Hackathon → opens Hackathon Mode tab
- Videos → opens Learning Videos tab

Learning Flow Fix:
- For any topic (React, Data Structures, etc.), Start Learning must open:
  - Structured content: Beginner → Intermediate → Advanced
  - Notes + Examples
  - Practice tasks
- No page should redirect wrongly; all navigation must resolve to the correct destination

Progress tracking:
- Basic UI-level progress tracking
- Show completed tasks

### 2.7 AI Mentor Chat (Complete Fix, Upgrade, and Full Chat History)

#### 2.7.1 Core Chat UI
- Chat UI styled like ChatGPT
- Input box
- Message bubbles with typing animation
- Cancel button (functional)
- Stop response feature (functional)
- All scenarios handled gracefully without showing errors

#### 2.7.2 Authentication
- AI Mentor accessible only after login

#### 2.7.3 Critical Error Handling
- NEVER display API error messages to users
- NEVER show insufficient credits or service unavailable messages
- ALWAYS provide a response even if API fails
- Intelligent fallback system:
  - General questions → knowledge-based answer
  - Image analysis failure → describe based on context, ask for clarification
  - Resume review failure → provide general resume tips and structure guidance
  - Code help failure → provide general coding best practices
- Fallback responses must be contextually relevant, helpful, natural, and encouraging
- Error handling completely invisible to users

#### 2.7.4 Chat History Feature (Complete Implementation)

**Storage:**
- Save every user message and AI response to browser storage
- Each history entry stores:
  - Message text (user)
  - Response text (AI)
  - Timestamp (date + time)
- History is scoped per user: each logged-in user sees only their own chat history
- History persists across sessions via localStorage

**History UI:**
- History button/icon placed in AI Mentor top-right area
- When clicked → opens history sidebar/panel showing list of past chats
- Each history item displays:
  - First message preview (truncated if long)
  - Date and time of conversation
- History panel is scrollable
- If no history exists → display message: No previous chats
- No technical errors shown to user

**View Old Chat:**
- Clicking a history item loads the full conversation in the chat UI
- All messages (user + AI) displayed in correct order
- Visually identical to current active chat view

**Continue Chat:**
- After loading an old chat, user can continue the conversation from where it left off
- New messages append to the loaded conversation
- Conversation is saved back to history with updated messages
- A new chat is NOT started unless user explicitly clicks New Chat

**New Chat Button:**
- New Chat button visible in AI Mentor header area
- Clicking clears the current chat screen
- Starts a fresh conversation
- Previous conversation is preserved in history

**Delete Option:**
- Each history item has a delete icon
- Clicking delete removes that individual chat from history
- Confirmation prompt before deletion (optional but recommended)
- Deletion is immediate and reflected in history list

**Search History:**
- Search bar present inside the history panel
- User can type keywords to filter history items
- Search matches against message preview text
- Results update in real time as user types
- If no results found → display: No chats found

**Pin Chat (Advanced):**
- Each history item has a pin icon
- Pinned chats appear at the top of the history list
- Pin state persisted in browser storage

**Rename Chat (Advanced):**
- Each history item has a rename option (edit icon or right-click context)
- User can type a custom name for the chat
- Custom name replaces the auto-generated first-message preview title
- Rename persisted in browser storage

**Performance:**
- History loads fast on panel open
- No lag when switching between history items
- Lazy load older history entries if list is long

**Error Handling:**
- If history storage is unavailable → show: No previous chats
- No technical error messages shown to user

#### 2.7.5 File Upload
- Upload Image button (JPG, PNG)
- Upload PDF button (Resume, Syllabus, Documents)
- Upload Document button (DOCX, TXT)
- Drag and drop support
- File type validation
- File size limit display
- Shows upload progress and file name after upload

#### 2.7.6 Image Upload and Understanding (Critical Fix)
When user uploads image, AI must:
- Analyze actual image content accurately
- Detect image type:
  - Syllabus/document → extract visible topics and text, generate notes or summary
  - Diagram/chart → describe structure and information, explain concept
  - Photo/screenshot → describe what is actually visible
  - Code screenshot → analyze code and provide explanation
  - Handwritten notes → attempt OCR and summarize
  - Unclear/low quality → respond: I can see this is an image, but the content is not clear enough for detailed analysis. Could you provide more context or a clearer image?
- NEVER generate content unrelated to the image
- NEVER hallucinate topics not present in the image
- Base all analysis strictly on visible content

After upload, AI intelligently offers options based on content type:
- Syllabus/study material: Would you like me to create notes, summary, quiz, or study plan?
- Resume: Would you like me to review and rate your resume with suggestions?
- Diagram/image: Would you like me to explain this concept or create related study materials?
- Code/technical content: Would you like me to explain, debug, or suggest improvements?

#### 2.7.7 Context-Aware Response
- AI responds ONLY based on: user's actual input text, content of uploaded files, previous conversation context in current chat
- NEVER introduces random topics
- NEVER assumes information not provided
- NEVER hallucinates content
- If information is insufficient → ask clarifying questions instead of guessing

#### 2.7.8 Resume Upload Analysis
- Analyze resume structure and content
- Provide:
  - Overall score (out of 10) with clear criteria
  - Strengths identified
  - Areas for improvement
  - Specific suggestions per section
  - Formatting recommendations
  - Keyword optimization tips
  - ATS compatibility assessment
- Actionable improvement tips
- Industry-specific advice based on target role

#### 2.7.9 Action Buttons

**Upload File Button:**
- Opens file picker
- Supports: Images (JPG, PNG), PDFs, Documents (DOCX, TXT)
- Shows upload progress
- Displays file name after upload

**Create Image Button (Critical Fix):**
- User describes concept to visualize
- If image generation API available → generate real image
- If API unavailable → render a visual diagram using HTML/CSS/SVG/Canvas:
  - Show boxes, arrows, labels, and structured layout
  - Gradient background matching concept theme
  - Icon representing the concept
  - Title of the concept
  - Structured visual description with sections
  - Key components highlighted with color-coded elements
- Output must be a visible rendered UI diagram
- DO NOT show raw code to the user
- DO NOT say check browser or open console
- DO NOT say I am not capable or I cannot
- Always provide value through visible visual representation

**Deep Research Button:**
- Triggers comprehensive analysis mode
- Provides:
  - Detailed multi-perspective explanation
  - Background context
  - Current trends and developments
  - Practical applications
  - Related concepts and connections
  - Resources for further learning
- Structured in clear sections with examples and case studies

**Thinking Mode Button:**
- Activates step-by-step reasoning display
- Shows thought process: problem breakdown, analysis steps, consideration of alternatives, logical progression, conclusion with reasoning
- Educational value in problem-solving approach

#### 2.7.10 AI Capabilities
- Analyze uploaded files (images, PDFs, documents)
- Extract text and information from images
- Provide detailed feedback on resumes
- Rate and score documents
- Answer questions about: coding doubts with code examples, career guidance, study planning, subject explanations, project ideas
- Generate study materials (notes, summaries, quizzes)
- Create visual explanations
- Provide personalized recommendations

#### 2.7.11 AI Response Style
- Friendly, encouraging, and clear
- Student-focused language
- Structured and organized responses
- Use formatting (bold, lists, sections) for clarity
- After providing answer, proactively suggest next steps:
  - Would you like me to create notes on this topic?
  - Should I generate a quiz to test your understanding?
  - Would you like a visual diagram to illustrate this concept?
  - Need a study plan for mastering this?

### 2.8 In-App Code Execution (Critical Fix)

Applied in: Daily Challenge, Practice Lab, Hackathon Mode

- Code editor embedded inside the app
- Run button executes code within the app
- Output panel displays result inline
- Error panel displays errors inline with clear messages
- Supported languages: JavaScript, Python (and others as applicable per challenge)
- DO NOT show only static code
- DO NOT ask user to run code externally
- DO NOT open external tools or browser console
- Execution must be visible and immediate inside the app UI

### 2.9 Job and Internship Hub

- Renamed: Jobs → Job Hub
- Remove all fake jobs
- Use real API: Adzuna API OR RapidAPI Jobs API OR LinkedIn Jobs API (or mock real structured data)
- Each job/internship card includes:
  - Title (real)
  - Role
  - Company (real)
  - Location (real)
  - Salary (real, INR)
  - Skills required
  - Requirements
  - Apply button → real link (opens actual job site)
- Note displayed: You can learn this in Career Hub
- Internships + Jobs both included

Filter System:
- Filter by role (dropdown: Software Engineer, Data Analyst, Full Stack Developer, UX Designer, etc.)
- Filter by location (dropdown: Remote, Bangalore, Mumbai, Delhi, Hyderabad, etc.)
- Filter by experience level (Fresher, 1–3 years, 3–5 years, 5+ years)
- Filter by salary range (slider or dropdown)
- Apply Filters button
- Clear Filters button

Save Job Feature:
- Heart/bookmark icon on each job card
- Click to save job
- Saved jobs stored in browser storage
- Saved Jobs section accessible from sidebar or profile
- View all saved jobs in one place
- Remove from saved option

Apply Button Realistic Flow:
- Click Apply → show modal/popup
- Modal contains:
  - Job summary
  - Company info
  - Requirements checklist
  - Confirm you meet requirements (checkbox)
  - Resume status (uploaded/not uploaded)
  - Upload resume option (if not uploaded)
  - Submit Application button
- After submit → show confirmation message
- Track application status (Applied, Under Review, etc.)
- View applied jobs in profile section

### 2.10 Profile Page
- Student details
- Skills progress (progress bars)
- Goals
- Editable UI
- Achievement badges display
- Applied jobs list
- Saved jobs list
- Learning statistics

### 2.11 Achievement System

Badges:
- Fast Learner: complete 5 learning modules in a week
- Quiz Master: score 90%+ in 3 quizzes
- Consistent User: login 7 days in a row
- Career Explorer: view all 4 career paths
- Practice Champion: complete 10 practice challenges
- Resume Pro: build and download resume
- Job Hunter: apply to 5 jobs

Display:
- Badges shown on Profile Page with unlock status
- Badges shown on Home Page in dedicated section
- Unlock conditions tracked in browser storage
- Visual badge cards with: badge icon, badge name, description, unlock criteria, progress bar (if partially completed), locked/unlocked status
- Celebration animation when badge is unlocked

### 2.12 Progress Tracker

Tracked metrics:
- % completion per subject (Cloud Computing, IoT, Advanced Networking)
- Skill progress bars (Python, Communication, Leadership, Time Management, Problem Solving, Interview Preparation)
- Overall learning progress (aggregate of all activities)
- Career path progress (for each of 4 careers)
- Practice challenges completed count
- Quizzes taken and average score
- Time spent learning (tracked per session)

Display locations:
- Home Page: summary cards with key metrics
- Profile Page: detailed breakdown
- University Hub: subject-specific progress
- Career Hub: career-specific progress

Visual design:
- Circular progress indicators
- Linear progress bars with percentage
- Color-coded (green for high, yellow for medium, red for low)
- Animated progress updates
- Milestone markers

### 2.13 Daily Challenge
- 1 coding/learning challenge displayed daily on Home Page
- Challenge types rotate: coding challenges (JavaScript, Python), quiz questions (random subject), learning tasks (read article, watch video), problem-solving puzzles
- Challenge card displays: title, difficulty level (Easy/Medium/Hard), estimated time, points reward, Start Challenge button
- In-app code execution for coding challenges (see Section 2.8)
- Submit button
- Result shows: correct/incorrect feedback, explanation, points earned, streak counter
- Completion tracked in browser storage
- New challenge appears at midnight

### 2.14 Smart Suggestion (Fixed)

- Personalized recommendations based on user activity
- Displayed on Home Page in dedicated section

Suggestion logic:
- Completed Cloud Computing notes → suggest IoT or Advanced Networking
- Viewed Software Engineer career → suggest Python, Problem Solving
- Took quiz in subject X → suggest practice challenges in same subject
- Applied to jobs → suggest Resume Builder or Interview Preparation
- Has not visited Career Hub → suggest exploring career paths

Suggestion card displays:
- Title
- Recommended content (icon + description)
- Why this suggestion
- Action button (leads to relevant content)

Smart Navigation Fix (CRITICAL):
- Every action button on a suggestion card must navigate to the exact correct destination:
  - Start Learning → opens Notes tab at Beginner level for the relevant topic
  - View Challenge → opens Daily Challenge or Practice Lab
  - Explore Career → opens Career Role Detail Page for the relevant role
  - Continue Reading → resumes last-read notes section
- No suggestion action button should redirect to Landing page or Home page
- Each destination must be the specific content page, not a generic hub page

Additional rules:
- Maximum 3 suggestions shown at a time
- Refresh suggestions button
- Suggestions update dynamically based on latest activity

### 2.15 Admin Panel (New)

#### 2.15.1 Access Control
- Admin Panel is accessible only to users with admin role
- Admin role is determined by a flag stored in browser storage or hardcoded admin email list
- Regular users cannot see or access the Admin Panel
- Admin Panel does NOT modify or affect the regular user UI in any way
- Admin accesses the panel via a separate route (e.g., /admin)
- Unauthenticated or non-admin users attempting to access /admin are redirected to Login page

#### 2.15.2 Admin Dashboard Overview
- Summary cards at the top:
  - Total Users count
  - Active Users today count
  - Total Sessions count
  - Most used feature (label)
- Charts section:
  - User Growth Chart: line or bar chart showing new user registrations over time (daily/weekly/monthly toggle)
  - Feature Usage Chart: bar chart showing how many times each major feature was used (Career Hub, University Hub, AI Mentor, Job Hub, Daily Challenge, etc.)
  - Active Users Chart: line chart showing daily active user count over the past 30 days
- All chart data sourced from browser storage activity logs

#### 2.15.3 User Management
- Table listing all registered users with columns:
  - User email
  - Registration date
  - Last active date/time
  - Features accessed (list or count)
  - Total sessions
- Pagination or scroll for large user lists
- Search bar to filter users by email
- Click on a user row → opens User Detail view showing:
  - Full activity log (which pages visited, which features used, timestamps)
  - Progress summary (subjects completed, quizzes taken, challenges done)
  - Applied jobs count
  - Saved jobs count
  - AI Mentor usage count

#### 2.15.4 Analytics Section
- How many users are currently active (based on recent session timestamps)
- Feature usage breakdown:
  - Career Hub visits
  - University Hub visits
  - AI Mentor sessions
  - Job Hub visits
  - Daily Challenge completions
  - Quiz completions
  - Resume Builder uses
  - Practice Lab sessions
  - Hackathon Mode sessions
- All analytics data read from browser storage activity logs written during normal user interactions

#### 2.15.5 Admin UI Design
- Consistent with overall app design (glassmorphism, gradient background, soft shadows)
- Sidebar navigation within Admin Panel: Dashboard, Users, Analytics
- Responsive layout
- No emoji or decorative icons that conflict with professional dashboard aesthetic
- Charts rendered using a lightweight charting library (e.g., Recharts)

---

## 3. Design Requirements

### 3.1 Visual Style
- Premium futuristic SaaS dashboard UI
- Glassmorphism effects: backdrop-blur, transparent cards, soft glowing borders
- Perfectly balanced background (soft blue + lavender + subtle purple + slight pink glow)
- Balanced gradient (not too light, not too dark)
- Animated floating blobs/orbs
- Layered gradients with depth
- Soft glow effects and glowing accents
- Smooth animations everywhere
- 3D hover effects: scale, rotateX, rotateY (3D tilt), glow shadow
- Micro animations
- Section-based background variations
- Modern startup SaaS dashboard aesthetic
- Attractive and student-friendly

### 3.2 Color Scheme
- Main theme: soft blue, lavender, purple, white, slight pink glow
- Glowing accents
- Soft gradient backgrounds

### 3.3 Interaction Design
- 3D hover tilt effects on cards
- Smooth transitions between sections
- Responsive layout for desktop, tablet, and mobile
- Smooth scrolling
- Page transitions
- Card hover effects
- Fade + slide animations
- Subtle parallax effect on mouse move
- All buttons clickable and working
- No unexpected redirects to Home or Landing

### 3.4 Styling Rules
Tailwind classes:
- bg-white/10
- backdrop-blur-xl
- border-white/20
- shadow-purple-500/30

### 3.5 Navigation
- Sidebar navigation
- Floating navbar
- Dark mode support
- Consistent UI across all pages

---

## 4. Business Rules and Logic

- Authentication state must be maintained across page refreshes using localStorage/session
- All protected routes redirect unauthenticated users to Login page
- Google Sign-In uses OSS Google login (not Google OAuth)
- Progress data, saved jobs, applied jobs, chat history, achievement badges, and daily challenge completion are all stored in browser storage
- Daily Challenge resets at midnight based on local time
- Smart Suggestions update dynamically after each user activity
- Achievement badge unlock conditions are evaluated against browser storage activity data
- Celebration animation triggers once per badge unlock
- Start Learning button always navigates to the relevant learning page (Notes tab, Beginner level), never to Landing or Home
- View Details in Advanced Networking must show full content (same behavior as Cloud Computing and IoT)
- All video embeds must be valid and relevant; invalid or unavailable videos must be removed entirely — no placeholder cards; all working videos must be preserved
- The new Software Engineer video (Software Engineer Roadmap 2026 (Full Blueprint), embed URL: https://www.youtube.com/embed/avdDEZCcluo) must be present in the Software Engineer Learning section alongside all existing working videos
- Full Stack Developer Learning section must include all previously working Full Stack Developer videos plus the two newly added videos: How to Become a Full Stack Developer | Web Development Explained (https://www.youtube.com/embed/5QzzeYHApV0) and Front End Web Development Tutorial for Beginners (Tamil) (https://www.youtube.com/embed/7dSJubxFWv0)
- Data Analyst Learning section must include the three specified videos: The Complete Data Analyst Roadmap (https://www.youtube.com/embed/YRJbhFLLPyE), Become Data Analyst From Scratch 2026 | Full Course (https://www.youtube.com/embed/Ul4BUSvMhT4), and Real Life of a Data Analyst | Day in the Life (https://www.youtube.com/embed/RrposkzcNcs); all previously broken or unavailable Data Analyst video cards must be removed
- Each career domain (Software Engineer, Data Analyst, Full Stack Developer, UX Designer) has its own independent, clearly titled video section; sections must never be mixed
- All video sections use a responsive grid layout with consistent card design, equal spacing, and a short description below each video card
- Code execution runs inside the app; users must never be asked to run code externally
- Create Image must always produce a visible rendered output (real image or SVG/HTML/CSS diagram); raw code must never be shown to the user
- AI Mentor must never display API errors, insufficient credits messages, or service unavailable messages to users
- AI responses must be strictly based on user input and uploaded content; hallucination is not permitted
- Chat history is scoped per user; each user sees only their own history
- Chat history persists in browser storage across sessions
- Admin Panel is accessible only to admin-role users; regular user UI is not affected
- Activity logging for admin analytics must be written to browser storage during all normal user interactions
- All navigation action buttons (Start Learning, View Challenge, Explore Career, Continue Reading) must resolve to the exact correct destination page, never to Home or Landing

---

## 5. Anomalies and Edge Cases

| Scenario | Expected Behavior |
|---|---|
| Google Sign-In fails | Show friendly error message; do not crash or expose technical details |
| Password does not meet rules | Show inline validation error per rule in real time |
| API for job listings unavailable | Show mock real structured data; never show empty state or error |
| AI API call fails | Use intelligent fallback response; never show error to user |
| Image uploaded is unclear or low quality | Respond: content not clear enough, ask for clarification |
| Create Image API unavailable | Render visible SVG/HTML/CSS diagram; never show code or say not capable |
| Code execution produces error | Display error message inline in output panel; do not crash |
| Video embed is unavailable | Remove that video card entirely; do not show placeholder |
| New Software Engineer video is unavailable | Remove that card; do not show placeholder |
| New Full Stack Developer video is unavailable | Remove that card; do not show placeholder |
| New Data Analyst video is unavailable | Remove that card; do not show placeholder |
| User has no activity for Smart Suggestion | Show default suggestions (explore Career Hub, try a quiz, build resume) |
| Badge already unlocked | Do not trigger celebration animation again |
| Daily Challenge already completed today | Show completed state with streak count; do not allow re-submission |
| User navigates to protected route without login | Redirect to Login page |
| File upload exceeds size limit | Show clear size limit message; do not proceed with upload |
| Unsupported file type uploaded | Show file type validation error inline |
| Chat history storage unavailable | Show: No previous chats; no technical error shown |
| User searches history with no matching results | Show: No chats found |
| Non-admin user attempts to access /admin | Redirect to Login page |
| Admin analytics data is empty (no users yet) | Show empty state with message: No data available yet |
| Smart Suggestion action button clicked | Must navigate to exact correct destination; never redirect to Home or Landing |
| Start Learning clicked from any context | Must open Notes tab at Beginner level for the relevant topic |
| Video grid has mixed domain videos | Each domain section must remain independent; no cross-section mixing |
| Full Stack Developer section has broken existing videos | Remove broken cards; retain all working cards alongside newly added videos |
| Data Analyst section has broken existing videos | Remove all broken cards; display only the three specified working videos plus any previously working videos that remain playable |

---

## 6. Acceptance Criteria

- Signup and Login use email only; no username field present
- Password validation enforces all 4 rules in real time with inline error messages
- Google Sign-In uses OSS Google login, shows account picker, and redirects to Home on success
- Authentication state persists across page refreshes; protected routes block unauthenticated access
- Get Started Free navigates to Login/Signup page, not directly to Home
- Go to Home button is not visible before login
- Home page is labeled Home (not Dashboard)
- Study Timer starts, pauses, and resets correctly
- All 3 subject detail pages (Cloud Computing, IoT, Advanced Networking) open with split view layout and full notes
- Advanced Networking View Details does not redirect to Home
- All 3 subjects have unique, meaningful 3D visualizations (not simple cubes)
- 3D scenes support zoom, rotate, pan, hover labels, and click-to-explain interactions
- All Career Hub tabs (Overview, Notes, Practice Lab, Hackathon Mode, Learning Roadmap, Learning Videos, External Links, Practice Questions) are present and functional for all 4 roles
- Practice Lab and Hackathon Mode run code inside the app with visible output and error panels
- Daily Challenge runs code inside the app
- Create Image always produces a visible rendered output; never shows raw code or says not capable
- AI Mentor never displays API errors, insufficient credits, or service unavailable messages
- AI responses are strictly based on user input and uploaded content; no hallucination
- Image upload correctly detects content type and responds appropriately
- Chat History stores conversations per user in browser storage and displays in sidebar with timestamps
- History panel shows first message preview and date/time for each past chat
- User can load and continue an old conversation from history
- New Chat button clears current chat and starts fresh without deleting history
- Delete icon removes individual chat from history
- Search bar in history filters chats by keyword in real time
- Pin and Rename features work correctly and persist in browser storage
- Resume Builder supports live preview, edit, and PDF download
- Job Hub displays real job data with filter system, save job, and realistic apply flow
- Skill Recommendation shows Python Programming, Communication Skills, Leadership, Time Management, Problem Solving, Interview Preparation (Data Analyst and Cloud Computing removed)
- Start Learning navigates to relevant Notes tab at Beginner level; no unexpected redirects
- View Challenge navigates to Daily Challenge or Practice Lab
- Explore Career navigates to Career Role Detail Page
- Continue Reading resumes last-read notes section
- Software Engineer Learning section retains all previously working video cards and includes the new Software Engineer Roadmap 2026 (Full Blueprint) video (https://www.youtube.com/embed/avdDEZCcluo)
- Full Stack Developer Learning section retains all previously working video cards and includes the two newly added videos: How to Become a Full Stack Developer | Web Development Explained (https://www.youtube.com/embed/5QzzeYHApV0) and Front End Web Development Tutorial for Beginners (Tamil) (https://www.youtube.com/embed/7dSJubxFWv0)
- Data Analyst Learning section displays the three specified videos (https://www.youtube.com/embed/YRJbhFLLPyE, https://www.youtube.com/embed/Ul4BUSvMhT4, https://www.youtube.com/embed/RrposkzcNcs) and removes all previously broken or unavailable video cards
- UX Designer Learning section retains all previously working video cards
- Each career domain has its own independent, clearly titled video section; no sections are mixed
- All video sections use a responsive grid layout with consistent card design (same border radius, same shadow, same card dimensions), equal spacing, and a short description below each video card
- No Video Unavailable cards are present in any section; broken video cards are removed entirely
- No mismatched titles, no layout issues, no empty cards in any video section
- All video grids are responsive: multi-column on desktop, single column on mobile
- Achievement badges track unlock conditions and display celebration animation on first unlock
- Progress Tracker shows correct metrics on Home, Profile, University Hub, and Career Hub
- Smart Suggestion shows up to 3 personalized recommendations; all action buttons navigate to exact correct destinations
- Admin Panel accessible only at /admin by admin-role users; regular users cannot access it
- Admin Dashboard shows Total Users, Active Users, Total Sessions, and Most Used Feature summary cards
- Admin User Growth Chart, Feature Usage Chart, and Active Users Chart render correctly from browser storage data
- Admin User Management table lists all users with email, registration date, last active, features accessed, and total sessions
- Admin user detail view shows full activity log and progress summary
- Admin Analytics section shows feature usage breakdown for all major features
- Admin UI is consistent with overall app design (glassmorphism, gradient)
- All buttons are clickable and functional; no broken navigation
- UI is consistent across all pages with glassmorphism, soft gradient background, and smooth animations
- No dummy content, no fake data, no broken features

---

## 7. Out of Scope (This Release)

- Backend server or cloud database (all persistence via browser storage)
- Native mobile application (iOS/Android)
- Multi-language/localization support
- Content management system accessible to non-admin users
- Real-time multiplayer or collaborative features
- Email verification or password reset flow
- Push notifications
- Payment or subscription system
- Social sharing features
- Vue, Svelte, Next.js, or other unsupported frontend frameworks