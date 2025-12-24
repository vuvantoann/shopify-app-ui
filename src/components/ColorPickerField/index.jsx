// components/ColorPickerField.jsx
import { useState } from 'react'
import { TextField } from '@shopify/polaris'
import styles from './ColorPickerField.module.css'

function ColorPickerField({ label, color, onChange }) {
  const [showPicker, setShowPicker] = useState(false)
  const [tempColor, setTempColor] = useState(color)

  const handleColorChange = (e) => {
    const newColor = e.target.value
    setTempColor(newColor)
    onChange(newColor)
  }

  const handleInputChange = (value) => {
    setTempColor(value)
    onChange(value)
  }

  return (
    <div className={styles.colorPickerWrapper}>
      <div className={styles.colorPickerLabel}>{label}</div>
      <div className={styles.colorPickerDisplay}>
        <div
          className={styles.colorSwatch}
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <TextField
          value={color}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>
      {showPicker && (
        <div className={styles.colorPickerPopup}>
          <div
            className={styles.colorPickerOverlay}
            onClick={() => setShowPicker(false)}
          />
          <div className={styles.colorPickerContent}>
            <input
              type="color"
              value={tempColor}
              onChange={handleColorChange}
              className={styles.colorPickerNative}
            />
            <div className={styles.colorPickerHex}>
              <TextField
                value={tempColor}
                onChange={handleInputChange}
                autoComplete="off"
                align="center"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPickerField
