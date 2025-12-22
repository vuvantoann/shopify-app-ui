import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../store/authSlice'
import { deleteCookie } from '../../helpers/cookie'

function Logout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    deleteCookie('token')
    dispatch(logout())
    navigate('/login')
  }, [])

  return null
}

export default Logout
