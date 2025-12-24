'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Toggle } from '@/components/ui/toggle'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Toggle
      variant="outline"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Toggle>
  )
}
