import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MarketingLayout, DashboardLayout } from './components/layout/Layouts';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { LessonDetail } from './pages/LessonDetail';
import { Interview } from './pages/Interview';
import { InterviewDetail } from './pages/InterviewDetail';
import { DSA } from './pages/DSA';
import { DSATopicPage } from './pages/DSATopicPage';
import { DSAProblemPage } from './pages/DSAProblemPage';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Roadmap } from './pages/Roadmap';
import { Projects } from './pages/Projects';
import { Bookmarks } from './pages/Bookmarks';
import { NotFound } from './pages/NotFound';
import { SwiftUI, UIKit, Architecture, About, Contact } from './pages/PlaceholderPages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'learn', element: <Learn /> },
      // Note: LessonDetail uses LearningLayout which includes Navbar/Footer itself,
      // so it is defined outside MarketingLayout
      { path: 'interview', element: <Interview /> },
      { path: 'interview/:slug', element: <InterviewDetail /> },
      { path: 'dsa', element: <DSA /> },
      { path: 'dsa/:topicSlug', element: <DSATopicPage /> },
      { path: 'dsa/:topicSlug/:problemSlug', element: <DSAProblemPage /> },
      { path: 'swiftui', element: <SwiftUI /> },
      { path: 'uikit', element: <UIKit /> },
      { path: 'architecture', element: <Architecture /> },
      { path: 'roadmap', element: <Roadmap /> },
      { path: 'projects', element: <Projects /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogDetail /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <About /> },
      { path: 'terms', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/learn/swift/:slug',
    element: <LessonDetail />,
  },
  {
    path: '/bookmarks',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Bookmarks /> },
    ],
  },
]);
