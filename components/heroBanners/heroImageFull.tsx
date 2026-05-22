// 'use client;'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { HEROBANNER_OPTIONS } from '@/lib/constants'
import { urlFor } from '@/sanity/lib/image'

import { TemplateProps } from './heroBanner'

import { SeparatorThick } from '@/components/ui/separatorThick'

export default function HeroBannerImageFull({
  height = 'md',
  image,
  title,
  description,
}: TemplateProps) {
  if (!image) return null

  const imageUrl = urlFor(image).width(1280).height(600).url()

  return (
    <div
      className={cn(
        HEROBANNER_OPTIONS.height[height],
        'relative overflow-hidden rounded-(--radius)', // Added relative & overflow-hidden to clip the background image
        'flex flex-col items-start justify-center p-12 shadow-lg',
        'text-primary-light'
      )}
    >
      {/* Background Optimized Image */}
      <Image
        src={imageUrl}
        alt={title || 'Hero banner background'}
        fill
        priority // Gives this image loading precedence since it's above the fold
        className="z-0 object-cover"
      />

      {/* Dark overlay to ensure your text remains perfectly legible over any image */}
      <div className="from-primary-dark via-primary-dark/60 to-primary/10 absolute inset-0 z-10 bg-linear-to-r" />

      {/* Content Stack */}
      <div className="relative z-20 flex max-w-2/3 flex-col gap-6">
        {title && <h1 className="font-headline text-[6em] leading-tight font-bold">{title}</h1>}
        <SeparatorThick />
        {description && <p className="text-lg opacity-90">{description}</p>}
      </div>
    </div>
  )
}
