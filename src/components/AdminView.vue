<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  ADMIN_EMAIL,
  firebaseReady,
  loadAttempts,
  signInAdmin,
  signOutAdmin,
  watchAdmin,
} from '../firebase.js'

const emit = defineEmits(['back'])

const admin = ref(null)
const email = ref(ADMIN_EMAIL)
const password = ref('')
const error = ref('')
const loading = ref(false)
const rows = ref([])
const groupFilter = ref('')

let stopWatch = () => {}

const groups = computed(() => {
  const set = new Set(rows.value.map((r) => r.group).filter(Boolean))
  return [...set].sort((a, b) => a.localeCompare(b, 'ru'))
})

const visible = computed(() => {
  const g = groupFilter.value
  return g ? rows.value.filter((r) => r.group === g) : rows.value
})

const summary = computed(() => {
  const list = visible.value
  const passed = list.filter((r) => r.passed).length
  return { total: list.length, passed, failed: list.length - passed }
})

onMounted(() => {
  stopWatch = watchAdmin(async (user) => {
    admin.value = user
    if (user) await refresh()
    else rows.value = []
  })
})

onUnmounted(() => stopWatch())

async function refresh() {
  error.value = ''
  loading.value = true
  try {
    rows.value = await loadAttempts()
  } catch (err) {
    error.value =
      err?.code === 'permission-denied'
        ? 'Этот аккаунт не может читать журнал. В firestore.rules должна быть ваша почта, правила нужно Publish в консоли.'
        : 'Не удалось загрузить попытки. Проверьте сеть и правила Firestore.'
    rows.value = []
  } finally {
    loading.value = false
  }
}

async function login() {
  error.value = ''
  loading.value = true
  try {
    await signInAdmin(email.value, password.value)
    password.value = ''
  } catch (err) {
    const code = err?.code || ''
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      error.value = 'Неверная почта или пароль.'
    } else if (code === 'auth/operation-not-allowed') {
      error.value = 'В Firebase включите Authentication → Email/Password.'
    } else {
      error.value = 'Вход не удался. Создайте пользователя преподавателя в Authentication → Users.'
    }
  } finally {
    loading.value = false
  }
}

async function logout() {
  await signOutAdmin()
}

function formatWhen(value) {
  if (!value) return '—'
  return value.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <section class="admin">
    <button class="ghost" type="button" @click="emit('back')">Назад</button>
    <p class="kicker">Преподаватель</p>
    <h1>Журнал экзамена</h1>

    <form v-if="!admin" class="card" @submit.prevent="login">
      <p class="lead">Войдите почтой преподавателя. Студенты этот экран не используют.</p>
      <label>
        Почта
        <input v-model="email" type="email" autocomplete="username" required />
      </label>
      <label>
        Пароль
        <input v-model="password" type="password" autocomplete="current-password" required />
      </label>
      <p v-if="error" class="err">{{ error }}</p>
      <button class="go" type="submit" :disabled="loading || !firebaseReady()">
        {{ loading ? 'Входим…' : 'Войти' }}
      </button>
      <p v-if="!firebaseReady()" class="hint">Firebase не настроен: нет ключей в .env.</p>
    </form>

    <div v-else class="desk">
      <div class="bar">
        <span>{{ admin.email }}</span>
        <select v-model="groupFilter">
          <option value="">Все группы</option>
          <option v-for="g in groups" :key="g" :value="g">{{ g }}</option>
        </select>
        <button class="ghost" type="button" :disabled="loading" @click="refresh">Обновить</button>
        <button class="ghost" type="button" @click="logout">Выйти</button>
      </div>
      <p class="sum">
        Попыток: {{ summary.total }} · сдано: {{ summary.passed }} · не сдано: {{ summary.failed }}
      </p>
      <p v-if="error" class="err">{{ error }}</p>
      <p v-else-if="loading && !rows.length" class="hint">Загружаем журнал…</p>
      <p v-else-if="!visible.length" class="hint">Пока нет записей. После экзамена строка появится здесь.</p>
      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Когда</th>
              <th>Группа</th>
              <th>ФИО</th>
              <th>Балл</th>
              <th>Итог</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in visible" :key="row.id">
              <td>{{ formatWhen(row.at) }}</td>
              <td>{{ row.group }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.percent }}% ({{ row.right }}/{{ row.total }})</td>
              <td>
                <b :class="row.passed ? 'ok' : 'bad'">{{ row.passed ? 'сдан' : 'не сдан' }}</b>
                <span v-if="row.expired" class="muted"> · время</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.admin {
  display: grid;
  gap: 14px;
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
  font-size: clamp(32px, 6vw, 48px);
}
.lead,
.hint,
.sum {
  margin: 0;
  color: var(--muted);
}
.err {
  margin: 0;
  color: var(--rose);
}
.card,
.desk {
  width: 100%;
  background: var(--card);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow);
  border-radius: 16px;
  padding: 18px;
  display: grid;
  gap: 12px;
}
.card {
  max-width: 420px;
}
.card label {
  display: grid;
  gap: 6px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 700;
}
.card input,
.bar select {
  font: inherit;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 500;
  color: var(--ink);
  background: var(--sheet);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 10px 12px;
}
.bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.bar span {
  margin-right: auto;
  color: var(--muted);
  font-size: 14px;
}
.table-wrap {
  overflow: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th,
td {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid var(--card-border);
  white-space: nowrap;
}
th {
  color: var(--muted);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.ok {
  color: var(--ok);
}
.bad {
  color: var(--rose);
}
.muted {
  color: var(--muted);
  font-weight: 500;
}
.go,
.ghost {
  font: inherit;
  font-weight: 700;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  justify-self: start;
}
.go {
  background: var(--cyan-bright);
  border: 0;
  color: var(--btn-ink);
}
.go:disabled {
  opacity: 0.5;
}
.ghost {
  background: transparent;
  border: 1px solid rgba(93, 116, 130, 0.35);
  color: var(--muted);
}
</style>
