"use client";

import { ThemeProvider } from "next-themes";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import { ClerkProvider } from "@clerk/nextjs";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ProjectsProvider>
          {children}
        </ProjectsProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
} 