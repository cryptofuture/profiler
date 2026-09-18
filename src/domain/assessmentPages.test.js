import { describe, expect, it } from 'vitest'
import { assessmentPages, resumePage } from './assessmentPages.js'
import { interestQuestions, questions } from './questions.js'

describe('grouped interest pages', () => {
  it('keeps every question exactly once with three interests per page', () => {
    const interestPages = assessmentPages.filter(page => page.section === 'interests')
    expect(interestPages).toHaveLength(10)
    expect(interestPages.every(page => page.questions.length === 3)).toBe(true)
    const allIds = assessmentPages.flatMap(page => page.questions.map(question => question.id))
    expect(new Set(allIds).size).toBe(questions.length)
    expect(allIds.slice().sort()).toEqual(questions.map(question => question.id).sort())
  })

  it('puts complete related groups before unmatched interest remainders', () => {
    for (const page of assessmentPages.slice(0, 6)) {
      expect(new Set(page.questions.map(question => question.dimension)).size).toBe(1)
      expect(page.topic).toBe(page.questions[0].dimension)
      expect(page.questions.every(question => ['en', 'ru', 'kk'].every(locale => question.label[locale]?.trim()))).toBe(true)
    }
    expect(assessmentPages.slice(6, 10).every(page => page.topic === 'moreInterests')).toBe(true)
    expect(assessmentPages[10].section).toBe('aptitudes')
  })

  it('resumes a partial triplet from existing single-question answers', () => {
    const answers = Object.fromEntries(interestQuestions.slice(0, 2).map(question => [question.id, 4]))
    expect(resumePage(answers)).toBe(0)
    expect(resumePage(answers, assessmentPages[5].id)).toBe(5)
    expect(resumePage(answers, 'retired-page')).toBe(0)
  })
})
