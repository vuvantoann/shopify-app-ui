// pages/Customization/Customization.jsx
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import {
  loadCustomization,
  setLoading,
  setError,
  clearChanges,
} from '../../store/customizationSlice'
import { setLocale, setTranslations } from '../../store/translationSlice'
import { getTranslations } from '../../services/translationSevice'

import styles from './Customization.module.css'
import CustomizationPreview from '../../components/CustomizationPreview'
import CustomizationSidebar from '../../components/CustomizationSidebar'
import {
  getCustomization,
  saveCustomization,
} from '../../services/customizationSevice'

function Customization() {
  const dispatch = useDispatch()
  const customization = useSelector((state) => state.customization)
  const currentLocale = useSelector((state) => state.translation.currentLocale)
  const [saving, setSaving] = useState(false)
  const [availableLocales, setAvailableLocales] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true))

        // Load customization
        const customResult = await getCustomization()
        if (customResult.code === 200 && customResult.data) {
          dispatch(loadCustomization(customResult.data))
        }

        // Load translations
        const transResult = await getTranslations()
        if (transResult.code === 200 && transResult.data) {
          setAvailableLocales(transResult.data.map((t) => t.locale))

          // Load translation cho locale hiện tại
          const currentTrans = transResult.data.find(
            (t) => t.locale === currentLocale
          )
          if (currentTrans) {
            dispatch(setTranslations(currentTrans.translate))
          }
        }
      } catch (error) {
        console.error('Error loading data:', error)
        dispatch(setError('Failed to load data'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchData()
  }, [dispatch, currentLocale])

  const handleLocaleChange = async (newLocale) => {
    try {
      const result = await getTranslations()
      if (result.code === 200) {
        const translation = result.data.find((t) => t.locale === newLocale)
        if (translation) {
          dispatch(setLocale(newLocale))
          dispatch(setTranslations(translation.translate))
        }
      }
    } catch (error) {
      console.error('Error loading translation:', error)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      const { loading, error, hasChanges, ...customizationData } = customization

      const result = await saveCustomization(customizationData)

      const notyf = new Notyf({
        duration: 2000,
        position: { x: 'right', y: 'top' },
      })

      if (result.code === 200) {
        dispatch(clearChanges())
        notyf.success(result.message || 'Customization saved successfully!')
      } else {
        notyf.error(result.message || 'Failed to save customization')
      }
    } catch (error) {
      console.error('Error saving customization:', error)
      const notyf = new Notyf({
        duration: 2000,
        position: { x: 'right', y: 'top' },
      })
      notyf.error('Something went wrong, please try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.customizationContainer}>
      <div className={styles.customizationHeader}>
        <select
          value={currentLocale}
          onChange={(e) => handleLocaleChange(e.target.value)}
          className={styles.localeSelect}
        >
          {availableLocales.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>

        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={saving || !customization.hasChanges}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className={styles.customizationContent}>
        <CustomizationSidebar />
        <CustomizationPreview />
      </div>
    </div>
  )
}

export default Customization
