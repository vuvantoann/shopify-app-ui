import { useState } from 'react'
import { Page, Card, TextField, Button, Toast, Frame } from '@shopify/polaris'
import { useNavigate } from 'react-router-dom'
import { loginShop } from '../../services/shopService'
import './Login.css'
import { setCookie } from '../../helpers/cookie'

function LoginShop() {
  const navigate = useNavigate()

  const [shopifyDomain, setShopifyDomain] = useState('')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!shopifyDomain) {
      setToast({
        content: 'Vui lòng nhập shopify domain',
        error: true,
      })
      return
    }

    try {
      setLoading(true)
      const result = await loginShop({
        shopify_domain: shopifyDomain,
      })

      console.log('toàn đep trai', result)

      if (result.code === 200) {
        // token = shopify_domain
        setCookie('token', result.token, 1)

        setToast({ content: result.message })
        navigate('/')
      } else {
        setToast({
          content: result.message || 'Đăng nhập shop thất bại',
          error: true,
        })
      }
    } catch (error) {
      console.error(error)
      setToast({
        content: 'Có lỗi xảy ra, vui lòng thử lại',
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
                onChange={(value) => setShopifyDomain(value)}
                autoComplete="off"
              />

              <Button primary fullWidth onClick={handleLogin} loading={loading}>
                Login
              </Button>
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
