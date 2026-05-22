// 'use client;'
// import { cn } from '@/lib/utils'

export interface TemplateProps {
  data?: string
}

export default async function SocialLinksList({ data }: TemplateProps) {
  if (!data) return null

  return <div className="flex items-center gap-4">Template</div>
}
