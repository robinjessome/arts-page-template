// app/api/fallback-favicon/route.tsx
import { ImageResponse } from 'next/og'

// export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text') || '🎵'
  const color = searchParams.get('color') || '#fff'
  const letter = text.charAt(0).toUpperCase()

  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: `${color}`,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      {letter}
    </div>,
    {
      width: 32,
      height: 32,
    }
  )
}
