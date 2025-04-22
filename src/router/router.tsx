import { createBrowserRouter, NavLink, Outlet } from 'react-router-dom';
import { ScrollProvider } from '../components';
import { Introduction } from '../pages/Introduction';
import { QuickStart } from '../pages/QuickStart';
import { CoreConcepts } from '../pages/CoreConcepts';
import { ApiReference } from '../pages/ApiReference';
import { AdvancedTopics } from '../pages/AdvancedTopics';

export const router = () =>
  createBrowserRouter(
    [
      {
        element: (
          <div
            style={{
              height: '100vh',
              width: '100vw',
              background: '#0f0b2b',
            }}
          >
            <div className="flex h-full">
              <div className="flex flex-col h-full bg-[#141226] text-white w-1/5 p-4 space-y-4">
                <NavLink to="/" className="text-white hover:underline">
                  Introduction
                </NavLink>
                <NavLink
                  to="/quick-start"
                  className="text-white hover:underline"
                >
                  Quick start
                </NavLink>
                <NavLink to="/core" className="text-white hover:underline">
                  Core Concepts
                </NavLink>
                <NavLink
                  to="/api-reference"
                  className="text-white hover:underline"
                >
                  Api Reference
                </NavLink>
                <NavLink
                  to="/advanced-topics"
                  className="text-white hover:underline"
                >
                  Advanced Topics
                </NavLink>
              </div>

              <div className="w-4/5 relative h-full">
                <ScrollProvider>
                  <ScrollProvider.Container>
                    <div className="px-16">
                      <Outlet />
                    </div>
                  </ScrollProvider.Container>
                </ScrollProvider>
              </div>
            </div>
          </div>
        ),
        children: [
          {
            index: true,
            element: <Introduction />,
          },
          {
            path: '/quick-start',
            element: <QuickStart />,
          },
          {
            path: '/core',
            element: <CoreConcepts />,
          },
          {
            path: '/api-reference',
            element: <ApiReference />,
          },
          {
            path: '/advanced-topics',
            element: <AdvancedTopics />,
          },
        ],
      },
    ],
    {
      basename: '/ReactEventMediatorProvider',
    }
  );
