import PrivateRoutes from '../components/PrivateRoutes'
import LayoutDefault from '../layout/LayoutDefault'
import Customization from '../pages/Customization'
import Error404 from '../pages/Error404'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import RegisterShop from '../pages/Register'
import Translation from '../pages/Translation'

export const routes = [
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        path: '',
        element: <PrivateRoutes />,
        children: [
          {
            path: 'customization',
            element: <Customization />,
          },
          {
            path: 'translations',
            element: <Translation />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <RegisterShop />,
  },
  {
    path: 'logout',
    element: <Logout />,
  },
  {
    path: '*',
    element: <Error404 />,
  },
]
