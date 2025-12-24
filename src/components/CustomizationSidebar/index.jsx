// Customization/CustomizationSidebar.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TextField,
  Select,
  RangeSlider,
  RadioButton,
  BlockStack,
} from '@shopify/polaris'

import styles from './CustomizationSidebar.module.css'
import ColorPickerField from '../ColorPickerField'
import { updateField } from '@/store/customizationSlice'

function CustomizationSidebar() {
  const dispatch = useDispatch()
  const customization = useSelector((state) => state.customization)

  const [expandedSections, setExpandedSections] = useState({
    inputSize: true,
    inputBorder: true,
    inputColor: true,
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
    { label: 'Solid', value: 'solid' },
    { label: 'Dotted', value: 'dotted' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Double', value: 'double' },
    { label: 'Groove', value: 'groove' },
    { label: 'Ridge', value: 'ridge' },
    { label: 'Inset', value: 'inset' },
    { label: 'Outset', value: 'outset' },
    { label: 'None', value: 'none' },
  ]

  const buttonVariantOptions = [
    { label: 'Plain', value: 'plain' },
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Tertiary', value: 'tertiary' },
    { label: 'Monochrome Plain', value: 'monochromePlain' },
  ]

  return (
    <div className={styles.customizationSidebar}>
      {/* Input box size */}
      <div className={styles.sidebarSection}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('inputSize')}
        >
          <span>Input box size</span>
          <span className={styles.collapseIcon}>
            {expandedSections.inputSize ? '−' : '+'}
          </span>
        </div>
        {expandedSections.inputSize && (
          <div className={styles.sectionContent}>
            <div className={styles.inputGroup}>
              <TextField
                label="Input width"
                type="number"
                value={String(customization.input_width)}
                onChange={(value) => handleChange('input_width', Number(value))}
                autoComplete="off"
              />
              <TextField
                label="Input height"
                type="number"
                value={String(customization.input_height)}
                onChange={(value) =>
                  handleChange('input_height', Number(value))
                }
                autoComplete="off"
              />
            </div>
          </div>
        )}
      </div>

      {/* Input box border */}
      <div className={styles.sidebarSection}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('inputBorder')}
        >
          <span>Input box border</span>
          <span className={styles.collapseIcon}>
            {expandedSections.inputBorder ? '−' : '+'}
          </span>
        </div>
        {expandedSections.inputBorder && (
          <div className={styles.sectionContent}>
            <Select
              label="Border style"
              options={borderStyleOptions}
              value={customization.input_border}
              onChange={(value) => handleChange('input_border', value)}
            />

            <RangeSlider
              label="Border width"
              value={customization.input_border_width}
              onChange={(value) => handleChange('input_border_width', value)}
              min={0}
              max={10}
              output
              suffix={<span>{customization.input_border_width}px</span>}
            />

            <ColorPickerField
              label="Border color"
              color={customization.input_border_color}
              onChange={(color) => handleChange('input_border_color', color)}
            />

            <RangeSlider
              label="Border radius"
              value={customization.input_border_radius}
              onChange={(value) => handleChange('input_border_radius', value)}
              min={0}
              max={50}
              output
              suffix={<span>{customization.input_border_radius}px</span>}
            />
          </div>
        )}
      </div>

      {/* Input box color */}
      <div className={styles.sidebarSection}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('inputColor')}
        >
          <span>Input box color</span>
          <span className={styles.collapseIcon}>
            {expandedSections.inputColor ? '−' : '+'}
          </span>
        </div>
        {expandedSections.inputColor && (
          <div className={styles.sectionContent}>
            <ColorPickerField
              label="Background color"
              color={customization.input_background_color}
              onChange={(color) =>
                handleChange('input_background_color', color)
              }
            />

            <ColorPickerField
              label="Text color"
              color={customization.input_text_color}
              onChange={(color) => handleChange('input_text_color', color)}
            />
          </div>
        )}
      </div>

      {/* Button */}
      <div className={styles.sidebarSection}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('button')}
        >
          <span>Button</span>
          <span className={styles.collapseIcon}>
            {expandedSections.button ? '−' : '+'}
          </span>
        </div>
        {expandedSections.button && (
          <div className={styles.sectionContent}>
            <Select
              label="Button type"
              options={buttonVariantOptions}
              value={customization.button_variant}
              onChange={(value) => handleChange('button_variant', value)}
            />

            <div className={styles.inputGroup}>
              <TextField
                label="Button width"
                type="number"
                value={String(customization.button_width)}
                onChange={(value) =>
                  handleChange('button_width', Number(value))
                }
                autoComplete="off"
              />
              <TextField
                label="Button height"
                type="number"
                value={String(customization.button_height)}
                onChange={(value) =>
                  handleChange('button_height', Number(value))
                }
                autoComplete="off"
              />
            </div>

            <ColorPickerField
              label="Button background"
              color={customization.button_background_color}
              onChange={(color) =>
                handleChange('button_background_color', color)
              }
            />

            <ColorPickerField
              label="Button text color"
              color={customization.button_text_color}
              onChange={(color) => handleChange('button_text_color', color)}
            />

            <Select
              label="Border style"
              options={borderStyleOptions}
              value={customization.button_border}
              onChange={(value) => handleChange('button_border', value)}
            />

            <RangeSlider
              label="Border width"
              value={customization.button_border_width}
              onChange={(value) => handleChange('button_border_width', value)}
              min={0}
              max={10}
              output
              suffix={<span>{customization.button_border_width}px</span>}
            />

            <ColorPickerField
              label="Border color"
              color={customization.button_border_color}
              onChange={(color) => handleChange('button_border_color', color)}
            />

            <RangeSlider
              label="Border radius"
              value={customization.button_border_radius}
              onChange={(value) => handleChange('button_border_radius', value)}
              min={0}
              max={50}
              output
              suffix={<span>{customization.button_border_radius}px</span>}
            />
          </div>
        )}
      </div>

      {/* Layout */}
      <div className={styles.sidebarSection}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('layout')}
        >
          <span>Layout</span>
          <span className={styles.collapseIcon}>
            {expandedSections.layout ? '−' : '+'}
          </span>
        </div>
        {expandedSections.layout && (
          <div className={styles.sectionContent}>
            <BlockStack gap="200">
              <RadioButton
                label="Vertical"
                checked={customization.direction === 'vertical'}
                id="vertical"
                onChange={() => handleChange('direction', 'vertical')}
              />
              <RadioButton
                label="Horizontal"
                checked={customization.direction === 'horizontal'}
                id="horizontal"
                onChange={() => handleChange('direction', 'horizontal')}
              />
            </BlockStack>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <div className={styles.sidebarSection}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection('css')}
        >
          <span>Custom CSS</span>
          <span className={styles.collapseIcon}>
            {expandedSections.css ? '−' : '+'}
          </span>
        </div>
        {expandedSections.css && (
          <div className={styles.sectionContent}>
            <TextField
              label=""
              value={customization.css}
              onChange={(value) => handleChange('css', value)}
              multiline={6}
              placeholder="Enter your custom CSS here..."
              autoComplete="off"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomizationSidebar
