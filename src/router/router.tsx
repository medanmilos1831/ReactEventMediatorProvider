import { createBrowserRouter, NavLink, Outlet } from 'react-router-dom';
import { ScrollProvider } from '../components';
import { Introduction } from '../pages/Introduction';

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
                <NavLink to="/subscribe" className="text-white hover:underline">
                  sub
                </NavLink>
                <NavLink to="/dispatch" className="text-white hover:underline">
                  dis
                </NavLink>
              </div>

              <div className="w-4/5 px-16 relative h-full">
                <ScrollProvider>
                  <ScrollProvider.Container>
                    <Outlet />
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
            path: '/subscribe',
            element: <>subscribe</>,
          },
          {
            path: '/dispatch',
            element: <>dispatch</>,
          },
        ],
      },
    ],
    {
      basename: '/ReactEventMediatorProvider',
    }
  );
