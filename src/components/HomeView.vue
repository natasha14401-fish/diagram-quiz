<script setup>
import { onMounted, ref } from 'vue'
import { TOPICS, loadStats } from '../data/content.js'
import { MISSIONS } from '../data/missions.js'

const emit = defineEmits(['start', 'sheet', 'build'])
const stats = ref({ exams: 0, best: 0, played: 0 })
const topic = ref(TOPICS[0].id)
const mission = ref(MISSIONS[0].id)

onMounted(() => {
  stats.value = loadStats()
})
</script>

<template>
  <section class="home">
    <p class="kicker">Проектирование информационных систем</p>
    <h1>Диаграммист</h1>
    <p class="lead">
      Игра-тест и чертёжный стол: отличите прецедент от класса, соберите IDEF0 по ICOM
      и не перепутайте уровень декомпозиции. UML, IDEF0 и DFD — как на зачёте, только с листом.
    </p>

    <div class="modes">
      <button class="mode exam" type="button" @click="emit('start', { mode: 'exam' })">
        <span class="tag">8 вопросов + 2 чертежа · 20 минут</span>
        <strong>Экзамен</strong>
        <em>Теория и построение диаграмм. Чертёж даёт 2 балла. Проходной — 70%.</em>
      </button>
      <button class="mode guess" type="button" @click="emit('start', { mode: 'identify' })">
        <span class="tag">Только картинки</span>
        <strong>Угадай чертёж</strong>
        <em>Смотрите диаграмму и называете нотацию. Быстрый глаз аналитика.</em>
      </button>
    </div>

    <div class="trainer">
      <div class="trainer-head">
        <strong>Тренажёр</strong>
        <span>Разбор одной темы без таймера</span>
      </div>
      <div class="chips">
        <button
          v-for="t in TOPICS"
          :key="t.id"
          type="button"
          class="chip"
          :class="{ on: topic === t.id }"
          @click="topic = t.id"
        >
          {{ t.short }}
        </button>
      </div>
      <button class="go" type="button" @click="emit('start', { mode: 'trainer', topic })">
        Начать тему
      </button>
    </div>

    <div class="trainer">
      <div class="trainer-head">
        <strong>Конструктор</strong>
        <span>Сложные листы и свой элемент: функции, процессы, связи include/ICOM</span>
      </div>
      <div class="chips">
        <button
          v-for="m in MISSIONS"
          :key="m.id"
          type="button"
          class="chip"
          :class="{ on: mission === m.id }"
          @click="mission = m.id"
        >
          {{ m.title }}
        </button>
      </div>
      <button class="go" type="button" @click="emit('build', mission)">
        Открыть чертёжный стол
      </button>
    </div>

    <div class="meta">
      <button class="link" type="button" @click="emit('sheet')">Шпаргалка по нотациям</button>
      <ul class="stats">
        <li>Сессий: {{ stats.played }}</li>
        <li>Экзаменов: {{ stats.exams }}</li>
        <li>Лучший экзамен: {{ stats.best }}%</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.home {
  display: grid;
  gap: 22px;
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
  font-size: clamp(40px, 8vw, 72px);
  line-height: 0.95;
  letter-spacing: -0.04em;
}
.lead {
  margin: 0;
  max-width: 58ch;
  color: var(--muted);
  font-size: 18px;
}
.modes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.mode,
.trainer {
  text-align: left;
  background: var(--card);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow);
  border-radius: 18px;
  padding: 20px;
  color: inherit;
}
.mode {
  cursor: pointer;
  display: grid;
  gap: 8px;
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.mode:hover {
  transform: translateY(-2px);
  border-color: var(--cyan);
}
.tag {
  font-size: 12px;
  color: var(--muted);
}
.mode strong,
.trainer-head strong {
  font-family: Unbounded, sans-serif;
  font-size: 22px;
}
.mode em {
  font-style: normal;
  color: var(--muted);
}
.exam {
  box-shadow: var(--shadow), inset 0 0 0 1px rgba(176, 120, 32, 0.28);
}
.trainer {
  display: grid;
  gap: 14px;
}
.trainer-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
  flex-wrap: wrap;
}
.trainer-head span {
  color: var(--muted);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip,
.go,
.link {
  font: inherit;
  cursor: pointer;
}
.chip {
  border-radius: 999px;
  border: 1px solid var(--card-border);
  background: transparent;
  color: var(--ink);
  padding: 8px 12px;
}
.chip.on {
  background: var(--cyan-bright);
  color: var(--btn-ink);
  border-color: var(--cyan-bright);
}
.go {
  justify-self: start;
  background: var(--gold-bright);
  color: var(--btn-ink);
  border: 0;
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 700;
}
.meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}
.link {
  background: none;
  border: 0;
  color: var(--cyan);
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.stats {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  color: var(--muted);
  font-size: 14px;
}
@media (max-width: 720px) {
  .modes {
    grid-template-columns: 1fr;
  }
}
</style>
