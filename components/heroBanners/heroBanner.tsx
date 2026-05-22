import { cn } from '@/lib/utils'
import type { SanityImageObject } from '@sanity/image-url'
import HeroBannerGradient from './heroGradient'
import HeroBannerImageFull from './heroImageFull'
import HeroBannerImageHalf from './heroImageHalf'

export interface TemplateProps {
  layout?: 'gradientPrimary' | 'gradientAccent' | 'imageFull' | 'imageHalf'
  height?: 'tall' | 'short' | 'md'
  title?: string
  description?: string
  color?: string
  image?: SanityImageObject
}

export default function HeroBanner(props: TemplateProps) {
  const layout = props.layout ?? 'gradientPrimary'
  const height = props.height ?? 'md'

  const fullProps = { ...props, layout, height }

  const renderBanner = () => {
    switch (layout) {
      case 'gradientPrimary':
      case 'gradientAccent':
        return <HeroBannerGradient {...fullProps} layout={layout} />

      case 'imageFull':
        return <HeroBannerImageFull {...fullProps} layout={layout} />

      case 'imageHalf':
        return <HeroBannerImageHalf {...fullProps} layout={layout} />

      default:
        return <HeroBannerGradient {...fullProps} layout="gradientPrimary" />
    }
  }

  return <div className={cn('w-full')}>{renderBanner()}</div>
}
