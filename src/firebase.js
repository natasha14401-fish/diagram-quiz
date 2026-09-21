import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const STUDENT_KEY = 'diagram-quiz-student'

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'natasha144.01@gmail.com'

export function firebaseReady() {
  return Boolean(config.apiKey && config.projectId)
}

export function loadStudent() {
  try {
    return JSON.parse(localStorage.getItem(STUDENT_KEY)) || { name: '', group: '' }
  } catch {
    return { name: '', group: '' }
  }
}

export function saveStudent(student) {
  const next = {
    name: String(student.name || '').trim().slice(0, 80),
    group: String(student.group || '').trim().slice(0, 40),
  }
  localStorage.setItem(STUDENT_KEY, JSON.stringify(next))
  return next
}

let app
let auth
let db

function services() {
  if (!firebaseReady()) return null
  if (!app) {
    app = initializeApp(config)
    auth = getAuth(app)
    db = getFirestore(app)
  }
  return { auth, db }
}

export async function saveAttempt(result, student) {
  const ctx = services()
  const person = {
    name: String(student?.name || '').trim().slice(0, 80),
    group: String(student?.group || '').trim().slice(0, 40),
  }
  if (!ctx || result?.mode !== 'exam' || !person.name || !person.group) return 'skip'
  try {
    if (!ctx.auth.currentUser) await signInAnonymously(ctx.auth)
    await addDoc(collection(ctx.db, 'attempts'), {
      name: person.name,
      group: person.group,
      mode: 'exam',
      percent: result.percent,
      right: result.right,
      total: result.total,
      passed: result.percent >= 70,
      expired: Boolean(result.expired),
      at: serverTimestamp(),
    })
    return 'ok'
  } catch (err) {
    console.error('Firebase: не удалось сохранить попытку', err)
    return 'error'
  }
}

export function watchAdmin(callback) {
  const ctx = services()
  if (!ctx) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(ctx.auth, (user) => {
    callback(user?.email ? { email: user.email, uid: user.uid } : null)
  })
}

export async function signInAdmin(email, password) {
  const ctx = services()
  if (!ctx) throw new Error('Firebase не настроен')
  if (ctx.auth.currentUser) await signOut(ctx.auth)
  await signInWithEmailAndPassword(ctx.auth, email.trim(), password)
}

export async function signOutAdmin() {
  const ctx = services()
  if (ctx?.auth.currentUser) await signOut(ctx.auth)
}

export async function loadAttempts() {
  const ctx = services()
  if (!ctx) throw new Error('Firebase не настроен')
  const snap = await getDocs(query(collection(ctx.db, 'attempts'), orderBy('at', 'desc')))
  return snap.docs.map((doc) => {
    const row = doc.data()
    return {
      id: doc.id,
      name: row.name || '',
      group: row.group || '',
      percent: row.percent ?? 0,
      right: row.right ?? 0,
      total: row.total ?? 0,
      passed: Boolean(row.passed),
      expired: Boolean(row.expired),
      at: row.at?.toDate?.() || null,
    }
  })
}
