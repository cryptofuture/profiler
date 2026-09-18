import { useRef, useState } from 'preact/hooks'
import { ArrowLeft, ArrowRight, Check, Lightbulb, LockKeyhole, Sprout } from 'lucide-preact'
import { questions, sections } from '../domain/questions.js'
import { assessmentPages, resumePage } from '../domain/assessmentPages.js'
import { translate, translateAnswer } from '../i18n/translations.js'
import { Dialog } from './Dialog.jsx'

function AnswerField ({ question, answer, locale, onAnswer, invalid }) {
  const t = (key, values) => translate(locale, key, values)
  const isInterest = question.section === 'interests'
  const labels = t(isInterest ? 'interestScale' : 'agreementScale')
  const options = question.kind === 'scale' ? [1, 2, 3, 4, 5] : question.options.map((_, index) => index)

  return (
    <fieldset class={`activity-card${answer != null ? ' answered' : ''}${invalid ? ' invalid' : ''}`}>
      <legend>{question.label[locale] || question.label.en}</legend>
      <div class={question.kind === 'scale' ? 'rating-options' : 'exercise-options'}>
        {options.map(value => {
          const label = question.kind === 'scale' ? labels[value - 1] : translateAnswer(locale, question.options[value])
          return (
            <label key={value} class={`rating-option${answer === value ? ' is-selected' : ''}`}>
              <input type='radio' name={question.id} value={value} checked={answer === value} onChange={() => onAnswer(question.id, value)} aria-invalid={invalid || undefined} />
              <span class='rating-number' aria-hidden='true'>{answer === value ? <Check size={16} /> : question.kind === 'scale' ? value : String.fromCharCode(65 + value)}</span>
              <span class='rating-label'>{label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function Assessment ({ state, setState, go, locale }) {
  const [index, setIndex] = useState(() => resumePage(state.answers, state.assessmentPageId))
  const [error, setError] = useState(false)
  const [exitOpen, setExitOpen] = useState(false)
  const heading = useRef(null)
  const page = assessmentPages[index]
  const t = (key, values) => translate(locale, key, values)
  const answeredCount = questions.filter(question => state.answers[question.id] != null).length
  const sectionIndex = sections.indexOf(page.section)
  const sectionPages = assessmentPages.filter(item => item.section === page.section)
  const pageInSection = sectionPages.findIndex(item => item.id === page.id) + 1
  const pageAnswered = page.questions.filter(question => state.answers[question.id] != null).length
  const facts = t('assessmentFacts')
  const currentFact = facts[index % facts.length]

  function move (nextIndex) {
    setError(false)
    setState(current => ({ ...current, assessmentPageId: assessmentPages[nextIndex].id }))
    setIndex(nextIndex)
    heading.current?.focus()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function advance () {
    if (pageAnswered !== page.questions.length) {
      setError(true)
      const missing = page.questions.find(question => state.answers[question.id] == null)
      document.getElementsByName(missing.id)[0]?.focus()
      return
    }
    if (index === assessmentPages.length - 1) go('/results')
    else move(index + 1)
  }

  return (
    <main class='assessment-layout page-shell'>
      <aside class='assessment-sidebar'>
        <p class='eyebrow'>{t('yourJourney')}</p>
        <h2>{t('aLittleAboutYou')}</h2>
        <ol class='journey-steps'>
          {sections.map((section, step) => (
            <li key={section} class={step === sectionIndex ? 'current' : ''} aria-current={step === sectionIndex ? 'step' : undefined}>
              <span>{questions.filter(question => question.section === section).every(question => state.answers[question.id] != null) ? <Check size={15} /> : step + 1}</span>
              {t(section)}
            </li>
          ))}
        </ol>
        <div class='gentle-note'><Sprout size={25} /><p>{t('takeYourTime')}</p></div>
      </aside>
      <div class='assessment-main'>
        <div class='assessment-meta'><span>{t('sectionOf', { current: sectionIndex + 1, total: sections.length })} · {t(page.section)}</span><button class='text-button' onClick={() => setExitOpen(true)}>{t('saveExit')}</button></div>
        <div class='progress-track' role='progressbar' aria-label={t('assessment')} aria-valuemin='0' aria-valuemax={questions.length} aria-valuenow={answeredCount}><i style={{ width: `${answeredCount / questions.length * 100}%` }} /></div>
        <div class='assessment-intro'>
          <p class='eyebrow'>{t('pageOf', { current: pageInSection, total: sectionPages.length })}</p>
          <h1 ref={heading} tabIndex={-1}>{page.section === 'interests' ? t(`topic_${page.topic}`) : t(page.section)}</h1>
          <p>{t(page.section === 'interests' ? 'threeInterestsHelp' : page.section === 'aptitudes' ? 'exerciseHelp' : 'reflectionHelp')}</p>
        </div>
        <div class='activity-list'>
          {page.questions.map(question => (
            <AnswerField key={question.id} question={question} answer={state.answers[question.id]} locale={locale} invalid={error && state.answers[question.id] == null} onAnswer={(id, value) => { setState(current => ({ ...current, answers: { ...current.answers, [id]: value }, ai: null })); setError(false) }} />
          ))}
        </div>
        {error && <p class='form-error' role='alert'>{t('answerEveryActivity')}</p>}
        {pageAnswered === page.questions.length && (
          <aside key={page.id} class='discovery-note' aria-live='polite'>
            <span><Lightbulb size={19} /></span>
            <div><strong>{t('discoveryNote')}</strong><p>{currentFact}</p></div>
          </aside>
        )}
        <div class='assessment-actions'>
          <button class='button secondary' disabled={!index} onClick={() => move(index - 1)}><ArrowLeft size={17} />{t('back')}</button>
          <span class='answered-caption' aria-live='polite'>{t('answeredOnPage', { count: pageAnswered, total: page.questions.length })}</span>
          <button class='button primary' onClick={advance}>{index === assessmentPages.length - 1 ? t('finish') : t('next')}<ArrowRight size={17} /></button>
        </div>
        <p class='assessment-privacy'><LockKeyhole size={14} />{t('savedOnDevice')}</p>
      </div>
      {exitOpen && (
        <Dialog title={t('pauseTitle')} description={t('pauseDescription')} closeLabel={t('close')} onClose={() => setExitOpen(false)}>
          <button class='button secondary' onClick={() => setExitOpen(false)}>{t('keepGoing')}</button>
          <button class='button primary' onClick={() => go('/')}>{t('saveExit')}</button>
        </Dialog>
      )}
    </main>
  )
}
