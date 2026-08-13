'use client';

import { useState } from 'react';
import { Code2 } from 'lucide-react';
import { guessTechSlug } from '@/lib/tech-icons';

interface TechIconProps {
  name: string;
  icon?: string | null;
  className?: string;
}

// Renders a technology logo for a skill: uses the DB `icon` field if it's a
// full URL, otherwise guesses a Simple Icons slug from the skill name and
// pulls a single-color (site blue) SVG from the Simple Icons CDN. Falls back
// to a generic icon if the guessed slug doesn't exist, so an unrecognized
// skill name never renders as a broken image.
export function TechIcon({ name, icon, className = 'h-5 w-5' }: TechIconProps) {
  const [failed, setFailed] = useState(false);
  const isUrl = !!icon && /^https?:\/\//.test(icon);
  const slug = isUrl ? null : icon?.trim() || guessTechSlug(name);
  const src = isUrl ? (icon as string) : `https://cdn.simpleicons.org/${slug}/3b82f6`;

  if (failed || (!isUrl && !slug)) {
    return <Code2 className={`${className} text-slate-400 dark:text-slate-500`} />;
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`${className} object-contain`}
      onError={() => setFailed(true)}
    />
  );
}
