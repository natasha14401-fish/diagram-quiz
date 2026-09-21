import { MISSIONS } from './missions.js'

export const TOPICS = [
  {
    id: 'usecase',
    title: 'Прецеденты и классы',
    short: 'Прецеденты и классы',
    hint: 'Акторы, сценарии, структура объектов',
  },
  {
    id: 'interaction',
    title: 'Последовательности и деятельность',
    short: 'Последовательности и деятельность',
    hint: 'Время, сообщения, ветвления',
  },
  {
    id: 'structure',
    title: 'Компоненты и развёртывание',
    short: 'Компоненты и развёртывание',
    hint: 'Сборка системы и железо',
  },
  {
    id: 'uml',
    title: 'Язык UML',
    short: 'Диаграммы UML',
    hint: 'Какую диаграмму выбрать',
  },
  {
    id: 'idef0',
    title: 'IDEF0',
    short: 'IDEF0: ICOM и декомпозиция',
    hint: 'ICOM, A-0, декомпозиция A0',
  },
  {
    id: 'dfd',
    title: 'Потоки данных',
    short: 'Потоки данных (DFD)',
    hint: 'Процессы, хранилища, балансировка',
  },
]

export const QUESTIONS = [
  {
    id: 'uc-id',
    topic: 'usecase',
    identify: true,
    diagram: 'usecase',
    prompt: 'Какая это диаграмма?',
    options: [
      { id: 'a', text: 'Диаграмма прецедентов (use case)' },
      { id: 'b', text: 'Диаграмма деятельности' },
      { id: 'c', text: 'Контекстная DFD' },
      { id: 'd', text: 'Диаграмма компонентов' },
    ],
    correct: 'a',
    explanation:
      'Овал — прецедент, человечек — актор, прямоугольник — граница системы. Это классическая диаграмма прецедентов UML.',
  },
  {
    id: 'uc-actor',
    topic: 'usecase',
    prompt: 'Кто такой актор на диаграмме прецедентов?',
    options: [
      { id: 'a', text: 'Класс внутри системы, у которого есть методы' },
      { id: 'b', text: 'Роль внешнего субъекта, взаимодействующего с системой' },
      { id: 'c', text: 'Экземпляр объекта во время выполнения' },
      { id: 'd', text: 'Узел, на котором развёрнут артефакт' },
    ],
    correct: 'b',
    explanation:
      'Актор всегда снаружи системы: пользователь, соседняя ИС, устройство. Это роль, а не конкретный человек.',
  },
  {
    id: 'uc-include',
    topic: 'usecase',
    prompt: 'Куда направлена пунктирная стрелка со стереотипом «include»?',
    options: [
      { id: 'a', text: 'От включаемого прецедента к базовому' },
      { id: 'b', text: 'От базового прецедента к включаемому' },
      { id: 'c', text: 'Всегда от актора к системе' },
      { id: 'd', text: 'Между двумя акторами' },
    ],
    correct: 'b',
    explanation:
      'Базовый прецедент всегда включает фрагмент: стрелка идёт от него к включаемому. У «extend» направление обратное — от расширения к базе.',
  },
  {
    id: 'cl-id',
    topic: 'usecase',
    identify: true,
    diagram: 'class',
    prompt: 'Какая это диаграмма?',
    options: [
      { id: 'a', text: 'Диаграмма объектов' },
      { id: 'b', text: 'Диаграмма классов' },
      { id: 'c', text: 'IDEF0, уровень A0' },
      { id: 'd', text: 'Диаграмма развёртывания' },
    ],
    correct: 'b',
    explanation:
      'Прямоугольники с тремя секциями (имя, атрибуты, операции) и связи с кратностью — диаграмма классов.',
  },
  {
    id: 'cl-comp',
    topic: 'usecase',
    prompt: 'Закрашенный ромб на конце связи классов означает…',
    options: [
      { id: 'a', text: 'Агрегацию: «часть» может жить отдельно' },
      { id: 'b', text: 'Композицию: часть не существует без целого' },
      { id: 'c', text: 'Наследование' },
      { id: 'd', text: 'Зависимость «use»' },
    ],
    correct: 'b',
    explanation:
      'Композиция — сильное владение, ромб залит и стоит у целого. Пустой ромб — агрегация, части живут самостоятельно.',
  },
  {
    id: 'cl-mult',
    topic: 'usecase',
    prompt: 'Кратность «1..*» у роли ассоциации значит, что…',
    options: [
      { id: 'a', text: 'Связано ровно один объект' },
      { id: 'b', text: 'Связано от одного до любого числа объектов' },
      { id: 'c', text: 'Связь необязательна' },
      { id: 'd', text: 'Это наследование от суперкласса' },
    ],
    correct: 'b',
    explanation:
      'Нижняя граница 1 — хотя бы один, звёздочка — верхняя граница не ограничена. Необязательная связь записывалась бы как 0..*.',
  },
  {
    id: 'cl-sect',
    topic: 'usecase',
    prompt: 'В каком порядке секции у класса UML?',
    options: [
      { id: 'a', text: 'Операции → атрибуты → имя' },
      { id: 'b', text: 'Имя → атрибуты → операции' },
      { id: 'c', text: 'Атрибуты → имя → стереотип' },
      { id: 'd', text: 'Имя → интерфейсы → узлы' },
    ],
    correct: 'b',
    explanation:
      'Сверху имя (и необязательный стереотип), затем атрибуты, затем операции. Видимость: + public, − private, # protected.',
  },
  {
    id: 'cl-gen',
    topic: 'usecase',
    prompt: 'Незакрашенный треугольник на связи классов — это…',
    options: [
      { id: 'a', text: 'Композиция' },
      { id: 'b', text: 'Обобщение (наследование), треугольник у родителя' },
      { id: 'c', text: 'Реализация интерфейса со стороны клиента' },
      { id: 'd', text: 'Поток данных DFD' },
    ],
    correct: 'b',
    explanation:
      'Generalization: сплошная линия и полый треугольник, направленный к суперклассу. У реализации интерфейса линия обычно пунктирная.',
  },
  {
    id: 'sq-id',
    topic: 'interaction',
    identify: true,
    diagram: 'sequence',
    prompt: 'Какая это диаграмма?',
    options: [
      { id: 'a', text: 'Диаграмма состояний' },
      { id: 'b', text: 'Диаграмма последовательности' },
      { id: 'c', text: 'Диаграмма деятельности' },
      { id: 'd', text: 'Диаграмма классов' },
    ],
    correct: 'b',
    explanation:
      'Вертикальные линии жизни, сообщения слева направо и время сверху вниз — диаграмма последовательности.',
  },
  {
    id: 'sq-life',
    topic: 'interaction',
    prompt: 'Пунктирная вертикаль под объектом на sequence — это…',
    options: [
      { id: 'a', text: 'Возврат управления' },
      { id: 'b', text: 'Линия жизни (lifeline)' },
      { id: 'c', text: 'Граница системы' },
      { id: 'd', text: 'Хранилище данных' },
    ],
    correct: 'b',
    explanation:
      'Линия жизни показывает существование участника во времени. Узкий прямоугольник на ней — спецификация выполнения (activation).',
  },
  {
    id: 'sq-ret',
    topic: 'interaction',
    prompt: 'Как обычно рисуют возврат сообщения?',
    options: [
      { id: 'a', text: 'Сплошная линия с закрашенной стрелкой' },
      { id: 'b', text: 'Пунктирная линия со стрелкой назад' },
      { id: 'c', text: 'Двойная линия без стрелки' },
      { id: 'd', text: 'Ромб на линии жизни' },
    ],
    correct: 'b',
    explanation:
      'Синхронный вызов — сплошная стрелка к цели, возврат — пунктир обратно. Асинхронное сообщение часто рисуют открытым наконечником.',
  },
  {
    id: 'ac-id',
    topic: 'interaction',
    identify: true,
    diagram: 'activity',
    prompt: 'Какая это диаграмма?',
    options: [
      { id: 'a', text: 'Диаграмма деятельности' },
      { id: 'b', text: 'Диаграмма последовательности' },
      { id: 'c', text: 'IDEF0 A-0' },
      { id: 'd', text: 'Контекстная DFD' },
    ],
    correct: 'a',
    explanation:
      'Залитый кружок старта, скруглённые действия, ромб решения и «бычий глаз» финала — нотация activity diagram.',
  },
  {
    id: 'ac-dec',
    topic: 'interaction',
    prompt: 'Ромб на диаграмме деятельности обозначает…',
    options: [
      { id: 'a', text: 'Параллельное ветвление (fork)' },
      { id: 'b', text: 'Решение или слияние по условию' },
      { id: 'c', text: 'Объект данных' },
      { id: 'd', text: 'Актор' },
    ],
    correct: 'b',
    explanation:
      'Decision/merge — ромб, на исходящих стрелках пишут сторожевые условия. Параллельность показывают жирной чертой (fork/join).',
  },
  {
    id: 'ac-fork',
    topic: 'interaction',
    prompt: 'Жирная короткая черта, из которой выходят несколько потоков, — это…',
    options: [
      { id: 'a', text: 'Решение с взаимоисключающими ветками' },
      { id: 'b', text: 'Разделение (fork): ветки выполняются параллельно' },
      { id: 'c', text: 'Конец прецедента' },
      { id: 'd', text: 'Интерфейс компонента' },
    ],
    correct: 'b',
    explanation:
      'Fork запускает параллельные потоки, join их собирает. В отличие от ромба, здесь ветки не альтернативы, а одновременные.',
  },
  {
    id: 'sq-when',
    topic: 'interaction',
    prompt: 'Когда брать sequence, а не activity?',
    options: [
      { id: 'a', text: 'Нужно показать алгоритм с ветвлениями без привязки к объектам' },
      { id: 'b', text: 'Нужен обмен сообщениями между объектами во времени' },
      { id: 'c', text: 'Нужно разложить функцию ICOM-стрелками' },
      { id: 'd', text: 'Нужно показать узлы и артефакты на серверах' },
    ],
    correct: 'b',
    explanation:
      'Sequence отвечает на вопрос «кто кому и в каком порядке пишет». Activity — «какие шаги и решения», даже если объекты не важны.',
  },
  {
    id: 'ac-lane',
    topic: 'interaction',
    prompt: 'Зачем на activity рисуют дорожки (swimlanes)?',
    options: [
      { id: 'a', text: 'Чтобы показать линии жизни объектов' },
      { id: 'b', text: 'Чтобы распределить действия по ролям или подразделениям' },
      { id: 'c', text: 'Чтобы обозначить уровни декомпозиции IDEF0' },
      { id: 'd', text: 'Это обязательный элемент любой UML-диаграммы' },
    ],
    correct: 'b',
    explanation:
      'Дорожка — зона ответственности: менеджер, система, склад. Сами действия остаются узлами activity.',
  },
  {
    id: 'cp-id',
    topic: 'structure',
    identify: true,
    diagram: 'component',
    prompt: 'Какая это диаграмма?',
    options: [
      { id: 'a', text: 'Диаграмма классов' },
      { id: 'b', text: 'Диаграмма компонентов' },
      { id: 'c', text: 'Диаграмма развёртывания' },
      { id: 'd', text: 'DFD' },
    ],
    correct: 'b',
    explanation:
      'Крупные блоки «компонент» и соединения через предоставляемые/требуемые интерфейсы — диаграмма компонентов.',
  },
  {
    id: 'cp-if',
    topic: 'structure',
    prompt: '«Леденец» и «розетка» на компоненте — это…',
    options: [
      { id: 'a', text: 'Старт и финиш деятельности' },
      { id: 'b', text: 'Предоставляемый и требуемый интерфейсы' },
      { id: 'c', text: 'Вход и выход IDEF0' },
      { id: 'd', text: 'Актор и прецедент' },
    ],
    correct: 'b',
    explanation:
      'Кружок (ball) — provided, скобка (socket) — required. Так показывают контракт между частями системы, не классы полей.',
  },
  {
    id: 'dp-id',
    topic: 'structure',
    identify: true,
    diagram: 'deployment',
    prompt: 'Какая это диаграмма?',
    options: [
      { id: 'a', text: 'Диаграмма компонентов' },
      { id: 'b', text: 'Диаграмма развёртывания' },
      { id: 'c', text: 'Диаграмма пакетов' },
      { id: 'd', text: 'Диаграмма деятельности' },
    ],
    correct: 'b',
    explanation:
      'Трёхмерные узлы (устройства или среды выполнения) и артефакты внутри них — диаграмма развёртывания.',
  },
  {
    id: 'dp-node',
    topic: 'structure',
    prompt: 'Чем узел отличается от артефакта?',
    options: [
      { id: 'a', text: 'Узел — вычислительный ресурс, артефакт — физический кусок ПО на нём' },
      { id: 'b', text: 'Это синонимы' },
      { id: 'c', text: 'Артефакт всегда человек-актор' },
      { id: 'd', text: 'Узел рисуют только на DFD' },
    ],
    correct: 'a',
    explanation:
      'Node: сервер, ПК, контейнер, JVM. Artifact: war, jar, exe, html. Компонент описывает логическую часть, артефакт — то, что кладут на узел.',
  },
  {
    id: 'dp-when',
    topic: 'structure',
    prompt: 'Диаграмму развёртывания строят, чтобы…',
    options: [
      { id: 'a', text: 'Показать сценарии пользователя' },
      { id: 'b', text: 'Показать, где крутятся программные артефакты и как узлы связаны' },
      { id: 'c', text: 'Декомпозировать бизнес-функцию по ICOM' },
      { id: 'd', text: 'Рассчитать кратность классов' },
    ],
    correct: 'b',
    explanation:
      'Это карта «железо / среды / сети». Для логики модулей берут компоненты, для объектов — классы.',
  },
  {
    id: 'cp-vs-cl',
    topic: 'structure',
    prompt: 'Чем диаграмма компонентов отличается от диаграммы классов?',
    options: [
      { id: 'a', text: 'Ничем, это одно и то же в UML 2' },
      { id: 'b', text: 'Компоненты — подсистемы с интерфейсами, классы — типы с полями и методами' },
      { id: 'c', text: 'На компонентах нельзя показать зависимости' },
      { id: 'd', text: 'Классы рисуют только для баз данных' },
    ],
    correct: 'b',
    explanation:
      'Класс — спецификация объектов. Компонент — заменяемый модуль (сервис, библиотека) со своими интерфейсами. Внутри компонента могут жить классы.',
  },
  {
    id: 'uml-name',
    topic: 'uml',
    prompt: 'UML — это…',
    options: [
      { id: 'a', text: 'Язык программирования для серверов' },
      { id: 'b', text: 'Унифицированный язык моделирования систем' },
      { id: 'c', text: 'Нотация только для потоков данных' },
      { id: 'd', text: 'Стандарт ГОСТ на IDEF0' },
    ],
    correct: 'b',
    explanation:
      'Unified Modeling Language — семейство диаграмм для структуры, поведения и развёртывания. Это не код и не IDEF.',
  },
  {
    id: 'uml-beh',
    topic: 'uml',
    prompt: 'Какие диаграммы относят к поведенческим?',
    options: [
      { id: 'a', text: 'Классы, компоненты, развёртывание' },
      { id: 'b', text: 'Прецеденты, последовательности, деятельность' },
      { id: 'c', text: 'Только DFD и IDEF0' },
      { id: 'd', text: 'Только контекст IDEF0' },
    ],
    correct: 'b',
    explanation:
      'Behavior: use case, activity, sequence, state, communication. Structure: class, component, deployment, package, object, composite structure.',
  },
  {
    id: 'uml-str',
    topic: 'uml',
    prompt: 'Какой набор — структурные диаграммы UML?',
    options: [
      { id: 'a', text: 'Деятельность, состояния, последовательность' },
      { id: 'b', text: 'Классы, компоненты, развёртывание' },
      { id: 'c', text: 'IDEF0 и DFD' },
      { id: 'd', text: 'Только прецеденты' },
    ],
    correct: 'b',
    explanation:
      'Структура отвечает «из чего состоит». IDEF0 и DFD — отдельные нотации, в UML не входят.',
  },
  {
    id: 'uml-pick-uc',
    topic: 'uml',
    prompt: 'Нужно зафиксировать, что система делает для ролей снаружи. Какую диаграмму взять?',
    options: [
      { id: 'a', text: 'Развёртывания' },
      { id: 'b', text: 'Прецедентов' },
      { id: 'c', text: 'IDEF0 дерева узлов' },
      { id: 'd', text: 'Классов' },
    ],
    correct: 'b',
    explanation:
      'Граница системы и акторы — зона use case. Классы появятся позже, когда модель данных и ответственности уточнят.',
  },
  {
    id: 'uml-pick-seq',
    topic: 'uml',
    prompt: 'Нужно показать вызовы между сервисами по шагам сценария «оплатить заказ». Что строить?',
    options: [
      { id: 'a', text: 'Диаграмму последовательности' },
      { id: 'b', text: 'Контекстную DFD' },
      { id: 'c', text: 'Диаграмму классов' },
      { id: 'd', text: 'Диаграмму развёртывания' },
    ],
    correct: 'a',
    explanation:
      'Пошаговый обмен сообщениями — sequence. DFD покажет данные, но не порядок вызовов объектов.',
  },
  {
    id: 'uml-not-uml',
    topic: 'uml',
    prompt: 'Что из перечисленного не является диаграммой UML?',
    options: [
      { id: 'a', text: 'Диаграмма компонентов' },
      { id: 'b', text: 'Диаграмма прецедентов' },
      { id: 'c', text: 'IDEF0-декомпозиция' },
      { id: 'd', text: 'Диаграмма деятельности' },
    ],
    correct: 'c',
    explanation:
      'IDEF0 — семейство IDEF (SADT), отдельно от UML. DFD тоже отдельная нотация, хотя обе используют в проектировании ИС.',
  },
  {
    id: 'i0-id',
    topic: 'idef0',
    identify: true,
    diagram: 'idef0-context',
    prompt: 'Какая это диаграмма?',
    options: [
      { id: 'a', text: 'Контекстная DFD' },
      { id: 'b', text: 'Контекстная IDEF0 (A-0)' },
      { id: 'c', text: 'Диаграмма деятельности' },
      { id: 'd', text: 'Диаграмма классов' },
    ],
    correct: 'b',
    explanation:
      'Один функциональный блок и стрелки ICOM с четырёх сторон — контекст A-0. У DFD процесс обычно кружок, а «вход» не привязан к стороне.',
  },
  {
    id: 'i0-icom',
    topic: 'idef0',
    prompt: 'Правило ICOM: где вход, управление, выход, механизм?',
    options: [
      { id: 'a', text: 'Вход сверху, выход снизу, управление слева' },
      { id: 'b', text: 'Вход слева, управление сверху, выход справа, механизм снизу' },
      { id: 'c', text: 'Все стрелки входят слева' },
      { id: 'd', text: 'Механизм всегда справа' },
    ],
    correct: 'b',
    explanation:
      'Input — left, Control — top, Output — right, Mechanism — bottom. Сторона кодирует роль стрелки, подпись — её содержание.',
  },
  {
    id: 'i0-hot-c',
    topic: 'idef0',
    type: 'hotspot',
    diagram: 'idef0-hotspot',
    prompt: 'Щёлкните стрелку управления (Control).',
    correct: 'top',
    explanation:
      'Управление входит сверху: правила, стандарты, приказы. Это не сырьё (вход слева) и не исполнитель (механизм снизу).',
  },
  {
    id: 'i0-hot-i',
    topic: 'idef0',
    type: 'hotspot',
    diagram: 'idef0-hotspot',
    prompt: 'Щёлкните стрелку входа (Input) — то, что функция преобразует.',
    correct: 'left',
    explanation:
      'Вход слева: заявка, сырьё, документ, который работа перерабатывает в выход.',
  },
  {
    id: 'i0-hot-o',
    topic: 'idef0',
    type: 'hotspot',
    diagram: 'idef0-hotspot',
    prompt: 'Щёлкните стрелку выхода (Output).',
    correct: 'right',
    explanation: 'Результат работы блока всегда уходит вправо.',
  },
  {
    id: 'i0-hot-m',
    topic: 'idef0',
    type: 'hotspot',
    diagram: 'idef0-hotspot',
    prompt: 'Щёлкните стрелку механизма (Mechanism) — чем выполняют работу.',
    correct: 'bottom',
    explanation:
      'Механизм снизу: персонал, ПО, станок, ИС. Без него функцию не исполнить, но он не является входом-сырьём.',
  },
  {
    id: 'i0-a0',
    topic: 'idef0',
    prompt: 'Что показывают на диаграмме A-0?',
    options: [
      { id: 'a', text: 'Все функции системы сразу, без контекста' },
      { id: 'b', text: 'Один контекстный блок всей системы и его внешние стрелки' },
      { id: 'c', text: 'Только хранилища данных' },
      { id: 'd', text: 'Развёртывание по серверам' },
    ],
    correct: 'b',
    explanation:
      'A-0 — рамка модели: назначение, точка зрения и единственный блок A0. Его декомпозиция — диаграмма A0.',
  },
  {
    id: 'i0-count',
    topic: 'idef0',
    prompt: 'Сколько функциональных блоков принято класть на одну декомпозицию IDEF0?',
    options: [
      { id: 'a', text: 'Ровно 2' },
      { id: 'b', text: 'От 3 до 6' },
      { id: 'c', text: 'Не меньше 12' },
      { id: 'd', text: 'Только 1, как на A-0' },
    ],
    correct: 'b',
    explanation:
      '3–6 блоков: меньше — декомпозиция почти ничего не раскрывает, больше — лист нечитаем. На контексте по-прежнему один блок.',
  },
  {
    id: 'i0-num',
    topic: 'idef0',
    prompt: 'Блок A2 на диаграмме A0 декомпозируют. Как нумеруют дочерние блоки 2-го уровня?',
    options: [
      { id: 'a', text: 'B1, B2, B3' },
      { id: 'b', text: 'A21, A22, A23' },
      { id: 'c', text: '2.1, 2.2 по порядку работ' },
      { id: 'd', text: 'Оставляют номер A2 у всех' },
    ],
    correct: 'b',
    explanation:
      'Номер ребёнка = номер родителя + цифра. A1 → A11, A12; A2 → A21, A22.',
  },
  {
    id: 'i0-lv',
    topic: 'idef0',
    diagram: 'idef0-decomp',
    prompt: 'Что изображено: декомпозиция 1-го уровня. Чем она отличается от 2-го?',
    options: [
      { id: 'a', text: 'Ничем, уровни — синонимы' },
      { id: 'b', text: '1-й уровень раскладывает A0 на A1…An; 2-й раскладывает уже выбранный Ai' },
      { id: 'c', text: '2-й уровень всегда рисуют кружками DFD' },
      { id: 'd', text: 'На 1-м уровне запрещены стрелки управления' },
    ],
    correct: 'b',
    explanation:
      'Диаграмма A0 — первый уровень (дети контекста). Диаграмма A1 или A2 — второй: детализация одной функции. Стрелки родителя должны найтись у детей (баланс).',
  },
  {
    id: 'i0-view',
    topic: 'idef0',
    prompt: 'Зачем на IDEF0 указывают цель (Purpose) и точку зрения (Viewpoint)?',
    options: [
      { id: 'a', text: 'Это подписи стрелок механизма' },
      { id: 'b', text: 'Чтобы модель не смешивала разные аудитории и задачи' },
      { id: 'c', text: 'Так обозначают кратность классов' },
      { id: 'd', text: 'Без них CASE-средство не рисует блоки' },
    ],
    correct: 'b',
    explanation:
      'Одна модель — одна цель и взгляд (например, «директор по продажам»). Иначе на одной декомпозиции смешаются бухгалтерия, сеть и UI.',
  },
  {
    id: 'df-id',
    topic: 'dfd',
    identify: true,
    diagram: 'dfd-context',
    prompt: 'Какая это диаграмма?',
    options: [
      { id: 'a', text: 'IDEF0 A-0' },
      { id: 'b', text: 'Контекстная DFD' },
      { id: 'c', text: 'Диаграмма прецедентов' },
      { id: 'd', text: 'Диаграмма компонентов' },
    ],
    correct: 'b',
    explanation:
      'Один процесс-система, внешние сущности и именованные потоки. Хранилищ на контексте обычно нет.',
  },
  {
    id: 'df-el',
    topic: 'dfd',
    prompt: 'Каких четырёх элементов достаточно, чтобы собрать DFD?',
    options: [
      { id: 'a', text: 'Актор, прецедент, include, граница' },
      { id: 'b', text: 'Процесс, поток данных, хранилище, внешняя сущность' },
      { id: 'c', text: 'Узел, артефакт, протокол, порт' },
      { id: 'd', text: 'Вход, управление, выход, механизм' },
    ],
    correct: 'b',
    explanation:
      'Process, data flow, data store, external entity. ICOM — это IDEF0, акторы — UML use case.',
  },
  {
    id: 'df-rule',
    topic: 'dfd',
    prompt: 'Какое правило нарушено чаще всего у новичков?',
    options: [
      { id: 'a', text: 'Процесс без входа или без выхода' },
      { id: 'b', text: 'Подпись потока данных' },
      { id: 'c', text: 'Номер процесса' },
      { id: 'd', text: 'Имя внешней сущности с заглавной' },
    ],
    correct: 'a',
    explanation:
      'Чёрная дыра (есть вход, нет выхода) и чудо (есть выход, нет входа) запрещены. У каждого процесса минимум один вход и один выход.',
  },
  {
    id: 'df-store',
    topic: 'dfd',
    prompt: 'Можно ли соединить хранилище напрямую с внешней сущностью?',
    options: [
      { id: 'a', text: 'Да, это основной способ' },
      { id: 'b', text: 'Нет: между ними должен стоять процесс' },
      { id: 'c', text: 'Только на контексте' },
      { id: 'd', text: 'Только в нотации Гейна–Сарсона' },
    ],
    correct: 'b',
    explanation:
      'Внешний мир не читает таблицы сам: данные идут через процесс. Два хранилища тоже не связывают стрелкой без процесса.',
  },
  {
    id: 'df-bal',
    topic: 'dfd',
    prompt: 'Показывают ли хранилище на контекстной DFD?',
    options: [
      { id: 'a', text: 'Да, обязательно рядом с единственным процессом' },
      { id: 'b', text: 'Обычно нет: на контексте только система и внешние сущности' },
      { id: 'c', text: 'Да, вместо внешних сущностей' },
      { id: 'd', text: 'Только если это нотация IDEF0' },
    ],
    correct: 'b',
    explanation:
      'Контекст описывает систему целиком и её обмен с внешним миром. Хранилища появляются уже внутри системы, на детальных листах.',
  },
  {
    id: 'df-shape',
    topic: 'dfd',
    prompt: 'Как рисуют процесс в нотации Йодана / Де Марко?',
    options: [
      { id: 'a', text: 'Круг (пузырёк)' },
      { id: 'b', text: 'Трёхмерный куб узла' },
      { id: 'c', text: 'Овал прецедента без номера' },
      { id: 'd', text: 'Ромб решения' },
    ],
    correct: 'a',
    explanation:
      'Yourdon–DeMarco: процесс — окружность. Gane–Sarson: скруглённый прямоугольник. Хранилище — открытый прямоугольник с полоской слева.',
  },
  {
    id: 'df-ctx',
    topic: 'dfd',
    prompt: 'Создаёте контекстную DFD. Сколько процессов на листе?',
    options: [
      { id: 'a', text: '3–6, как в IDEF0' },
      { id: 'b', text: 'Ровно один — вся система' },
      { id: 'c', text: 'По процессу на каждую таблицу БД' },
      { id: 'd', text: 'Ноль, только хранилища' },
    ],
    correct: 'b',
    explanation:
      'Контекст — один процесс «система» и внешние сущности. Хранилищ и внутренних процессов на этом листе нет.',
  },
  {
    id: 'df-hot',
    topic: 'dfd',
    type: 'hotspot',
    diagram: 'dfd-hotspot',
    prompt: 'Щёлкните хранилище данных.',
    correct: 'store',
    explanation:
      'Хранилище — прямоугольник с полоской слева, без правой стороны. Процесс — скруглённый прямоугольник. Квадрат — внешняя сущность.',
  },
]

export function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function rankFor(percent) {
  if (percent >= 95) return { title: 'Мастер нотаций', tone: 'gold' }
  if (percent >= 80) return { title: 'Архитектор модели', tone: 'cyan' }
  if (percent >= 70) return { title: 'Системный аналитик', tone: 'ok' }
  if (percent >= 45) return { title: 'Стажёр-аналитик', tone: 'muted' }
  return { title: 'Наблюдатель чертежей', tone: 'rose' }
}

function pickExamBuilds() {
  const buckets = [
    MISSIONS.filter((m) => ['uc-lib', 'cl-shop'].includes(m.id)),
    MISSIONS.filter((m) => String(m.id).startsWith('i0-')),
    MISSIONS.filter((m) => String(m.id).startsWith('dfd-')),
    MISSIONS.filter((m) => ['cp-plat', 'dp-prod'].includes(m.id)),
  ]
  return shuffle(buckets)
    .slice(0, 2)
    .map((bucket) => shuffle(bucket)[0])
    .filter(Boolean)
}

export function buildSession({ mode, topic, questions }) {
  let pool
  if (questions) pool = questions
  else if (mode === 'identify') pool = QUESTIONS.filter((q) => q.identify)
  else if (mode === 'trainer' && topic) pool = QUESTIONS.filter((q) => q.topic === topic)
  else if (mode === 'exam') {
    const byTopic = TOPICS.map((t) => shuffle(QUESTIONS.filter((q) => q.topic === t.id)))
    const quiz = []
    let i = 0
    while (quiz.length < 8) {
      for (const group of byTopic) {
        if (group[i]) quiz.push(group[i])
        if (quiz.length >= 8) break
      }
      i += 1
      if (i > 20) break
    }
    const builds = pickExamBuilds().map((m) => ({
      id: 'build-' + m.id,
      type: 'build',
      topic: m.topic,
      missionId: m.id,
      prompt: 'Постройте диаграмму: ' + m.title,
      explanation: m.hint,
    }))
    pool = [...shuffle(quiz), ...builds]
  } else {
    const byTopic = TOPICS.map((t) => shuffle(QUESTIONS.filter((q) => q.topic === t.id)))
    pool = []
    let i = 0
    while (pool.length < 12) {
      for (const group of byTopic) {
        if (group[i]) pool.push(group[i])
        if (pool.length >= 12) break
      }
      i += 1
      if (i > 20) break
    }
    pool = shuffle(pool)
  }

  return {
    mode,
    topic: topic || null,
    questions: pool.map((q) => ({
      ...q,
      options: q.options ? shuffle(q.options) : undefined,
    })),
    startedAt: Date.now(),
    limitMs: mode === 'exam' ? 20 * 60 * 1000 : null,
  }
}

const STATS_KEY = 'diagram-quiz-stats'

export function loadStats() {
  try {
    return (
      JSON.parse(localStorage.getItem(STATS_KEY)) || {
        exams: 0,
        best: 0,
        played: 0,
      }
    )
  } catch {
    return { exams: 0, best: 0, played: 0 }
  }
}

export function saveStats(result) {
  const s = loadStats()
  s.played += 1
  if (result.mode === 'exam') {
    s.exams += 1
    s.best = Math.max(s.best, result.percent)
  }
  localStorage.setItem(STATS_KEY, JSON.stringify(s))
}
