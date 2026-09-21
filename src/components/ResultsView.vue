<script setup>
import { computed } from 'vue'
import { TOPICS, rankFor } from '../data/content.js'

const props = defineProps({
  result: { type: Object, required: true },
  sync: { type: String, default: 'skip' },
})
const emit = defineEmits(['home', 'retry', 'mistakes'])

const rank = computed(() => rankFor(props.result.percent))
const passed = computed(() => props.result.percent >= 70)
const byTopic = computed(() =>
  TOPICS.map((t) => {
    const rows = props.result.answers.filter((a) => a.topic === t.id)
    if (!rows.length) return null
    const right = rows.filter((a) => a.ok).length
    return { ...t, right, total: rows.length, pct: Math.round((right / rows.length) * 100) }
  }).filter(Boolean),
)
const mistakes = computed(() => props.result.answers.filter((a) => !a.ok))
</script>

<template>
  <section class="res">
    <p class="kicker">{{ result.expired ? 'Время вышло' : 'Сессия закрыта' }}</p>
    <h1>{{ result.percent }}%</h1>
    <p class="rank" :data-tone="rank.tone">{{ rank.title }}</p>
    <p class="sum">
      {{ result.right }} из {{ result.total }} {{ result.mode === 'exam' ? 'баллов' : 'верно' }}
      <span v-if="result.mode === 'exam'"> · экзамен {{ passed ? 'сдан' : 'не сдан' }} (нужно 70%)</span>
    </p>
    <p v-if="result.mode === 'exam' && sync === 'pending'" class="sync">Отправляем результат преподавателю…</p>
    <p v-else-if="sync === 'ok'" class="sync ok">Результат записан в журнал.</p>
    <p v-else-if="sync === 'error'" class="sync bad">Не удалось отправить в журнал. Проверьте сеть и поля ФИО / группа.</p>
    <div class="topics">
      <div v-for="t in byTopic" :key="t.id" class="row">
        <span>{{ t.title }}</span>
        <b>{{ t.right }}/{{ t.total }}</b>
        <i><em :style="{ width: t.pct + '%' }" /></i>
      </div>
    </div>
    <div v-if="mistakes.length" class="miss">
      <h3>Разобрать ошибки</h3>
      <ol>
        <li v-for="m in mistakes" :key="m.id">{{ m.prompt }}</li>
      </ol>
    </div>
    <div class="acts">
      <button class="go" type="button" @click="emit('retry')">Ещё раз</button>
      <button v-if="mistakes.length" class="alt" type="button" @click="emit('mistakes')">Только ошибки</button>
      <button class="ghost" type="button" @click="emit('home')">На главную</button>
    </div>
  </section>
</template>

<style scoped>
.res {
  display: grid;
  gap: 12px;
  justify-items: start;
}
.kicker {
  margin: 0;
  color: var(--gold);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
}
h1 {
  margin: 0;
  font-family: Unbounded, sans-serif;
  font-size: clamp(56px, 12vw, 96px);
  line-height: 0.9;
}
.rank {
  margin: 0;
  font-family: Unbounded, sans-serif;
  font-size: 22px;
}
.rank[data-tone='gold'] {
  color: var(--gold);
}
.rank[data-tone='cyan'] {
  color: var(--cyan);
}
.rank[data-tone='ok'] {
  color: var(--ok);
}
.rank[data-tone='rose'] {
  color: var(--rose);
}
.sum {
  color: var(--muted);
  margin: 0 0 8px;
}
.sync {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}
.sync.ok {
  color: var(--ok);
}
.sync.bad {
  color: var(--rose);
}
.topics {
  width: 100%;
  display: grid;
  gap: 10px;
}
.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 12px;
}
.row i {
  grid-column: 1 / -1;
  height: 6px;
  background: var(--track);
  border-radius: 99px;
  display: block;
}
.row em {
  display: block;
  height: 100%;
  background: var(--cyan);
  border-radius: inherit;
}
.miss {
  width: 100%;
  background: var(--card);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow);
  border-radius: 16px;
  padding: 16px 18px;
}
.miss h3 {
  margin: 0 0 8px;
  font-family: Unbounded, sans-serif;
  font-size: 16px;
}
.miss ol {
  margin: 0;
  color: var(--ink);
  padding-left: 18px;
}
.acts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}
.go,
.alt,
.ghost {
  font: inherit;
  font-weight: 700;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
}
.go {
  background: var(--cyan-bright);
  border: 0;
  color: var(--btn-ink);
}
.alt {
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold);
}
.ghost {
  background: transparent;
  border: 1px solid rgba(93, 116, 130, 0.35);
  color: var(--muted);
}
</style>
