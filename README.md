# Диаграммист

Игра-тест на понимание диаграмм проектирования информационных систем. Интерфейс на русском, собрано на Vue 3 + Vite.

## Что внутри

- Диаграммы прецедентов и классов
- Последовательности и деятельности
- Компоненты и развёртывание
- UML в целом: какую диаграмму выбрать
- IDEF0: ICOM, контекст A-0, декомпозиция
- DFD: контекст, правила потоков и хранилищ

Режимы: **экзамен**, **тренажёр по теме**, **угадай чертёж** и **конструктор** — сборка прецедентов, классов, IDEF0, DFD, компонентов и развёртывания на чертёжном столе. Есть шпаргалка и разбор ошибок.

Перед экзаменом студент указывает группу и ФИО. Результат уходит в Firebase (коллекция `attempts`). Преподаватель смотрит журнал в игре: ссылка **Журнал преподавателя**.

## Журнал в Firebase

1. https://console.firebase.google.com → **Add project**
2. Добавьте веб-приложение (`</>`), скопируйте `firebaseConfig`
3. Authentication → Sign-in method → **Anonymous** и **Email/Password** → Enable
4. Authentication → Users → **Add user**: почта преподавателя и пароль
5. Firestore → Create database (production) → вставьте правила из `firestore.rules` (в `isAdmin()` должна быть та же почта) → Publish
6. Authentication → Settings → Authorized domains: `localhost` и `natasha14401-fish.github.io`
7. Локально скопируйте `.env.example` в `.env` и вставьте ключи
8. Для сайта: GitHub → Settings → Secrets — `VITE_FIREBASE_*` и `VITE_ADMIN_EMAIL`

## Запуск локально

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Публикация на GitHub Pages

Репозиторий уже содержит workflow `.github/workflows/deploy.yml`. После пуша в `main`:

1. GitHub → **Settings → Pages**
2. Source: **GitHub Actions**

Сайт появится по адресу `https://<username>.github.io/diagram-quiz/`.
