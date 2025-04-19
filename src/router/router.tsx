import { createBrowserRouter, NavLink, Outlet } from 'react-router-dom';

export const router = () =>
  createBrowserRouter(
    [
      {
        element: (
          <>
            <div>
              <NavLink to={'/'}>home</NavLink>
              <NavLink to={'/subscribe'}>sub</NavLink>
              <NavLink to={'/dispatch'}>dis</NavLink>
            </div>
            <div>
              <Outlet />
            </div>
          </>
        ),
        children: [
          {
            index: true,
            element: <>Home</>,
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
