// pages/Customization/components/CustomizationPreview.jsx
import { useSelector } from 'react-redux'

function CustomizationPreview() {
  const customization = useSelector((state) => state.customization)

  const getBorderStyle = (style) => {
    return style.toLowerCase()
  }

  const getButtonClass = () => {
    const variant = customization.button_variant
    if (variant === 'primary') return 'button-primary'
    if (variant === 'secondary') return 'button-secondary'
    if (variant === 'tertiary') return 'button-tertiary'
    if (variant === 'monochromePlain') return 'button-monochrome'
    return 'button-plain'
  }

  return (
    <div className="customization-preview">
      <div className="preview-header">
        <span>Your cart</span>
        <div className="preview-actions">
          <button className="icon-btn">⊞</button>
          <button className="icon-btn">□</button>
        </div>
      </div>

      <div className="preview-content">
        <div className="cart-items">
          <div className="skeleton-item">
            <div className="skeleton-image"></div>
            <div className="skeleton-details">
              <div className="skeleton-line long"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
          <div className="skeleton-item">
            <div className="skeleton-image"></div>
            <div className="skeleton-details">
              <div className="skeleton-line long"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        </div>

        <div className="discount-section">
          <label className="discount-label">Label</label>
          <div
            className={`discount-input-wrapper ${
              customization.direction === 'horizontal'
                ? 'layout-horizontal'
                : ''
            }`}
            style={{
              width:
                customization.direction === 'horizontal'
                  ? '100%'
                  : `${customization.input_width}%`,
              minHeight: `${customization.input_height}px`,
              backgroundColor: customization.input_background_color,
              border: `2px ${getBorderStyle(customization.input_border)} ${
                customization.border_color
              }`,
              borderRadius: `${customization.input_border_radius}px`,
            }}
          >
            <input
              type="text"
              className="discount-input"
              style={{
                color: customization.button_text_color,
              }}
              placeholder="Enter discount code"
            />
            <button
              className={`apply-button ${getButtonClass()}`}
              style={{
                width:
                  customization.direction === 'horizontal'
                    ? `${customization.button_width}%`
                    : '100%',
                height: `${customization.button_height}px`,
                backgroundColor: customization.button_background_color,
                color: customization.button_text_color,
                border: `${customization.border_width}px ${getBorderStyle(
                  customization.button_border
                )} ${customization.border_color}`,
              }}
            >
              Label
            </button>
          </div>
        </div>

        <div className="cart-total">
          <div className="skeleton-line medium"></div>
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
