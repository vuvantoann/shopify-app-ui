import { useState } from 'react'
import {
  Page,
  Card,
  Button,
  Toast,
  Frame,
  Text,
  TextField,
  BlockStack,
} from '@shopify/polaris'
import { useNavigate } from 'react-router-dom'
import { createTranslation } from '../../../services/translationSevice'

export default function TranslationCreate() {
  const navigate = useNavigate()
  const [locale, setLocale] = useState('')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!locale) {
      setToast({
        content: 'Please enter a language code',
        error: true,
      })
      return
    }

    try {
      setLoading(true)

      const result = await createTranslation({ locale })

      if (result.code === 200) {
        setToast({
          content: result.message || 'Translation created successfully',
        })
        setTimeout(() => {
          navigate('/translations')
        }, 1000)
      } else {
        setToast({
          content: result.message || 'Failed to create translation',
          error: true,
        })
      }
    } catch (error) {
      console.error('Error creating translation:', error)
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
      <Page
        backAction={{
          content: 'Translations',
          onAction: () => navigate('/translations'),
        }}
        title="Add locale"
        primaryAction={{
          content: 'Save',
          onAction: handleSubmit,
          loading: loading,
          disabled: !locale,
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Card sectioned>
            <BlockStack gap="400">
              <TextField
                label="Language code"
                placeholder="e.g. English"
                value={locale}
                onChange={setLocale}
                autoComplete="off"
                helpText="Enter a valid locale code (ISO 639-1)"
              />
            </BlockStack>
          </Card>
        </div>

        {toast && (
          <Toast
            content={toast.content}
            error={toast.error}
            onDismiss={() => setToast(null)}
          />
        )}
      </Page>
    </Frame>
  )
}
