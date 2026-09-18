import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const manifestUrl = new URL('../SHA256SUMS', import.meta.url)
const manifest = await readFile(manifestUrl, 'utf8')
const entries = manifest.trim().split('\n').map(line => {
  const [sha256, url] = line.trim().split(/\s+/, 2)
  return { sha256, url }
})

for (const entry of entries) {
  const response = await fetch(entry.url)
  if (!response.ok) throw new Error(`Could not download ${entry.url}: HTTP ${response.status}`)
  const content = Buffer.from(await response.arrayBuffer())
  const actual = createHash('sha256').update(content).digest('hex')
  if (actual !== entry.sha256) throw new Error(`SHA-256 mismatch for ${entry.url}\nExpected ${entry.sha256}\nReceived ${actual}`)
  console.log(`verified ${entry.sha256}  ${entry.url}`)
}
