import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lightbulb, Target, BookOpen, Play, ExternalLink } from 'lucide-react';

interface SkillData {
  id: string;
  title: string;
  description: string;
  why: string[];
  howToLearn: string[];
  tools: string[];
  roadmap: string[];
  videos: Array<{
    title: string;
    videoId: string;
  }>;
  resources: Array<{
    name: string;
    url: string;
  }>;
}

const skillsData: Record<string, SkillData> = {
  'python-programming': {
    id: 'python-programming',
    title: 'Python Programming',
    description: 'Python is a versatile, high-level programming language known for its simplicity and readability. It\'s widely used in web development, data science, artificial intelligence, automation, and scientific computing. Python\'s extensive library ecosystem and beginner-friendly syntax make it one of the most popular programming languages in 2026.',
    why: [
      'Easiest programming language to learn for beginners',
      'Highest demand in data science, AI, and machine learning',
      'Versatile - used in web dev, automation, scripting, and more',
      'Huge community support and extensive libraries',
      'High-paying jobs across multiple industries',
      'Great for rapid prototyping and development',
      'Powers major companies like Google, Netflix, Instagram',
      'Essential for modern tech careers'
    ],
    howToLearn: [
      'Start with Python basics: variables, data types, loops, functions',
      'Practice on coding platforms like HackerRank, LeetCode',
      'Build small projects: calculator, to-do list, web scraper',
      'Learn object-oriented programming (OOP) concepts',
      'Explore Python libraries: NumPy, Pandas, Matplotlib',
      'Work on real-world projects: data analysis, web apps',
      'Contribute to open-source Python projects',
      'Take online courses and follow Python tutorials'
    ],
    tools: [
      'IDEs: VS Code, PyCharm, Jupyter Notebook',
      'Libraries: NumPy, Pandas, Matplotlib, Scikit-learn',
      'Web Frameworks: Django, Flask, FastAPI',
      'Data Science: Jupyter, Anaconda',
      'Testing: Pytest, Unittest',
      'Package Manager: pip, conda'
    ],
    roadmap: [
      '1. Learn Python syntax and basic concepts (2-4 weeks)',
      '2. Master data structures: lists, dictionaries, sets, tuples (2 weeks)',
      '3. Understand control flow: if/else, loops, functions (2 weeks)',
      '4. Learn object-oriented programming (OOP) (3 weeks)',
      '5. Work with files and exception handling (1 week)',
      '6. Explore Python libraries based on your interest (4 weeks)',
      '7. Build 5-10 projects to solidify your skills (8 weeks)',
      '8. Learn advanced topics: decorators, generators, async (4 weeks)',
      '9. Contribute to open-source or build your own projects (ongoing)'
    ],
    videos: [
      {
        title: 'Python Full Course for Beginners 2026',
        videoId: '_uQrJ0TkZlc'
      },
      {
        title: 'Python Tutorial - Python for Beginners',
        videoId: 'rfscVS0vtbw'
      },
      {
        title: 'Learn Python in 2026 - Complete Roadmap',
        videoId: 'mDKM-JtUhhc'
      }
    ],
    resources: [
      { name: 'Python.org - Official Documentation', url: 'https://docs.python.org/' },
      { name: 'Real Python - Tutorials', url: 'https://realpython.com/' },
      { name: 'GeeksforGeeks - Python', url: 'https://www.geeksforgeeks.org/python-programming-language/' },
      { name: 'W3Schools - Python Tutorial', url: 'https://www.w3schools.com/python/' },
      { name: 'LeetCode - Python Practice', url: 'https://leetcode.com/' },
      { name: 'Python Package Index (PyPI)', url: 'https://pypi.org/' }
    ]
  },
  'problem-solving': {
    id: 'problem-solving',
    title: 'Problem Solving',
    description: 'Problem Solving is the ability to analyze complex situations, identify root causes, and develop effective solutions. It\'s a critical skill for software engineers, data analysts, and professionals in any field. Strong problem-solving skills involve logical thinking, creativity, pattern recognition, and systematic approaches to challenges.',
    why: [
      'Essential for technical interviews and coding challenges',
      'Core skill for software development and debugging',
      'Improves decision-making in all aspects of life',
      'Highly valued by employers across industries',
      'Enables you to tackle complex projects confidently',
      'Develops analytical and critical thinking abilities',
      'Helps break down large problems into manageable parts',
      'Foundation for algorithms and data structures mastery'
    ],
    howToLearn: [
      'Practice coding challenges on LeetCode, HackerRank, CodeForces',
      'Learn common problem-solving patterns and techniques',
      'Study algorithms and data structures systematically',
      'Solve puzzles and brain teasers regularly',
      'Participate in coding competitions and hackathons',
      'Analyze and learn from others\' solutions',
      'Practice explaining your thought process out loud',
      'Work on real-world projects with complex requirements'
    ],
    tools: [
      'Coding Platforms: LeetCode, HackerRank, CodeForces, CodeChef',
      'Visualization: VisuAlgo, Algorithm Visualizer',
      'IDEs: VS Code, IntelliJ IDEA, PyCharm',
      'Whiteboarding: Excalidraw, Miro, Draw.io',
      'Books: Cracking the Coding Interview, Elements of Programming Interviews',
      'Practice: Project Euler, Advent of Code'
    ],
    roadmap: [
      '1. Master basic programming concepts and syntax (2-3 weeks)',
      '2. Learn fundamental data structures: arrays, strings, linked lists (3 weeks)',
      '3. Study common algorithms: sorting, searching, recursion (3 weeks)',
      '4. Practice easy problems daily (20-30 problems) (4 weeks)',
      '5. Learn problem-solving patterns: two pointers, sliding window, etc. (4 weeks)',
      '6. Tackle medium difficulty problems (50+ problems) (8 weeks)',
      '7. Study advanced data structures: trees, graphs, heaps (6 weeks)',
      '8. Master dynamic programming and greedy algorithms (6 weeks)',
      '9. Practice hard problems and participate in contests (ongoing)',
      '10. Mock interviews and system design practice (4 weeks)'
    ],
    videos: [
      {
        title: 'Problem Solving Techniques for Programmers',
        videoId: '8mAITcNt710'
      },
      {
        title: 'How to Solve Coding Problems - Systematic Approach',
        videoId: 'GBuHSRDGZBY'
      },
      {
        title: 'Data Structures and Algorithms Full Course',
        videoId: 'RBSGKlAvoiM'
      }
    ],
    resources: [
      { name: 'LeetCode - Practice Problems', url: 'https://leetcode.com/' },
      { name: 'HackerRank - Coding Challenges', url: 'https://www.hackerrank.com/' },
      { name: 'VisuAlgo - Algorithm Visualizations', url: 'https://visualgo.net/' },
      { name: 'GeeksforGeeks - Problem Solving', url: 'https://www.geeksforgeeks.org/' },
      { name: 'Cracking the Coding Interview', url: 'https://www.crackingthecodinginterview.com/' },
      { name: 'Project Euler - Math Problems', url: 'https://projecteuler.net/' }
    ]
  },
  'interview-preparation': {
    id: 'interview-preparation',
    title: 'Interview Preparation',
    description: 'Interview Preparation encompasses all skills needed to successfully navigate technical and behavioral interviews. This includes coding interviews, system design, behavioral questions, resume building, and communication skills. Proper preparation significantly increases your chances of landing your dream job in tech.',
    why: [
      'Critical for landing jobs at top tech companies',
      'Builds confidence and reduces interview anxiety',
      'Helps you showcase your skills effectively',
      'Teaches you to think and communicate under pressure',
      'Improves your technical and soft skills simultaneously',
      'Increases salary negotiation leverage',
      'Opens doors to better career opportunities',
      'Develops professional communication abilities'
    ],
    howToLearn: [
      'Practice coding problems on LeetCode (Easy → Medium → Hard)',
      'Study system design fundamentals and common patterns',
      'Prepare answers for common behavioral questions (STAR method)',
      'Do mock interviews with peers or platforms like Pramp',
      'Research companies and tailor your preparation',
      'Build a strong portfolio of projects',
      'Practice explaining your thought process clearly',
      'Review your resume and prepare your story'
    ],
    tools: [
      'Coding Practice: LeetCode, HackerRank, CodeSignal',
      'Mock Interviews: Pramp, Interviewing.io, Exponent',
      'System Design: Grokking System Design, System Design Primer',
      'Resume: Overleaf, Canva, Resume.io',
      'Behavioral: STAR method framework, Glassdoor reviews',
      'Whiteboarding: Excalidraw, Miro, Google Jamboard'
    ],
    roadmap: [
      '1. Build a strong resume highlighting projects and skills (1 week)',
      '2. Master data structures and algorithms basics (4-6 weeks)',
      '3. Solve 100+ LeetCode problems (Easy: 40, Medium: 50, Hard: 10) (8-12 weeks)',
      '4. Learn system design fundamentals and patterns (4 weeks)',
      '5. Prepare behavioral answers using STAR method (1 week)',
      '6. Research target companies and their interview process (1 week)',
      '7. Do 10+ mock interviews to build confidence (2-3 weeks)',
      '8. Practice whiteboarding and explaining solutions (2 weeks)',
      '9. Review common interview questions for your role (1 week)',
      '10. Prepare questions to ask interviewers (1 week)',
      '11. Schedule and ace your interviews! (ongoing)'
    ],
    videos: [
      {
        title: 'How to Prepare for Technical Interviews',
        videoId: 'KdXAUst8bdo'
      },
      {
        title: 'System Design Interview Preparation',
        videoId: 'UzLMhqg3_Wc'
      },
      {
        title: 'Behavioral Interview Questions and Answers',
        videoId: 'PJKYqLP6MRE'
      }
    ],
    resources: [
      { name: 'LeetCode - Interview Prep', url: 'https://leetcode.com/explore/interview/' },
      { name: 'Pramp - Free Mock Interviews', url: 'https://www.pramp.com/' },
      { name: 'System Design Primer - GitHub', url: 'https://github.com/donnemartin/system-design-primer' },
      { name: 'Glassdoor - Interview Reviews', url: 'https://www.glassdoor.com/' },
      { name: 'Cracking the Coding Interview', url: 'https://www.crackingthecodinginterview.com/' },
      { name: 'Blind - Tech Interview Discussion', url: 'https://www.teamblind.com/' }
    ]
  },
  'leadership': {
    id: 'leadership',
    title: 'Leadership',
    description: 'Leadership is the ability to guide, inspire, and influence others toward achieving common goals. It involves decision-making, team management, communication, and strategic thinking. Essential for career growth into management, team lead, and executive positions.',
    why: [
      'Critical for career advancement to senior positions',
      'Increases earning potential significantly',
      'Enables you to make bigger impact on projects',
      'Develops valuable soft skills for any career',
      'Opens doors to management and executive roles',
      'Improves team collaboration and productivity',
      'Essential for entrepreneurship and startups',
      'Transferable across all industries and roles'
    ],
    howToLearn: [
      'Read leadership books (Start with Why, Leaders Eat Last)',
      'Take on leadership roles in projects or clubs',
      'Practice active listening and empathy',
      'Learn conflict resolution and negotiation',
      'Study successful leaders and their strategies',
      'Mentor junior team members',
      'Take leadership courses and workshops',
      'Seek feedback and continuously improve'
    ],
    tools: [
      'Project Management: Jira, Asana, Trello',
      'Communication: Slack, Microsoft Teams, Zoom',
      'Feedback Tools: 15Five, Lattice',
      'Goal Setting: OKRs, SMART goals',
      'Time Management: Calendly, Notion',
      'Team Collaboration: Miro, FigJam'
    ],
    roadmap: [
      '1. Develop self-awareness and emotional intelligence (ongoing)',
      '2. Learn effective communication skills (4 weeks)',
      '3. Study leadership theories and styles (3 weeks)',
      '4. Practice decision-making and problem-solving (ongoing)',
      '5. Lead small projects or initiatives (2-3 months)',
      '6. Learn conflict resolution and negotiation (3 weeks)',
      '7. Develop strategic thinking skills (ongoing)',
      '8. Mentor and coach team members (ongoing)',
      '9. Take on larger leadership responsibilities (6+ months)'
    ],
    videos: [
      {
        title: 'Leadership Skills - Complete Course',
        videoId: 'bJNpHvEqyLY'
      },
      {
        title: 'How to Be a Great Leader',
        videoId: 'VFIuJdwsIDM'
      },
      {
        title: 'Leadership and Management Skills',
        videoId: 'Ks-_Mh1QhMc'
      }
    ],
    resources: [
      { name: 'Harvard Business Review - Leadership', url: 'https://hbr.org/topic/leadership' },
      { name: 'LinkedIn Learning - Leadership', url: 'https://www.linkedin.com/learning/topics/leadership' },
      { name: 'TED Talks - Leadership', url: 'https://www.ted.com/topics/leadership' },
      { name: 'MindTools - Leadership Skills', url: 'https://www.mindtools.com/leadership-skills' },
      { name: 'Coursera - Leadership Courses', url: 'https://www.coursera.org/courses?query=leadership' },
      { name: 'Books: Start with Why, Leaders Eat Last', url: 'https://simonsinek.com/' }
    ]
  },
  'communication': {
    id: 'communication',
    title: 'Communication',
    description: 'Communication is the ability to effectively convey information, ideas, and emotions to others through verbal, written, and non-verbal means. It\'s a fundamental skill for collaboration, leadership, and professional success in any field.',
    why: [
      'Essential for all careers and professional growth',
      'Improves team collaboration and productivity',
      'Critical for leadership and management roles',
      'Enhances networking and relationship building',
      'Increases influence and persuasion abilities',
      'Reduces misunderstandings and conflicts',
      'Boosts confidence in presentations and meetings',
      'Transferable across all industries'
    ],
    howToLearn: [
      'Practice active listening in conversations',
      'Join public speaking clubs like Toastmasters',
      'Write regularly: blogs, articles, documentation',
      'Give presentations and seek feedback',
      'Learn body language and non-verbal cues',
      'Practice empathy and emotional intelligence',
      'Read books on communication skills',
      'Engage in debates and discussions'
    ],
    tools: [
      'Presentation: PowerPoint, Google Slides, Canva',
      'Video Conferencing: Zoom, Google Meet, Microsoft Teams',
      'Writing: Grammarly, Hemingway Editor',
      'Collaboration: Slack, Microsoft Teams',
      'Feedback: Loom for video messages',
      'Note-taking: Notion, Evernote'
    ],
    roadmap: [
      '1. Develop active listening skills (2 weeks)',
      '2. Practice clear and concise writing (4 weeks)',
      '3. Learn public speaking basics (3 weeks)',
      '4. Study body language and non-verbal communication (2 weeks)',
      '5. Practice giving presentations (ongoing)',
      '6. Learn conflict resolution communication (3 weeks)',
      '7. Develop empathy and emotional intelligence (ongoing)',
      '8. Master professional email and business writing (3 weeks)',
      '9. Continuously practice and seek feedback (ongoing)'
    ],
    videos: [
      {
        title: 'Communication Skills - Complete Course',
        videoId: 'Unzc731iCUY'
      },
      {
        title: 'How to Improve Communication Skills',
        videoId: 'aX1JT4e8sSU'
      },
      {
        title: 'Effective Communication Techniques',
        videoId: 'HAnw168huqA'
      }
    ],
    resources: [
      { name: 'Toastmasters International', url: 'https://www.toastmasters.org/' },
      { name: 'Coursera - Communication Skills', url: 'https://www.coursera.org/courses?query=communication' },
      { name: 'LinkedIn Learning - Communication', url: 'https://www.linkedin.com/learning/topics/communication' },
      { name: 'TED Talks - Communication', url: 'https://www.ted.com/topics/communication' },
      { name: 'Grammarly Blog', url: 'https://www.grammarly.com/blog/' },
      { name: 'Harvard Business Review - Communication', url: 'https://hbr.org/topic/communication' }
    ]
  },
  'time-management': {
    id: 'time-management',
    title: 'Time Management',
    description: 'Time Management is the process of planning and organizing how to divide your time between different activities. Good time management enables you to work smarter, not harder, leading to increased productivity, reduced stress, and better work-life balance.',
    why: [
      'Increases productivity and efficiency significantly',
      'Reduces stress and prevents burnout',
      'Improves work-life balance',
      'Helps achieve goals faster',
      'Essential for handling multiple responsibilities',
      'Boosts professional reputation and reliability',
      'Creates more time for personal growth',
      'Critical for academic and career success'
    ],
    howToLearn: [
      'Learn prioritization techniques (Eisenhower Matrix)',
      'Use time-blocking and scheduling methods',
      'Practice the Pomodoro Technique',
      'Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)',
      'Track your time to identify time-wasters',
      'Learn to say no to non-essential tasks',
      'Use productivity tools and apps',
      'Review and adjust your schedule regularly'
    ],
    tools: [
      'Task Management: Todoist, Microsoft To Do, Any.do',
      'Calendar: Google Calendar, Outlook Calendar',
      'Time Tracking: Toggl, RescueTime, Clockify',
      'Pomodoro: Focus Keeper, Pomodone',
      'Note-taking: Notion, Evernote, OneNote',
      'Project Management: Trello, Asana, Monday.com'
    ],
    roadmap: [
      '1. Assess your current time usage (1 week)',
      '2. Learn prioritization techniques (1 week)',
      '3. Implement time-blocking method (2 weeks)',
      '4. Practice Pomodoro Technique (2 weeks)',
      '5. Set up a task management system (1 week)',
      '6. Learn to eliminate time-wasters (ongoing)',
      '7. Develop morning and evening routines (2 weeks)',
      '8. Master goal-setting (SMART goals) (2 weeks)',
      '9. Continuously review and optimize (ongoing)'
    ],
    videos: [
      {
        title: 'Time Management Skills - Complete Guide',
        videoId: 'iONDebHX9qk'
      },
      {
        title: 'How to Manage Your Time Better',
        videoId: 'n7wH2XdOWpM'
      },
      {
        title: 'Productivity and Time Management',
        videoId: 'YTIhBBmL_fM'
      }
    ],
    resources: [
      { name: 'Todoist - Productivity Blog', url: 'https://todoist.com/productivity-methods' },
      { name: 'RescueTime Blog', url: 'https://blog.rescuetime.com/' },
      { name: 'Coursera - Time Management', url: 'https://www.coursera.org/courses?query=time%20management' },
      { name: 'MindTools - Time Management', url: 'https://www.mindtools.com/time-management' },
      { name: 'Getting Things Done (GTD)', url: 'https://gettingthingsdone.com/' },
      { name: 'Pomodoro Technique', url: 'https://francescocirillo.com/pages/pomodoro-technique' }
    ]
  }
};

export default function SkillDetailPage() {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();

  const skill = skillId ? skillsData[skillId] : null;

  if (!skill) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card3D className="text-center py-12">
            <p className="text-muted-foreground">Skill not found</p>
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
          <h1 className="text-4xl font-bold gradient-text mb-2">{skill.title}</h1>
          <p className="text-muted-foreground text-lg">{skill.description}</p>
        </div>

        <div className="space-y-6">
          {/* Why Important */}
          <Card3D hover={false}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Why is {skill.title} Important?
            </h2>
            <ul className="space-y-2">
              {skill.why.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{reason}</span>
                </li>
              ))}
            </ul>
          </Card3D>

          {/* How to Learn */}
          <Card3D hover={false}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-secondary" />
              How to Learn {skill.title}
            </h2>
            <div className="space-y-2">
              {skill.howToLearn.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                  <span className="text-secondary font-bold">{index + 1}.</span>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </Card3D>

          {/* Tools */}
          <Card3D hover={false}>
            <h2 className="text-2xl font-bold mb-4">Tools & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skill.tools.map((tool, index) => (
                <div key={index} className="p-2 border rounded-lg text-sm">
                  {tool}
                </div>
              ))}
            </div>
          </Card3D>

          {/* Roadmap */}
          <Card3D hover={false}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Learning Roadmap
            </h2>
            <div className="space-y-2">
              {skill.roadmap.map((step, index) => (
                <div key={index} className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </Card3D>

          {/* Videos */}
          {skill.videos && skill.videos.filter(v => v.videoId && v.videoId.trim()).length > 0 && (
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Play className="h-6 w-6 text-red-500" />
                Learning Videos
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {skill.videos.filter(v => v.videoId && v.videoId.trim()).map((video, index) => (
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
          )}

          {/* External Resources */}
          <Card3D hover={false}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ExternalLink className="h-6 w-6 text-primary" />
              External Learning Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skill.resources.map((resource, index) => (
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
              <h2 className="text-2xl font-bold">Ready to Master {skill.title}?</h2>
              <p className="text-muted-foreground">
                Start learning today and boost your career prospects
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
        </div>
      </div>
    </Layout>
  );
}
