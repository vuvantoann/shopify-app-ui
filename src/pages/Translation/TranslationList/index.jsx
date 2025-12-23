import { useState, useEffect, useCallback } from 'react'
import {
  Page,
  Card,
  Text,
  Button,
  Popover,
  ActionList,
  BlockStack,
  InlineStack,
  Box,
  Toast,
  Frame,
  Modal,
  Spinner,
} from '@shopify/polaris'
import { PlusIcon } from '@shopify/polaris-icons'
import { useNavigate } from 'react-router-dom'
import {
  deleteTranslation,
  getTranslations,
} from '../../../services/translationSevice'

export default function TranslationList() {
  const navigate = useNavigate()
  const [languages, setLanguages] = useState([])
  const [activePopover, setActivePopover] = useState(null)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({
    active: false,
    locale: null,
    name: null,
  })
  const [deleting, setDeleting] = useState(false)

  // Load translations khi component mount
  useEffect(() => {
    fetchTranslations()
  }, [])

  const fetchTranslations = async () => {
    try {
      setLoading(true)
      const result = await getTranslations()

      if (result.code === 200) {
        setLanguages(result.data)
      } else {
        setToast({
          content: result.message || 'Failed to load translations',
          error: true,
        })
      }
    } catch (error) {
      console.error('Error loading translations:', error)
      setToast({
        content: 'Something went wrong, please try again',
        error: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const togglePopover = useCallback(
    (id) => {
      setActivePopover(activePopover === id ? null : id)
    },
    [activePopover]
  )

  const handleEdit = (language) => {
    setActivePopover(null)
    navigate(`/translations/edit/${language.locale}`)
  }

  const handleDeleteClick = (language) => {
    setDeleteModal({
      active: true,
      locale: language.locale,
      name: language.locale,
    })
    setActivePopover(null)
  }

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true)
      const result = await deleteTranslation(deleteModal.locale)

      if (result.code === 200) {
        setToast({
          content: result.message || 'Translation deleted successfully',
        })
        // Refresh danh sách
        fetchTranslations()
      } else {
        setToast({
          content: result.message || 'Failed to delete translation',
          error: true,
        })
      }
    } catch (error) {
      console.error('Error deleting translation:', error)
      setToast({
        content: 'Something went wrong, please try again',
        error: true,
      })
    } finally {
      setDeleting(false)
      setDeleteModal({ active: false, locale: null, name: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ active: false, locale: null, name: null })
  }

  // Tìm default language (en)
  const isDefaultLanguage = (locale) => locale === 'en'

  return (
    <Frame>
      <Page>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <BlockStack gap="400">
            <div>
              <Text variant="headingLg" as="h1">
                Translations
              </Text>
              <Box paddingBlockStart="100">
                <Text variant="bodyMd" as="p" tone="subdued">
                  Edit and translate every texts into your desired language
                </Text>
              </Box>
            </div>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Languages
                </Text>

                {loading ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Spinner size="large" />
                  </div>
                ) : (
                  <BlockStack gap="200">
                    {languages.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center' }}>
                        <Text variant="bodyMd" as="p" tone="subdued">
                          No languages added yet
                        </Text>
                      </div>
                    ) : (
                      languages.map((language) => (
                        <div
                          key={language.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            border: '1px solid #e1e3e5',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                          }}
                        >
                          <InlineStack gap="200" align="center">
                            <Text
                              variant="bodyMd"
                              as="span"
                              fontWeight="medium"
                            >
                              {language.locale}
                            </Text>
                            {isDefaultLanguage(language.locale) && (
                              <div
                                style={{
                                  padding: '2px 8px',
                                  backgroundColor: '#f1f2f3',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  color: '#616161',
                                }}
                              >
                                Default
                              </div>
                            )}
                          </InlineStack>

                          <InlineStack gap="300" align="center">
                            {isDefaultLanguage(language.locale) ? (
                              <Button onClick={() => handleEdit(language)}>
                                Edit
                              </Button>
                            ) : (
                              <Popover
                                active={activePopover === language.id}
                                activator={
                                  <Button
                                    onClick={() => togglePopover(language.id)}
                                    plain
                                  >
                                    •••
                                  </Button>
                                }
                                onClose={() => setActivePopover(null)}
                                preferredAlignment="right"
                              >
                                <ActionList
                                  items={[
                                    {
                                      content: 'Edit',
                                      onAction: () => handleEdit(language),
                                    },
                                    {
                                      content: 'Delete',
                                      destructive: true,
                                      onAction: () =>
                                        handleDeleteClick(language),
                                    },
                                  ]}
                                />
                              </Popover>
                            )}
                          </InlineStack>
                        </div>
                      ))
                    )}
                  </BlockStack>
                )}

                <div>
                  <Button
                    icon={PlusIcon}
                    onClick={() => navigate('/translations/create')}
                    plain
                  >
                    Add locale
                  </Button>
                </div>
              </BlockStack>
            </Card>
          </BlockStack>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          open={deleteModal.active}
          onClose={handleDeleteCancel}
          title="Remove 1 language?"
          primaryAction={{
            content: 'Delete',
            onAction: handleDeleteConfirm,
            loading: deleting,
            destructive: true,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleDeleteCancel,
            },
          ]}
        >
          <Modal.Section>
            <Text as="p">This can't be undone.</Text>
          </Modal.Section>
        </Modal>

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
