import { questions } from './questions.js'

/** Keep complete interest triplets together, then place the remaining items last. */
export function buildAssessmentPages (items = questions) {
  const groups = new Map()
  for (const question of items.filter(item => item.section === 'interests')) {
    const group = groups.get(question.dimension) || []
    group.push(question)
    groups.set(question.dimension, group)
  }

  const pages = []
  const remaining = []
  for (const [dimension, group] of groups) {
    const groupedCount = Math.floor(group.length / 3) * 3
    for (let index = 0; index < groupedCount; index += 3) {
      pages.push({ section: 'interests', topic: dimension, questions: group.slice(index, index + 3) })
    }
    remaining.push(...group.slice(groupedCount))
  }
  for (let index = 0; index < remaining.length; index += 3) {
    pages.push({ section: 'interests', topic: 'moreInterests', questions: remaining.slice(index, index + 3) })
  }
  for (const question of items.filter(item => item.section !== 'interests')) {
    pages.push({ section: question.section, topic: question.section, questions: [question] })
  }
  return pages.map(page => ({ ...page, id: page.questions.map(question => question.id).join('|') }))
}

export const assessmentPages = buildAssessmentPages()

export function resumePage (answers, savedPageId) {
  const savedIndex = assessmentPages.findIndex(page => page.id === savedPageId)
  if (savedIndex >= 0) return savedIndex
  const incomplete = assessmentPages.findIndex(page => page.questions.some(question => answers[question.id] == null))
  return incomplete >= 0 ? incomplete : 0
}
