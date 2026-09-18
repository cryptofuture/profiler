import { encode } from '@msgpack/msgpack'
import { describe, expect, it } from 'vitest'
import { buildPrompt, decodeBody, parseAiResponse } from './api.js'

describe('AI response decoding', () => {
  it('decodes Base64-wrapped MessagePack responses', async () => {
    const bytes = encode({ response: 'User Safety: safe' })
    const body = btoa(String.fromCharCode(...bytes))
    const response = new Response(body, { headers: { 'content-type': 'text/plain' } })
    await expect(decodeBody(response)).resolves.toEqual({ response: 'User Safety: safe' })
  })

  it('continues to decode raw MessagePack responses', async () => {
    const response = new Response(encode({ response: '{"summary":"Useful result"}' }), { headers: { 'content-type': 'application/msgpack' } })
    await expect(decodeBody(response)).resolves.toEqual({ response: '{"summary":"Useful result"}' })
  })

  it('does not present a safety-only response as an interpretation', () => {
    expect(() => parseAiResponse('User Safety: safe')).toThrow('without an interpretation')
  })

  it('includes localized career names without changing ranking or scores', () => {
    const prompt = JSON.parse(buildPrompt({
      locale: 'ru',
      profile: {},
      matches: [
        { careerId: 'product-ux', personalFit: 72 },
        { careerId: 'business-finance', personalFit: 65 }
      ],
      targetCareer: null,
      weeklyHours: 10
    }))

    expect(prompt.immutableMatches).toEqual([
      { careerId: 'product-ux', careerName: 'Продукт, UX и дизайн взаимодействия с ИИ', personalFit: 72 },
      { careerId: 'business-finance', careerName: 'Бизнес, финансы и риск', personalFit: 65 }
    ])
  })
})
