import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AnimatedBlobs } from '@/components/ui/animated-blobs';

import routes from './routes';

import { AuthProvider } from '@/contexts/AuthContext';
import { RouteGuard } from '@/components/common/RouteGuard';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <RouteGuard>
          <AnimatedBlobs />
          <FloatingParticles />
          <IntersectObserver />
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              <Routes>
              {routes.map((route, index) => {
                const Component = route.element;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
              <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
          <Toaster />
        </RouteGuard>
      </AuthProvider>
    </Router>
  );
};

export default App;
