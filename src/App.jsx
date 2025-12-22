import { useDispatch } from 'react-redux'
import AllRoute from './routes'
import { getCookie } from './helpers/cookie'
import { loginSuccess } from './store/authSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getCookie('token')
    if (token) {
      dispatch(loginSuccess())
    }
  }, [])
  return (
    <>
      <AllRoute />
    </>
  )
}

export default App
