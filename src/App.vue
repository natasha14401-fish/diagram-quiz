<script setup>
import { computed, ref } from 'vue'
import HomeView from './components/HomeView.vue'
import QuizView from './components/QuizView.vue'
import ResultsView from './components/ResultsView.vue'
import SheetView from './components/SheetView.vue'
import BuildView from './components/BuildView.vue'
import { buildSession, QUESTIONS, saveStats } from './data/content.js'
import { saveAttempt, loadStudent } from './firebase.js'

const screen = ref('home')
const session = ref(null)
const result = ref(null)
const lastConfig = ref({ mode: 'exam' })
const missionId = ref('')
const sync = ref('skip')

const year = computed(() => new Date().getFullYear())

function start(config) {
  lastConfig.value = config
  session.value = buildSession(config)
  screen.value = 'quiz'
}

async function finish(payload) {
  result.value = payload
  saveStats(payload)
  sync.value = payload.mode === 'exam' ? 'pending' : 'skip'
  screen.value = 'results'
  if (payload.mode === 'exam') sync.value = await saveAttempt(payload, loadStudent())
}

function retry() {
  start(lastConfig.value)
}

function openBuild(id) {
  missionId.value = id
  screen.value = 'build'
}

function mistakes() {
  const wrong = result.value.answers.filter((a) => !a.ok)
  const qs = wrong
    .map((a) => {
      if (a.type === 'build') return (result.value.questions || []).find((q) => q.id === a.id)
      return QUESTIONS.find((q) => q.id === a.id)
    })
    .filter(Boolean)
  start({ mode: 'trainer', questions: qs })
}
</script>

<template>
  <div class="app" :class="{ wide: screen === 'build' || screen === 'quiz' }">
    <header class="top">
      <span class="logo" @click="screen = 'home'">⬡ Диаграммист</span>
      <span class="cap">UML · IDEF0 · DFD</span>
    </header>
    <main>
      <HomeView
        v-if="screen === 'home'"
        @start="start"
        @sheet="screen = 'sheet'"
        @build="openBuild"
      />
      <QuizView v-else-if="screen === 'quiz'" :session="session" @quit="screen = 'home'" @finish="finish" />
      <ResultsView
        v-else-if="screen === 'results'"
        :result="result"
        :sync="sync"
        @home="screen = 'home'"
        @retry="retry"
        @mistakes="mistakes"
      />
      <BuildView v-else-if="screen === 'build'" :mission-id="missionId" @quit="screen = 'home'" />
      <SheetView v-else-if="screen === 'sheet'" @back="screen = 'home'" />
    </main>
    <footer>
      Учебный тренажёр по диаграммам проектирования ИС · {{ year }}
    </footer>
  </div>
</template>
