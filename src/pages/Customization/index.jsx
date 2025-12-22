import {
  Page,
  Layout,
  Card,
  TextField,
  Select,
  RangeSlider,
  Button,
  ColorPicker,
  Text,
} from '@shopify/polaris'
import { useState, useEffect } from 'react'
import '../../styles/customization.css'

function Customization() {
  const [config, setConfig] = useState({
    boxWidth: 320,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: { hue: 0, saturation: 0, brightness: 0 },
    borderRadius: 4,
    boxBg: { hue: 0, saturation: 0, brightness: 1 },

    buttonWidth: 120,
    buttonHeight: 36,
    buttonBg: { hue: 215, saturation: 0.8, brightness: 0.5 },
    buttonTextColor: '#ffffff',

    layout: 'vertical',
  })

  // 🔥 Update CSS variables realtime
  useEffect(() => {
    const root = document.documentElement

    root.style.setProperty('--box-width', `${config.boxWidth}px`)
    root.style.setProperty('--box-border-style', config.borderStyle)
    root.style.setProperty('--box-border-width', `${config.borderWidth}px`)
    root.style.setProperty(
      '--box-border-color',
      `hsl(${config.borderColor.hue}, ${
        config.borderColor.saturation * 100
      }%, ${config.borderColor.brightness * 100}%)`
    )
    root.style.setProperty('--box-border-radius', `${config.borderRadius}px`)
    root.style.setProperty(
      '--box-bg-color',
      `hsl(${config.boxBg.hue}, ${config.boxBg.saturation * 100}%, ${
        config.boxBg.brightness * 100
      }%)`
    )

    root.style.setProperty('--button-width', `${config.buttonWidth}px`)
    root.style.setProperty('--button-height', `${config.buttonHeight}px`)
    root.style.setProperty(
      '--button-bg-color',
      `hsl(${config.buttonBg.hue}, ${config.buttonBg.saturation * 100}%, ${
        config.buttonBg.brightness * 100
      }%)`
    )
    root.style.setProperty('--button-text-color', config.buttonTextColor)
    root.style.setProperty(
      '--layout-direction',
      config.layout === 'vertical' ? 'column' : 'row'
    )
  }, [config])

  return (
    <Page title="Embed on product page">
      <Layout>
        {/* LEFT CONFIG */}
        <Layout.Section secondary>
          <Card sectioned>
            <Text variant="headingSm">Discount box size</Text>
            <TextField
              label="Box width"
              type="number"
              value={String(config.boxWidth)}
              onChange={(v) => setConfig({ ...config, boxWidth: Number(v) })}
            />
          </Card>

          <Card sectioned>
            <Text variant="headingSm">Discount box border</Text>

            <Select
              label="Border style"
              options={[
                { label: 'Dotted', value: 'dotted' },
                { label: 'Dashed', value: 'dashed' },
                { label: 'Solid', value: 'solid' },
                { label: 'Double', value: 'double' },
                { label: 'None', value: 'none' },
              ]}
              value={config.borderStyle}
              onChange={(v) => setConfig({ ...config, borderStyle: v })}
            />

            <RangeSlider
              label="Border width"
              min={0}
              max={10}
              value={config.borderWidth}
              onChange={(v) => setConfig({ ...config, borderWidth: v })}
            />

            <Text>Border color</Text>
            <ColorPicker
              color={config.borderColor}
              onChange={(v) => setConfig({ ...config, borderColor: v })}
            />
          </Card>

          <Card sectioned>
            <Text variant="headingSm">Button</Text>

            <TextField
              label="Button width"
              type="number"
              value={String(config.buttonWidth)}
              onChange={(v) => setConfig({ ...config, buttonWidth: Number(v) })}
            />

            <TextField
              label="Button height"
              type="number"
              value={String(config.buttonHeight)}
              onChange={(v) =>
                setConfig({ ...config, buttonHeight: Number(v) })
              }
            />

            <Text>Button color</Text>
            <ColorPicker
              color={config.buttonBg}
              onChange={(v) => setConfig({ ...config, buttonBg: v })}
            />
          </Card>

          <Card sectioned>
            <Text variant="headingSm">Layout</Text>
            <Select
              options={[
                { label: 'Vertical', value: 'vertical' },
                { label: 'Horizontal', value: 'horizontal' },
              ]}
              value={config.layout}
              onChange={(v) => setConfig({ ...config, layout: v })}
            />
          </Card>

          <Button primary fullWidth>
            Save
          </Button>
        </Layout.Section>

        {/* RIGHT PREVIEW */}
        <Layout.Section>
          <Card sectioned>
            <div className="preview-box">
              <input
                className="preview-input"
                placeholder="Enter discount code"
              />
              <button className="preview-button">Apply</button>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default Customization
