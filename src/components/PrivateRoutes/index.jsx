import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../../helpers/cookie'

function PrivateRoutes() {
  const token = getCookie('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoutes
