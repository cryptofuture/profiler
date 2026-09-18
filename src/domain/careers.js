export const skills = [
  ['programming', 'technical'], ['python', 'technical'], ['sql', 'technical'], ['statistics', 'cognitive'],
  ['dataAnalysis', 'technical'], ['dataVisualization', 'technical'], ['aiEvaluation', 'technical'],
  ['systemDesign', 'technical'], ['debugging', 'technical'], ['apis', 'technical'], ['databases', 'technical'],
  ['networks', 'technical'], ['security', 'technical'], ['threatModeling', 'cognitive'], ['automation', 'technical'],
  ['processAnalysis', 'execution'], ['userResearch', 'human'], ['prototyping', 'technical'], ['accessibility', 'human'],
  ['productThinking', 'cognitive'], ['electronics', 'technical'], ['mechanics', 'technical'], ['controlSystems', 'technical'],
  ['diagnostics', 'cognitive'], ['safety', 'execution'], ['energySystems', 'technical'], ['biology', 'technical'],
  ['clinicalReasoning', 'cognitive'], ['observation', 'cognitive'], ['scientificReasoning', 'cognitive'],
  ['experimentation', 'cognitive'], ['researchDesign', 'cognitive'], ['evidenceEvaluation', 'cognitive'],
  ['teaching', 'human'], ['mentoring', 'human'], ['facilitation', 'human'], ['curriculumDesign', 'execution'],
  ['financialAnalysis', 'technical'], ['economics', 'technical'], ['riskAssessment', 'cognitive'],
  ['businessAnalysis', 'cognitive'], ['storytelling', 'human'], ['persuasion', 'human'], ['audienceResearch', 'human'],
  ['strategy', 'cognitive'], ['creativity', 'cognitive'], ['analyticalThinking', 'cognitive'], ['systemsThinking', 'cognitive'],
  ['problemSolving', 'cognitive'], ['decisionMaking', 'cognitive'], ['communication', 'human'], ['empathy', 'human'],
  ['collaboration', 'human'], ['leadership', 'human'], ['planning', 'execution'], ['attention', 'execution'],
  ['adaptability', 'execution'], ['selfLearning', 'execution'], ['projectManagement', 'execution']
].map(([id, category]) => ({ id, category }))

const s = (id, target = 3, importance = 1) => ({ id, target, importance })

export const careers = [
  {
    id: 'ai-software',
    icon: 'Code2',
    tags: ['analytical', 'technical'],
    roles: ['Software engineer', 'AI engineer', 'Platform engineer'],
    riasec: { investigative: 0.55, realistic: 0.2, conventional: 0.15, artistic: 0.1 },
    values: { achievement: 0.35, independence: 0.3, workingConditions: 0.2, recognition: 0.15 },
    aptitude: { logical: 0.35, systems: 0.3, pattern: 0.2, quantitative: 0.15 },
    skills: [s('programming', 3, 3), s('debugging', 3, 2), s('systemDesign', 3, 2), s('apis', 2), s('aiEvaluation', 2)]
  },
  {
    id: 'data-decision',
    icon: 'ChartNoAxesColumnIncreasing',
    tags: ['analytical', 'business'],
    roles: ['Data analyst', 'Data scientist', 'Operations researcher'],
    riasec: { investigative: 0.6, conventional: 0.25, enterprising: 0.15 },
    values: { achievement: 0.35, independence: 0.25, workingConditions: 0.25, recognition: 0.15 },
    aptitude: { quantitative: 0.4, logical: 0.25, pattern: 0.2, systems: 0.15 },
    skills: [s('dataAnalysis', 3, 3), s('statistics', 3, 2), s('sql', 3, 2), s('dataVisualization', 2), s('evidenceEvaluation', 2)]
  },
  {
    id: 'cybersecurity',
    icon: 'ShieldCheck',
    tags: ['analytical', 'technical'],
    roles: ['Security analyst', 'Security engineer', 'Threat analyst'],
    riasec: { investigative: 0.5, realistic: 0.25, conventional: 0.25 },
    values: { achievement: 0.3, support: 0.25, workingConditions: 0.25, recognition: 0.2 },
    aptitude: { logical: 0.3, attention: 0.3, systems: 0.25, pattern: 0.15 },
    skills: [s('security', 3, 3), s('networks', 3, 2), s('threatModeling', 3, 2), s('attention', 3), s('diagnostics', 2)]
  },
  {
    id: 'automation-business',
    icon: 'Workflow',
    tags: ['technical', 'business'],
    roles: ['Automation specialist', 'Solutions engineer', 'Workflow architect'],
    riasec: { enterprising: 0.35, investigative: 0.3, conventional: 0.25, realistic: 0.1 },
    values: { achievement: 0.35, independence: 0.25, recognition: 0.2, workingConditions: 0.2 },
    aptitude: { systems: 0.4, logical: 0.25, creative: 0.2, verbal: 0.15 },
    skills: [s('automation', 3, 3), s('processAnalysis', 3, 2), s('apis', 2, 2), s('businessAnalysis', 3), s('systemsThinking', 3)]
  },
  {
    id: 'product-ux',
    icon: 'PanelsTopLeft',
    tags: ['creative', 'people', 'technical'],
    roles: ['Product designer', 'UX researcher', 'Product manager'],
    riasec: { artistic: 0.35, investigative: 0.25, social: 0.25, enterprising: 0.15 },
    values: { achievement: 0.25, independence: 0.25, relationships: 0.3, recognition: 0.2 },
    aptitude: { creative: 0.35, verbal: 0.25, systems: 0.2, attention: 0.2 },
    skills: [s('userResearch', 3, 3), s('prototyping', 3, 2), s('productThinking', 3, 2), s('accessibility', 2), s('communication', 3)]
  },
  {
    id: 'robotics-hardware',
    icon: 'Bot',
    tags: ['hands-on', 'technical', 'analytical'],
    roles: ['Robotics engineer', 'Mechatronics technician', 'Embedded developer'],
    riasec: { realistic: 0.5, investigative: 0.35, conventional: 0.15 },
    values: { achievement: 0.35, independence: 0.2, support: 0.2, workingConditions: 0.25 },
    aptitude: { spatial: 0.35, systems: 0.3, logical: 0.2, attention: 0.15 },
    skills: [s('electronics', 3, 3), s('mechanics', 3, 2), s('controlSystems', 3, 2), s('programming', 2), s('diagnostics', 3)]
  },
  {
    id: 'energy-infrastructure',
    icon: 'Zap',
    tags: ['hands-on', 'technical'],
    roles: ['Electrical technician', 'Energy systems analyst', 'Infrastructure engineer'],
    riasec: { realistic: 0.55, investigative: 0.25, conventional: 0.2 },
    values: { achievement: 0.25, support: 0.25, workingConditions: 0.35, relationships: 0.15 },
    aptitude: { spatial: 0.3, systems: 0.3, attention: 0.25, quantitative: 0.15 },
    skills: [s('energySystems', 3, 3), s('safety', 3, 3), s('diagnostics', 3, 2), s('systemsThinking', 3), s('mechanics', 2)]
  },
  {
    id: 'healthcare-care',
    icon: 'HeartPulse',
    tags: ['people', 'hands-on'],
    roles: ['Nurse', 'Clinical technician', 'Care coordinator'],
    riasec: { social: 0.55, investigative: 0.25, realistic: 0.2 },
    values: { relationships: 0.35, support: 0.3, achievement: 0.2, workingConditions: 0.15 },
    aptitude: { attention: 0.3, verbal: 0.25, systems: 0.2, logical: 0.15, spatial: 0.1 },
    skills: [s('empathy', 3, 3), s('clinicalReasoning', 3, 3), s('observation', 3, 2), s('communication', 3, 2), s('biology', 2)]
  },
  {
    id: 'science-biotech',
    icon: 'FlaskConical',
    tags: ['analytical', 'technical'],
    roles: ['Researcher', 'Laboratory scientist', 'Bioinformatician'],
    riasec: { investigative: 0.65, realistic: 0.2, conventional: 0.15 },
    values: { achievement: 0.35, independence: 0.3, support: 0.2, recognition: 0.15 },
    aptitude: { logical: 0.3, quantitative: 0.25, attention: 0.25, pattern: 0.2 },
    skills: [s('scientificReasoning', 3, 3), s('researchDesign', 3, 2), s('experimentation', 3, 2), s('evidenceEvaluation', 3), s('statistics', 2)]
  },
  {
    id: 'education-development',
    icon: 'BookOpen',
    tags: ['people', 'creative'],
    roles: ['Teacher', 'Instructional designer', 'Technical trainer'],
    riasec: { social: 0.55, artistic: 0.2, enterprising: 0.15, investigative: 0.1 },
    values: { relationships: 0.4, support: 0.3, achievement: 0.2, independence: 0.1 },
    aptitude: { verbal: 0.4, creative: 0.25, systems: 0.2, attention: 0.15 },
    skills: [s('teaching', 3, 3), s('communication', 3, 3), s('mentoring', 3, 2), s('curriculumDesign', 3), s('facilitation', 3)]
  },
  {
    id: 'business-finance',
    icon: 'BriefcaseBusiness',
    tags: ['business', 'analytical'],
    roles: ['Financial analyst', 'Business analyst', 'Risk specialist'],
    riasec: { enterprising: 0.4, conventional: 0.3, investigative: 0.3 },
    values: { achievement: 0.3, recognition: 0.3, workingConditions: 0.2, independence: 0.2 },
    aptitude: { quantitative: 0.3, verbal: 0.25, systems: 0.25, logical: 0.2 },
    skills: [s('financialAnalysis', 3, 3), s('riskAssessment', 3, 2), s('businessAnalysis', 3, 2), s('decisionMaking', 3), s('communication', 3)]
  },
  {
    id: 'creative-enterprise',
    icon: 'Sparkles',
    tags: ['creative', 'business', 'people'],
    roles: ['Creative strategist', 'Marketing strategist', 'Founder'],
    riasec: { artistic: 0.4, enterprising: 0.35, social: 0.15, investigative: 0.1 },
    values: { independence: 0.35, recognition: 0.25, achievement: 0.25, relationships: 0.15 },
    aptitude: { creative: 0.4, verbal: 0.3, systems: 0.15, pattern: 0.15 },
    skills: [s('storytelling', 3, 3), s('strategy', 3, 2), s('audienceResearch', 3, 2), s('persuasion', 3), s('creativity', 3)]
  }
]

export const careerById = Object.fromEntries(careers.map(career => [career.id, career]))
