<script setup>
import { computed, ref } from 'vue'
import HomeView from './components/HomeView.vue'
import QuizView from './components/QuizView.vue'
import ResultsView from './components/ResultsView.vue'
import SheetView from './components/SheetView.vue'
import { buildSession, QUESTIONS, saveStats } from './data/content.js'

const screen = ref('home')
const session = ref(null)
const result = ref(null)
const lastConfig = ref({ mode: 'exam' })

const year = computed(() => new Date().getFullYear())

function start(config) {
  lastConfig.value = config
  session.value = buildSession(config)
  screen.value = 'quiz'
}

function finish(payload) {
  result.value = payload
  saveStats(payload)
  screen.value = 'results'
}

function retry() {
  start(lastConfig.value)
}

function mistakes() {
  const wrongIds = new Set(result.value.answers.filter((a) => !a.ok).map((a) => a.id))
  const qs = QUESTIONS.filter((q) => wrongIds.has(q.id))
  start({ mode: 'trainer', questions: qs })
}
</script>

<template>
  <div class="app">
    <header class="top">
      <span class="logo" @click="screen = 'home'">⬡ Диаграммист</span>
      <span class="cap">UML · IDEF0 · DFD</span>
    </header>
    <main>
      <HomeView v-if="screen === 'home'" @start="start" @sheet="screen = 'sheet'" />
      <QuizView v-else-if="screen === 'quiz'" :session="session" @quit="screen = 'home'" @finish="finish" />
      <ResultsView
        v-else-if="screen === 'results'"
        :result="result"
        @home="screen = 'home'"
        @retry="retry"
        @mistakes="mistakes"
      />
      <SheetView v-else @back="screen = 'home'" />
    </main>
    <footer>
      Учебный тренажёр по диаграммам проектирования ИС · {{ year }}
    </footer>
  </div>
</template>
