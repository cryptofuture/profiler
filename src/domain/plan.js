export function buildPlan (career, weeklyHours) {
  if (!career) return []
  const topSkills = career.skills.slice().sort((a, b) => b.importance - a.importance)
  const capacity = weeklyHours <= 5 ? 1 : weeklyHours <= 10 ? 2 : 3
  const phaseKeys = ['phase30', 'phase90', 'phase6', 'phase12']
  return phaseKeys.map((phase, phaseIndex) => ({
    id: `${career.id}-${phase}`,
    phase,
    tasks: topSkills.slice(phaseIndex, phaseIndex + capacity).map((skill, taskIndex) => ({
      id: `${career.id}-${phase}-${skill.id}`,
      skillId: skill.id,
      effort: Math.max(4, Math.round((skill.target * 12) / capacity)),
      order: taskIndex + 1
    }))
  }))
}
