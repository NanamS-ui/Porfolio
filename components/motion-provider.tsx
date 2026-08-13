'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// Makes every Framer Motion animation in the app respect the OS-level
// "reduce motion" accessibility setting automatically - complements the
// prefers-reduced-motion handling already in globals.css for the plain CSS
// keyframe animations (the background blobs).
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
