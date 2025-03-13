"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Use a simpler approach with any type to avoid TypeScript errors
export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode;
  [key: string]: any;
}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 