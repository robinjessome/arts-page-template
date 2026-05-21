// components/ColorPreviewInput.tsx
import React from 'react'
import { useFormValue } from 'sanity'
import { Box, Card, Flex, Text, Stack, Grid } from '@sanity/ui'
import { generateHsl } from '@/lib/helpers'

import styled from 'styled-components'
import { Color } from '@/sanity.types'

// Simple styled component for the color swatches
const ColorSwatch = styled.div<{ $color?: string; $textColor?: string }>`
  width: 100%;
  height: 80px;
  background: ${(props) => props.$color || '#e2e8f0'};
  color: ${(props) => props.$textColor || '#000000'};
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 0.875rem;
  font-weight: 600;
`

const MockupCanvas = styled.div<{
  $colorScheme?: string
  $accent?: string
  $primary?: string
  $primaryLight?: string

  $primaryDark?: string
  $secondary?: string
}>`
  background-color: ${(props) =>
    props.$colorScheme === 'light' ? props.$primaryLight : props.$primaryDark};
  border-radius: 8px;
  padding: 24px;
  margin-top: 12px;
  transition: all 0.2s ease;
  color: ${(props) => (props.$colorScheme === 'light' ? props.$primaryDark : props.$primaryLight)};
  };
`

export const ColorPreviewInput = () => {
  // Pull the current live values from the form
  const colorScheme = useFormValue(['colorScheme']) as string

  const primary = useFormValue(['primaryColor']) as Color
  const secondary = useFormValue(['secondaryColor']) as Color
  const accent = useFormValue(['accentColor']) as Color

  const primaryHsl = `hsl(${generateHsl(primary)})`
  const primaryLightHsl = `hsl(${generateHsl(primary, 'set', 95)})`
  const primaryDarkHsl = `hsl(${generateHsl(primary, 'set', 10)})`

  const secondaryHsl = `hsl(${generateHsl(secondary)})`
  const accentHsl = `hsl(${generateHsl(accent)})`

  return (
    <Stack space={4}>
      <Grid gridTemplateColumns={3} padding={4}>
        <Card>
          <ColorSwatch $color={primaryHsl}>Primary</ColorSwatch>
        </Card>
        <Card>
          <ColorSwatch $color={secondaryHsl} $textColor="#fff">
            Secondary
          </ColorSwatch>
        </Card>
        <Card>
          <ColorSwatch $color={primaryLightHsl}>Primary Light</ColorSwatch>
        </Card>

        <Card>
          <ColorSwatch $color={`hsl(${generateHsl(primary)})`} />
        </Card>

        <Card>
          <ColorSwatch $color={accentHsl}>Accent</ColorSwatch>
        </Card>
        <Card>
          <ColorSwatch $color={primaryDarkHsl} $textColor="#fff">
            Primary Dark
          </ColorSwatch>
        </Card>
        <Card gridColumn={3}>
          <ColorSwatch
            $color={`linear-gradient(90deg, ${secondaryHsl} 0%, ${primaryHsl} 100%)`}
            $textColor="#fff"
          >
            Primary Gradient
          </ColorSwatch>
        </Card>
        <Card gridRow={2} gridColumn={3}>
          <ColorSwatch
            $color={`linear-gradient(90deg, ${primaryHsl} 0%, ${accentHsl} 100%)`}
            $textColor="#fff"
          >
            Accent Gradient
          </ColorSwatch>
        </Card>
        <Card gridRow={2} gridColumn={3}>
          <ColorSwatch
            $color={`linear-gradient(90deg, ${primaryHsl} 0%, ${primaryDarkHsl} 100%)`}
            $textColor="#fff"
          >
            Dark Gradient
          </ColorSwatch>
        </Card>
      </Grid>

      <Box>
        <Text size={1} color="dimmed" weight="bold">
          UI Mockup - uses primary light/dark:
        </Text>
        <MockupCanvas
          $colorScheme={colorScheme}
          // $accent={accent}
          $primary={`hsl(${generateHsl(primary)})`}
          $primaryLight={`hsl(${generateHsl(primary, 'set', 95)})`}
          $primaryDark={`hsl(${generateHsl(primary, 'set', 10)})`}
          // $secondary={secondary}
        >
          <h4 className="mock-title" style={{ margin: '0 0 8px 0', fontSize: '1.5rem' }}>
            Heading Text Style
          </h4>
          <p style={{ margin: 0, fontSize: '1rem' }}>
            This is a quick preview of how your brand colors contrast against one another in a UI
            block.
          </p>
        </MockupCanvas>
      </Box>
    </Stack>
  )
}

/**
 * 






 */
