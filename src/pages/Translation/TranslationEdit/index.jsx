import { useState, useEffect } from 'react'
import {
  Page,
  Card,
  Toast,
  Frame,
  TextField,
  BlockStack,
  Spinner,
  Text,
  Link,
} from '@shopify/polaris'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getTranslations,
  updateTranslation,
} from '../../../services/translationSevice'
import './TranslationEdit.css'

export default function TranslationEdit() {
  const navigate = useNavigate()
  const { locale } = useParams()

  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [translations, setTranslations] = useState({
    'Discount box placeholder text': '',
    'Button text': '',
  })

  useEffect(() => {
    fetchTranslation()
  }, [locale])

  const fetchTranslation = async () => {
    try {
      setLoading(true)
      const result = await getTranslations()

      if (result.code === 200) {
        const translation = result.data.find((t) => t.locale === locale)

        if (translation) {
          setTranslations(translation.translate || {})
        } else {
          setToast({ content: 'Translation not found', error: true })
          navigate('/translations')
        }
      } else {
        setToast({
          content: result.message || 'Failed to load translation',
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

  const handleChange = (key, value) => {
    setTranslations((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      setSaving(true)
      const result = await updateTranslation({
        locale,
        translate: translations,
      })

      if (result.code === 200) {
        setToast({ content: 'Translation updated successfully' })
        setTimeout(() => navigate('/translations'), 1000)
      } else {
        setToast({
          content: result.message || 'Failed to update translation',
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
      setSaving(false)
    }
  }

  const handleResetToDefault = () => {
    setTranslations({
      'Discount box placeholder text': 'Discount code',
      'Button text': 'Apply',
    })
    setToast({ content: 'Reset to default values' })
  }

  if (loading) {
    return (
      <Frame>
        <Page>
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <Spinner size="large" />
          </div>
        </Page>
      </Frame>
    )
  }

  return (
    <Frame>
      <Page
        backAction={{
          content: 'Translations',
          onAction: () => navigate('/translations'),
        }}
        title={`Edit ${locale} text`}
        subtitle="Edit and translate every texts into your desired language"
        primaryAction={{
          content: 'Save',
          onAction: handleSubmit,
          loading: saving,
        }}
      >
        <div className="translation-container">
          <Card sectioned>
            <BlockStack gap="400">
              {/* ===== HEADER ===== */}
              <div className="translation-header">
                <Text variant="headingMd" as="h2">
                  Text
                </Text>
                <Link onClick={handleResetToDefault}>Reset to default</Link>
              </div>

              {/* ===== ROW 1 ===== */}
              <div className="translation-row">
                <div className="translation-label">
                  Discount box placeholder text
                </div>
                <div className="translation-field">
                  <TextField
                    value={translations['Discount box placeholder text'] || ''}
                    onChange={(value) =>
                      handleChange('Discount box placeholder text', value)
                    }
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* ===== ROW 2 ===== */}
              <div className="translation-row">
                <div className="translation-label">Button text</div>
                <div className="translation-field">
                  <TextField
                    value={translations['Button text'] || ''}
                    onChange={(value) => handleChange('Button text', value)}
                    autoComplete="off"
                  />
                </div>
              </div>
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
