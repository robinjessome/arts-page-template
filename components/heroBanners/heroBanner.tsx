import { cn } from '@/lib/utils'

import HeroBannerGradient from './heroGradient'
import HeroBannerImageFull from './heroImageFull'
import HeroBannerImageHalf from './heroImageHalf'

export interface TemplateProps {
  layout?: 'gradientPrimary' | 'gradientAccent' | 'imageFull' | 'imageHalf'
  height?: 'tall' | 'short' | 'md'
  title?: string
  description?: string
}
export default function HeroBanner({
  title,
  description,
  layout = 'gradientPrimary',
  height = 'md',
}: TemplateProps) {
  const renderBanner = () => {
    switch (layout) {
      case 'gradientPrimary':
      case 'gradientAccent':
        // Passing the layout along in case the gradient component
        // needs to differentiate between primary and accent colors
        return (
          <HeroBannerGradient
            layout={layout}
            height={height}
            title={title}
            description={height !== 'short' ? description : ''}
          />
        )

      case 'imageFull':
        return <HeroBannerImageFull height={height} />

      case 'imageHalf':
        return <HeroBannerImageHalf height={height} />

      default:
        // Fallback in case an unexpected value slips through
        return <HeroBannerGradient layout="gradientPrimary" height={height} />
    }
  }

  return <div className={cn('w-full')}>{renderBanner()}</div>
}
