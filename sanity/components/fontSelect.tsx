// components/FontSelectPreview.tsx
import React from 'react'
import { StringInputProps, set, unset } from 'sanity'
import { Stack, Card, Text } from '@sanity/ui'

const FONTS = [
  { value: 'inconsolata', label: 'Inconsolata (Monospace)', fallback: 'monospace' },
  { value: 'josefinSans', label: 'Josefin Sans (Sans-serif)', fallback: 'sans-serif' },
  { value: 'merriweather', label: 'Merriweather (Serif)', fallback: 'serif' },
  { value: 'openSans', label: 'Open Sans (Sans-serif)', fallback: 'sans-serif' },
  { value: 'playfairDisplay', label: 'Playfair Display (Serif)', fallback: 'serif' },
  { value: 'quicksand', label: 'Quicksand (Sans-serif)', fallback: 'sans-serif' },
  { value: 'raleway', label: 'Raleway (Sans-serif)', fallback: 'sans-serif' },
  { value: 'saira', label: 'Saira (Sans-serif)', fallback: 'sans-serif' },
]

export function FontSelectPreview(props: StringInputProps) {
  const { value = '', onChange } = props

  const handleSelect = (fontValue: string) => {
    if (value === fontValue) {
      onChange(unset())
    } else {
      onChange(set(fontValue))
    }
  }

  //&family=Roboto:wght@300;700
  return (
    <Stack>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;700&family=Josefin+Sans:wght@300;400;700&family=Merriweather:wght@400;700&family=Open+Sans:wght@300;400;700&family=PlayfairDisplay:wght@400;700&family=Quicksand:wght@300;400;700&family=Raleway:wght@300;400;700&family=Saira:wght@300;400;700&display=swap');
      `}</style>

      {FONTS.map((font) => {
        const isSelected = value === font.value
        const fontFamilyStyle = `'${font.value}', ${font.fallback}`

        return (
          <Card
            key={font.value}
            as="button"
            type="button"
            onClick={() => handleSelect(font.value)}
            padding={4}
            radius={2}
            border
            tone={isSelected ? 'primary' : 'default'}
            style={{
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease',
            }}
          >
            <Stack space={3}>
              {/* Keep this as a Sanity Text component since it's just the label */}
              <Text size={1} weight="bold" muted={!isSelected}>
                {font.label} {isSelected && '✓'}
              </Text>

              <div
                style={{
                  fontFamily: fontFamilyStyle,
                }}
              >
                <h3 style={{ fontSize: '24px', fontWeight: 700 }}>{font.label}</h3>
                <p style={{ fontSize: '18px' }}>The quick brown fox jumps over the lazy dog.</p>
              </div>
            </Stack>
          </Card>
        )
      })}
    </Stack>
  )
}
