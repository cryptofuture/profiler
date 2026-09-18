import { expect, test } from '@playwright/test'
import { questions } from '../../src/domain/questions.js'

test('three independent ratings, validation, resume, and custom exit dialog', async ({ page }) => {
  page.on('dialog', () => { throw new Error('Browser alert/confirm must not be used') })
  await page.goto('/assessment')
  await expect(page.locator('fieldset')).toHaveCount(3)
  await expect(page.getByRole('heading', { name: 'Making things work.' })).toBeVisible()
  await expect(page.locator('.discovery-note')).toHaveCount(0)
  await page.getByRole('button', { name: 'Next', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('each activity')
  const fields = page.locator('fieldset')
  for (let index = 0; index < 3; index++) {
    await fields.nth(index).getByText('Sounds good', { exact: true }).click()
  }
  await expect(page.locator('input:checked')).toHaveCount(3)
  const selectedOpacity = await fields.first().locator('.rating-option.is-selected').evaluate(element => getComputedStyle(element).opacity)
  const unselectedOpacity = await fields.first().locator('.rating-option:not(.is-selected)').first().evaluate(element => getComputedStyle(element).opacity)
  expect(selectedOpacity).toBe('1')
  expect(Number(unselectedOpacity)).toBeLessThan(0.6)
  await expect(page.locator('.discovery-note')).toContainText('Interests often combine.')
  await page.getByRole('button', { name: 'Next', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Following your curiosity.' })).toBeVisible()
  await expect(page.locator('.discovery-note')).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Following your curiosity.' })).toBeVisible()
  await page.getByRole('button', { name: 'Back', exact: true }).click()
  await expect(page.locator('input:checked')).toHaveCount(3)
  await page.getByRole('button', { name: 'Save and exit', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Save and exit', exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Save and exit', exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Save and exit' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('button', { name: 'Resume assessment' })).toBeVisible()
  await expect(page.locator('footer')).toHaveCount(0)
})

test('all interest pages precede individual reasoning exercises', async ({ page }) => {
  await page.goto('/assessment')
  for (let index = 0; index < 10; index++) {
    await expect(page.locator('fieldset')).toHaveCount(3)
    if (index >= 6) await expect(page.getByRole('heading', { name: 'A few more possibilities.' })).toBeVisible()
    for (const field of await page.locator('fieldset').all()) await field.getByText('Maybe', { exact: true }).click()
    await page.getByRole('button', { name: 'Next', exact: true }).click()
  }
  await expect(page.locator('fieldset')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Reasoning exercises', exact: true })).toBeVisible()
  const answers = await page.evaluate(() => JSON.parse(localStorage.getItem('profiler-top-state-v1')).answers)
  expect(Object.keys(answers)).toHaveLength(30)
})

test('native rating groups support arrow keys', async ({ page }) => {
  await page.goto('/assessment')
  await page.locator('fieldset').first().getByRole('radio').first().focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('fieldset').first().getByRole('radio').nth(1)).toBeChecked()
})

test('populated pages fit on mobile and AI supports copied prompts and separate dialogs', async ({ page, context }) => {
  const answers = Object.fromEntries(questions.filter(question => question.section === 'interests').map(question => [question.id, 3]))
  await page.addInitScript(answers => {
    localStorage.setItem('profiler-top-state-v1', JSON.stringify({ version: 1, locale: 'en', answers, targetCareer: 'data-decision' }))
  }, answers)
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of ['/results', '/skills', '/plan']) {
      await page.goto(route)
      await expect(page.locator('main')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px: ${route}`).toBe(false)
    }
  }
  await page.goto('/results')
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'http://127.0.0.1:4173' })
  await page.getByRole('button', { name: 'Copy prompt for ChatGPT' }).click()
  await expect(page.getByRole('button', { name: 'Copied for ChatGPT' })).toBeVisible()
  const copiedPrompt = JSON.parse(await page.evaluate(() => navigator.clipboard.readText()))
  expect(copiedPrompt.instruction).toContain('already-calculated')
  expect(copiedPrompt.outputLanguage).toBe('en')
  expect(copiedPrompt.immutableMatches).toHaveLength(5)
  let requestCount = 0
  await page.route('**/v1/ask', async route => {
    requestCount++
    await route.fulfill({ status: 401, contentType: 'application/json', body: '{"error":"Sign in required"}' })
  })
  await page.getByRole('button', { name: 'Generate AI interpretation' }).click()
  await expect(page.getByRole('dialog')).toContainText('Add another perspective?')
  expect(requestCount).toBe(0)
  await page.getByRole('dialog').getByRole('button', { name: 'Generate AI interpretation' }).click()
  await expect(page.getByRole('dialog')).toContainText('AI interpretation needs sign-in.')
  expect(requestCount).toBe(1)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('.rank-list li')).toHaveCount(5)
})

test('responsive pages and translated dialogs stay within the viewport', async ({ page }) => {
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of ['/', '/assessment', '/careers', '/careers/data-decision', '/skills', '/plan']) {
      await page.goto(route)
      await expect(page.locator('main')).toBeVisible()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
      expect(overflow, `${width}px: ${route}`).toBe(false)
    }
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/assessment')
  for (const locale of ['ru', 'kk', 'en']) {
    await page.locator('#locale').selectOption(locale)
    await expect(page.locator('html')).toHaveAttribute('lang', locale)
    await expect(page.locator('fieldset')).toHaveCount(3)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  }
  for (const field of await page.locator('fieldset').all()) await field.getByText('Maybe', { exact: true }).click()
  for (const [locale, label] of [['ru', 'Полезно знать'], ['kk', 'Білген пайдалы'], ['en', 'Worth knowing']]) {
    await page.locator('#locale').selectOption(locale)
    await expect(page.locator('.discovery-note')).toContainText(label)
  }
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog').getByText('Resources', { exact: true })).toHaveCount(0)
  await page.getByRole('dialog').getByRole('button', { name: 'Careers', exact: true }).click()
  await expect(page).toHaveURL('/careers')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('homepage has one primary heading, structured content, metadata, and no Plan link', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toContainText('career')
  expect(await page.locator('main').innerText().then(text => text.trim().split(/\s+/).length)).toBeGreaterThan(500)
  expect(await page.locator('h2').count()).toBeGreaterThan(1)
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())
  expect(schema['@graph'].map(item => item['@type'])).toEqual(expect.arrayContaining(['Organization', 'WebSite', 'WebApplication', 'SoftwareSourceCode']))
  expect(schema['@graph'].find(item => item['@type'] === 'SoftwareSourceCode').codeRepository).toBe('https://github.com/cryptofuture/profiler')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://profiler.top/og-image.png')
  await expect(page.locator('link[rel="source"]')).toHaveAttribute('href', 'https://github.com/cryptofuture/profiler')
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByText('Plan', { exact: true })).toHaveCount(0)
})
