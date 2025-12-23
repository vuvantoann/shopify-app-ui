// pages/Customization/components/CustomizationSidebar.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateField } from '../../store/customizationSlice'
import ColorPickerField from '../ColorPickerField'

function CustomizationSidebar() {
  const dispatch = useDispatch()
  const customization = useSelector((state) => state.customization)

  const [expandedSections, setExpandedSections] = useState({
    boxSize: true,
    boxBorder: true,
    boxColor: true,
    button: true,
    layout: true,
    css: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleChange = (field, value) => {
    dispatch(updateField({ field, value }))
  }

  const borderStyleOptions = [
    { label: 'Dotted', value: 'dotted' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Solid', value: 'solid' },
    { label: 'Double', value: 'double' },
    { label: 'Groove', value: 'groove' },
    { label: 'Ridge', value: 'ridge' },
    { label: 'Inset', value: 'inset' },
    { label: 'Outset', value: 'outset' },
    { label: 'None', value: 'none' },
    { label: 'Hidden', value: 'hidden' },
  ]

  const buttonVariantOptions = [
    { label: 'Plain', value: 'plain' },
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Tertiary', value: 'tertiary' },
    { label: 'Monochrome Plain', value: 'monochromePlain' },
  ]

  return (
    <div className="customization-sidebar">
      {/* Discount box size */}
      <div className="sidebar-section">
        <div
          className="section-header"
          onClick={() => toggleSection('boxSize')}
        >
          <span>Discount box size</span>
          <span className="collapse-icon">
            {expandedSections.boxSize ? '−' : '+'}
          </span>
        </div>
        {expandedSections.boxSize && (
          <div className="section-content">
            <div className="input-group">
              <div className="input-field">
                <label>Box width</label>
                <input
                  type="number"
                  value={customization.input_width}
                  onChange={(e) =>
                    handleChange('input_width', Number(e.target.value))
                  }
                />
              </div>
              <div className="input-field">
                <label>Box height</label>
                <input
                  type="number"
                  value={customization.input_height}
                  onChange={(e) =>
                    handleChange('input_height', Number(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Discount box border */}
      <div className="sidebar-section">
        <div
          className="section-header"
          onClick={() => toggleSection('boxBorder')}
        >
          <span>Discount box border</span>
          <span className="collapse-icon">
            {expandedSections.boxBorder ? '−' : '+'}
          </span>
        </div>
        {expandedSections.boxBorder && (
          <div className="section-content">
            <ColorPickerField
              label="Border color"
              color={customization.border_color}
              onChange={(color) => handleChange('border_color', color)}
            />

            <div className="select-field">
              <label>Border style</label>
              <select
                value={customization.input_border}
                onChange={(e) => handleChange('input_border', e.target.value)}
              >
                {borderStyleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="range-field">
              <label>Border radius</label>
              <div className="range-wrapper">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={customization.input_border_radius}
                  onChange={(e) =>
                    handleChange('input_border_radius', Number(e.target.value))
                  }
                />
                <span className="range-value">
                  {customization.input_border_radius}px
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Discount box color */}
      <div className="sidebar-section">
        <div
          className="section-header"
          onClick={() => toggleSection('boxColor')}
        >
          <span>Discount box color</span>
          <span className="collapse-icon">
            {expandedSections.boxColor ? '−' : '+'}
          </span>
        </div>
        {expandedSections.boxColor && (
          <div className="section-content">
            <ColorPickerField
              label="Discount box color"
              color={customization.input_background_color}
              onChange={(color) =>
                handleChange('input_background_color', color)
              }
            />
          </div>
        )}
      </div>

      {/* Button */}
      <div className="sidebar-section">
        <div className="section-header" onClick={() => toggleSection('button')}>
          <span>Button</span>
          <span className="collapse-icon">
            {expandedSections.button ? '−' : '+'}
          </span>
        </div>
        {expandedSections.button && (
          <div className="section-content">
            <div className="select-field">
              <label>Button type</label>
              <select
                value={customization.button_variant}
                onChange={(e) => handleChange('button_variant', e.target.value)}
              >
                {buttonVariantOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <div className="input-field">
                <label>Button width</label>
                <input
                  type="number"
                  value={customization.button_width}
                  onChange={(e) =>
                    handleChange('button_width', Number(e.target.value))
                  }
                />
              </div>
              <div className="input-field">
                <label>Button height</label>
                <input
                  type="number"
                  value={customization.button_height}
                  onChange={(e) =>
                    handleChange('button_height', Number(e.target.value))
                  }
                />
              </div>
            </div>

            <ColorPickerField
              label="Button color"
              color={customization.button_background_color}
              onChange={(color) =>
                handleChange('button_background_color', color)
              }
            />

            <ColorPickerField
              label="Text color"
              color={customization.button_text_color}
              onChange={(color) => handleChange('button_text_color', color)}
            />

            <div className="select-field">
              <label>Border style</label>
              <select
                value={customization.button_border}
                onChange={(e) => handleChange('button_border', e.target.value)}
              >
                {borderStyleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="range-field">
              <label>Border width</label>
              <div className="range-wrapper">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={customization.border_width}
                  onChange={(e) =>
                    handleChange('border_width', Number(e.target.value))
                  }
                />
                <span className="range-value">
                  {customization.border_width}px
                </span>
              </div>
            </div>

            <ColorPickerField
              label="Border color"
              color={customization.border_color}
              onChange={(color) => handleChange('border_color', color)}
            />
          </div>
        )}
      </div>

      {/* Layout */}
      <div className="sidebar-section">
        <div className="section-header" onClick={() => toggleSection('layout')}>
          <span>Layout</span>
          <span className="collapse-icon">
            {expandedSections.layout ? '−' : '+'}
          </span>
        </div>
        {expandedSections.layout && (
          <div className="section-content">
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  value="vertical"
                  checked={customization.direction === 'vertical'}
                  onChange={(e) => handleChange('direction', e.target.value)}
                />
                <span>Vertical</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="horizontal"
                  checked={customization.direction === 'horizontal'}
                  onChange={(e) => handleChange('direction', e.target.value)}
                />
                <span>Horizontal</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <div className="sidebar-section">
        <div className="section-header" onClick={() => toggleSection('css')}>
          <span>Custom CSS</span>
          <span className="collapse-icon">
            {expandedSections.css ? '−' : '+'}
          </span>
        </div>
        {expandedSections.css && (
          <div className="section-content">
            <textarea
              className="custom-css-input"
              placeholder="Enter your custom CSS here..."
              value={customization.css}
              onChange={(e) => handleChange('css', e.target.value)}
              rows="6"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomizationSidebar
