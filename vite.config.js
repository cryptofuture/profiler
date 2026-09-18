import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { homeGuideContent } from './src/domain/homeContent.js'
import { experienceCopy } from './src/i18n/experience.js'

const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

function homepageFallback () {
  const guide = homeGuideContent.en
  const sections = guide.sections.map(section => `<article><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></article>`).join('')
  return `<main><section><h1>${escapeHtml(experienceCopy.en.heroTitle)}</h1><p>${escapeHtml(experienceCopy.en.heroText)}</p></section><section><h2>${escapeHtml(guide.title)}</h2><p>${escapeHtml(guide.intro)}</p>${sections}</section></main>`
}

const seoFallback = {
  name: 'seo-homepage-fallback',
  transformIndexHtml: html => html.replace('<div id="app"></div>', `<div id="app">${homepageFallback()}</div>`)
}

export default defineConfig({
  plugins: [seoFallback, preact()],
  server: { port: 5173 },
  test: { environment: 'node', include: ['src/**/*.test.js'] }
})
