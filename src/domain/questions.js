const text = (en, ru, kk) => ({ en, ru, kk })

const interestActivities = {
  realistic: [
    text('Repair or assemble a physical device.', 'Ремонтировать или собирать физическое устройство.', 'Физикалық құрылғыны жөндеу немесе құрастыру.'),
    text('Work with tools, machines, or equipment.', 'Работать с инструментами, машинами или оборудованием.', 'Құралдармен, машиналармен немесе жабдықпен жұмыс істеу.'),
    text('Diagnose why a mechanical system failed.', 'Определять причину сбоя механической системы.', 'Механикалық жүйенің неліктен істен шыққанын анықтау.'),
    text('Build something you can test with your hands.', 'Создавать то, что можно проверить руками.', 'Қолмен сынауға болатын нәрсе жасау.'),
    text('Maintain essential technical infrastructure.', 'Обслуживать важную техническую инфраструктуру.', 'Маңызды техникалық инфрақұрылымды күтіп ұстау.')
  ],
  investigative: [
    text('Analyze why a system behaves unexpectedly.', 'Анализировать, почему система работает неожиданно.', 'Жүйенің неге күтпегендей жұмыс істейтінін талдау.'),
    text('Investigate evidence to answer a difficult question.', 'Исследовать данные, чтобы ответить на сложный вопрос.', 'Күрделі сұраққа жауап беру үшін деректерді зерттеу.'),
    text('Design an experiment and interpret its results.', 'Разрабатывать эксперимент и интерпретировать результаты.', 'Эксперимент құрып, оның нәтижесін түсіндіру.'),
    text('Find patterns in complex information.', 'Находить закономерности в сложной информации.', 'Күрделі ақпараттан заңдылықтарды табу.'),
    text('Learn deeply about a scientific or technical topic.', 'Глубоко изучать научную или техническую тему.', 'Ғылыми немесе техникалық тақырыпты терең зерттеу.')
  ],
  artistic: [
    text('Design an original visual concept.', 'Разрабатывать оригинальную визуальную концепцию.', 'Бірегей визуалды тұжырымдама әзірлеу.'),
    text('Write a story that changes how people see a topic.', 'Писать историю, меняющую взгляд людей на тему.', 'Адамдардың тақырыпқа көзқарасын өзгертетін әңгіме жазу.'),
    text('Explore several unusual solutions to a problem.', 'Искать несколько необычных решений проблемы.', 'Мәселенің бірнеше ерекше шешімін іздеу.'),
    text('Shape the style and voice of a new project.', 'Формировать стиль и голос нового проекта.', 'Жаңа жобаның стилі мен үнін қалыптастыру.'),
    text('Create an engaging experience for an audience.', 'Создавать увлекательный опыт для аудитории.', 'Аудитория үшін қызықты тәжірибе жасау.')
  ],
  social: [
    text('Teach someone how to perform a difficult task.', 'Обучать кого-то выполнению сложной задачи.', 'Біреуге күрделі тапсырманы орындауды үйрету.'),
    text('Support a person through a challenging situation.', 'Поддерживать человека в сложной ситуации.', 'Адамға қиын жағдайда қолдау көрсету.'),
    text('Help a group understand one another.', 'Помогать группе понимать друг друга.', 'Топқа бір-бірін түсінуге көмектесу.'),
    text('Give useful feedback that helps someone grow.', 'Давать полезную обратную связь для развития.', 'Біреудің дамуына көмектесетін пайдалы кері байланыс беру.'),
    text('Work directly with people to improve their wellbeing.', 'Работать с людьми ради улучшения их благополучия.', 'Адамдардың әл-ауқатын жақсарту үшін тікелей жұмыс істеу.')
  ],
  enterprising: [
    text('Persuade people to support a promising project.', 'Убеждать людей поддержать перспективный проект.', 'Адамдарды перспективалы жобаны қолдауға сендіру.'),
    text('Lead a team toward an ambitious goal.', 'Вести команду к амбициозной цели.', 'Топты өршіл мақсатқа жетелеу.'),
    text('Negotiate a solution between competing priorities.', 'Согласовывать решение при конкурирующих приоритетах.', 'Бәсекелес басымдықтар арасында шешім келісу.'),
    text('Turn an idea into a viable service or business.', 'Превращать идею в жизнеспособный сервис или бизнес.', 'Идеяны өміршең қызметке немесе бизнеске айналдыру.'),
    text('Make decisions when the outcome is uncertain.', 'Принимать решения при неопределённом результате.', 'Нәтиже белгісіз болғанда шешім қабылдау.')
  ],
  conventional: [
    text('Organize information into a clear system.', 'Организовывать информацию в понятную систему.', 'Ақпаратты түсінікті жүйеге келтіру.'),
    text('Check detailed work for errors and inconsistencies.', 'Проверять подробную работу на ошибки и несоответствия.', 'Егжей-тегжейлі жұмыстан қателер мен сәйкессіздіктерді тексеру.'),
    text('Improve a repeatable process.', 'Улучшать повторяемый процесс.', 'Қайталанатын процесті жақсарту.'),
    text('Plan schedules, resources, and dependencies.', 'Планировать сроки, ресурсы и зависимости.', 'Мерзімдерді, ресурстарды және тәуелділіктерді жоспарлау.'),
    text('Keep accurate records others can rely on.', 'Вести точные записи, на которые могут положиться другие.', 'Басқалар сене алатын нақты жазбаларды жүргізу.')
  ]
}

export const interestQuestions = Object.entries(interestActivities).flatMap(([dimension, items]) =>
  items.map((label, index) => ({ id: `interest-${dimension}-${index + 1}`, section: 'interests', dimension, label, kind: 'scale' }))
)

const valueItems = [
  ['achievement', text('I want work that lets me see meaningful progress.', 'Мне важна работа, где заметен значимый прогресс.', 'Маған мағыналы ілгерілеу көрінетін жұмыс маңызды.')],
  ['achievement', text('Solving demanding problems matters to me.', 'Для меня важно решать сложные задачи.', 'Мен үшін күрделі мәселелерді шешу маңызды.')],
  ['independence', text('I value freedom in how I organize my work.', 'Я ценю свободу в организации своей работы.', 'Жұмысымды ұйымдастыру еркіндігін бағалаймын.')],
  ['independence', text('I prefer making considered decisions without close supervision.', 'Я предпочитаю принимать взвешенные решения без постоянного контроля.', 'Тұрақты бақылаусыз салмақты шешім қабылдағанды қалаймын.')],
  ['recognition', text('Visible responsibility and advancement matter to me.', 'Для меня важны заметная ответственность и рост.', 'Мен үшін көрінетін жауапкершілік пен өсу маңызды.')],
  ['recognition', text('I want excellent work to be acknowledged.', 'Я хочу, чтобы отличную работу замечали.', 'Жақсы еңбектің бағаланғанын қалаймын.')],
  ['relationships', text('Supportive relationships at work matter to me.', 'Мне важны поддерживающие отношения на работе.', 'Жұмыстағы қолдаушы қарым-қатынас мен үшін маңызды.')],
  ['relationships', text('I want my work to help other people.', 'Я хочу, чтобы моя работа помогала людям.', 'Жұмысымның адамдарға көмектескенін қалаймын.')],
  ['support', text('Fair leadership and clear support matter to me.', 'Мне важны справедливое руководство и понятная поддержка.', 'Әділ басшылық пен айқын қолдау мен үшін маңызды.')],
  ['support', text('I value a workplace that invests in development.', 'Я ценю среду, которая вкладывается в развитие.', 'Дамуға инвестиция жасайтын ортаны бағалаймын.')],
  ['workingConditions', text('Predictable conditions and sustainable hours matter to me.', 'Мне важны предсказуемые условия и устойчивый график.', 'Болжамды жағдай мен тұрақты жұмыс уақыты маңызды.')],
  ['workingConditions', text('I care about a safe and well-designed work environment.', 'Мне важна безопасная и хорошо организованная рабочая среда.', 'Қауіпсіз әрі дұрыс ұйымдастырылған жұмыс ортасы маңызды.')]
]

export const valueQuestions = valueItems.map(([dimension, label], index) => ({
  id: `value-${index + 1}`, section: 'values', dimension, label, kind: 'scale'
}))

const aptitudeItems = [
  ['logical', text('All reports are reviewed. This document is a report. What follows?', 'Все отчёты проверяются. Этот документ - отчёт. Что следует?', 'Барлық есептер тексеріледі. Бұл құжат - есеп. Қандай қорытынды шығады?'), ['It is reviewed', 'It is public', 'Nothing follows'], 0],
  ['quantitative', text('A workload rises from 120 to 150 tasks. What is the percentage increase?', 'Нагрузка выросла со 120 до 150 задач. Каков рост в процентах?', 'Жүктеме 120-дан 150 тапсырмаға өсті. Пайыздық өсім қандай?'), ['20%', '25%', '30%'], 1],
  ['verbal', text('Which word is closest to “concise”?', 'Какое слово ближе всего к «краткий»?', '«Ықшам» сөзіне қай сөз жақын?'), ['Detailed', 'Brief', 'Indirect'], 1],
  ['spatial', text('A gear turns clockwise. A touching gear turns…', 'Шестерня вращается по часовой стрелке. Соприкасающаяся шестерня вращается…', 'Тісті доңғалақ сағат тілімен айналады. Оған жанасқан доңғалақ…'), ['Clockwise', 'Counter-clockwise', 'It cannot turn'], 1],
  ['pattern', text('Complete the sequence: 2, 6, 12, 20, …', 'Продолжите последовательность: 2, 6, 12, 20, …', 'Қатарды жалғастырыңыз: 2, 6, 12, 20, …'), ['28', '30', '32'], 1],
  ['systems', text('A queue grows although arrivals are stable. What should you inspect first?', 'Очередь растёт, хотя поток стабилен. Что проверить сначала?', 'Келу ағыны тұрақты болса да кезек өсуде. Алдымен нені тексеру керек?'), ['Processing capacity', 'Logo color', 'Meeting length'], 0],
  ['creative', text('A service has low adoption. Which response explores the problem best?', 'Сервисом мало пользуются. Какой подход лучше исследует проблему?', 'Қызметті аз қолданады. Мәселені қай тәсіл жақсы зерттейді?'), ['Copy a competitor', 'Interview users and test several hypotheses', 'Add more features immediately'], 1],
  ['attention', text('Which pair is different?', 'Какая пара отличается?', 'Қай жұп өзгеше?'), ['AB-184 / AB-184', 'PQ-731 / PQ-713', 'XZ-506 / XZ-506'], 1],
  ['logical', text('No archived files are editable. File K is editable. What follows?', 'Ни один архивный файл нельзя редактировать. Файл K можно редактировать. Что следует?', 'Мұрағатталған файлдар өңделмейді. K файлы өңделеді. Қандай қорытынды шығады?'), ['K is not archived', 'K is public', 'K is complete'], 0],
  ['quantitative', text('Three people share 180 minutes equally. How many minutes does each receive?', 'Три человека делят 180 минут поровну. Сколько получает каждый?', 'Үш адам 180 минутты тең бөледі. Әрқайсысына қанша минут тиеді?'), ['45', '60', '90'], 1],
  ['verbal', text('Which word is closest to “verify”?', 'Какое слово ближе всего к «проверить»?', '«Тексеру» сөзіне қай сөз жақын?'), ['Confirm', 'Assume', 'Delay'], 0],
  ['spatial', text('A box is rotated, but not opened. Which property must stay the same?', 'Коробку повернули, но не открыли. Какое свойство обязательно сохранится?', 'Қорап ашылмай бұрылды. Қай қасиет міндетті түрде сақталады?'), ['Its contents', 'Which face is on top', 'Its shadow direction'], 0],
  ['pattern', text('Complete the sequence: 3, 6, 12, 24, …', 'Продолжите последовательность: 3, 6, 12, 24, …', 'Қатарды жалғастырыңыз: 3, 6, 12, 24, …'), ['30', '36', '48'], 2],
  ['systems', text('Errors rise after one process step changed. What is the best first comparison?', 'После изменения одного этапа выросло число ошибок. Что лучше сравнить сначала?', 'Бір қадам өзгергеннен кейін қателер өсті. Алдымен нені салыстырған дұрыс?'), ['Before and after that step', 'Team names', 'Office locations'], 0],
  ['creative', text('People abandon a long form. Which test gives the clearest learning?', 'Люди бросают длинную форму. Какой тест даст наиболее ясный результат?', 'Адамдар ұзақ форманы аяқтамайды. Қай сынақ анық нәтиже береді?'), ['Shorten one section and compare completion', 'Change every page at once', 'Add more required fields'], 0],
  ['attention', text('Which code does not match the pattern AA-000?', 'Какой код не соответствует формату AA-000?', 'Қай код AA-000 үлгісіне сәйкес емес?'), ['LM-204', 'QZ-81', 'TR-910'], 1]
]

const dimensionCounts = {}
export const aptitudeQuestions = aptitudeItems.map(([dimension, label, options, correct]) => {
  dimensionCounts[dimension] = (dimensionCounts[dimension] || 0) + 1
  return {
    id: `aptitude-${dimension}-${dimensionCounts[dimension]}`,
    section: 'aptitudes',
    dimension,
    label,
    kind: 'choice',
    options,
    correct
  }
})

const reflectionItems = [
  ['workStyle', 'openness', text('I enjoy learning unfamiliar ways to approach work.', 'Мне нравится осваивать незнакомые способы работы.', 'Жұмысқа жаңа тәсілдерді үйренгенді ұнатамын.')],
  ['workStyle', 'conscientiousness', text('I usually finish important tasks before their deadline.', 'Обычно я завершаю важные задачи до срока.', 'Маңызды тапсырмаларды әдетте мерзімінен бұрын аяқтаймын.')],
  ['workStyle', 'collaboration', text('I think more clearly after discussing ideas with others.', 'Обсуждение идей с другими помогает мне мыслить яснее.', 'Идеяларды өзгелермен талқылау маған анық ойлауға көмектеседі.')],
  ['workStyle', 'focus', text('I prefer long periods of focused work.', 'Я предпочитаю длительные периоды сосредоточенной работы.', 'Ұзақ уақыт зейін қойып жұмыс істегенді қалаймын.')],
  ['workStyle', 'structure', text('Clear expectations help me do my best work.', 'Чёткие ожидания помогают мне работать лучше.', 'Айқын талаптар жақсы жұмыс істеуіме көмектеседі.')],
  ['workStyle', 'adaptability', text('I can adjust my plan when new evidence appears.', 'Я могу изменить план при появлении новых данных.', 'Жаңа дерек пайда болғанда жоспарымды өзгерте аламын.')],
  ['workStyle', 'feedback', text('I actively seek useful feedback.', 'Я активно ищу полезную обратную связь.', 'Пайдалы кері байланысты белсенді іздеймін.')],
  ['workStyle', 'pace', text('I prefer a steady pace over frequent urgent changes.', 'Я предпочитаю стабильный темп частым срочным изменениям.', 'Жиі шұғыл өзгерістен гөрі тұрақты қарқынды қалаймын.')],
  ['workStyle', 'ownership', text('I like owning a problem from start to finish.', 'Мне нравится отвечать за задачу от начала до конца.', 'Мәселені басынан аяғына дейін жауапкершілікпен жүргізгенді ұнатамын.')],
  ['workStyle', 'detail', text('I notice small inconsistencies in work.', 'Я замечаю небольшие несоответствия в работе.', 'Жұмыстағы ұсақ сәйкессіздіктерді байқаймын.')],
  ['aiWorkStyle', 'verification', text('I verify important AI output against reliable evidence.', 'Я проверяю важные ответы ИИ по надёжным источникам.', 'ЖИ-дің маңызды жауабын сенімді дерекпен тексеремін.')],
  ['aiWorkStyle', 'decomposition', text('I break a complex task into smaller parts before using tools.', 'Перед использованием инструментов я делю сложную задачу на части.', 'Құралдарды қолданар алдында күрделі тапсырманы бөліктерге бөлемін.')],
  ['aiWorkStyle', 'delegation', text('I am comfortable delegating a draft to AI while keeping responsibility.', 'Мне комфортно поручить ИИ черновик, сохраняя ответственность.', 'Жауапкершілікті сақтап, бастапқы нұсқаны ЖИ-ге тапсырғанға дайынмын.')],
  ['aiWorkStyle', 'experimentation', text('I compare several approaches before adopting an AI workflow.', 'Я сравниваю несколько подходов перед внедрением процесса с ИИ.', 'ЖИ процесін қабылдамас бұрын бірнеше тәсілді салыстырамын.')],
  ['aiWorkStyle', 'privacy', text('I consider privacy before sharing information with an AI tool.', 'Я учитываю конфиденциальность перед передачей данных инструменту ИИ.', 'ЖИ құралына ақпарат бермес бұрын құпиялылықты ескеремін.')],
  ['aiWorkStyle', 'ambiguity', text('I can work with an uncertain first draft and improve it.', 'Я могу работать с неопределённым черновиком и улучшать его.', 'Толық емес бастапқы нұсқамен жұмыс істеп, оны жақсарта аламын.')],
  ['aiWorkStyle', 'tools', text('I enjoy testing new tools on low-risk tasks.', 'Мне нравится пробовать новые инструменты на задачах с низким риском.', 'Жаңа құралдарды тәуекелі аз тапсырмаларда сынағанды ұнатамын.')],
  ['aiWorkStyle', 'judgment', text('I know when a decision should remain with a person.', 'Я понимаю, когда решение должно оставаться за человеком.', 'Шешімнің қашан адамда қалуы керегін түсінемін.')],
  ['currentSkills', 'digital', text('I can learn a new digital tool with basic guidance.', 'Я могу освоить новый цифровой инструмент с базовой помощью.', 'Негізгі нұсқаумен жаңа цифрлық құралды үйрене аламын.')],
  ['currentSkills', 'communication', text('I can explain a complex idea clearly.', 'Я могу ясно объяснить сложную идею.', 'Күрделі ойды анық түсіндіре аламын.')],
  ['currentSkills', 'analysis', text('I can compare evidence and explain a conclusion.', 'Я могу сравнить данные и объяснить вывод.', 'Деректерді салыстырып, қорытындыны түсіндіре аламын.')],
  ['currentSkills', 'planning', text('I can turn a goal into practical next steps.', 'Я могу превратить цель в практические следующие шаги.', 'Мақсатты нақты келесі қадамдарға айналдыра аламын.')],
  ['currentSkills', 'collaboration', text('I can contribute effectively to shared work.', 'Я могу эффективно участвовать в совместной работе.', 'Ортақ жұмысқа тиімді үлес қоса аламын.')],
  ['preferences', 'remote', text('The option to work remotely matters to me.', 'Возможность удалённой работы важна для меня.', 'Қашықтан жұмыс істеу мүмкіндігі мен үшін маңызды.')],
  ['preferences', 'stability', text('Job stability is a high priority for me.', 'Стабильность работы - мой высокий приоритет.', 'Жұмыс тұрақтылығы мен үшін жоғары басымдық.')],
  ['preferences', 'income', text('Income growth is a high priority for me.', 'Рост дохода - мой высокий приоритет.', 'Табыстың өсуі мен үшін жоғары басымдық.')],
  ['preferences', 'peopleContact', text('I want regular direct interaction with people.', 'Я хочу регулярно напрямую взаимодействовать с людьми.', 'Адамдармен үнемі тікелей қарым-қатынас жасағым келеді.')],
  ['preferences', 'physicalWork', text('I want some of my work to involve the physical world.', 'Я хочу, чтобы часть моей работы была связана с физическим миром.', 'Жұмысымның бір бөлігі физикалық әлеммен байланысты болғанын қалаймын.')],
  ['preferences', 'training', text('I am open to substantial education or supervised training.', 'Я готов к длительному обучению или практике под руководством.', 'Ұзақ білім алуға немесе жетекшілікпен оқуға дайынмын.')]
]

export const reflectionQuestions = reflectionItems.map(([section, dimension, label], index) => ({
  id: `${section}-${index + 1}`,
  section,
  dimension,
  label,
  kind: 'scale'
}))

export const questions = [...interestQuestions, ...aptitudeQuestions, ...valueQuestions, ...reflectionQuestions]
export const sections = ['interests', 'aptitudes', 'values', 'workStyle', 'aiWorkStyle', 'currentSkills', 'preferences']
