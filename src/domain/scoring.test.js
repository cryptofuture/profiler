import { describe, expect, it } from 'vitest'
import { careers } from './careers.js'
import { buildPlan } from './plan.js'
import { estimateReadiness, fitLabel, matchCareers, scoreProfile } from './scoring.js'
import { interestQuestions } from './questions.js'

describe('career scoring', () => {
  it('keeps unanswered dimensions unknown', () => {
    const profile = scoreProfile({})
    expect(profile.interests.investigative).toBeNull()
    expect(profile.completeForRanking).toBe(false)
  })

  it('ranks investigative answers deterministically', () => {
    const answers = Object.fromEntries(interestQuestions.map(question => [question.id, question.dimension === 'investigative' ? 5 : 2]))
    const matches = matchCareers(scoreProfile(answers))
    expect(matches[0].careerId).toBe('science-biotech')
    expect(matches.every((match, index) => index === 0 || match.personalFit <= matches[index - 1].personalFit)).toBe(true)
  })

  it('uses the displayed whole-number band boundary', () => {
    expect(fitLabel(80)).toBe('strongAlignment')
    expect(fitLabel(79)).toBe('worthExploring')
    expect(fitLabel(null)).toBe('notAvailable')
  })

  it('does not count unknown skills as zero', () => {
    const career = careers.find(item => item.id === 'data-decision')
    const unknown = estimateReadiness(career, {})
    expect(unknown.score).toBeNull()
    expect(unknown.coverage).toBe(0)
    expect(unknown.gaps.every(gap => gap.current === null && gap.gap === null)).toBe(true)
  })

  it('reports readiness only over known skill evidence', () => {
    const career = careers.find(item => item.id === 'data-decision')
    const readiness = estimateReadiness(career, { dataAnalysis: 3 })
    expect(readiness.score).toBe(100)
    expect(readiness.coverage).toBeGreaterThan(0)
    expect(readiness.coverage).toBeLessThan(100)
  })

  it('uses weekly capacity to change plan scope', () => {
    const career = careers.find(item => item.id === 'ai-software')
    const fiveHourTasks = buildPlan(career, 5).flatMap(phase => phase.tasks)
    const twentyHourTasks = buildPlan(career, 20).flatMap(phase => phase.tasks)
    expect(twentyHourTasks.length).toBeGreaterThan(fiveHourTasks.length)
  })
})
