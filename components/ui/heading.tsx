import React from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  children: React.ReactNode
  className?: string
}

export function Heading({ size = 'md', children, className }: HeadingProps) {
  const sizeClasses = {
    sm: 'text-lg font-semibold',
    md: 'text-xl font-semibold', 
    lg: 'text-2xl font-bold',
    xl: 'text-3xl font-bold',
    '2xl': 'text-4xl font-bold'
  }

  const Component = size === 'sm' ? 'h4' : size === 'md' ? 'h3' : size === 'lg' ? 'h2' : 'h1'

  return (
    <Component className={cn(sizeClasses[size], className)}>
      {children}
    </Component>
  )
}