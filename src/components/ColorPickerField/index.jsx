// pages/Customization/components/ColorPickerField.jsx
import { useState } from 'react'

function ColorPickerField({ label, color, onChange }) {
  const [showPicker, setShowPicker] = useState(false)
  const [tempColor, setTempColor] = useState(color)

  const handleColorChange = (e) => {
    const newColor = e.target.value
    setTempColor(newColor)
    onChange(newColor)
  }

  const handleInputChange = (e) => {
    const newColor = e.target.value
    setTempColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="color-picker-wrapper">
      <div className="color-picker-label">{label}</div>
      <div className="color-picker-display">
        <div
          className="color-swatch"
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <input
          type="text"
          value={color}
          onChange={handleInputChange}
          className="color-input"
        />
      </div>
      {showPicker && (
        <div className="color-picker-popup">
          <div
            className="color-picker-overlay"
            onClick={() => setShowPicker(false)}
          />
          <div className="color-picker-content">
            <input
              type="color"
              value={tempColor}
              onChange={handleColorChange}
              className="color-picker-native"
            />
            <div className="color-picker-hex">
              <input
                type="text"
                value={tempColor}
                onChange={handleInputChange}
                className="hex-input"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPickerField
