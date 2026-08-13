// Maps common skill names to their Simple Icons (simpleicons.org) slug, so a
// technology icon can be shown next to each skill without requiring every
// row in Supabase to be manually filled in. Skills not found here fall back
// to a normalized guess (lowercased, punctuation stripped), which already
// matches simple slugs like "react", "docker", "figma", "python", etc.
const SLUG_ALIASES: Record<string, string> = {
  'node.js': 'nodedotjs',
  nodejs: 'nodedotjs',
  node: 'nodedotjs',
  'next.js': 'nextdotjs',
  nextjs: 'nextdotjs',
  'nuxt.js': 'nuxtdotjs',
  nuxtjs: 'nuxtdotjs',
  'vue.js': 'vuedotjs',
  vuejs: 'vuedotjs',
  vue: 'vuedotjs',
  'express.js': 'express',
  expressjs: 'express',
  'nest.js': 'nestjs',
  nestjs: 'nestjs',
  'c#': 'csharp',
  'c++': 'cplusplus',
  '.net': 'dotnet',
  'asp.net': 'dotnet',
  tailwind: 'tailwindcss',
  'tailwind css': 'tailwindcss',
  'sass/scss': 'sass',
  scss: 'sass',
  html: 'html5',
  html5: 'html5',
  css: 'css3',
  css3: 'css3',
  postgres: 'postgresql',
  mongo: 'mongodb',
  'amazon web services': 'amazonaws',
  aws: 'amazonaws',
  'material ui': 'mui',
  photoshop: 'adobephotoshop',
  illustrator: 'adobeillustrator',
  xd: 'adobexd',
  'react native': 'react',
  'visual studio code': 'visualstudiocode',
  vscode: 'visualstudiocode',
};

export function guessTechSlug(name: string): string {
  const key = name.trim().toLowerCase();
  if (SLUG_ALIASES[key]) return SLUG_ALIASES[key];
  return key.replace(/[^a-z0-9]/g, '');
}
