<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import DiagramView from './DiagramView.vue'
import BuildView from './BuildView.vue'

const props = defineProps({
  session: { type: Object, required: true },
})
const emit = defineEmits(['quit', 'finish'])

const index = ref(0)
const chosen = ref('')
const locked = ref(false)
const answers = ref([])
const now = ref(Date.now())
const done = ref(false)
const buildNotes = ref([])
let timer

const question = computed(() => props.session.questions[index.value])
const total = computed(() => props.session.questions.length)
const isHotspot = computed(() => question.value.type === 'hotspot')
const isBuild = computed(() => question.value.type === 'build')
const remain = computed(() => {
  if (!props.session.limitMs) return null
  return Math.max(0, props.session.startedAt + props.session.limitMs - now.value)
})
const remainLabel = computed(() => {
  if (remain.value === null) return ''
  const s = Math.ceil(remain.value / 1000)
  const m = Math.floor(s / 60)
  const r = String(s % 60).padStart(2, '0')
  return `${m}:${r}`
})
const ok = computed(() =>
  isBuild.value ? chosen.value === 'ok' : chosen.value === question.value.correct,
)
const last = computed(() => index.value === total.value - 1)

function pick(id) {
  if (locked.value) return
  chosen.value = id
  if (isHotspot.value) submit()
}

function submit() {
  if (!chosen.value || locked.value) return
  locked.value = true
  answers.value.push({
    id: question.value.id,
    topic: question.value.topic,
    type: question.value.type,
    correct: question.value.correct,
    chosen: chosen.value,
    ok: chosen.value === question.value.correct,
    prompt: question.value.prompt,
  })
}

function submitBuild(payload) {
  if (locked.value) return
  locked.value = true
  chosen.value = payload.pass ? 'ok' : 'fail'
  buildNotes.value = (payload.notes || []).filter((n) => !n.ok).map((n) => n.text)
  answers.value.push({
    id: question.value.id,
    topic: question.value.topic,
    type: 'build',
    correct: 'ok',
    chosen: chosen.value,
    ok: Boolean(payload.pass),
    prompt: question.value.prompt,
    notes: buildNotes.value,
  })
}

function next() {
  if (!locked.value) return
  if (last.value) {
    finish()
    return
  }
  index.value += 1
  chosen.value = ''
  locked.value = false
  buildNotes.value = []
}

function weightOf(item) {
  return item.type === 'build' ? 2 : 1
}

function finish(expired = false) {
  if (done.value) return
  done.value = true
  const pending = props.session.questions.slice(answers.value.length).map((q) => ({
    id: q.id,
    topic: q.topic,
    type: q.type,
    correct: q.correct,
    chosen: '',
    ok: false,
    prompt: q.prompt,
  }))
  const all = [...answers.value, ...pending]
  const totalW = all.reduce((sum, a) => sum + weightOf(a), 0)
  const rightW = all.filter((a) => a.ok).reduce((sum, a) => sum + weightOf(a), 0)
  emit('finish', {
    mode: props.session.mode,
    total: totalW,
    right: rightW,
    percent: Math.round((rightW / totalW) * 100),
    answers: all,
    expired,
    questions: props.session.questions,
  })
}

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
    if (remain.value === 0) finish(true)
  }, 250)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section class="quiz">
    <div class="bar">
      <button class="ghost" type="button" @click="emit('quit')">На выход</button>
      <div class="progress">
        <i :style="{ width: `${((index + (locked ? 1 : 0)) / total) * 100}%` }" />
      </div>
      <span class="count">{{ index + 1 }} / {{ total }}</span>
      <span v-if="remain !== null" class="time" :class="{ low: remain < 60000 }">{{ remainLabel }}</span>
    </div>

    <article class="card">
      <p class="topic">{{ question.topic.toUpperCase() }}{{ isBuild ? ' · чертёж ×2 балла' : '' }}</p>
      <h2>{{ question.prompt }}</h2>
      <BuildView
        v-if="isBuild && !locked"
        :key="question.id"
        exam
        :mission-id="question.missionId"
        @submit="submitBuild"
      />
      <DiagramView
        v-if="question.diagram"
        :name="question.diagram"
        :interactive="isHotspot && !locked"
        :selected="chosen"
        :revealed="locked"
        :correct="question.correct"
        @pick="pick"
      />
      <div v-if="question.options" class="options">
        <button
          v-for="(opt, i) in question.options"
          :key="opt.id"
          type="button"
          class="opt"
          :class="{
            on: chosen === opt.id,
            ok: locked && opt.id === question.correct,
            bad: locked && chosen === opt.id && opt.id !== question.correct,
          }"
          :disabled="locked"
          @click="pick(opt.id)"
        >
          <b>{{ ['А', 'Б', 'В', 'Г'][i] }}</b>
          <span>{{ opt.text }}</span>
        </button>
      </div>
      <p v-if="isHotspot && !locked" class="hint">Нажмите на элемент чертежа.</p>
      <div v-if="locked" class="explain" :class="{ good: ok, fail: !ok }">
        <strong>{{ ok ? 'Верно' : 'Неверно' }}</strong>
        <p v-if="!isBuild">{{ question.explanation }}</p>
        <ul v-else-if="buildNotes.length">
          <li v-for="(note, i) in buildNotes" :key="i">{{ note }}</li>
        </ul>
        <p v-else>{{ question.explanation }}</p>
      </div>
      <div class="actions">
        <button v-if="!locked && !isHotspot && !isBuild" class="go" type="button" :disabled="!chosen" @click="submit">
          Ответить
        </button>
        <button v-if="locked" class="go" type="button" @click="next">
          {{ last ? 'Итог' : 'Дальше' }}
        </button>
      </div>
    </article>
  </section>
</template>

<style scoped>
.quiz {
  display: grid;
  gap: 16px;
}
.bar {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 12px;
  align-items: center;
}
.ghost {
  font: inherit;
  background: transparent;
  color: var(--muted);
  border: 1px solid rgba(93, 116, 130, 0.3);
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
}
.progress {
  height: 8px;
  background: var(--track);
  border-radius: 99px;
  overflow: hidden;
}
.progress i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--cyan-bright), var(--gold-bright));
}
.count,
.time {
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
.time.low {
  color: var(--rose);
}
.card {
  background: var(--card);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow);
  border-radius: 18px;
  padding: 22px;
  display: grid;
  gap: 16px;
}
.topic {
  margin: 0;
  letter-spacing: 0.14em;
  font-size: 11px;
  color: var(--gold);
}
h2 {
  margin: 0;
  font-family: Unbounded, sans-serif;
  font-size: clamp(20px, 4vw, 28px);
  line-height: 1.25;
}
.options {
  display: grid;
  gap: 8px;
}
.opt {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  text-align: left;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--sheet);
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.opt b {
  color: var(--cyan);
}
.opt.on {
  border-color: var(--gold);
}
.opt.ok {
  border-color: var(--ok);
  background: rgba(42, 154, 106, 0.1);
}
.opt.bad {
  border-color: var(--rose);
  background: rgba(196, 90, 90, 0.1);
}
.hint {
  margin: 0;
  color: var(--muted);
}
.explain {
  border-radius: 12px;
  padding: 12px 14px;
}
.explain.good {
  background: rgba(42, 154, 106, 0.12);
}
.explain.fail {
  background: rgba(196, 90, 90, 0.12);
}
.explain p,
.explain ul {
  margin: 6px 0 0;
  color: var(--ink);
}
.actions {
  display: flex;
  justify-content: flex-end;
}
.go {
  font: inherit;
  font-weight: 700;
  background: var(--cyan-bright);
  color: var(--btn-ink);
  border: 0;
  border-radius: 999px;
  padding: 10px 18px;
  cursor: pointer;
}
.go:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
