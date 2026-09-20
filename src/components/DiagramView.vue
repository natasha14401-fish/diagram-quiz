<script setup>
const props = defineProps({
  name: { type: String, required: true },
  interactive: { type: Boolean, default: false },
  selected: { type: String, default: '' },
  revealed: { type: Boolean, default: false },
  correct: { type: String, default: '' },
})

const emit = defineEmits(['pick'])

function pick(id) {
  if (!props.interactive || props.revealed) return
  emit('pick', id)
}

function hs(id) {
  return {
    hs: true,
    on: props.selected === id,
    ok: props.revealed && props.correct === id,
    bad: props.revealed && props.selected === id && props.correct !== id,
  }
}
</script>

<template>
  <div class="frame">
    <!-- Use case -->
    <svg v-if="name === 'usecase'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма прецедентов">
      <rect x="170" y="36" width="340" height="268" rx="6" fill="none" stroke="currentColor" stroke-dasharray="6 4" />
      <text x="320" y="58" text-anchor="middle" class="tiny">Интернет-магазин</text>
      <ellipse cx="320" cy="118" rx="88" ry="28" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="320" y="123" text-anchor="middle" class="sm">Поиск товара</text>
      <ellipse cx="320" cy="186" rx="88" ry="28" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="320" y="191" text-anchor="middle" class="sm">Оформить заказ</text>
      <ellipse cx="320" cy="254" rx="88" ry="28" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="320" y="259" text-anchor="middle" class="sm">Оплатить</text>
      <circle cx="72" cy="168" r="14" fill="none" stroke="#e8b86d" />
      <path d="M72 182 v44 M72 196 l-18 16 M72 196 l18 16 M54 270 l18 -28 l18 28" fill="none" stroke="#e8b86d" />
      <text x="72" y="292" text-anchor="middle" class="sm gold">Покупатель</text>
      <line x1="90" y1="175" x2="232" y2="186" stroke="#8aa3b3" />
      <line x1="90" y1="188" x2="232" y2="186" stroke="#8aa3b3" />
      <circle cx="568" cy="254" r="14" fill="none" stroke="#e8b86d" />
      <path d="M568 268 v36 M568 280 l-16 14 M568 280 l16 14 M552 340" fill="none" stroke="#e8b86d" />
      <path d="M552 338 l16 -28 l16 28" fill="none" stroke="#e8b86d" />
      <text x="568" y="56" text-anchor="middle" class="sm gold" />
      <text x="568" y="318" text-anchor="middle" class="sm gold">Платёжка</text>
      <line x1="408" y1="254" x2="554" y2="254" stroke="#8aa3b3" />
    </svg>

    <!-- Class -->
    <svg v-else-if="name === 'class'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма классов">
      <g>
        <rect x="40" y="70" width="160" height="150" fill="#0b1c26" stroke="#3ec8d8" />
        <line x1="40" y1="108" x2="200" y2="108" stroke="#3ec8d8" />
        <line x1="40" y1="168" x2="200" y2="168" stroke="#3ec8d3" />
        <text x="120" y="96" text-anchor="middle">Клиент</text>
        <text x="52" y="132" class="sm">− id: int</text>
        <text x="52" y="152" class="sm">− имя: string</text>
        <text x="52" y="192" class="sm">+ оформить()</text>
      </g>
      <g>
        <rect x="300" y="40" width="160" height="170" fill="#0b1c26" stroke="#3ec8d8" />
        <line x1="300" y1="78" x2="460" y2="78" stroke="#3ec8d8" />
        <line x1="300" y1="148" x2="460" y2="148" stroke="#3ec8d8" />
        <text x="380" y="66" text-anchor="middle">Заказ</text>
        <text x="312" y="102" class="sm">− дата: Date</text>
        <text x="312" y="122" class="sm">− статус: string</text>
        <text x="312" y="172" class="sm">+ сумма(): money</text>
      </g>
      <g>
        <rect x="470" y="150" width="150" height="140" fill="#0b1c26" stroke="#3ec8d8" />
        <line x1="470" y1="188" x2="620" y2="188" stroke="#3ec8d8" />
        <line x1="470" y1="238" x2="620" y2="238" stroke="#3ec8d8" />
        <text x="545" y="176" text-anchor="middle">Товар</text>
        <text x="482" y="212" class="sm">− название</text>
        <text x="482" y="262" class="sm">+ цена()</text>
      </g>
      <line x1="200" y1="145" x2="300" y2="120" stroke="#e8b86d" />
      <text x="232" y="118" class="tiny gold">1</text>
      <text x="286" y="108" class="tiny gold">*</text>
      <line x1="460" y1="140" x2="490" y2="180" stroke="#e8b86d" />
      <text x="448" y="168" class="tiny gold">*</text>
      <text x="498" y="168" class="tiny gold">*</text>
    </svg>

    <!-- Sequence -->
    <svg v-else-if="name === 'sequence'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма последовательности">
      <text x="90" y="36" text-anchor="middle">Клиент</text>
      <text x="320" y="36" text-anchor="middle">Сайт</text>
      <text x="540" y="36" text-anchor="middle">Касса</text>
      <rect x="50" y="46" width="80" height="28" fill="#0b1c26" stroke="#3ec8d8" />
      <rect x="280" y="46" width="80" height="28" fill="#0b1c26" stroke="#3ec8d8" />
      <rect x="500" y="46" width="80" height="28" fill="#0b1c26" stroke="#3ec8d8" />
      <line x1="90" y1="74" x2="90" y2="320" stroke="#8aa3b3" stroke-dasharray="4 4" />
      <line x1="320" y1="74" x2="320" y2="320" stroke="#8aa3b3" stroke-dasharray="4 4" />
      <line x1="540" y1="74" x2="540" y2="320" stroke="#8aa3b3" stroke-dasharray="4 4" />
      <rect x="312" y="110" width="16" height="180" fill="#123040" stroke="#3ec8d8" />
      <line x1="90" y1="130" x2="312" y2="130" stroke="#e8b86d" marker-end="url(#ah)" />
      <text x="200" y="122" text-anchor="middle" class="sm">оплатить()</text>
      <line x1="328" y1="180" x2="540" y2="180" stroke="#3ec8d8" marker-end="url(#ah2)" />
      <text x="430" y="172" text-anchor="middle" class="sm">списать()</text>
      <line x1="540" y1="230" x2="328" y2="230" stroke="#8aa3b3" stroke-dasharray="5 3" />
      <text x="430" y="222" text-anchor="middle" class="sm">ok</text>
      <line x1="312" y1="280" x2="90" y2="280" stroke="#8aa3b3" stroke-dasharray="5 3" />
      <text x="200" y="272" text-anchor="middle" class="sm">чек</text>
      <defs>
        <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#e8b86d" />
        </marker>
        <marker id="ah2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#3ec8d8" />
        </marker>
      </defs>
    </svg>

    <!-- Activity -->
    <svg v-else-if="name === 'activity'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма деятельности">
      <circle cx="80" cy="170" r="10" fill="#e8b86d" />
      <rect x="130" y="150" width="130" height="40" rx="18" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="195" y="175" text-anchor="middle" class="sm">Проверить заказ</text>
      <polygon points="320,170 355,140 390,170 355,200" fill="#0b1c26" stroke="#e8b86d" />
      <rect x="430" y="70" width="130" height="40" rx="18" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="495" y="95" text-anchor="middle" class="sm">Оплатить</text>
      <rect x="430" y="230" width="130" height="40" rx="18" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="495" y="255" text-anchor="middle" class="sm">Отменить</text>
      <circle cx="600" cy="90" r="10" fill="none" stroke="#5dce9a" stroke-width="3" />
      <circle cx="600" cy="90" r="5" fill="#5dce9a" />
      <circle cx="600" cy="250" r="10" fill="none" stroke="#5dce9a" stroke-width="3" />
      <circle cx="600" cy="250" r="5" fill="#5dce9a" />
      <line x1="90" y1="170" x2="130" y2="170" stroke="#8aa3b3" />
      <line x1="260" y1="170" x2="320" y2="170" stroke="#8aa3b3" />
      <line x1="355" y1="140" x2="355" y2="90" stroke="#8aa3b3" />
      <line x1="355" y1="90" x2="430" y2="90" stroke="#8aa3b3" />
      <line x1="355" y1="200" x2="355" y2="250" stroke="#8aa3b3" />
      <line x1="355" y1="250" x2="430" y2="250" stroke="#8aa3b3" />
      <line x1="560" y1="90" x2="590" y2="90" stroke="#8aa3b3" />
      <line x1="560" y1="250" x2="590" y2="250" stroke="#8aa3b3" />
      <text x="372" y="78" class="tiny gold">[да]</text>
      <text x="372" y="238" class="tiny gold">[нет]</text>
    </svg>

    <!-- Component -->
    <svg v-else-if="name === 'component'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма компонентов">
      <rect x="40" y="110" width="160" height="90" fill="#0b1c26" stroke="#3ec8d8" />
      <rect x="28" y="128" width="22" height="14" fill="#071018" stroke="#3ec8d8" />
      <rect x="28" y="154" width="22" height="14" fill="#071018" stroke="#3ec8d8" />
      <text x="120" y="148" text-anchor="middle" class="sm">«component»</text>
      <text x="120" y="172" text-anchor="middle">Web UI</text>
      <circle cx="248" cy="155" r="10" fill="none" stroke="#e8b86d" />
      <path d="M258 140 a18 18 0 0 1 0 30" fill="none" stroke="#e8b86d" stroke-width="2" />
      <rect x="280" y="100" width="170" height="110" fill="#0b1c26" stroke="#3ec8d8" />
      <rect x="268" y="118" width="22" height="14" fill="#071018" stroke="#3ec8d8" />
      <rect x="268" y="148" width="22" height="14" fill="#071018" stroke="#3ec8d8" />
      <text x="365" y="142" text-anchor="middle" class="sm">«component»</text>
      <text x="365" y="168" text-anchor="middle">API заказов</text>
      <circle cx="500" cy="155" r="10" fill="none" stroke="#e8b86d" />
      <rect x="530" y="118" width="90" height="74" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="575" y="160" text-anchor="middle" class="sm">БД</text>
      <line x1="200" y1="155" x2="238" y2="155" stroke="#8aa3b3" />
      <line x1="450" y1="155" x2="490" y2="155" stroke="#8aa3b3" />
      <line x1="510" y1="155" x2="530" y2="155" stroke="#8aa3b3" />
    </svg>

    <!-- Deployment -->
    <svg v-else-if="name === 'deployment'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма развёртывания">
      <path d="M70 80 l90 -28 l150 0 l0 140 l-150 0 l-90 28 z" fill="#0b1c26" stroke="#3ec8d8" />
      <path d="M70 80 l150 0 l0 140 l-150 0 z" fill="#0e2430" stroke="#3ec8d8" />
      <text x="145" y="68" text-anchor="middle" class="sm">«device»</text>
      <text x="145" y="108" text-anchor="middle">ПК клиента</text>
      <rect x="90" y="128" width="110" height="50" fill="#071018" stroke="#e8b86d" />
      <text x="145" y="150" text-anchor="middle" class="tiny">«artifact»</text>
      <text x="145" y="168" text-anchor="middle" class="sm">browser</text>
      <path d="M360 70 l90 -28 l160 0 l0 160 l-160 0 l-90 28 z" fill="#0b1c26" stroke="#3ec8d8" />
      <path d="M360 70 l160 0 l0 160 l-160 0 z" fill="#0e2430" stroke="#3ec8d8" />
      <text x="440" y="60" text-anchor="middle" class="sm">«device»</text>
      <text x="440" y="100" text-anchor="middle">Web-сервер</text>
      <rect x="385" y="120" width="120" height="50" fill="#071018" stroke="#e8b86d" />
      <text x="445" y="142" text-anchor="middle" class="tiny">«artifact»</text>
      <text x="445" y="160" text-anchor="middle" class="sm">shop.war</text>
      <line x1="240" y1="150" x2="360" y2="140" stroke="#e8b86d" />
      <text x="300" y="132" text-anchor="middle" class="tiny gold">HTTPS</text>
    </svg>

    <!-- IDEF0 context -->
    <svg v-else-if="name === 'idef0-context'" viewBox="0 0 640 340" role="img" aria-label="Контекстная IDEF0">
      <rect x="220" y="110" width="200" height="110" fill="#0b1c26" stroke="#e8f1f5" stroke-width="2" />
      <text x="320" y="152" text-anchor="middle">Обработать</text>
      <text x="320" y="176" text-anchor="middle">заказ клиента</text>
      <text x="500" y="204" class="tiny">A0</text>
      <line x1="60" y1="165" x2="220" y2="165" stroke="#3ec8d8" marker-end="url(#i0a)" />
      <text x="70" y="154" class="sm">Заявка</text>
      <line x1="320" y1="40" x2="320" y2="110" stroke="#e8b86d" marker-end="url(#i0b)" />
      <text x="332" y="58" class="sm gold">Правила продаж</text>
      <line x1="420" y1="165" x2="580" y2="165" stroke="#5dce9a" marker-end="url(#i0c)" />
      <text x="430" y="154" class="sm ok">Подтверждённый заказ</text>
      <line x1="320" y1="280" x2="320" y2="220" stroke="#c9a0ff" marker-end="url(#i0d)" />
      <text x="332" y="268" class="sm">CRM, менеджер</text>
      <defs>
        <marker id="i0a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3ec8d8" /></marker>
        <marker id="i0b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#e8b86d" /></marker>
        <marker id="i0c" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" /></marker>
        <marker id="i0d" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#c9a0ff" /></marker>
      </defs>
    </svg>

    <!-- IDEF0 decomp -->
    <svg v-else-if="name === 'idef0-decomp'" viewBox="0 0 640 340" role="img" aria-label="Декомпозиция IDEF0 A0">
      <text x="24" y="28" class="sm">A0 · 1-й уровень</text>
      <rect x="70" y="70" width="140" height="70" fill="#0b1c26" stroke="#e8f1f5" />
      <text x="140" y="100" text-anchor="middle" class="sm">Принять заявку</text>
      <text x="196" y="132" class="tiny">A1</text>
      <rect x="250" y="150" width="140" height="70" fill="#0b1c26" stroke="#e8f1f5" />
      <text x="320" y="174" text-anchor="middle" class="sm">Проверить</text>
      <text x="320" y="194" text-anchor="middle" class="sm">наличие</text>
      <text x="376" y="212" class="tiny">A2</text>
      <rect x="430" y="70" width="140" height="70" fill="#0b1c26" stroke="#e8f1f5" />
      <text x="500" y="100" text-anchor="middle" class="sm">Оформить заказ</text>
      <text x="556" y="132" class="tiny">A3</text>
      <line x1="20" y1="105" x2="70" y2="105" stroke="#3ec8d8" />
      <line x1="210" y1="105" x2="250" y2="175" stroke="#3ec8d8" />
      <line x1="390" y1="175" x2="430" y2="105" stroke="#5dce9a" />
      <line x1="570" y1="105" x2="620" y2="105" stroke="#5dce9a" />
      <line x1="320" y1="40" x2="320" y2="150" stroke="#e8b86d" />
      <line x1="140" y1="250" x2="140" y2="140" stroke="#c9a0ff" />
    </svg>

    <!-- Node tree -->
    <svg v-else-if="name === 'idef0-tree'" viewBox="0 0 640 340" role="img" aria-label="Дерево узлов IDEF0">
      <rect x="260" y="20" width="120" height="36" fill="#0b1c26" stroke="#e8b86d" />
      <text x="320" y="43" text-anchor="middle">A0 Система</text>
      <rect x="40" y="120" width="140" height="36" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="110" y="143" text-anchor="middle" class="sm">A1 Приём</text>
      <rect x="250" y="120" width="140" height="36" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="320" y="143" text-anchor="middle" class="sm">A2 Проверка</text>
      <rect x="460" y="120" width="140" height="36" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="530" y="143" text-anchor="middle" class="sm">A3 Оформление</text>
      <rect x="20" y="230" width="90" height="32" fill="#0b1c26" stroke="#8aa3b3" />
      <text x="65" y="251" text-anchor="middle" class="sm">A11</text>
      <rect x="120" y="230" width="90" height="32" fill="#0b1c26" stroke="#8aa3b3" />
      <text x="165" y="251" text-anchor="middle" class="sm">A12</text>
      <rect x="470" y="230" width="90" height="32" fill="#0b1c26" stroke="#8aa3b3" />
      <text x="515" y="251" text-anchor="middle" class="sm">A31</text>
      <line x1="320" y1="56" x2="320" y2="90" stroke="#8aa3b3" />
      <line x1="110" y1="90" x2="530" y2="90" stroke="#8aa3b3" />
      <line x1="110" y1="90" x2="110" y2="120" stroke="#8aa3b3" />
      <line x1="320" y1="90" x2="320" y2="120" stroke="#8aa3b3" />
      <line x1="530" y1="90" x2="530" y2="120" stroke="#8aa3b3" />
      <line x1="110" y1="156" x2="110" y2="190" stroke="#8aa3b3" />
      <line x1="65" y1="190" x2="165" y2="190" stroke="#8aa3b3" />
      <line x1="65" y1="190" x2="65" y2="230" stroke="#8aa3b3" />
      <line x1="165" y1="190" x2="165" y2="230" stroke="#8aa3b3" />
      <line x1="530" y1="156" x2="530" y2="230" stroke="#8aa3b3" />
    </svg>

    <!-- DFD context -->
    <svg v-else-if="name === 'dfd-context'" viewBox="0 0 640 340" role="img" aria-label="Контекстная DFD">
      <rect x="40" y="130" width="120" height="70" fill="#0b1c26" stroke="#e8b86d" />
      <text x="100" y="170" text-anchor="middle">Клиент</text>
      <circle cx="320" cy="165" r="70" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="320" y="158" text-anchor="middle" class="sm">0</text>
      <text x="320" y="180" text-anchor="middle">Система заказов</text>
      <rect x="480" y="130" width="120" height="70" fill="#0b1c26" stroke="#e8b86d" />
      <text x="540" y="170" text-anchor="middle">Склад</text>
      <line x1="160" y1="150" x2="250" y2="150" stroke="#5dce9a" marker-end="url(#df1)" />
      <text x="205" y="140" text-anchor="middle" class="tiny">заказ</text>
      <line x1="250" y1="180" x2="160" y2="180" stroke="#5dce9a" marker-end="url(#df2)" />
      <text x="205" y="204" text-anchor="middle" class="tiny">подтверждение</text>
      <line x1="390" y1="150" x2="480" y2="150" stroke="#5dce9a" marker-end="url(#df3)" />
      <text x="435" y="140" text-anchor="middle" class="tiny">запрос остатка</text>
      <line x1="480" y1="180" x2="390" y2="180" stroke="#5dce9a" marker-end="url(#df4)" />
      <text x="435" y="204" text-anchor="middle" class="tiny">остатки</text>
      <defs>
        <marker id="df1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" /></marker>
        <marker id="df2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" /></marker>
        <marker id="df3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" /></marker>
        <marker id="df4" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" /></marker>
      </defs>
    </svg>

    <!-- DFD level 1 -->
    <svg v-else-if="name === 'dfd-level1'" viewBox="0 0 640 340" role="img" aria-label="DFD первого уровня">
      <rect x="20" y="140" width="90" height="54" fill="#0b1c26" stroke="#e8b86d" />
      <text x="65" y="172" text-anchor="middle" class="sm">Клиент</text>
      <circle cx="210" cy="100" r="46" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="210" y="96" text-anchor="middle" class="sm">1.0</text>
      <text x="210" y="114" text-anchor="middle" class="tiny">Принять</text>
      <circle cx="400" cy="100" r="46" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="400" y="96" text-anchor="middle" class="sm">2.0</text>
      <text x="400" y="114" text-anchor="middle" class="tiny">Резерв</text>
      <circle cx="320" cy="250" r="46" fill="#0b1c26" stroke="#3ec8d8" />
      <text x="320" y="246" text-anchor="middle" class="sm">3.0</text>
      <text x="320" y="264" text-anchor="middle" class="tiny">Оформить</text>
      <path d="M500 70 h110 M500 108 h110" stroke="#c9a0ff" stroke-width="2" />
      <text x="555" y="96" text-anchor="middle" class="sm">D1 Заказы</text>
      <line x1="110" y1="155" x2="168" y2="118" stroke="#5dce9a" />
      <line x1="256" y1="100" x2="354" y2="100" stroke="#5dce9a" />
      <line x1="210" y1="146" x2="290" y2="220" stroke="#5dce9a" />
      <line x1="446" y1="100" x2="500" y2="88" stroke="#5dce9a" />
      <text x="24" y="24" class="sm">Уровень 1</text>
    </svg>

    <!-- IDEF0 hotspot -->
    <svg
      v-else-if="name === 'idef0-hotspot'"
      viewBox="0 0 640 340"
      role="img"
      aria-label="Блок IDEF0: выберите стрелку"
    >
      <rect x="220" y="115" width="200" height="110" fill="#0b1c26" stroke="#e8f1f5" stroke-width="2" />
      <text x="320" y="168" text-anchor="middle">Функция</text>
      <text x="400" y="214" class="tiny">A1</text>

      <g :class="hs('left')" @click="pick('left')">
        <rect x="20" y="130" width="200" height="80" fill="transparent" />
        <line x1="50" y1="170" x2="218" y2="170" stroke="currentColor" stroke-width="3" />
        <polygon points="218,170 200,160 200,180" fill="currentColor" />
        <text x="70" y="158" class="sm">?</text>
      </g>
      <g :class="hs('top')" @click="pick('top')">
        <rect x="250" y="10" width="140" height="105" fill="transparent" />
        <line x1="320" y1="28" x2="320" y2="113" stroke="currentColor" stroke-width="3" />
        <polygon points="320,113 310,96 330,96" fill="currentColor" />
        <text x="336" y="50" class="sm">?</text>
      </g>
      <g :class="hs('right')" @click="pick('right')">
        <rect x="420" y="130" width="200" height="80" fill="transparent" />
        <line x1="422" y1="170" x2="590" y2="170" stroke="currentColor" stroke-width="3" />
        <polygon points="590,170 572,160 572,180" fill="currentColor" />
        <text x="500" y="158" class="sm">?</text>
      </g>
      <g :class="hs('bottom')" @click="pick('bottom')">
        <rect x="250" y="225" width="140" height="105" fill="transparent" />
        <line x1="320" y1="310" x2="320" y2="227" stroke="currentColor" stroke-width="3" />
        <polygon points="320,227 310,244 330,244" fill="currentColor" />
        <text x="336" y="290" class="sm">?</text>
      </g>
    </svg>

    <!-- DFD hotspot -->
    <svg
      v-else-if="name === 'dfd-hotspot'"
      viewBox="0 0 640 340"
      role="img"
      aria-label="Элементы DFD"
    >
      <g :class="hs('entity')" @click="pick('entity')">
        <rect x="40" y="120" width="120" height="80" fill="#0b1c26" stroke="currentColor" stroke-width="2" />
        <text x="100" y="166" text-anchor="middle">Клиент</text>
      </g>
      <g :class="hs('process')" @click="pick('process')">
        <circle cx="300" cy="160" r="62" fill="#0b1c26" stroke="currentColor" stroke-width="2" />
        <text x="300" y="154" text-anchor="middle" class="sm">1.0</text>
        <text x="300" y="176" text-anchor="middle" class="sm">Учёт</text>
      </g>
      <g :class="hs('store')" @click="pick('store')">
        <path d="M460 130 h140 M460 190 h140" stroke="currentColor" stroke-width="3" fill="none" />
        <rect x="460" y="130" width="140" height="60" fill="transparent" />
        <text x="530" y="166" text-anchor="middle">D1 Товары</text>
      </g>
      <line x1="160" y1="160" x2="238" y2="160" stroke="#8aa3b3" />
      <line x1="362" y1="160" x2="460" y2="160" stroke="#8aa3b3" />
    </svg>
  </div>
</template>

<style scoped>
.frame {
  background:
    linear-gradient(180deg, rgba(62, 200, 216, 0.05), transparent 40%),
    #07161f;
  border: 1px solid rgba(62, 200, 216, 0.25);
  border-radius: 14px;
  overflow: auto;
}
svg {
  display: block;
  width: 100%;
  min-width: 280px;
  height: auto;
  color: #d7e6ee;
  font-family: Manrope, system-ui, sans-serif;
  font-size: 15px;
}
text {
  fill: #e8f1f5;
}
.sm {
  font-size: 12px;
}
.tiny {
  font-size: 11px;
  fill: #8aa3b3;
}
.gold {
  fill: #e8b86d;
}
.ok {
  fill: #5dce9a;
}
.hs {
  cursor: pointer;
  color: #8aa3b3;
}
.hs:hover {
  color: #e8f1f5;
}
.hs.on {
  color: #e8b86d;
}
.hs.ok {
  color: #5dce9a;
}
.hs.bad {
  color: #e07a7a;
}
</style>
