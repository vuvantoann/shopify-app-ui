// components/CustomizationPreview.jsx
import { useSelector } from 'react-redux'
import styles from './CustomizationPreview.module.css'

function CustomizationPreview() {
  const customization = useSelector((state) => state.customization)
  const translations = useSelector((state) => state.translation.translations)

  const getBorderStyle = (style) => {
    return style.toLowerCase()
  }

  const getButtonClass = () => {
    const variant = customization.button_variant
    if (variant === 'primary') return styles.buttonPrimary
    if (variant === 'secondary') return styles.buttonSecondary
    if (variant === 'tertiary') return styles.buttonTertiary
    if (variant === 'monochromePlain') return styles.buttonMonochrome
    return styles.buttonPlain
  }

  return (
    <div className={styles.customizationPreview}>
      <div className={styles.previewHeader}>
        <span>Your cart</span>
        <div className={styles.previewActions}>
          <button className={styles.iconBtn}>⊞</button>
          <button className={styles.iconBtn}>□</button>
        </div>
      </div>

      <div className={styles.previewContent}>
        <div className={styles.cartItems}>
          <div className={styles.skeletonItem}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonDetails}>
              <div className={`${styles.skeletonLine} ${styles.long}`}></div>
              <div className={`${styles.skeletonLine} ${styles.short}`}></div>
            </div>
          </div>
          <div className={styles.skeletonItem}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonDetails}>
              <div className={`${styles.skeletonLine} ${styles.long}`}></div>
              <div className={`${styles.skeletonLine} ${styles.short}`}></div>
            </div>
          </div>
        </div>

        <div className={styles.discountSection}>
          {/* <label className={styles.discountLabel}>Label</label> */}

          {customization.direction === 'horizontal' ? (
            // Layout Horizontal
            <div className={styles.layoutHorizontal}>
              <input
                type="text"
                className={styles.discountInput}
                placeholder={
                  translations['Discount box placeholder text'] ||
                  'Discount code'
                }
                style={{
                  flex: `0 0 ${100 - customization.button_width}%`,
                  height: `${customization.input_height}px`,
                  backgroundColor: customization.input_background_color,
                  color: customization.input_text_color,
                  border: `${
                    customization.input_border_width
                  }px ${getBorderStyle(customization.input_border)} ${
                    customization.input_border_color
                  }`,
                  borderRadius: `${customization.input_border_radius}px`,
                }}
              />
              <button
                className={`${styles.applyButton} ${getButtonClass()}`}
                style={{
                  flex: `0 0 ${customization.button_width}%`,
                  height: `${customization.button_height}px`,
                  backgroundColor: customization.button_background_color,
                  color: customization.button_text_color,
                  border: `${
                    customization.button_border_width
                  }px ${getBorderStyle(customization.button_border)} ${
                    customization.button_border_color
                  }`,
                  borderRadius: `${customization.button_border_radius}px`,
                }}
              >
                {translations['Button text'] || 'Apply'}
              </button>
            </div>
          ) : (
            // Layout Vertical
            <div className={styles.layoutVertical}>
              <input
                type="text"
                className={styles.discountInput}
                placeholder={
                  translations['Discount box placeholder text'] ||
                  'Discount code'
                }
                style={{
                  width: `${customization.input_width}%`,
                  height: `${customization.input_height}px`,
                  backgroundColor: customization.input_background_color,
                  color: customization.input_text_color,
                  border: `${
                    customization.input_border_width
                  }px ${getBorderStyle(customization.input_border)} ${
                    customization.input_border_color
                  }`,
                  borderRadius: `${customization.input_border_radius}px`,
                }}
              />
              <button
                className={`${styles.applyButton} ${getButtonClass()}`}
                style={{
                  width: `${customization.input_width}%`,
                  height: `${customization.button_height}px`,
                  backgroundColor: customization.button_background_color,
                  color: customization.button_text_color,
                  border: `${
                    customization.button_border_width
                  }px ${getBorderStyle(customization.button_border)} ${
                    customization.button_border_color
                  }`,
                  borderRadius: `${customization.button_border_radius}px`,
                }}
              >
                {translations['Button text'] || 'Apply'}
              </button>
            </div>
          )}
        </div>

        <div className={styles.cartTotal}>
          <div className={`${styles.skeletonLine} ${styles.medium}`}></div>
        </div>
      </div>

      {/* Apply custom CSS */}
      {customization.css && (
        <style dangerouslySetInnerHTML={{ __html: customization.css }} />
      )}
    </div>
  )
}

export default CustomizationPreview
