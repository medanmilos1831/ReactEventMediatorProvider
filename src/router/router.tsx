import { createBrowserRouter, NavLink, Outlet } from 'react-router-dom';
import { ScrollProvider } from '../components';
import { Col, Row } from 'antd';
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
            <Row
              style={{
                height: '100%',
              }}
            >
              <Col
                span={4}
                style={{
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  background: '#141226',
                }}
              >
                <NavLink
                  style={{
                    color: 'white',
                  }}
                  to={'/'}
                >
                  Introduction
                </NavLink>
                <NavLink
                  style={{
                    color: 'white',
                  }}
                  to={'/subscribe'}
                >
                  sub
                </NavLink>
                <NavLink
                  style={{
                    color: 'white',
                  }}
                  to={'/dispatch'}
                >
                  dis
                </NavLink>
              </Col>
              <Col
                span={20}
                style={{
                  padding: '4rem',
                }}
              >
                <ScrollProvider>
                  <Outlet />
                </ScrollProvider>
              </Col>
            </Row>
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
