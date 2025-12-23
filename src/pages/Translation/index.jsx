import React, { useState } from 'react'
import {
  Page,
  Card,
  Text,
  Button,
  Modal,
  TextField,
  Select,
  Popover,
  ActionList,
  BlockStack,
  InlineStack,
  Box,
} from '@shopify/polaris'
import { PlusIcon } from '@shopify/polaris-icons'

export default function Translations() {
  const [languages, setLanguages] = useState([
    { id: 1, name: 'English', isDefault: true },
    { id: 2, name: 'Chinese', isDefault: false },
  ])

  // Load customization khi component mount
  // useEffect(() => {
  //   const fetchCustomization = async () => {
  //     try {
  //       const result = await getShopInfo()

  //       console.log('Toan dep tra', result)
  //     } catch (error) {
  //       console.error('Error loading customization:', error)
  //     }
  //   }

  //   fetchCustomization()
  // }, [])

  const [activePopover, setActivePopover] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingLanguage, setEditingLanguage] = useState(null)
  const [newLanguage, setNewLanguage] = useState('')

  const languageOptions = [
    { label: 'Vietnamese', value: 'vietnamese' },
    { label: 'Spanish', value: 'spanish' },
    { label: 'French', value: 'french' },
    { label: 'German', value: 'german' },
    { label: 'Japanese', value: 'japanese' },
    { label: 'Korean', value: 'korean' },
  ]

  const togglePopover = (id) => {
    setActivePopover(activePopover === id ? null : id)
  }

  const handleEdit = (language) => {
    setEditingLanguage(language)
    setActivePopover(null)
    setShowEditModal(true)
  }

  const handleDelete = (id) => {
    setLanguages(languages.filter((lang) => lang.id !== id))
    setActivePopover(null)
  }

  const handleAddLanguage = () => {
    if (newLanguage) {
      const selectedOption = languageOptions.find(
        (opt) => opt.value === newLanguage
      )
      setLanguages([
        ...languages,
        {
          id: Date.now(),
          name: selectedOption.label,
          isDefault: false,
        },
      ])
      setNewLanguage('')
      setShowAddModal(false)
    }
  }

  const handleUpdateLanguage = () => {
    setLanguages(
      languages.map((lang) =>
        lang.id === editingLanguage.id ? editingLanguage : lang
      )
    )
    setShowEditModal(false)
    setEditingLanguage(null)
  }

  return (
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

              <BlockStack gap="200">
                {languages.map((language) => (
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
                      <Text variant="bodyMd" as="span" fontWeight="medium">
                        {language.name}
                      </Text>
                      {language.isDefault && (
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
                      {language.isDefault ? (
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
                                onAction: () => handleDelete(language.id),
                              },
                            ]}
                          />
                        </Popover>
                      )}
                    </InlineStack>
                  </div>
                ))}
              </BlockStack>

              <div>
                <Button
                  icon={PlusIcon}
                  onClick={() => setShowAddModal(true)}
                  plain
                >
                  Add locale
                </Button>
              </div>
            </BlockStack>
          </Card>
        </BlockStack>
      </div>

      {/* Add Language Modal */}
      <Modal
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          setNewLanguage('')
        }}
        title="Add language"
        primaryAction={{
          content: 'Add',
          onAction: handleAddLanguage,
          disabled: !newLanguage,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => {
              setShowAddModal(false)
              setNewLanguage('')
            },
          },
        ]}
      >
        <Modal.Section>
          <Select
            label="Select language"
            options={[
              { label: 'Select a language', value: '' },
              ...languageOptions,
            ]}
            value={newLanguage}
            onChange={setNewLanguage}
          />
        </Modal.Section>
      </Modal>

      {/* Edit Language Modal */}
      <Modal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setEditingLanguage(null)
        }}
        title="Edit language"
        primaryAction={{
          content: 'Save',
          onAction: handleUpdateLanguage,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => {
              setShowEditModal(false)
              setEditingLanguage(null)
            },
          },
        ]}
      >
        <Modal.Section>
          {editingLanguage && (
            <TextField
              label="Language name"
              value={editingLanguage.name}
              onChange={(value) =>
                setEditingLanguage({ ...editingLanguage, name: value })
              }
              autoComplete="off"
            />
          )}
        </Modal.Section>
      </Modal>
    </Page>
  )
}
