import { careers } from './careers.js'
import { questions } from './questions.js'

const COMPONENT_WEIGHTS = { interests: 0.55, aptitudes: 0.2, values: 0.25 }

export function scoreProfile (answers) {
  const sectionIds = [...new Set(questions.map(question => question.section))]
  const profile = { coverage: {} }
  for (const section of sectionIds) {
    profile[section] = {}
    const sectionQuestions = questions.filter(question => question.section === section)
    const dimensions = [...new Set(sectionQuestions.map(question => question.dimension))]
    profile.coverage[section] = { answered: 0, available: sectionQuestions.length }
    for (const dimension of dimensions) {
      const items = sectionQuestions.filter(question => question.dimension === dimension)
      const answered = items.filter(question => answers[question.id] != null)
      profile.coverage[section].answered += answered.length
      if (!answered.length) {
        profile[section][dimension] = null
        continue
      }
      const total = answered.reduce((sum, question) => {
        if (question.kind === 'choice') return sum + (answers[question.id] === question.correct ? 1 : 0)
        return sum + ((Number(answers[question.id]) - 1) / 4)
      }, 0)
      profile[section][dimension] = Math.round((total / answered.length) * 100)
    }
  }
  profile.completeForRanking = Object.keys(profile.interests).every(dimension => {
    const items = questions.filter(question => question.section === 'interests' && question.dimension === dimension)
    return items.filter(question => answers[question.id] != null).length >= 3
  })
  return profile
}

function componentScore (userScores, familyWeights) {
  let weighted = 0
  let coverage = 0
  for (const [dimension, weight] of Object.entries(familyWeights)) {
    const score = userScores[dimension]
    if (score == null) continue
    weighted += (score / 100) * weight
    coverage += weight
  }
  return coverage ? { score: (weighted / coverage) * 100, coverage } : { score: null, coverage: 0 }
}

export function matchCareers (profile) {
  return careers.map(career => {
    const components = {
      interests: componentScore(profile.interests, career.riasec),
      aptitudes: componentScore(profile.aptitudes, career.aptitude),
      values: componentScore(profile.values, career.values)
    }
    let total = 0
    let represented = 0
    for (const [key, component] of Object.entries(components)) {
      if (component.score == null) continue
      const availableWeight = COMPONENT_WEIGHTS[key] * component.coverage
      total += component.score * availableWeight
      represented += availableWeight
    }
    const personalFit = represented ? Math.round(total / represented) : null
    return {
      careerId: career.id,
      personalFit,
      evidenceCoverage: Math.round((represented / Object.values(COMPONENT_WEIGHTS).reduce((a, b) => a + b, 0)) * 100),
      components
    }
  }).sort((a, b) => (b.personalFit ?? -1) - (a.personalFit ?? -1) || a.careerId.localeCompare(b.careerId))
}

export function fitLabel (score) {
  if (score == null) return 'notAvailable'
  if (score >= 80) return 'strongAlignment'
  if (score >= 65) return 'worthExploring'
  return 'sharedInterests'
}

export function estimateReadiness (career, skillLevels) {
  let weighted = 0
  let knownImportance = 0
  let totalImportance = 0
  const gaps = []
  for (const requirement of career.skills) {
    totalImportance += requirement.importance
    const current = skillLevels[requirement.id]
    if (current == null) {
      gaps.push({ ...requirement, current: null, gap: null })
      continue
    }
    knownImportance += requirement.importance
    weighted += Math.min(current / requirement.target, 1) * requirement.importance
    gaps.push({ ...requirement, current, gap: Math.max(0, requirement.target - current) })
  }
  return {
    score: knownImportance ? Math.round((weighted / knownImportance) * 100) : null,
    coverage: totalImportance ? Math.round((knownImportance / totalImportance) * 100) : 0,
    gaps
  }
}
