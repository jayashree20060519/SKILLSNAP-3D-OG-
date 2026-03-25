import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UniversityHubPage from './pages/UniversityHubPage';
import CareerHubPage from './pages/CareerHubPage';
import CareerRolePage from './pages/CareerRolePage';
import SkillDetailPage from './pages/SkillDetailPage';
import JobHubPage from './pages/JobHubPage';
import AIMentorPage from './pages/AIMentorPage';
import ProfilePage from './pages/ProfilePage';
import GoalsPage from './pages/GoalsPage';
import SkillsPage from './pages/SkillsPage';
import SubjectDetailPage from './pages/SubjectDetailPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import StudyTimerPage from './pages/StudyTimerPage';
import LearningTipsPage from './pages/LearningTipsPage';
import LearningVideosPage from './pages/LearningVideosPage';
import AchievementsPage from './pages/AchievementsPage';
import ProgressPage from './pages/ProgressPage';
import DailyChallengePage from './pages/DailyChallengePage';
import SuggestionsPage from './pages/SuggestionsPage';
import AdminPage from './pages/AdminPage';
import type { ComponentType } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ComponentType;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Landing',
    path: '/',
    element: LandingPage
  },
  {
    name: 'Login',
    path: '/login',
    element: LoginPage
  },
  {
    name: 'Home',
    path: '/dashboard',
    element: DashboardPage
  },
  {
    name: 'University Hub',
    path: '/university',
    element: UniversityHubPage
  },
  {
    name: 'Subject Detail',
    path: '/subject/:subjectId',
    element: SubjectDetailPage
  },
  {
    name: 'Career Hub',
    path: '/career',
    element: CareerHubPage
  },
  {
    name: 'Career Role',
    path: '/career/:roleId',
    element: CareerRolePage
  },
  {
    name: 'Skill Detail',
    path: '/skill/:skillId',
    element: SkillDetailPage
  },
  {
    name: 'Job Hub',
    path: '/jobs',
    element: JobHubPage
  },
  {
    name: 'AI Mentor',
    path: '/ai-mentor',
    element: AIMentorPage
  },
  {
    name: 'Resume Builder',
    path: '/resume-builder',
    element: ResumeBuilderPage
  },
  {
    name: 'Profile',
    path: '/profile',
    element: ProfilePage
  },
  {
    name: 'Goals',
    path: '/goals',
    element: GoalsPage
  },
  {
    name: 'Skills',
    path: '/skills',
    element: SkillsPage
  },
  {
    name: 'Study Timer',
    path: '/study-timer',
    element: StudyTimerPage
  },
  {
    name: 'Learning Tips',
    path: '/learning-tips',
    element: LearningTipsPage
  },
  {
    name: 'Learning Videos',
    path: '/videos',
    element: LearningVideosPage
  },
  {
    name: 'Achievements',
    path: '/achievements',
    element: AchievementsPage
  },
  {
    name: 'Progress',
    path: '/progress',
    element: ProgressPage
  },
  {
    name: 'Daily Challenge',
    path: '/daily-challenge',
    element: DailyChallengePage
  },
  {
    name: 'Smart Suggestions',
    path: '/suggestions',
    element: SuggestionsPage
  },
  {
    name: 'Admin',
    path: '/admin',
    element: AdminPage
  }
];

export default routes;
