// components/FontSelectPreview.tsx
import { StringInputProps, set, unset } from 'sanity'
import { Stack, Card, Text } from '@sanity/ui'

const FONTS = [
  { value: 'Caveat', label: 'Caveat (handwritten)', fallback: 'sans-serif' },
  { value: 'Doto', label: 'Doto (pixel)', fallback: 'sans-serif' },
  { value: 'Stack Sans Notch', label: 'Stack Sans Notch (Sans-serif)', fallback: 'sans-serif' },
]

export function HeadlineFontSelectPreview(props: StringInputProps) {
  const { value = '', onChange } = props

  const handleSelect = (fontValue: string) => {
    if (value === fontValue) {
      onChange(unset())
    } else {
      onChange(set(fontValue))
    }
  }

  return (
    <Stack>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&family=Caveat:wght@400..700&family=Doto:wght@100..900&display=swap');
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
                <h3 style={{ fontSize: '42px', fontWeight: 700 }}>{font.label}</h3>
              </div>
            </Stack>
          </Card>
        )
      })}
    </Stack>
  )
}
