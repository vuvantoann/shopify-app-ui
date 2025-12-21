import PrivateRoutes from '../components/PrivateRoutes'
import LayoutDefault from '../layout/LayoutDefault'
import Customization from '../pages/Customization'
import Error404 from '../pages/Error404'
import Login from '../pages/Login'
import Translation from '../pages/Translation'

export const routes = [
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
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
    path: '*',
    element: <Error404 />,
  },
]
