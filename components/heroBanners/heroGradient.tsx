// 'use client;'

import { HEROBANNER_OPTIONS } from '@/lib/constants'
import { cn } from '@/lib/helpers'
import { TemplateProps } from './heroBanner'

// 1. Properly narrow the main TemplateProps so this inner
// component only expects properties it actually knows how to render.
interface GradientProps extends Omit<TemplateProps, 'layout' | 'height'> {
  layout: Extract<TemplateProps['layout'], 'gradientPrimary' | 'gradientAccent'>
  height: NonNullable<TemplateProps['height']>
}

export default function HeroBannerGradient({ title, description, height, layout }: GradientProps) {
  return (
    <div
      className={cn(
        HEROBANNER_OPTIONS.height[height],
        HEROBANNER_OPTIONS.bg[layout],
        'rounded-(--radius)',
        'flex flex-col items-start justify-center p-12 shadow-lg',
        'text-primary-light'
      )}
    >
      <div className="flex max-w-2/3 flex-col gap-4">
        {title && <h1 className="font-headline text-[6em] leading-tight">{title}</h1>}
        {description && <p className="text-lg opacity-90">{description}</p>}
      </div>
    </div>
  )
}
