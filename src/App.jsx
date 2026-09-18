import { IntlProvider } from 'preact-i18n'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import {
  ArrowLeft, ArrowRight, BarChart3, BookOpen, Bot, BriefcaseBusiness, Check,
  ChevronRight, Code2, Copy, Download, FlaskConical, HeartPulse, Languages, Menu,
  PanelsTopLeft, Search, ShieldCheck, Sparkles, Target, Workflow, X, Zap, Sprout, Compass, Footprints
} from 'lucide-preact'
import { careers, careerById } from './domain/careers.js'
import { buildPlan } from './domain/plan.js'
import { homeGuideContent } from './domain/homeContent.js'
import { estimateReadiness, fitLabel, matchCareers, scoreProfile } from './domain/scoring.js'
import { careerCopy, translate, translateRole, translateSkill, translations } from './i18n/translations.js'
import { askCareerModel, buildPrompt, parseAiResponse } from './lib/api.js'
import { usePersistentState } from './hooks/usePersistentState.js'
import { Assessment } from './components/Assessment.jsx'
import { Dialog } from './components/Dialog.jsx'

const iconMap = { Code2, ChartNoAxesColumnIncreasing: BarChart3, ShieldCheck, Workflow, PanelsTopLeft, Bot, Zap, HeartPulse, FlaskConical, BookOpen, BriefcaseBusiness, Sparkles }

function useRoute () {
  const [route, setRoute] = useState(() => window.location.pathname || '/')
  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const go = path => {
    window.history.pushState({}, '', path)
    setRoute(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return [route, go]
}

function Header ({ route, go, locale, setLocale }) {
  const [open, setOpen] = useState(false)
  const t = (key, values) => translate(locale, key, values)
  const links = [['/results', 'results'], ['/careers', 'careers'], ['/skills', 'skills'], ...(route === '/' ? [] : [['/plan', 'plan']])]
  return (
    <header class='site-header'>
      <div class='header-inner'>
        <button class='brand' onClick={() => go('/')} aria-label={t('home')}>
          <img class='brand-logo' src='/profiler-logo.webp' width='480' height='126' alt='Profiler' />
        </button>
        <button class='menu-button' onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t('menu')}>{open ? <X /> : <Menu />}</button>
        <nav class='main-nav' aria-label={t('primaryNav')}>
          {links.map(([path, label]) => <button key={path} class={route.startsWith(path) ? 'active' : ''} aria-current={route.startsWith(path) ? 'page' : undefined} onClick={() => { go(path); setOpen(false) }}>{t(label)}</button>)}
        </nav>
        <div class='header-actions'>
          <Languages size={17} aria-hidden='true' />
          <label class='sr-only' for='locale'>{t('language')}</label>
          <select id='locale' value={locale} onChange={event => setLocale(event.currentTarget.value)}>
            <option value='en'>EN</option><option value='ru'>RU</option><option value='kk'>ҚАЗ</option>
          </select>
        </div>
      </div>
      {open && (
        <Dialog title='Profiler' description={t('heroNote')} closeLabel={t('close')} onClose={() => setOpen(false)}>
          <nav class='dialog-nav' aria-label={t('primaryNav')}>
            {[['/', 'home'], ...links].map(([path, label]) => <button key={path} aria-current={route === path ? 'page' : undefined} onClick={() => { go(path); setOpen(false) }}>{t(label)}<ArrowRight size={18} /></button>)}
          </nav>
        </Dialog>
      )}
    </header>
  )
}

function CareerIcon ({ career, size = 22 }) {
  const Icon = iconMap[career.icon] || Target
  return <Icon size={size} stroke-width='1.8' />
}

function Home ({ go, hasProgress, locale }) {
  const t = (key, values) => translate(locale, key, values)
  const guide = homeGuideContent[locale] || homeGuideContent.en
  const steps = [
    [Sprout, 'stepDiscover', 'stepDiscoverText'],
    [Compass, 'stepExplore', 'stepExploreText'],
    [Footprints, 'stepGrow', 'stepGrowText']
  ]
  return (
    <main>
      <section class='hero page-shell'>
        <div class='hero-copy'>
          <p class='eyebrow'><span class='tiny-spark' />{t('eyebrow')}</p>
          <h1>{t('heroTitle')}</h1>
          <p class='lead'>{t('heroText')}</p>
          <div class='button-row'>
            <button class='button primary' onClick={() => go('/assessment')}>{hasProgress ? t('resume') : t('start')}<ArrowRight size={18} /></button>
            <button class='button secondary' onClick={() => go('/careers')}>{t('explore')}</button>
          </div>
          <p class='hero-note'><Check size={15} />{t('heroNote')}</p>
        </div>
        <div class='discovery-art'>
          <div class='art-orbit' aria-hidden='true' />
          <div class='discovery-paper'>
            <span class='paper-caption'>PROFILER / 01</span>
            <svg class='growth-drawing' viewBox='0 0 300 235' aria-hidden='true'>
              <circle cx='218' cy='66' r='41' fill='#cfe5ff' />
              <path d='M146 215 C146 168 171 128 151 36 M146 186 Q105 142 69 134 M155 146 Q201 118 236 118 M157 98 Q120 76 96 61' fill='none' stroke='#154b8b' stroke-width='3' stroke-linecap='round' />
              <path d='M150 65 C113 54 123 20 147 13 C163 32 171 49 150 65 M151 120 C118 118 99 89 109 66 C143 70 156 93 151 120 M146 177 C108 180 78 160 79 135 C114 129 141 152 146 177 M162 143 C161 107 190 83 214 89 C211 121 190 142 162 143 M145 210 C167 176 209 179 223 196 C203 221 169 228 145 210' fill='#2f8cf4' />
              <path d='M145 211 C120 179 81 185 66 208 C88 229 121 233 145 211' fill='#8fc3ff' />
              <path d='M49 230 Q152 209 264 230' fill='none' stroke='#a9c8eb' stroke-width='2' />
            </svg>
            <h2>{t('journeyCardTitle')}</h2>
            <p>{t('journeyCardText')}</p>
            <span class='paper-signature'>Profiler</span>
          </div>
          <div class='floating-note'><Compass size={22} /><span>{t('twelvePaths')}</span></div>
          <Sparkles class='art-asterisk' size={42} aria-hidden='true' />
        </div>
      </section>
      <section class='journey-section page-shell'>
        <div class='journey-intro'><p class='eyebrow'>{t('yourJourney')}</p><h2>{t('trustTitle')}</h2><p>{t('trustText')}</p></div>
        <div class='journey-cards'>
          {steps.map(([Icon, title, description]) => (
            <article key={title} class='journey-card'>
              <div class='journey-card-top'><Icon size={26} /></div>
              <h3>{t(title)}</h3><p>{t(description)}</p>
            </article>
          ))}
        </div>
      </section>
      <section class='home-guide page-shell' aria-labelledby='home-guide-title'>
        <div class='home-guide-heading'><p class='eyebrow'>{guide.label}</p><h2 id='home-guide-title'>{guide.title}</h2><p>{guide.intro}</p></div>
        <div class='home-guide-grid'>
          {guide.sections.map(section => <article key={section.title}><h2>{section.title}</h2><p>{section.body}</p></article>)}
        </div>
      </section>
    </main>
  )
}

function Radar ({ values, locale }) {
  const keys = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional']
  const center = 120
  const radius = 75
  const point = (index, value = 100) => {
    const angle = ((Math.PI * 2 * index) / keys.length) - Math.PI / 2
    const r = radius * (value / 100)
    return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`
  }
  const polygon = keys.map((key, index) => point(index, values[key] ?? 0)).join(' ')
  return (
    <div class='radar-wrap'>
      <svg class='radar' viewBox='0 0 240 240' role='img' aria-label={keys.map(key => `${translate(locale, key)} ${values[key] ?? translate(locale, 'unknown')}`).join(', ')}>
        {[25, 50, 75, 100].map(level => <polygon key={level} points={keys.map((_, index) => point(index, level)).join(' ')} class='radar-grid' />)}
        {keys.map((key, index) => <line key={key} x1={center} y1={center} x2={point(index).split(',')[0]} y2={point(index).split(',')[1]} class='radar-grid' />)}
        <polygon points={polygon} class='radar-value' />
        {keys.map((key, index) => {
          const [x, y] = point(index, 124).split(',')
          return <text key={key} x={x} y={y} text-anchor='middle'>{translate(locale, key)}</text>
        })}
      </svg>
      <div class='sr-only'>{keys.map(key => `${translate(locale, key)}: ${values[key] ?? translate(locale, 'unknown')}`).join('. ')}</div>
    </div>
  )
}

function Results ({ state, setState, profile, matches, go, locale }) {
  const t = (key, values) => translate(locale, key, values)
  const top = matches.slice(0, 5)
  const totalAnswered = Object.values(profile.coverage).reduce((sum, item) => sum + item.answered, 0)
  const totalAvailable = Object.values(profile.coverage).reduce((sum, item) => sum + item.available, 0)
  const controller = useRef(null)
  const [aiStatus, setAiStatus] = useState('idle')
  const [aiConfirmOpen, setAiConfirmOpen] = useState(false)
  const [copyStatus, setCopyStatus] = useState('idle')
  const aiPrompt = useMemo(() => buildPrompt({ locale, profile, matches, targetCareer: state.targetCareer, weeklyHours: state.weeklyHours }), [locale, matches, profile, state.targetCareer, state.weeklyHours])
  useEffect(() => () => controller.current?.abort(), [locale, profile])
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(aiPrompt)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }
  }
  const runAi = async () => {
    setAiConfirmOpen(false)
    controller.current?.abort()
    controller.current = new AbortController()
    setAiStatus('loading')
    try {
      const raw = await askCareerModel(aiPrompt, controller.current.signal)
      const value = parseAiResponse(raw)
      setState(current => ({ ...current, ai: { ...value, locale, createdAt: new Date().toISOString() } }))
      setAiStatus('success')
    } catch (error) {
      if (error.name === 'AbortError') return setAiStatus('idle')
      setAiStatus(error.status === 401 ? 'auth' : 'error')
    }
  }
  if (!profile.completeForRanking) {
    return <main class='page-shell empty-page'><Target size={38} /><h1>{t('incompleteTitle')}</h1><p>{t('incompleteText')}</p><button class='button primary' onClick={() => go('/assessment')}>{t('continueAssessment')}</button></main>
  }
  return (
    <main class='report page-shell'>
      <div class='report-heading'><p class='eyebrow'>PROFILER · {t('profileVersion')} 1.0</p><h1>{t('profileTitle')}</h1><p>{t('profileSubtitle')}</p><button class='print-button' onClick={() => window.print()}><Download size={16} /> {t('print')}</button></div>
      <div class='report-grid'>
        <section class='report-card radar-card'><div class='card-title'><h2>{t('riasecProfile')}</h2><span>{Math.round((totalAnswered / totalAvailable) * 100)}% {t('evidenceCoverage').toLowerCase()}</span></div><Radar values={profile.interests} locale={locale} /></section>
        <section class='report-card matches-card'><div class='card-title'><h2>{t('topFamilies')}</h2><button onClick={() => go('/careers')}>{t('allCareers')} <ArrowRight size={14} /></button></div>
          <ol class='rank-list'>{top.map((match, index) => {
            const career = careerById[match.careerId]
            const [name] = careerCopy[locale][career.id]
            return <li key={career.id}><button onClick={() => go(`/careers/${career.id}`)}><span class='rank'>{index + 1}</span><span class='career-icon'><CareerIcon career={career} size={18} /></span><span><strong>{name}</strong><small>{t(fitLabel(match.personalFit))} · {match.evidenceCoverage}% {t('evidenceCoverage').toLowerCase()}</small></span><span class='score'>{match.personalFit}</span><ChevronRight size={16} /></button></li>
          })}
          </ol>
        </section>
      </div>
      <p class='index-note'>{t('indexNote')}</p>
      <section class='ai-panel'>
        <div class='ai-icon'><Sparkles /></div>
        <div><h2>{t('aiTitle')}</h2><p>{t('aiText')}</p>
          <details><summary>{t('aiDisclosure')}</summary><p>{t('aiDisclosureText')}</p></details>
          {state.ai?.locale === locale && <blockquote>{state.ai.summary}</blockquote>}
        </div>
        <div class='ai-actions'>
          {aiStatus === 'loading' ? <button class='button secondary' onClick={() => controller.current?.abort()}>{t('cancel')}</button> : <button class='button primary' onClick={() => setAiConfirmOpen(true)}><Sparkles size={16} /> {state.ai ? t('retry') : t('generateAi')}</button>}
          <button class='button secondary' onClick={copyPrompt}><Copy size={16} /> {t(copyStatus === 'copied' ? 'promptCopied' : 'copyPrompt')}</button>
          {copyStatus === 'error' && <span class='copy-status' role='alert'>{t('promptCopyFailed')}</span>}
        </div>
      </section>
      {aiConfirmOpen && (
        <Dialog title={t('aiConfirmTitle')} description={t('aiConfirmText')} closeLabel={t('close')} onClose={() => setAiConfirmOpen(false)}>
          <button class='button secondary' onClick={() => setAiConfirmOpen(false)}>{t('cancel')}</button>
          <button class='button primary' onClick={runAi}>{t('generateAi')}</button>
        </Dialog>
      )}
      {['auth', 'error'].includes(aiStatus) && (
        <Dialog title={t(aiStatus === 'auth' ? 'aiAuthTitle' : 'aiErrorTitle')} description={t(aiStatus === 'auth' ? 'aiUnavailable' : 'aiFailed')} closeLabel={t('close')} onClose={() => setAiStatus('idle')}>
          <button class='button primary' onClick={() => setAiStatus('idle')}>{t('close')}</button>
        </Dialog>
      )}
    </main>
  )
}

function Careers ({ go, locale }) {
  const t = (key, values) => translate(locale, key, values)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const filtered = careers.filter(career => {
    const [name, description] = careerCopy[locale][career.id]
    return (filter === 'all' || career.tags.includes(filter)) && `${name} ${description}`.toLowerCase().includes(query.toLowerCase())
  })
  const careerCards = filtered.map((career, index) => {
    const [name, description] = careerCopy[locale][career.id]
    return <article key={career.id} class={`career-tile accent-${index % 6}`}><span class='tile-icon'><CareerIcon career={career} /></span><h2>{name}</h2><p>{description}</p><button onClick={() => go(`/careers/${career.id}`)}>{t('viewDetails')} <ArrowRight size={15} /></button></article>
  })
  return (
    <main class='page-shell catalogue'>
      <div class='page-heading'><p class='eyebrow'>PROFILER</p><h1>{t('allCareers')}</h1><p>{t('allCareersText')}</p></div>
      <div class='catalogue-tools'><label class='search-box'><Search size={17} /><span class='sr-only'>{t('search')}</span><input value={query} onInput={event => setQuery(event.currentTarget.value)} placeholder={t('search')} /></label>
        <div class='filter-row' aria-label={t('filters')}>{['all', 'analytical', 'creative', 'people', 'technical', 'business', 'handsOn'].map(key => {
          const value = key === 'handsOn' ? 'hands-on' : key
          return <button key={key} class={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{t(key)}</button>
        })}
        </div>
      </div>
      {filtered.length ? <div class='career-grid'>{careerCards}</div> : <div class='empty-inline'>{t('noCareers')}</div>}
    </main>
  )
}

function CareerDetail ({ career, state, setState, profile, matches, go, locale }) {
  const t = (key, values) => translate(locale, key, values)
  const [name, description] = careerCopy[locale][career.id]
  const match = matches.find(item => item.careerId === career.id)
  const readiness = estimateReadiness(career, state.skillLevels)
  return (
    <main class='page-shell detail-page'>
      <button class='back-link' onClick={() => go('/careers')}><ArrowLeft size={16} /> {t('allCareers')}</button>
      <section class='detail-hero'><div><span class='detail-icon'><CareerIcon career={career} size={28} /></span><h1>{name}</h1><p>{description}</p>{match?.personalFit != null && <span class='fit-pill'>{t(fitLabel(match.personalFit))} · {match.personalFit}</span>}</div><div class='detail-visual'><CareerIcon career={career} size={90} /></div></section>
      <div class='detail-grid'>
        <section class='content-card'><h2>{t('whyFits')}</h2>{match?.personalFit != null ? <ul class='check-list'>{Object.entries(match.components).filter(([, value]) => value.score != null).sort((a, b) => b[1].score - a[1].score).map(([key, value]) => <li key={key}><Check size={17} /> {t(key)}: {Math.round(value.score)}</li>)}</ul> : <p>{t('noResultsYet')}</p>}<p class='index-note'>{t('indexNote')}</p></section>
        <section class='content-card'><h2>{t('roleExamples')}</h2><div class='role-chips'>{career.roles.map(role => <span key={role}>{translateRole(locale, role)}</span>)}</div><h3>{t('sourceContext')}</h3></section>
      </div>
      <section class='content-card skills-editor'><div class='card-title'><div><h2>{t('skillPreview')}</h2><p>{t('estimatedLevel')}</p></div><div>{t('currentReadiness')}: <strong>{readiness.score ?? '-'}</strong> <small>({readiness.coverage}% {t('evidenceCoverage').toLowerCase()})</small></div></div>
        {readiness.gaps.map(skill => <div key={skill.id} class='skill-row'><label for={`skill-${skill.id}`}><strong>{translateSkill(locale, skill.id)}</strong><small>{t('targetLevel')}: {skill.target}/4</small></label><select id={`skill-${skill.id}`} value={skill.current ?? ''} onChange={event => setState(current => ({ ...current, skillLevels: { ...current.skillLevels, [skill.id]: event.currentTarget.value === '' ? null : Number(event.currentTarget.value) } }))}><option value=''>{t('unknown')}</option>{translate(locale, 'skillScale').map((label, index) => <option key={index} value={index}>{index} - {label}</option>)}</select></div>)}
      </section>
      <div class='detail-cta'><button class={state.targetCareer === career.id ? 'button secondary' : 'button primary'} onClick={() => { setState(current => ({ ...current, targetCareer: career.id, completedTasks: {} })); go('/plan') }}>{state.targetCareer === career.id ? t('selectedTarget') : t('chooseTarget')} <ArrowRight size={16} /></button></div>
    </main>
  )
}

function SkillsPage ({ state, setState, go, locale }) {
  const target = careerById[state.targetCareer]
  if (!target) return <main class='page-shell empty-page'><Sprout size={36} /><h1>{translate(locale, 'skillsEmptyTitle')}</h1><p>{translate(locale, 'skillsEmptyText')}</p><button class='button primary' onClick={() => go('/careers')}>{translate(locale, 'explore')}</button></main>
  return <CareerDetail career={target} state={state} setState={setState} profile={{}} matches={[]} go={go} locale={locale} />
}

function Plan ({ state, setState, go, locale }) {
  const t = (key, values) => translate(locale, key, values)
  const career = careerById[state.targetCareer]
  const plan = useMemo(() => buildPlan(career, state.weeklyHours), [career, state.weeklyHours])
  if (!career) {
    return <main class='page-shell plan-page'><div class='page-heading'><p class='eyebrow'>PROFILER</p><h1>{t('planTitle')}</h1><p>{t('planSubtitle')}</p></div><div class='empty-page'><Target size={36} /><h2>{t('noTarget')}</h2><button class='button primary' onClick={() => go('/careers')}>{t('explore')}</button></div></main>
  }
  return (
    <main class='page-shell plan-page'>
      <div class='page-heading'><p class='eyebrow'>PROFILER</p><h1>{t('planTitle')}</h1><p>{t('planSubtitle')}</p></div>
      <div class='plan-controls'><label>{t('selectedTarget')}<select value={career.id} onChange={event => setState(current => ({ ...current, targetCareer: event.currentTarget.value, completedTasks: {} }))}>{careers.map(item => <option key={item.id} value={item.id}>{careerCopy[locale][item.id][0]}</option>)}</select></label><label>{t('weeklyTime')}<select value={state.weeklyHours} onChange={event => setState(current => ({ ...current, weeklyHours: Number(event.currentTarget.value), completedTasks: {} }))}><option value='5'>5</option><option value='10'>10</option><option value='20'>20</option></select></label></div>
      <div class='timeline'>{plan.map((phase, index) => <section key={phase.id} class='timeline-phase'><div class='timeline-marker'>{index + 1}</div><div class='timeline-content'><span class='phase-label'>{t(phase.phase)}</span><h2>{index === 0 ? t('skillPreview') : t('developmentAreas')}</h2>{phase.tasks.map(task => <label key={task.id} class='plan-task'><input type='checkbox' checked={Boolean(state.completedTasks[task.id])} onChange={event => setState(current => ({ ...current, completedTasks: { ...current.completedTasks, [task.id]: event.currentTarget.checked } }))} /><span><strong>{translateSkill(locale, task.skillId)}</strong><small>~{task.effort} hours · {t('markDone')}</small></span></label>)}</div></section>)}</div>
    </main>
  )
}

export function App () {
  const [route, go] = useRoute()
  const [state, setState] = usePersistentState()
  const locale = state.locale
  const profile = useMemo(() => scoreProfile(state.answers), [state.answers])
  const matches = useMemo(() => matchCareers(profile), [profile])
  const detailMatch = route.match(/^\/careers\/([a-z-]+)$/)
  let page
  if (route === '/') page = <Home go={go} hasProgress={Object.keys(state.answers).length > 0} locale={locale} />
  else if (route === '/assessment') page = <Assessment state={state} setState={setState} go={go} locale={locale} />
  else if (route === '/results') page = <Results state={state} setState={setState} profile={profile} matches={matches} go={go} locale={locale} />
  else if (route === '/careers') page = <Careers go={go} locale={locale} />
  else if (detailMatch && careerById[detailMatch[1]]) page = <CareerDetail career={careerById[detailMatch[1]]} state={state} setState={setState} profile={profile} matches={matches} go={go} locale={locale} />
  else if (route === '/skills') page = <SkillsPage state={state} setState={setState} go={go} locale={locale} />
  else if (route === '/plan') page = <Plan state={state} setState={setState} go={go} locale={locale} />
  else page = <main class='page-shell empty-page'><Compass size={36} /><h1>{translate(locale, 'notFoundTitle')}</h1><p>{translate(locale, 'notFoundText')}</p><button class='button primary' onClick={() => go('/')}>{translate(locale, 'home')}</button></main>
  return (
    <IntlProvider definition={translations[locale]}>
      <Header route={route} go={go} locale={locale} setLocale={value => setState(current => ({ ...current, locale: value }))} />
      {page}
    </IntlProvider>
  )
}
