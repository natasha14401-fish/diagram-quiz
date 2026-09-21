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
      <rect x="168" y="28" width="304" height="292" rx="6" fill="none" stroke="currentColor" stroke-dasharray="6 4" />
      <text x="320" y="50" text-anchor="middle" class="tiny">Интернет-магазин</text>
      <ellipse cx="320" cy="102" rx="90" ry="26" fill="#ffffff" stroke="#3ec8d8" />
      <text x="320" y="107" text-anchor="middle" class="sm">Поиск товара</text>
      <ellipse cx="320" cy="170" rx="90" ry="26" fill="#ffffff" stroke="#3ec8d8" />
      <text x="320" y="175" text-anchor="middle" class="sm">Оформить заказ</text>
      <ellipse cx="320" cy="238" rx="90" ry="26" fill="#ffffff" stroke="#3ec8d8" />
      <text x="320" y="243" text-anchor="middle" class="sm">Оплатить</text>

      <g fill="none" stroke="#e8b86d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="72" cy="138" r="13" />
        <path d="M72 151 v49 M54 168 h36 M72 200 l-16 34 M72 200 l16 34" />
      </g>
      <text x="72" y="252" text-anchor="middle" class="sm gold">Покупатель</text>
      <line x1="90" y1="148" x2="230" y2="102" stroke="#8aa3b3" />
      <line x1="90" y1="170" x2="230" y2="170" stroke="#8aa3b3" />
      <line x1="90" y1="192" x2="230" y2="238" stroke="#8aa3b3" />

      <g fill="none" stroke="#e8b86d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="548" cy="200" r="13" />
        <path d="M548 213 v45 M530 222 h36 M548 258 l-16 32 M548 258 l16 32" />
      </g>
      <text x="548" y="324" text-anchor="middle" class="sm gold">Платёжная система</text>
      <line x1="410" y1="238" x2="522" y2="238" stroke="#8aa3b3" />
    </svg>

    <!-- Class -->
    <svg v-else-if="name === 'class'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма классов">
      <g>
        <rect x="30" y="70" width="170" height="168" fill="#ffffff" stroke="#3ec8d8" />
        <line x1="30" y1="104" x2="200" y2="104" stroke="#3ec8d8" />
        <line x1="30" y1="168" x2="200" y2="168" stroke="#3ec8d8" />
        <text x="115" y="94" text-anchor="middle">Клиент</text>
        <text x="42" y="126" class="sm">− код: целое</text>
        <text x="42" y="146" class="sm">− имя: строка</text>
        <text x="42" y="192" class="sm">+ оформить(): заказ</text>
      </g>
      <g>
        <rect x="235" y="70" width="170" height="168" fill="#ffffff" stroke="#3ec8d8" />
        <line x1="235" y1="104" x2="405" y2="104" stroke="#3ec8d8" />
        <line x1="235" y1="168" x2="405" y2="168" stroke="#3ec8d8" />
        <text x="320" y="94" text-anchor="middle">Заказ</text>
        <text x="247" y="126" class="sm">− дата: дата</text>
        <text x="247" y="146" class="sm">− статус: строка</text>
        <text x="247" y="192" class="sm">+ сумма(): деньги</text>
      </g>
      <g>
        <rect x="440" y="70" width="170" height="168" fill="#ffffff" stroke="#3ec8d8" />
        <line x1="440" y1="104" x2="610" y2="104" stroke="#3ec8d8" />
        <line x1="440" y1="168" x2="610" y2="168" stroke="#3ec8d8" />
        <text x="525" y="94" text-anchor="middle">Товар</text>
        <text x="452" y="126" class="sm">− название: строка</text>
        <text x="452" y="146" class="sm">− цена: деньги</text>
        <text x="452" y="192" class="sm">+ цена(): деньги</text>
      </g>
      <line x1="200" y1="154" x2="235" y2="154" stroke="#e8b86d" />
      <text x="206" y="146" class="tiny gold">1</text>
      <text x="220" y="168" class="tiny gold">*</text>
      <line x1="405" y1="154" x2="440" y2="154" stroke="#e8b86d" />
      <text x="412" y="146" class="tiny gold">*</text>
      <text x="426" y="168" class="tiny gold">*</text>
    </svg>

    <!-- Sequence -->
    <svg v-else-if="name === 'sequence'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма последовательности">
      <text x="90" y="36" text-anchor="middle">Клиент</text>
      <text x="320" y="36" text-anchor="middle">Сайт</text>
      <text x="540" y="36" text-anchor="middle">Касса</text>
      <rect x="50" y="46" width="80" height="28" fill="#ffffff" stroke="#3ec8d8" />
      <rect x="280" y="46" width="80" height="28" fill="#ffffff" stroke="#3ec8d8" />
      <rect x="500" y="46" width="80" height="28" fill="#ffffff" stroke="#3ec8d8" />
      <line x1="90" y1="74" x2="90" y2="320" stroke="#8aa3b3" stroke-dasharray="4 4" />
      <line x1="320" y1="74" x2="320" y2="320" stroke="#8aa3b3" stroke-dasharray="4 4" />
      <line x1="540" y1="74" x2="540" y2="320" stroke="#8aa3b3" stroke-dasharray="4 4" />
      <rect x="312" y="110" width="16" height="180" fill="#d7e6ee" stroke="#3ec8d8" />
      <line x1="90" y1="130" x2="312" y2="130" stroke="#e8b86d" marker-end="url(#ah)" />
      <text x="200" y="122" text-anchor="middle" class="sm">оплатить()</text>
      <line x1="328" y1="180" x2="540" y2="180" stroke="#3ec8d8" marker-end="url(#ah2)" />
      <text x="430" y="172" text-anchor="middle" class="sm">списать()</text>
      <line x1="540" y1="230" x2="328" y2="230" stroke="#8aa3b3" stroke-dasharray="5 3" marker-end="url(#ret)" />
      <text x="430" y="222" text-anchor="middle" class="sm">подтверждение оплаты</text>
      <line x1="312" y1="280" x2="90" y2="280" stroke="#8aa3b3" stroke-dasharray="5 3" marker-end="url(#ret)" />
      <text x="200" y="272" text-anchor="middle" class="sm">чек</text>
      <defs>
        <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#e8b86d" />
        </marker>
        <marker id="ah2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#3ec8d8" />
        </marker>
        <marker id="ret" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9" fill="none" stroke="#8aa3b3" stroke-width="1.4" />
        </marker>
      </defs>
    </svg>

    <!-- Activity -->
    <svg v-else-if="name === 'activity'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма деятельности">
      <circle cx="36" cy="170" r="10" fill="#e8b86d" />
      <rect x="58" y="150" width="118" height="40" rx="18" fill="#ffffff" stroke="#3ec8d8" />
      <text x="117" y="175" text-anchor="middle" class="sm">Получить заказ</text>
      <rect x="196" y="150" width="118" height="40" rx="18" fill="#ffffff" stroke="#3ec8d8" />
      <text x="255" y="175" text-anchor="middle" class="sm">Проверить заказ</text>
      <polygon points="348,170 400,128 452,170 400,212" fill="#ffffff" stroke="#e8b86d" />
      <text x="400" y="166" text-anchor="middle" class="sm gold">оплата</text>
      <text x="400" y="182" text-anchor="middle" class="sm gold">прошла?</text>
      <rect x="480" y="58" width="118" height="40" rx="18" fill="#ffffff" stroke="#3ec8d8" />
      <text x="539" y="83" text-anchor="middle" class="sm">Оформить оплату</text>
      <rect x="480" y="112" width="118" height="40" rx="18" fill="#ffffff" stroke="#3ec8d8" />
      <text x="539" y="137" text-anchor="middle" class="sm">Уведомить</text>
      <rect x="480" y="228" width="118" height="40" rx="18" fill="#ffffff" stroke="#3ec8d8" />
      <text x="539" y="253" text-anchor="middle" class="sm">Отменить заказ</text>
      <rect x="480" y="282" width="118" height="40" rx="18" fill="#ffffff" stroke="#3ec8d8" />
      <text x="539" y="307" text-anchor="middle" class="sm">Уведомить</text>
      <circle cx="628" cy="132" r="10" fill="none" stroke="#5dce9a" stroke-width="3" />
      <circle cx="628" cy="132" r="5" fill="#5dce9a" />
      <circle cx="628" cy="302" r="10" fill="none" stroke="#5dce9a" stroke-width="3" />
      <circle cx="628" cy="302" r="5" fill="#5dce9a" />
      <line x1="46" y1="170" x2="58" y2="170" stroke="#8aa3b3" />
      <line x1="176" y1="170" x2="196" y2="170" stroke="#8aa3b3" />
      <line x1="314" y1="170" x2="348" y2="170" stroke="#8aa3b3" />
      <line x1="400" y1="128" x2="400" y2="78" stroke="#8aa3b3" />
      <line x1="400" y1="78" x2="480" y2="78" stroke="#8aa3b3" />
      <line x1="400" y1="212" x2="400" y2="248" stroke="#8aa3b3" />
      <line x1="400" y1="248" x2="480" y2="248" stroke="#8aa3b3" />
      <line x1="539" y1="98" x2="539" y2="112" stroke="#8aa3b3" />
      <line x1="539" y1="268" x2="539" y2="282" stroke="#8aa3b3" />
      <line x1="598" y1="132" x2="618" y2="132" stroke="#8aa3b3" />
      <line x1="598" y1="302" x2="618" y2="302" stroke="#8aa3b3" />
      <text x="408" y="70" class="tiny gold">[да]</text>
      <text x="408" y="240" class="tiny gold">[нет]</text>
    </svg>

    <!-- Component -->
    <svg v-else-if="name === 'component'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма компонентов">
      <rect x="40" y="110" width="160" height="90" fill="#ffffff" stroke="#3ec8d8" />
      <rect x="28" y="128" width="22" height="14" fill="#e8eef2" stroke="#3ec8d8" />
      <rect x="28" y="154" width="22" height="14" fill="#e8eef2" stroke="#3ec8d8" />
      <text x="120" y="148" text-anchor="middle" class="sm">«компонент»</text>
      <text x="120" y="172" text-anchor="middle">Веб-интерфейс</text>
      <circle cx="248" cy="155" r="10" fill="none" stroke="#e8b86d" />
      <path d="M258 140 a18 18 0 0 1 0 30" fill="none" stroke="#e8b86d" stroke-width="2" />
      <rect x="280" y="100" width="170" height="110" fill="#ffffff" stroke="#3ec8d8" />
      <rect x="268" y="118" width="22" height="14" fill="#e8eef2" stroke="#3ec8d8" />
      <rect x="268" y="148" width="22" height="14" fill="#e8eef2" stroke="#3ec8d8" />
      <text x="365" y="142" text-anchor="middle" class="sm">«компонент»</text>
      <text x="365" y="168" text-anchor="middle">API заказов</text>
      <circle cx="500" cy="155" r="10" fill="none" stroke="#e8b86d" />
      <rect x="530" y="118" width="90" height="74" fill="#ffffff" stroke="#3ec8d8" />
      <text x="575" y="160" text-anchor="middle" class="sm">БД</text>
      <line x1="200" y1="155" x2="238" y2="155" stroke="#8aa3b3" />
      <line x1="450" y1="155" x2="490" y2="155" stroke="#8aa3b3" />
      <line x1="510" y1="155" x2="530" y2="155" stroke="#8aa3b3" />
    </svg>

    <!-- Deployment -->
    <svg v-else-if="name === 'deployment'" viewBox="0 0 640 340" role="img" aria-label="Диаграмма развёртывания">
      <!-- левый узел: x=48 y=96 w=188 h=152 d=32 -->
      <path d="M236 96 L268 64 L268 216 L236 248 Z" fill="#e8eef2" stroke="#3ec8d8" />
      <path d="M48 96 L80 64 L268 64 L236 96 Z" fill="#f3f7fa" stroke="#3ec8d8" />
      <rect x="48" y="96" width="188" height="152" fill="#ffffff" stroke="#3ec8d8" />
      <text x="142" y="122" text-anchor="middle" class="sm">«устройство»</text>
      <text x="142" y="146" text-anchor="middle">ПК клиента</text>
      <rect x="72" y="164" width="140" height="56" fill="#e8eef2" stroke="#e8b86d" />
      <text x="142" y="186" text-anchor="middle" class="tiny">«артефакт»</text>
      <text x="142" y="206" text-anchor="middle" class="sm">браузер</text>
      <!-- правый узел: x=368 y=96 w=188 h=152 d=32 -->
      <path d="M556 96 L588 64 L588 216 L556 248 Z" fill="#e8eef2" stroke="#3ec8d8" />
      <path d="M368 96 L400 64 L588 64 L556 96 Z" fill="#f3f7fa" stroke="#3ec8d8" />
      <rect x="368" y="96" width="188" height="152" fill="#ffffff" stroke="#3ec8d8" />
      <text x="462" y="122" text-anchor="middle" class="sm">«устройство»</text>
      <text x="462" y="146" text-anchor="middle">Веб-сервер</text>
      <rect x="392" y="164" width="140" height="56" fill="#e8eef2" stroke="#e8b86d" />
      <text x="462" y="186" text-anchor="middle" class="tiny">«артефакт»</text>
      <text x="462" y="206" text-anchor="middle" class="sm">веб-приложение</text>
      <line x1="236" y1="172" x2="368" y2="172" stroke="#e8b86d" stroke-width="1.8" />
      <text x="302" y="162" text-anchor="middle" class="tiny gold">HTTPS</text>
    </svg>

    <!-- IDEF0 context -->
    <svg v-else-if="name === 'idef0-context'" viewBox="0 0 640 340" role="img" aria-label="Контекстная IDEF0">
      <rect x="220" y="110" width="200" height="110" fill="#ffffff" stroke="#1b2d36" stroke-width="2" />
      <text x="320" y="152" text-anchor="middle">Обработать</text>
      <text x="320" y="176" text-anchor="middle">заказ клиента</text>
      <text x="392" y="208" class="tiny">A0</text>
      <line x1="60" y1="165" x2="220" y2="165" stroke="#3ec8d8" marker-end="url(#i0a)" />
      <text x="70" y="154" class="sm">Заявка</text>
      <line x1="320" y1="40" x2="320" y2="110" stroke="#e8b86d" marker-end="url(#i0b)" />
      <text x="332" y="58" class="sm gold">Правила продаж</text>
      <line x1="420" y1="165" x2="580" y2="165" stroke="#5dce9a" marker-end="url(#i0c)" />
      <text x="430" y="154" class="sm ok">Подтверждённый заказ</text>
      <line x1="270" y1="300" x2="270" y2="220" stroke="#c9a0ff" marker-end="url(#i0d)" />
      <text x="248" y="318" class="sm">CRM</text>
      <line x1="370" y1="300" x2="370" y2="220" stroke="#c9a0ff" marker-end="url(#i0d)" />
      <text x="348" y="318" class="sm">Менеджер</text>
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
      <rect x="70" y="70" width="140" height="70" fill="#ffffff" stroke="#1b2d36" />
      <text x="140" y="100" text-anchor="middle" class="sm">Принять заявку</text>
      <text x="196" y="132" class="tiny">A1</text>
      <rect x="250" y="150" width="140" height="70" fill="#ffffff" stroke="#1b2d36" />
      <text x="320" y="174" text-anchor="middle" class="sm">Проверить</text>
      <text x="320" y="194" text-anchor="middle" class="sm">наличие</text>
      <text x="376" y="212" class="tiny">A2</text>
      <rect x="430" y="70" width="140" height="70" fill="#ffffff" stroke="#1b2d36" />
      <text x="500" y="100" text-anchor="middle" class="sm">Оформить заказ</text>
      <text x="556" y="132" class="tiny">A3</text>
      <line x1="20" y1="105" x2="70" y2="105" stroke="#3ec8d8" />
      <line x1="210" y1="105" x2="250" y2="175" stroke="#3ec8d8" />
      <line x1="390" y1="175" x2="430" y2="105" stroke="#5dce9a" />
      <line x1="570" y1="105" x2="620" y2="105" stroke="#5dce9a" />
      <line x1="320" y1="40" x2="320" y2="150" stroke="#e8b86d" />
      <line x1="140" y1="250" x2="140" y2="140" stroke="#c9a0ff" />
    </svg>

    <!-- DFD context -->
    <svg v-else-if="name === 'dfd-context'" viewBox="0 0 640 340" role="img" aria-label="Контекстная DFD">
      <rect x="40" y="130" width="120" height="70" fill="#ffffff" stroke="#e8b86d" />
      <text x="100" y="170" text-anchor="middle">Клиент</text>
      <rect x="230" y="110" width="180" height="110" rx="16" fill="#ffffff" stroke="#3ec8d8" />
      <text x="320" y="154" text-anchor="middle" class="sm">0</text>
      <text x="320" y="178" text-anchor="middle">Система заказов</text>
      <rect x="480" y="130" width="120" height="70" fill="#ffffff" stroke="#e8b86d" />
      <text x="540" y="170" text-anchor="middle">Склад</text>
      <line x1="160" y1="150" x2="230" y2="150" stroke="#5dce9a" marker-end="url(#df1)" />
      <text x="195" y="140" text-anchor="middle" class="tiny">заказ</text>
      <line x1="230" y1="180" x2="160" y2="180" stroke="#5dce9a" marker-end="url(#df2)" />
      <text x="195" y="204" text-anchor="middle" class="tiny">подтверждение</text>
      <line x1="410" y1="150" x2="480" y2="150" stroke="#5dce9a" marker-end="url(#df3)" />
      <text x="445" y="140" text-anchor="middle" class="tiny">запрос остатка</text>
      <line x1="480" y1="180" x2="410" y2="180" stroke="#5dce9a" marker-end="url(#df4)" />
      <text x="445" y="204" text-anchor="middle" class="tiny">остатки</text>
      <defs>
        <marker id="df1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" /></marker>
        <marker id="df2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" /></marker>
        <marker id="df3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" /></marker>
        <marker id="df4" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" /></marker>
      </defs>
    </svg>

    <!-- IDEF0 hotspot -->
    <svg
      v-else-if="name === 'idef0-hotspot'"
      viewBox="0 0 640 340"
      role="img"
      aria-label="Блок IDEF0: выберите стрелку"
    >
      <rect x="220" y="115" width="200" height="110" fill="#ffffff" stroke="#1b2d36" stroke-width="2" />
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
        <rect x="40" y="120" width="120" height="80" fill="#ffffff" stroke="currentColor" stroke-width="2" />
        <text x="100" y="166" text-anchor="middle">Клиент</text>
      </g>
      <g :class="hs('process')" @click="pick('process')">
        <rect x="230" y="112" width="140" height="96" rx="16" fill="#ffffff" stroke="currentColor" stroke-width="2" />
        <text x="300" y="154" text-anchor="middle" class="sm">1.0</text>
        <text x="300" y="176" text-anchor="middle" class="sm">Учёт</text>
      </g>
      <g :class="hs('store')" @click="pick('store')">
        <rect x="460" y="130" width="140" height="60" fill="#ffffff" />
        <rect x="460" y="130" width="12" height="60" fill="currentColor" />
        <path d="M460 130 h140 M460 190 h140 M460 130 v60" fill="none" stroke="currentColor" stroke-width="2" />
        <rect x="460" y="130" width="140" height="60" fill="transparent" />
        <text x="540" y="166" text-anchor="middle">D1 Товары</text>
      </g>
      <line x1="160" y1="160" x2="230" y2="160" stroke="#8aa3b3" />
      <line x1="370" y1="160" x2="460" y2="160" stroke="#8aa3b3" />
    </svg>
  </div>
</template>

<style scoped>
.frame {
  background:
    linear-gradient(180deg, rgba(14, 142, 160, 0.06), transparent 40%),
    var(--sheet);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow);
  border-radius: 14px;
  overflow: auto;
}
svg {
  display: block;
  width: 100%;
  min-width: 280px;
  height: auto;
  color: var(--ink);
  font-family: Manrope, system-ui, sans-serif;
  font-size: 15px;
}
text {
  fill: var(--ink);
}
.sm {
  font-size: 12px;
}
.tiny {
  font-size: 11px;
  fill: var(--muted);
}
.gold {
  fill: var(--gold);
}
.ok {
  fill: var(--ok);
}
.hs {
  cursor: pointer;
  color: var(--muted);
}
.hs:hover {
  color: var(--ink);
}
.hs.on {
  color: var(--gold);
}
.hs.ok {
  color: var(--ok);
}
.hs.bad {
  color: var(--rose);
}
</style>
