import { useState } from 'react'
import {
  Page,
  Card,
  TextField,
  Button,
  Toast,
  Frame,
  Text,
  Link,
} from '@shopify/polaris'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { loginShop } from '../../services/shopService'
import { setCookie } from '../../helpers/cookie'
import { loginSuccess } from '../../store/authSlice'

import './Login.css'

function LoginShop() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [shopifyDomain, setShopifyDomain] = useState('')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!shopifyDomain) {
      setToast({
        content: 'Please enter your Shopify domain',
        error: true,
      })
      return
    }

    try {
      setLoading(true)

      const result = await loginShop({
        shopify_domain: shopifyDomain,
      })

      if (result.code === 200) {
        setCookie('token', result.token, 1)
        dispatch(loginSuccess())
        setToast({ content: result.message })
        navigate('/customization')
      } else {
        setToast({
          content: result.message || 'Login failed',
          error: true,
        })
      }
    } catch (error) {
      console.error(error)
      setToast({
        content: 'Something went wrong, please try again',
        error: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Frame>
      <Page>
        <div className="login">
          <Card title="Login to your shop" sectioned>
            <div className="login__form">
              <TextField
                label="Shopify domain"
                placeholder="example.myshopify.com"
                value={shopifyDomain}
                onChange={setShopifyDomain}
                autoComplete="off"
              />

              <Button primary fullWidth onClick={handleLogin} loading={loading}>
                Login
              </Button>

              {/* 🔥 NEW LINE */}
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <Text as="span" tone="subdued">
                  Don’t have an account?{' '}
                </Text>
                <Link onClick={() => navigate('/register')}>Create shop</Link>
              </div>
            </div>
          </Card>
        </div>
      </Page>

      {toast && (
        <Toast
          content={toast.content}
          error={toast.error}
          onDismiss={() => setToast(null)}
        />
      )}
    </Frame>
  )
}

export default LoginShop
