// components/MyCustomInput.tsx
import { StringInputProps } from 'sanity'
import { Stack, Text } from '@sanity/ui'

export function ColorPreview(props: StringInputProps) {
  // props.value is automatically typed as string | undefined
  // const characterCount = props.value ? props.value.length : 0

  return (
    <Stack space={3}>
      {/* Renders Sanity's default text input and handles data saving */}
      {props.renderDefault(props)}

      <Text size={1} muted>
        Hello!!
      </Text>
    </Stack>
  )
}
