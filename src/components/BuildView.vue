<script setup>
import { computed, ref, watch } from 'vue'
import { MISSIONS, LINK_KINDS, checkMission, icomSide, paletteFor } from '../data/missions.js'

const props = defineProps({
  missionId: { type: String, default: '' },
  exam: { type: Boolean, default: false },
})
const emit = defineEmits(['quit', 'submit'])

const currentId = ref(props.missionId || MISSIONS[0].id)
const mission = computed(() => MISSIONS.find((m) => m.id === currentId.value) || MISSIONS[0])

const svgEl = ref(null)
const nodes = ref([])
const edges = ref([])
const extras = ref([])
const tool = ref('select')
const pending = ref(null)
const linkFrom = ref(null)
const selected = ref('')
const chooser = ref(null)
const result = ref(null)
const drag = ref(null)
const customKind = ref('function')
const customLabel = ref('')
const customTag = ref('')
const customAttrs = ref('')
const customOps = ref('')
const edgeKind = ref('association')
const edgeLabel = ref('')
let nid = 1
let eid = 1
let xid = 1

watch(
  () => props.missionId,
  (id) => {
    if (id) currentId.value = id
  },
)

watch(currentId, () => reset())

const remaining = computed(() => {
  const kit = (mission.value.kit || []).filter(
    (p) => !nodes.value.some((n) => n.label === p.label && n.kind === p.kind && !n.sourceUid),
  )
  const own = extras.value.filter((p) => !nodes.value.some((n) => n.sourceUid === p.uid))
  return [...kit, ...own]
})

const selectedNode = computed(() => nodes.value.find((n) => n.id === selected.value) || null)
const activePalette = computed(() => paletteFor(mission.value))

const directedKinds = new Set(['flow', 'include', 'extend', 'dependency', 'generalization', 'composition', 'icom'])

function isDirected(kind) {
  return directedKinds.has(kind)
}

function splitLines(text, fallback) {
  const rows = String(text || '')
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean)
  return rows.length ? rows : fallback
}

function classBox(n) {
  const attrs = splitLines(n.attrs, ['− имя: строка'])
  const ops = splitLines(n.ops, ['+ метод()'])
  const row = 15
  const head = 28
  const pad = 10
  const attrH = attrs.length * row + pad
  const opH = ops.length * row + pad
  const w = 190
  const h = head + attrH + opH
  return {
    w,
    h,
    hw: w / 2,
    hh: h / 2,
    head,
    attrH,
    attrs,
    ops,
    row,
  }
}

function reset() {
  nodes.value = []
  edges.value = []
  extras.value = []
  tool.value = 'select'
  pending.value = null
  linkFrom.value = null
  selected.value = ''
  chooser.value = null
  result.value = null
  nid = 1
  eid = 1
  xid = 1
  edgeKind.value = mission.value.tools?.[0] || 'association'
  customKind.value = paletteFor(mission.value)[0]?.kind || 'function'
}

function toSvg(evt) {
  const svg = svgEl.value
  const pt = svg.createSVGPoint()
  pt.x = evt.clientX
  pt.y = evt.clientY
  return pt.matrixTransform(svg.getScreenCTM().inverse())
}

function snap(n) {
  return Math.round(n / 20) * 20
}

function pickPiece(piece) {
  pending.value = piece
  tool.value = 'place'
  linkFrom.value = null
}

function addCustom() {
  const label = customLabel.value.trim()
  if (!label) return
  extras.value.push({
    uid: 'x' + xid++,
    kind: customKind.value,
    label,
    tag: customTag.value.trim(),
    attrs:
      customKind.value === 'class'
        ? customAttrs.value.trim() || '− имя: строка'
        : customAttrs.value.trim(),
    ops:
      customKind.value === 'class' ? customOps.value.trim() || '+ метод()' : customOps.value.trim(),
  })
  customLabel.value = ''
  customTag.value = ''
  customAttrs.value = ''
  customOps.value = ''
}

function onCanvasDown(evt) {
  if (evt.target !== svgEl.value && evt.target.dataset.bg == null) return
  const p = toSvg(evt)
  if (tool.value === 'place' && pending.value) {
    nodes.value.push({
      id: 'n' + nid++,
      kind: pending.value.kind,
      label: pending.value.label,
      tag: pending.value.tag || '',
      attrs: pending.value.attrs || '',
      ops: pending.value.ops || '',
      sourceUid: pending.value.uid || '',
      x: snap(Math.min(1060, Math.max(40, p.x))),
      y: snap(Math.min(580, Math.max(40, p.y))),
    })
    pending.value = null
    tool.value = 'select'
    return
  }
  selected.value = ''
  linkFrom.value = null
}

function nodeAt(id) {
  return nodes.value.find((n) => n.id === id)
}

function onNodeDown(evt, node) {
  evt.stopPropagation()
  if (tool.value === 'link') {
    if (!linkFrom.value) {
      linkFrom.value = node.id
      selected.value = node.id
      return
    }
    if (linkFrom.value === node.id) return
    chooser.value = { from: nodeAt(linkFrom.value), to: node }
    edgeKind.value = mission.value.tools?.[0] || 'association'
    edgeLabel.value = ''
    linkFrom.value = null
    return
  }
  selected.value = node.id
  const p = toSvg(evt)
  drag.value = { id: node.id, dx: p.x - node.x, dy: p.y - node.y }
}

function onMove(evt) {
  if (!drag.value) return
  const p = toSvg(evt)
  const n = nodeAt(drag.value.id)
  if (!n) return
  n.x = snap(Math.min(1060, Math.max(40, p.x - drag.value.dx)))
  n.y = snap(Math.min(580, Math.max(40, p.y - drag.value.dy)))
}

function onUp() {
  drag.value = null
}

function addEdge(from, to, kind, label = '') {
  const directed = isDirected(kind)
  const exists = edges.value.some((e) =>
    directed
      ? e.from === from.id && e.to === to.id && e.kind === kind && e.label === label
      : ((e.from === from.id && e.to === to.id) || (e.from === to.id && e.to === from.id)) && e.kind === kind,
  )
  if (exists) return
  edges.value.push({ id: 'e' + eid++, from: from.id, to: to.id, label, kind })
  result.value = null
}

function confirmLink() {
  addEdge(chooser.value.from, chooser.value.to, edgeKind.value, edgeLabel.value.trim())
  chooser.value = null
}

function removeSelected() {
  const id = selected.value
  if (!id) return
  nodes.value = nodes.value.filter((n) => n.id !== id)
  edges.value = edges.value.filter((e) => e.from !== id && e.to !== id)
  selected.value = ''
}

function removeEdge(id) {
  edges.value = edges.value.filter((e) => e.id !== id)
}

function check() {
  result.value = checkMission(mission.value, { nodes: nodes.value, edges: edges.value })
  if (props.exam) emit('submit', result.value)
}

function startLink() {
  tool.value = 'link'
  pending.value = null
  linkFrom.value = null
}

function startSelect() {
  tool.value = 'select'
  pending.value = null
  linkFrom.value = null
}

function point(id) {
  const n = nodeAt(id)
  return n ? { x: n.x, y: n.y } : { x: 0, y: 0 }
}

function edgePath(e) {
  const a = point(e.from)
  const b = point(e.to)
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`
}

function edgeLabelPos(e) {
  const a = point(e.from)
  const b = point(e.to)
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - 10 }
}

function edgeCaption(e) {
  const stereo = e.kind === 'include' || e.kind === 'extend' ? `«${e.kind}»` : ''
  return [stereo, e.label].filter(Boolean).join(' ')
}

const usecaseFrame = computed(() => {
  const u = nodes.value.filter((n) => n.kind === 'usecase')
  if (!u.length) return null
  const xs = u.map((n) => n.x)
  const ys = u.map((n) => n.y)
  return {
    x: Math.min(...xs) - 120,
    y: Math.min(...ys) - 56,
    w: Math.max(...xs) - Math.min(...xs) + 240,
    h: Math.max(...ys) - Math.min(...ys) + 140,
  }
})

const icomHint = computed(() => {
  if (!mission.value.require?.icom?.length) return ''
  const bits = mission.value.require.icom.map((spec) => {
    const fn = nodes.value.find((n) => n.label === spec.fn)
    const item = nodes.value.find((n) => n.label === spec.label)
    if (!fn || !item) return null
    const side = { left: 'вход', top: 'управление', right: 'выход', bottom: 'механизм' }[icomSide(fn, item)]
    return `${spec.label} → ${side}`
  })
  return bits.filter(Boolean).join(' · ')
})

const allowedLinks = computed(() => {
  const ids = mission.value.tools || []
  const list = LINK_KINDS.filter((k) => ids.includes(k.id))
  return list.length ? list : LINK_KINDS
})
</script>

<template>
  <section class="build">
    <div class="bar">
      <button v-if="!exam" class="ghost" type="button" @click="emit('quit')">На выход</button>
      <select v-if="!exam" v-model="currentId" class="pick">
        <option v-for="m in MISSIONS" :key="m.id" :value="m.id">{{ m.title }}</option>
      </select>
      <p v-else class="exam-tag">Экзамен · построение</p>
    </div>

    <p class="notation">{{ mission.notation }}</p>
    <h2>{{ mission.title }}</h2>
    <p class="brief">{{ mission.brief }}</p>
    <p class="hint">{{ mission.hint }}</p>
    <p v-if="icomHint" class="hint gold">{{ icomHint }}</p>

    <div class="work">
      <aside>
        <p class="side-t">Набор задания</p>
        <button
          v-for="p in remaining"
          :key="p.uid || p.label"
          type="button"
          class="piece"
          :class="{ on: pending && (pending.uid ? pending.uid === p.uid : pending.label === p.label) }"
          @click="pickPiece(p)"
        >
          <small>{{ p.tag || p.kind }}</small>
          {{ p.label }}
        </button>
        <p v-if="!remaining.length" class="empty">Обязательные элементы на листе. Можно добавить свои.</p>

        <p class="side-t">Свой элемент</p>
        <select v-model="customKind" class="field">
          <option v-for="s in activePalette" :key="s.kind" :value="s.kind">{{ s.title }}</option>
        </select>
        <input v-model="customLabel" class="field" placeholder="Имя / функция" />
        <input v-model="customTag" class="field" placeholder="Номер: A11, 1.1, D3…" />
        <textarea
          v-if="customKind === 'class'"
          v-model="customAttrs"
          class="field"
          rows="3"
          placeholder="Каждый атрибут с новой строки:&#10;− код: целое&#10;− имя: строка"
        />
        <textarea
          v-if="customKind === 'class'"
          v-model="customOps"
          class="field"
          rows="3"
          placeholder="Каждая операция с новой строки:&#10;+ оформить(): заказ"
        />
        <button type="button" class="piece" @click="addCustom">Добавить в набор</button>

        <div v-if="selectedNode" class="insp">
          <p class="side-t">Выбранный блок</p>
          <input v-model="selectedNode.label" class="field" />
          <input v-model="selectedNode.tag" class="field" placeholder="Номер" />
          <textarea
            v-if="selectedNode.kind === 'class'"
            v-model="selectedNode.attrs"
            class="field"
            rows="3"
            placeholder="− имя: строка"
          />
          <textarea
            v-if="selectedNode.kind === 'class'"
            v-model="selectedNode.ops"
            class="field"
            rows="3"
            placeholder="+ метод()"
          />
        </div>

        <div class="tools">
          <button type="button" :class="{ on: tool === 'select' }" @click="startSelect">Перенос</button>
          <button type="button" :class="{ on: tool === 'link' }" @click="startLink">Связь</button>
          <button type="button" :disabled="!selected" @click="removeSelected">Удалить</button>
        </div>
      </aside>

      <div class="sheet" @pointermove="onMove" @pointerup="onUp" @pointerleave="onUp">
        <svg ref="svgEl" viewBox="0 0 1100 620" @pointerdown="onCanvasDown">
          <rect data-bg="1" x="0" y="0" width="1100" height="620" fill="transparent" />
          <rect
            v-if="usecaseFrame"
            :x="usecaseFrame.x"
            :y="usecaseFrame.y"
            :width="usecaseFrame.w"
            :height="usecaseFrame.h"
            fill="none"
            stroke="#3ec8d8"
            stroke-dasharray="7 5"
            rx="8"
            pointer-events="none"
          />
          <text v-if="usecaseFrame" :x="usecaseFrame.x + 12" :y="usecaseFrame.y + 18" class="cap">Система</text>
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#5dce9a" />
            </marker>
          </defs>
          <g v-for="e in edges" :key="e.id" class="edge" @click="removeEdge(e.id)">
            <path
              :d="edgePath(e)"
              fill="none"
              stroke="#5dce9a"
              stroke-width="2"
              :stroke-dasharray="['include', 'extend', 'dependency'].includes(e.kind) ? '7 4' : '0'"
              :marker-end="isDirected(e.kind) ? 'url(#arr)' : ''"
            />
            <text v-if="edgeCaption(e)" :x="edgeLabelPos(e).x" :y="edgeLabelPos(e).y" text-anchor="middle">
              {{ edgeCaption(e) }}
            </text>
          </g>
          <g
            v-for="n in nodes"
            :key="n.id"
            class="node"
            :class="{ sel: selected === n.id, from: linkFrom === n.id }"
            :transform="`translate(${n.x},${n.y})`"
            @pointerdown="onNodeDown($event, n)"
          >
            <template v-if="n.kind === 'actor'">
              <circle cy="-28" r="12" />
              <path class="line" d="M0 -16 v28 M0 0 l-16 14 M0 0 l16 14 M-14 44 l14 -32 l14 32" />
              <text y="58" text-anchor="middle">{{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'usecase'">
              <ellipse rx="78" ry="26" />
              <text text-anchor="middle" dy="4">{{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'class'">
              <rect
                :x="-classBox(n).hw"
                :y="-classBox(n).hh"
                :width="classBox(n).w"
                :height="classBox(n).h"
              />
              <line
                :x1="-classBox(n).hw"
                :y1="-classBox(n).hh + classBox(n).head"
                :x2="classBox(n).hw"
                :y2="-classBox(n).hh + classBox(n).head"
              />
              <line
                :x1="-classBox(n).hw"
                :y1="-classBox(n).hh + classBox(n).head + classBox(n).attrH"
                :x2="classBox(n).hw"
                :y2="-classBox(n).hh + classBox(n).head + classBox(n).attrH"
              />
              <text :y="-classBox(n).hh + 18" text-anchor="middle">{{ n.label }}</text>
              <text
                v-for="(line, i) in classBox(n).attrs"
                :key="'a' + i"
                class="tiny"
                :x="-classBox(n).hw + 10"
                :y="-classBox(n).hh + classBox(n).head + 14 + i * classBox(n).row"
              >
                {{ line }}
              </text>
              <text
                v-for="(line, i) in classBox(n).ops"
                :key="'o' + i"
                class="tiny"
                :x="-classBox(n).hw + 10"
                :y="-classBox(n).hh + classBox(n).head + classBox(n).attrH + 14 + i * classBox(n).row"
              >
                {{ line }}
              </text>
            </template>
            <template v-else-if="n.kind === 'object'">
              <rect x="-70" y="-28" width="140" height="56" />
              <text class="tiny" dy="-6" text-anchor="middle">lifeline</text>
              <text dy="14" text-anchor="middle">{{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'action'">
              <rect x="-70" y="-22" width="140" height="44" rx="18" />
              <text dy="4" text-anchor="middle">{{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'decision'">
              <polygon points="0,-28 40,0 0,28 -40,0" />
              <text y="44" text-anchor="middle">{{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'function'">
              <rect x="-88" y="-44" width="176" height="88" />
              <text text-anchor="middle" dy="-4">{{ n.label }}</text>
              <text class="tiny" x="64" y="34">{{ n.tag }}</text>
            </template>
            <template v-else-if="n.kind === 'icom'">
              <rect x="-84" y="-20" width="168" height="40" rx="4" />
              <text text-anchor="middle" dy="4">{{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'process'">
              <rect x="-68" y="-36" width="136" height="72" rx="14" />
              <text class="tiny" dy="-8" text-anchor="middle">{{ n.tag }}</text>
              <text dy="12" text-anchor="middle">{{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'entity'">
              <rect x="-68" y="-36" width="136" height="72" />
              <text text-anchor="middle" dy="4">{{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'store'">
              <rect x="-78" y="-24" width="156" height="48" class="store-fill" />
              <rect x="-78" y="-24" width="12" height="48" class="store-bar" />
              <path class="line" d="M-78 -24 h156 M-78 24 h156 M-78 -24 v48" />
              <text text-anchor="middle" dy="4">{{ n.tag }} {{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'component'">
              <rect x="-78" y="-44" width="156" height="88" />
              <rect x="-90" y="-24" width="22" height="14" />
              <rect x="-90" y="4" width="22" height="14" />
              <text class="tiny" dy="-8" text-anchor="middle">component</text>
              <text dy="14" text-anchor="middle">{{ n.label }}</text>
            </template>
            <template v-else-if="n.kind === 'device'">
              <rect x="-82" y="-40" width="150" height="80" />
              <path class="line" d="M68 -40 l16 -12 v80 l-16 12" />
              <path class="line" d="M-82 -40 l16 -12 h150 l-16 12" />
              <text class="tiny" dy="-8" text-anchor="middle">device</text>
              <text dy="14" text-anchor="middle">{{ n.label }}</text>
            </template>
          </g>
        </svg>
        <p class="status">
          <template v-if="tool === 'place'">Клик по листу — поставить «{{ pending?.label }}».</template>
          <template v-else-if="tool === 'link' && !linkFrom">Связь: сначала источник, затем приёмник. Для include источник — базовый прецедент.</template>
          <template v-else-if="tool === 'link'">Кликните второй элемент. Клик по линии удаляет связь.</template>
          <template v-else>Тяните блоки. Свои функции — в палитре слева. На задании можно добавить лишнее.</template>
        </p>
      </div>
    </div>

    <div v-if="chooser" class="modal">
      <div class="card">
        <p>Связь «{{ chooser.from.label }}» → «{{ chooser.to.label }}»</p>
        <select v-model="edgeKind" class="field">
          <option v-for="k in allowedLinks" :key="k.id" :value="k.id">{{ k.title }}</option>
        </select>
        <div v-if="mission.flows" class="chips">
          <button v-for="f in mission.flows" :key="f" type="button" @click="edgeLabel = f">{{ f }}</button>
        </div>
        <input v-model="edgeLabel" class="field" placeholder="Подпись: поток, 1..*, сообщение…" />
        <button type="button" class="go" @click="confirmLink">Поставить связь</button>
        <button type="button" class="ghost" @click="chooser = null">Отмена</button>
      </div>
    </div>

    <div v-if="result" class="notes" :class="{ pass: result.pass }">
      <p v-for="(n, i) in result.notes" :key="i">{{ n.text }}</p>
    </div>

    <div class="acts">
      <button class="go" type="button" @click="check">{{ exam ? 'Сдать чертёж' : 'Проверить чертёж' }}</button>
      <button class="ghost" type="button" @click="reset">Очистить лист</button>
    </div>
  </section>
</template>

<style scoped>
.build {
  display: grid;
  gap: 10px;
}
.bar {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
.pick,
.ghost,
.piece,
.tools button,
.go,
.modal button,
.field {
  font: inherit;
}
.pick,
.field {
  width: 100%;
  background: #0e202a;
  color: inherit;
  border: 1px solid rgba(62, 200, 216, 0.3);
  border-radius: 10px;
  padding: 8px 10px;
}
.bar .pick {
  flex: 1;
}
.exam-tag {
  margin: 0;
  color: #e8b86d;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
}
.ghost {
  background: transparent;
  color: #8aa3b3;
  border: 1px solid rgba(138, 163, 179, 0.3);
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
}
.notation {
  margin: 0;
  letter-spacing: 0.14em;
  font-size: 11px;
  color: #e8b86d;
  text-transform: uppercase;
}
h2 {
  margin: 0;
  font-family: Unbounded, sans-serif;
  font-size: clamp(22px, 4vw, 30px);
}
.brief,
.hint {
  margin: 0;
  color: #9fb3c0;
}
.hint {
  font-size: 14px;
}
.gold {
  color: #e8b86d;
}
.work {
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 12px;
  min-height: 480px;
}
aside {
  display: grid;
  align-content: start;
  gap: 8px;
  max-height: 640px;
  overflow: auto;
}
.side-t {
  margin: 8px 0 0;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8aa3b3;
}
.piece,
.tools button {
  text-align: left;
  background: #071018;
  color: inherit;
  border: 1px solid rgba(62, 200, 216, 0.22);
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
}
.piece small {
  display: block;
  color: #3ec8d8;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.piece.on,
.tools button.on {
  border-color: #e8b86d;
  color: #e8b86d;
}
.tools,
.insp {
  display: grid;
  gap: 6px;
}
.empty {
  color: #8aa3b3;
  font-size: 13px;
}
.sheet {
  background: #07161f;
  border: 1px solid rgba(62, 200, 216, 0.25);
  border-radius: 14px;
  overflow: hidden;
}
svg {
  display: block;
  width: 100%;
  height: auto;
  cursor: crosshair;
  touch-action: none;
}
.node {
  cursor: grab;
}
.node circle,
.node ellipse,
.node rect,
.node path,
.node polygon {
  fill: #0b1c26;
  stroke: #3ec8d8;
  stroke-width: 1.6;
}
.node path.line {
  fill: none;
}
.node rect.store-fill {
  fill: #0b1c26;
  stroke: none;
}
.node rect.store-bar {
  fill: #c9a0ff;
  stroke: none;
}
.node text {
  fill: #e8f1f5;
  font-size: 11px;
  font-family: Manrope, sans-serif;
}
.node .tiny,
.cap {
  font-size: 10px;
  fill: #8aa3b3;
}
.node.sel circle,
.node.sel ellipse,
.node.sel rect,
.node.sel path,
.node.sel polygon,
.node.from circle,
.node.from ellipse,
.node.from rect,
.node.from polygon {
  stroke: #e8b86d;
}
.edge {
  cursor: pointer;
}
.edge text {
  fill: #5dce9a;
  font-size: 11px;
}
.status {
  margin: 0;
  padding: 8px 12px 12px;
  color: #8aa3b3;
  font-size: 13px;
}
.acts {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.go {
  background: #3ec8d8;
  color: #071018;
  border: 0;
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 700;
  cursor: pointer;
}
.notes {
  background: rgba(224, 122, 122, 0.1);
  border-radius: 12px;
  padding: 12px 14px;
}
.notes.pass {
  background: rgba(93, 206, 154, 0.12);
}
.notes p {
  margin: 0 0 6px;
}
.modal {
  position: fixed;
  inset: 0;
  background: rgba(7, 16, 24, 0.72);
  display: grid;
  place-items: center;
  z-index: 20;
}
.modal .card {
  background: #0e202a;
  border: 1px solid rgba(62, 200, 216, 0.3);
  border-radius: 16px;
  padding: 18px;
  display: grid;
  gap: 8px;
  min-width: min(420px, 92vw);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chips button {
  background: #071018;
  color: inherit;
  border: 1px solid rgba(62, 200, 216, 0.3);
  border-radius: 999px;
  padding: 4px 10px;
  cursor: pointer;
}
@media (max-width: 800px) {
  .work {
    grid-template-columns: 1fr;
  }
}
</style>
