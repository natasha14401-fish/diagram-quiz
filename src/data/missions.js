export const PALETTE = [
  { kind: 'actor', title: 'Актор', group: 'UML' },
  { kind: 'usecase', title: 'Прецедент', group: 'UML' },
  { kind: 'class', title: 'Класс', group: 'UML' },
  { kind: 'object', title: 'Объект / линия жизни', group: 'UML' },
  { kind: 'action', title: 'Действие (activity)', group: 'UML' },
  { kind: 'decision', title: 'Решение', group: 'UML' },
  { kind: 'component', title: 'Компонент', group: 'UML' },
  { kind: 'device', title: 'Узел развёртывания', group: 'UML' },
  { kind: 'function', title: 'Функция IDEF0', group: 'IDEF0' },
  { kind: 'icom', title: 'Стрелка ICOM', group: 'IDEF0' },
  { kind: 'process', title: 'Процесс DFD', group: 'DFD' },
  { kind: 'entity', title: 'Внешняя сущность', group: 'DFD' },
  { kind: 'store', title: 'Хранилище', group: 'DFD' },
]

export const LINK_KINDS = [
  { id: 'association', title: 'Ассоциация' },
  { id: 'include', title: '«include»' },
  { id: 'extend', title: '«extend»' },
  { id: 'generalization', title: 'Обобщение' },
  { id: 'composition', title: 'Композиция' },
  { id: 'flow', title: 'Поток / сообщение' },
  { id: 'dependency', title: 'Зависимость' },
  { id: 'comm', title: 'Коммуникация' },
  { id: 'icom', title: 'Связь ICOM' },
]

export const MISSIONS = [
  {
    id: 'uc-lib',
    title: 'Прецеденты: АИС библиотеки',
    notation: 'UML · use case',
    topic: 'usecase',
    brief:
      'Читатель регистрируется, ищет издание и бронирует. Бронь всегда включает поиск. Библиотекарь выдаёт книгу и принимает возврат; выдача всегда включает проверку задолженности. Штраф — необязательное расширение возврата. Бухгалтер только формирует отчёт, каталог ISBN — внешняя система для поиска.',
    hint: '«include»: стрелка от базового к обязательному. «extend»: от расширения к базе. Акторы снаружи рамки.',
    tools: ['association', 'include', 'extend'],
    kit: [
      { kind: 'actor', label: 'Читатель' },
      { kind: 'actor', label: 'Библиотекарь' },
      { kind: 'actor', label: 'Бухгалтер' },
      { kind: 'actor', label: 'Каталог ISBN' },
      { kind: 'usecase', label: 'Зарегистрироваться' },
      { kind: 'usecase', label: 'Искать издание' },
      { kind: 'usecase', label: 'Забронировать' },
      { kind: 'usecase', label: 'Выдать книгу' },
      { kind: 'usecase', label: 'Проверить задолженность' },
      { kind: 'usecase', label: 'Принять возврат' },
      { kind: 'usecase', label: 'Начислить штраф' },
      { kind: 'usecase', label: 'Сформировать отчёт' },
    ],
    require: {
      edges: [
        { a: 'Читатель', b: 'Зарегистрироваться' },
        { a: 'Читатель', b: 'Искать издание' },
        { a: 'Читатель', b: 'Забронировать' },
        { a: 'Библиотекарь', b: 'Выдать книгу' },
        { a: 'Библиотекарь', b: 'Принять возврат' },
        { a: 'Бухгалтер', b: 'Сформировать отчёт' },
        { a: 'Каталог ISBN', b: 'Искать издание' },
      ],
      directed: [
        { from: 'Забронировать', to: 'Искать издание', kind: 'include' },
        { from: 'Выдать книгу', to: 'Проверить задолженность', kind: 'include' },
        { from: 'Начислить штраф', to: 'Принять возврат', kind: 'extend' },
      ],
    },
  },
  {
    id: 'cl-shop',
    title: 'Классы: заказы и оплата',
    notation: 'UML · class',
    topic: 'usecase',
    brief:
      'Пользователь обобщает Клиента и Менеджера. Заказ принадлежит клиенту, состоит из позиций (композиция) и связан с оплатой. Позиция ссылается на товар, товар — на категорию.',
    hint: 'Обобщение — стрелка к родителю. Композиция — сильное «часть–целое», от заказа к позиции.',
    tools: ['association', 'generalization', 'composition'],
    kit: [
      { kind: 'class', label: 'Пользователь', attrs: '− почта: строка', ops: '+ войти()' },
      { kind: 'class', label: 'Клиент', attrs: '− скидка: число', ops: '+ оформить(): заказ' },
      { kind: 'class', label: 'Менеджер', attrs: '− табель: строка', ops: '+ подтвердить()' },
      { kind: 'class', label: 'Заказ', attrs: '− дата: дата\n− статус: строка', ops: '+ сумма(): деньги' },
      { kind: 'class', label: 'Позиция', attrs: '− количество: целое', ops: '+ стоимость(): деньги' },
      { kind: 'class', label: 'Товар', attrs: '− артикул: строка\n− цена: деньги', ops: '+ цена(): деньги' },
      { kind: 'class', label: 'Категория', attrs: '− название: строка', ops: '' },
      { kind: 'class', label: 'Оплата', attrs: '− способ: строка\n− сумма: деньги', ops: '+ провести(): логический' },
    ],
    require: {
      directed: [
        { from: 'Клиент', to: 'Пользователь', kind: 'generalization' },
        { from: 'Менеджер', to: 'Пользователь', kind: 'generalization' },
        { from: 'Заказ', to: 'Позиция', kind: 'composition' },
      ],
      edges: [
        { a: 'Клиент', b: 'Заказ' },
        { a: 'Заказ', b: 'Оплата' },
        { a: 'Позиция', b: 'Товар' },
        { a: 'Товар', b: 'Категория' },
      ],
    },
  },
  {
    id: 'i0-a0',
    title: 'IDEF0 A-0: обработка заказа',
    notation: 'IDEF0',
    topic: 'idef0',
    brief:
      'Контекст с несколькими ICOM. Входы: заявка и карточка клиента. Управление: регламент продаж и закон о защите прав. Выходы: подтверждённый заказ, отказ, счёт. Механизмы: ERP, менеджер, платёжный шлюз.',
    hint: 'Несколько стрелок могут входить в одну сторону. Подпись должна лежать у своей стороны блока.',
    tools: ['icom'],
    kit: [
      { kind: 'function', label: 'Обработать заказ клиента', tag: 'A0' },
      { kind: 'icom', label: 'Заявка' },
      { kind: 'icom', label: 'Карточка клиента' },
      { kind: 'icom', label: 'Регламент продаж' },
      { kind: 'icom', label: 'Закон о защите прав' },
      { kind: 'icom', label: 'Подтверждённый заказ' },
      { kind: 'icom', label: 'Отказ' },
      { kind: 'icom', label: 'Счёт' },
      { kind: 'icom', label: 'ERP' },
      { kind: 'icom', label: 'Менеджер' },
      { kind: 'icom', label: 'Платёжный шлюз' },
    ],
    require: {
      icom: [
        { label: 'Заявка', side: 'left', fn: 'Обработать заказ клиента' },
        { label: 'Карточка клиента', side: 'left', fn: 'Обработать заказ клиента' },
        { label: 'Регламент продаж', side: 'top', fn: 'Обработать заказ клиента' },
        { label: 'Закон о защите прав', side: 'top', fn: 'Обработать заказ клиента' },
        { label: 'Подтверждённый заказ', side: 'right', fn: 'Обработать заказ клиента' },
        { label: 'Отказ', side: 'right', fn: 'Обработать заказ клиента' },
        { label: 'Счёт', side: 'right', fn: 'Обработать заказ клиента' },
        { label: 'ERP', side: 'bottom', fn: 'Обработать заказ клиента' },
        { label: 'Менеджер', side: 'bottom', fn: 'Обработать заказ клиента' },
        { label: 'Платёжный шлюз', side: 'bottom', fn: 'Обработать заказ клиента' },
      ],
    },
  },
  {
    id: 'i0-l1',
    title: 'IDEF0 уровень 1: пять работ',
    notation: 'IDEF0',
    topic: 'idef0',
    brief:
      'Декомпозиция A0 на 5 блоков (в норме 3–6): зарегистрировать заявку → проверить клиента → зарезервировать товар → рассчитать оплату → отгрузить. Регламент управляет проверкой и расчётом.',
    hint: 'Выход предыдущей работы — вход следующей. Управление сверху к A2 и A4.',
    tools: ['flow', 'icom'],
    kit: [
      { kind: 'function', label: 'Зарегистрировать заявку', tag: 'A1' },
      { kind: 'function', label: 'Проверить клиента', tag: 'A2' },
      { kind: 'function', label: 'Зарезервировать товар', tag: 'A3' },
      { kind: 'function', label: 'Рассчитать оплату', tag: 'A4' },
      { kind: 'function', label: 'Отгрузить заказ', tag: 'A5' },
      { kind: 'icom', label: 'Регламент продаж' },
    ],
    require: {
      directed: [
        { from: 'Зарегистрировать заявку', to: 'Проверить клиента' },
        { from: 'Проверить клиента', to: 'Зарезервировать товар' },
        { from: 'Зарезервировать товар', to: 'Рассчитать оплату' },
        { from: 'Рассчитать оплату', to: 'Отгрузить заказ' },
      ],
      icom: [
        { label: 'Регламент продаж', side: 'top', fn: 'Проверить клиента' },
      ],
      minFunctions: 5,
    },
  },
  {
    id: 'i0-l2',
    title: 'IDEF0 уровень 2: резерв товара',
    notation: 'IDEF0',
    topic: 'idef0',
    brief:
      'Декомпозируйте A3 «Зарезервировать товар»: A31 запросить остаток, A32 списать со склада, A33 зафиксировать резерв. Остаток и запрет отрицательного остатка — управление для списания. WMS — механизм.',
    hint: 'Дети A3 нумеруются A31, A32, A33. Стрелки родителя должны найтись у детей.',
    tools: ['flow', 'icom'],
    kit: [
      { kind: 'function', label: 'Запросить остаток', tag: 'A31' },
      { kind: 'function', label: 'Списать со склада', tag: 'A32' },
      { kind: 'function', label: 'Зафиксировать резерв', tag: 'A33' },
      { kind: 'icom', label: 'Остаток на складе' },
      { kind: 'icom', label: 'Запрет отрицательного остатка' },
      { kind: 'icom', label: 'WMS' },
    ],
    require: {
      directed: [
        { from: 'Запросить остаток', to: 'Списать со склада' },
        { from: 'Списать со склада', to: 'Зафиксировать резерв' },
      ],
      icom: [
        { label: 'Остаток на складе', side: 'top', fn: 'Списать со склада' },
        { label: 'Запрет отрицательного остатка', side: 'top', fn: 'Списать со склада' },
        { label: 'WMS', side: 'bottom', fn: 'Списать со склада' },
      ],
    },
  },
  {
    id: 'dfd-ctx',
    title: 'DFD 0: контур предприятия',
    notation: 'DFD',
    topic: 'dfd',
    brief:
      'Контекст: один процесс «ИС продаж». Снаружи клиент, склад, банк и бухгалтерия. Не забудьте двусторонние потоки с клиентом и банком, запрос/остаток со складом, проводки в бухгалтерию.',
    hint: 'На уровне 0 один процесс, хранилищ нет, сущности друг с другом не стыкуют.',
    tools: ['flow'],
    flows: [
      'заказ',
      'подтверждение',
      'счёт клиенту',
      'запрос остатка',
      'остатки',
      'платёжное поручение',
      'квитанция банка',
      'проводки',
    ],
    kit: [
      { kind: 'process', label: 'ИС продаж', tag: '0' },
      { kind: 'entity', label: 'Клиент' },
      { kind: 'entity', label: 'Склад' },
      { kind: 'entity', label: 'Банк' },
      { kind: 'entity', label: 'Бухгалтерия' },
    ],
    require: {
      directed: [
        { from: 'Клиент', to: 'ИС продаж', label: 'заказ' },
        { from: 'ИС продаж', to: 'Клиент', label: 'подтверждение' },
        { from: 'ИС продаж', to: 'Клиент', label: 'счёт клиенту' },
        { from: 'ИС продаж', to: 'Склад', label: 'запрос остатка' },
        { from: 'Склад', to: 'ИС продаж', label: 'остатки' },
        { from: 'ИС продаж', to: 'Банк', label: 'платёжное поручение' },
        { from: 'Банк', to: 'ИС продаж', label: 'квитанция банка' },
        { from: 'ИС продаж', to: 'Бухгалтерия', label: 'проводки' },
      ],
      forbid: ['entity-entity'],
      noStores: true,
    },
  },
  {
    id: 'dfd-l1',
    title: 'DFD 1: контур продаж',
    notation: 'DFD',
    topic: 'dfd',
    brief:
      'Пять процессов: 1.0 приём, 2.0 проверка клиента, 3.0 резерв, 4.0 оплата, 5.0 отгрузка. Хранилища D1 Заказы и D2 Клиенты. Клиент входит в 1.0 и 4.0, склад — в 3.0 и 5.0, банк — в 4.0. Хранилища только с процессами.',
    hint: 'Баланс с контекстом: внешние потоки те же. У каждого процесса вход и выход. Store ↛ Entity.',
    tools: ['flow'],
    flows: [
      'заказ',
      'анкета',
      'одобрение',
      'резерв',
      'к оплате',
      'платёж',
      'квитанция',
      'отгрузить',
      'запись заказа',
      'карточка клиента',
    ],
    kit: [
      { kind: 'entity', label: 'Клиент' },
      { kind: 'entity', label: 'Склад' },
      { kind: 'entity', label: 'Банк' },
      { kind: 'process', label: 'Приём заявки', tag: '1.0' },
      { kind: 'process', label: 'Проверка клиента', tag: '2.0' },
      { kind: 'process', label: 'Резерв товара', tag: '3.0' },
      { kind: 'process', label: 'Провести оплату', tag: '4.0' },
      { kind: 'process', label: 'Отгрузка', tag: '5.0' },
      { kind: 'store', label: 'Заказы', tag: 'D1' },
      { kind: 'store', label: 'Клиенты', tag: 'D2' },
    ],
    require: {
      directed: [
        { from: 'Клиент', to: 'Приём заявки', label: 'заказ' },
        { from: 'Приём заявки', to: 'Проверка клиента', label: 'анкета' },
        { from: 'Проверка клиента', to: 'Резерв товара', label: 'одобрение' },
        { from: 'Резерв товара', to: 'Провести оплату', label: 'к оплате' },
        { from: 'Клиент', to: 'Провести оплату', label: 'платёж' },
        { from: 'Провести оплату', to: 'Банк', label: 'платёж' },
        { from: 'Банк', to: 'Провести оплату', label: 'квитанция' },
        { from: 'Провести оплату', to: 'Отгрузка', label: 'отгрузить' },
        { from: 'Отгрузка', to: 'Склад', label: 'отгрузить' },
        { from: 'Приём заявки', to: 'Заказы', label: 'запись заказа' },
        { from: 'Проверка клиента', to: 'Клиенты', label: 'карточка клиента' },
      ],
      forbid: ['store-entity', 'entity-entity', 'store-store'],
    },
  },
  {
    id: 'cp-plat',
    title: 'Компоненты платформы',
    notation: 'UML · component',
    topic: 'structure',
    brief:
      'Клиенты: Web UI и Mobile. Оба зависят от API Gateway. За шлюзом — Auth, заказы и склад. Заказы зависят от склада и оплаты. Auth и заказы читают PostgreSQL, склад — Redis.',
    hint: 'Зависимость пунктиром, стрелка к тому, кого используют.',
    tools: ['dependency'],
    kit: [
      { kind: 'component', label: 'Web UI' },
      { kind: 'component', label: 'Mobile' },
      { kind: 'component', label: 'API Gateway' },
      { kind: 'component', label: 'Auth' },
      { kind: 'component', label: 'Сервис заказов' },
      { kind: 'component', label: 'Сервис склада' },
      { kind: 'component', label: 'Сервис оплаты' },
      { kind: 'component', label: 'PostgreSQL' },
      { kind: 'component', label: 'Redis' },
    ],
    require: {
      directed: [
        { from: 'Web UI', to: 'API Gateway', kind: 'dependency' },
        { from: 'Mobile', to: 'API Gateway', kind: 'dependency' },
        { from: 'API Gateway', to: 'Auth', kind: 'dependency' },
        { from: 'API Gateway', to: 'Сервис заказов', kind: 'dependency' },
        { from: 'API Gateway', to: 'Сервис склада', kind: 'dependency' },
        { from: 'Сервис заказов', to: 'Сервис склада', kind: 'dependency' },
        { from: 'Сервис заказов', to: 'Сервис оплаты', kind: 'dependency' },
        { from: 'Auth', to: 'PostgreSQL', kind: 'dependency' },
        { from: 'Сервис заказов', to: 'PostgreSQL', kind: 'dependency' },
        { from: 'Сервис склада', to: 'Redis', kind: 'dependency' },
      ],
    },
  },
  {
    id: 'dp-prod',
    title: 'Развёртывание контура',
    notation: 'UML · deployment',
    topic: 'structure',
    brief:
      'ПК клиента и CDN смотрят на балансировщик. Балансировщик — на два app-сервера. Они ходят в СУБД и брокер очередей. Платёжный шлюз — отдельный внешний узел от app-сервера A.',
    hint: 'Узел — железо или среда. Линия — канал связи, не поток DFD.',
    tools: ['comm'],
    kit: [
      { kind: 'device', label: 'ПК клиента' },
      { kind: 'device', label: 'CDN' },
      { kind: 'device', label: 'Балансировщик' },
      { kind: 'device', label: 'App-сервер A' },
      { kind: 'device', label: 'App-сервер B' },
      { kind: 'device', label: 'СУБД' },
      { kind: 'device', label: 'Брокер очередей' },
      { kind: 'device', label: 'Платёжный шлюз' },
    ],
    require: {
      edges: [
        { a: 'ПК клиента', b: 'CDN' },
        { a: 'ПК клиента', b: 'Балансировщик' },
        { a: 'CDN', b: 'Балансировщик' },
        { a: 'Балансировщик', b: 'App-сервер A' },
        { a: 'Балансировщик', b: 'App-сервер B' },
        { a: 'App-сервер A', b: 'СУБД' },
        { a: 'App-сервер B', b: 'СУБД' },
        { a: 'App-сервер A', b: 'Брокер очередей' },
        { a: 'App-сервер B', b: 'Брокер очередей' },
        { a: 'App-сервер A', b: 'Платёжный шлюз' },
      ],
    },
  },
  {
    id: 'sandbox',
    title: 'Свой лист',
    notation: 'Свободный чертёж',
    topic: 'uml',
    sandbox: true,
    brief:
      'Пустой лист: добавьте свои функции, прецеденты, процессы, классы. Подходит, чтобы дорисовать задание или собрать диаграмму по своему варианту курсовой.',
    hint: 'Сначала «Свой элемент» внизу палитры, затем поставьте на лист. Связи: выберите тип и при необходимости подпись.',
    tools: LINK_KINDS.map((k) => k.id),
    kit: [],
    require: {},
  },
]

export function paletteFor(mission) {
  if (!mission || mission.sandbox || !(mission.kit || []).length) return PALETTE
  const kinds = new Set(mission.kit.map((p) => p.kind))
  return PALETTE.filter((p) => kinds.has(p.kind))
}

function nodeByLabel(nodes, label) {
  return nodes.find((n) => n.label === label)
}

function linked(edges, a, b, directed = false, kind) {
  if (!a || !b) return false
  return edges.some((e) => {
    const fwd = e.from === a.id && e.to === b.id
    const back = e.from === b.id && e.to === a.id
    const dir = directed ? fwd : fwd || back
    const kindOk = !kind || e.kind === kind
    return dir && kindOk
  })
}

function flowLinked(edges, a, b, label, kind) {
  if (!a || !b) return false
  return edges.some(
    (e) =>
      e.from === a.id &&
      e.to === b.id &&
      (!label || e.label === label) &&
      (!kind || e.kind === kind),
  )
}

function kindPair(edges, nodes, pair) {
  return edges.some((e) => {
    const f = nodes.find((n) => n.id === e.from)
    const t = nodes.find((n) => n.id === e.to)
    if (!f || !t) return false
    const set = [f.kind, t.kind].sort().join('-')
    if (pair === 'entity-entity') return f.kind === 'entity' && t.kind === 'entity'
    if (pair === 'store-entity') return set === 'entity-store'
    if (pair === 'store-store') return f.kind === 'store' && t.kind === 'store'
    return false
  })
}

export function icomSide(fn, other) {
  const dx = other.x - fn.x
  const dy = other.y - fn.y
  if (Math.abs(dx) > Math.abs(dy)) return dx < 0 ? 'left' : 'right'
  return dy < 0 ? 'top' : 'bottom'
}

const RU_SIDE = {
  left: 'слева (вход)',
  top: 'сверху (управление)',
  right: 'справа (выход)',
  bottom: 'снизу (механизм)',
}

export function checkMission(mission, { nodes, edges }) {
  const notes = []
  const req = mission.require || {}

  if (mission.sandbox) {
    if (!nodes.length) notes.push({ ok: false, text: 'Лист пуст. Добавьте хотя бы один элемент.' })
    else {
      if (nodes.some((n) => n.kind === 'process')) {
        for (const n of nodes.filter((x) => x.kind === 'process')) {
          const inn = edges.some((e) => e.to === n.id)
          const out = edges.some((e) => e.from === n.id)
          if (!inn || !out) notes.push({ ok: false, text: `Процесс «${n.label}»: нужен вход и выход.` })
        }
        if (kindPair(edges, nodes, 'entity-entity')) notes.push({ ok: false, text: 'DFD: сущности не соединяют напрямую.' })
        if (kindPair(edges, nodes, 'store-entity')) notes.push({ ok: false, text: 'DFD: хранилище только с процессом.' })
        if (kindPair(edges, nodes, 'store-store')) notes.push({ ok: false, text: 'DFD: два хранилища без процесса нельзя.' })
      }
      const fns = nodes.filter((n) => n.kind === 'function')
      if (fns.length > 6) notes.push({ ok: false, text: 'IDEF0: на одном листе обычно не больше 6 функций.' })
      if (!notes.length) notes.push({ ok: true, text: 'Свой чертёж принят. Базовые правила нотации не нарушены.' })
    }
    return { pass: notes.every((n) => n.ok), notes }
  }

  const kitLeft = (mission.kit || []).filter(
    (p) => !nodes.some((n) => n.label === p.label && n.kind === p.kind),
  )
  if (kitLeft.length) {
    notes.push({ ok: false, text: `Не хватает обязательных элементов (${kitLeft.length}): ${kitLeft.map((p) => p.label).join(', ')}.` })
  }

  if (req.minFunctions && nodes.filter((n) => n.kind === 'function').length < req.minFunctions) {
    notes.push({ ok: false, text: `На декомпозиции должно быть не меньше ${req.minFunctions} функций.` })
  }

  if (req.noStores && nodes.some((n) => n.kind === 'store')) {
    notes.push({ ok: false, text: 'На контекстной DFD хранилищ быть не должно.' })
  }

  for (const edge of req.edges || []) {
    const a = nodeByLabel(nodes, edge.a)
    const b = nodeByLabel(nodes, edge.b)
    if (!linked(edges, a, b, false, edge.kind)) {
      notes.push({ ok: false, text: `Нет связи: «${edge.a}» — «${edge.b}».` })
    }
  }

  for (const edge of req.directed || []) {
    const a = nodeByLabel(nodes, edge.from)
    const b = nodeByLabel(nodes, edge.to)
    const ok = edge.label || edge.kind === 'include' || edge.kind === 'extend' || edge.kind === 'generalization' || edge.kind === 'composition' || edge.kind === 'dependency'
      ? flowLinked(edges, a, b, edge.label, edge.kind)
      : linked(edges, a, b, true, edge.kind)
    if (!ok) {
      const via = [edge.kind && `«${edge.kind}»`, edge.label && `«${edge.label}»`].filter(Boolean).join(' ')
      notes.push({ ok: false, text: `Нужно ${via || 'направление'}: «${edge.from}» → «${edge.to}».` })
    }
  }

  for (const spec of req.icom || []) {
    const fn = spec.fn ? nodeByLabel(nodes, spec.fn) : nodes.find((n) => n.kind === 'function')
    const item = nodeByLabel(nodes, spec.label)
    if (!fn || !item || !linked(edges, fn, item, false)) {
      notes.push({ ok: false, text: `«${spec.label}» должна быть связана с блоком «${spec.fn || 'функция'}».` })
      continue
    }
    const got = icomSide(fn, item)
    if (got !== spec.side) {
      notes.push({ ok: false, text: `«${spec.label}» сейчас ${RU_SIDE[got]}, нужно ${RU_SIDE[spec.side]}.` })
    }
  }

  for (const pair of req.forbid || []) {
    if (kindPair(edges, nodes, pair)) {
      if (pair === 'entity-entity') notes.push({ ok: false, text: 'Внешние сущности нельзя соединять напрямую.' })
      if (pair === 'store-entity') notes.push({ ok: false, text: 'Хранилище связывают только с процессом.' })
      if (pair === 'store-store') notes.push({ ok: false, text: 'Два хранилища без процесса нельзя.' })
    }
  }

  if (mission.notation === 'DFD') {
    for (const n of nodes.filter((x) => x.kind === 'process')) {
      const inn = edges.some((e) => e.to === n.id)
      const out = edges.some((e) => e.from === n.id)
      if (!inn || !out) notes.push({ ok: false, text: `У процесса «${n.label}» должен быть вход и выход.` })
    }
  }

  if (!notes.length) notes.push({ ok: true, text: 'Чертёж собран. Можно добавить свои элементы сверху — проверка их не запрещает.' })
  return { pass: notes.every((n) => n.ok), notes }
}
