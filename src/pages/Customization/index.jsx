// pages/Customization/Customization.jsx
import { useEffect, useState } from 'react'
import { Page, Frame, Toast } from '@shopify/polaris'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadCustomization,
  setLoading,
  setError,
  clearChanges,
} from '../../store/customizationSlice'

import './Customization.css'
import {
  getCustomization,
  saveCustomization,
} from '../../services/customizationSevice'
import CustomizationSidebar from '../../components/CustomizationSidebar'
import CustomizationPreview from '../../components/CustomizationPreview'

function Customization() {
  const dispatch = useDispatch()
  const customization = useSelector((state) => state.customization)
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)

  // Load customization khi component mount
  useEffect(() => {
    const fetchCustomization = async () => {
      try {
        dispatch(setLoading(true))
        const result = await getCustomization()

        if (result.code === 200 && result.data) {
          dispatch(loadCustomization(result.data))
        }
      } catch (error) {
        console.error('Error loading customization:', error)
        dispatch(setError('Failed to load customization'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchCustomization()
  }, [dispatch])

  // Handle save
  const handleSave = async () => {
    try {
      setSaving(true)

      // Lấy data từ Redux state (bỏ các field UI)
      const { loading, error, hasChanges, ...customizationData } = customization

      const result = await saveCustomization(customizationData)

      if (result.code === 200) {
        dispatch(clearChanges())
        setToast({
          content: result.message || 'Customization saved successfully!',
          error: false,
        })
      } else {
        setToast({
          content: result.message || 'Failed to save customization',
          error: true,
        })
      }
    } catch (error) {
      console.error('Error saving customization:', error)
      setToast({
        content: 'Something went wrong, please try again',
        error: true,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Frame>
      <Page>
        <div className="customization-container">
          <div className="customization-header">
            <button
              className="save-button"
              onClick={handleSave}
              disabled={saving || !customization.hasChanges}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>

          <div className="customization-content">
            <CustomizationSidebar />
            <CustomizationPreview />
          </div>
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

export default Customization
