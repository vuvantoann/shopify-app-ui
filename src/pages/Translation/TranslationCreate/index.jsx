import { useState } from 'react'
import {
  Page,
  Card,
  Button,
  Toast,
  Frame,
  Text,
  Select,
  BlockStack,
} from '@shopify/polaris'
import { useNavigate } from 'react-router-dom'
import { createTranslation } from '../../../services/translationSevice'

export default function TranslationCreate() {
  const navigate = useNavigate()
  const [locale, setLocale] = useState('')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  const languageOptions = [
    { label: 'Select a language', value: '' },
    { label: 'Vietnamese (vi)', value: 'vi' },
    { label: 'Spanish (es)', value: 'es' },
    { label: 'French (fr)', value: 'fr' },
    { label: 'German (de)', value: 'de' },
    { label: 'Japanese (ja)', value: 'ja' },
    { label: 'Korean (ko)', value: 'ko' },
    { label: 'Chinese (zh)', value: 'zh' },
    { label: 'Thai (th)', value: 'th' },
    { label: 'Italian (it)', value: 'it' },
    { label: 'Portuguese (pt)', value: 'pt' },
  ]

  const handleSubmit = async () => {
    if (!locale) {
      setToast({
        content: 'Please select a language',
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
              <Select
                label="Select language"
                options={languageOptions}
                value={locale}
                onChange={setLocale}
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
