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

import { createShop } from '../../services/shopService'
import { setCookie } from '../../helpers/cookie'
import { loginSuccess } from '../../store/authSlice'
import './Register.css'
function RegisterShop() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [shopifyDomain, setShopifyDomain] = useState('')
  const [shopOwner, setShopOwner] = useState('')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!shopifyDomain || !shopOwner) {
      setToast({
        content: 'Please fill in all fields',
        error: true,
      })
      return
    }

    try {
      setLoading(true)

      const result = await createShop({
        shopify_domain: shopifyDomain,
        shop_owner: shopOwner,
      })

      if (result.code === 200 || result.code === 201) {
        // 🔥 AUTO LOGIN
        setCookie('token', result.token, 1)
        dispatch(loginSuccess())

        setToast({ content: result.message || 'Shop created successfully' })
        navigate('/customization') // 🔥 về trang chủ luôn
      } else {
        setToast({
          content: result.message || 'Register failed',
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
        <div className="register">
          <Card title="Create your shop" sectioned>
            <div className="register__form">
              <TextField
                label="Shop owner name"
                placeholder="Your name"
                value={shopOwner}
                onChange={setShopOwner}
                autoComplete="off"
              />

              <TextField
                label="Shopify domain"
                placeholder="example.myshopify.com"
                value={shopifyDomain}
                onChange={setShopifyDomain}
                autoComplete="off"
              />

              <Button
                primary
                fullWidth
                onClick={handleRegister}
                loading={loading}
              >
                Create shop
              </Button>

              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <Text as="span" tone="subdued">
                  Already have an account?{' '}
                </Text>
                <Link onClick={() => navigate('/login')}>Login</Link>
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

export default RegisterShop
