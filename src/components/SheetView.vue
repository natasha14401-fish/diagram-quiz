<script setup>
const emit = defineEmits(['back'])
</script>

<template>
  <section class="sheet">
    <button class="ghost" type="button" @click="emit('back')">Назад</button>
    <h1>Шпаргалка</h1>
    <div class="grid">
      <article>
        <h2>UML · прецеденты</h2>
        <ul>
          <li>Актор снаружи системы, прецедент — овал.</li>
          <li>«include»: стрелка от базы к обязательному фрагменту.</li>
          <li>«extend»: стрелка от необязательного расширения к базе.</li>
        </ul>
      </article>
      <article>
        <h2>UML · классы</h2>
        <ul>
          <li>Имя → атрибуты → операции.</li>
          <li>Залитый ромб — композиция, полый — агрегация, треугольник — обобщение.</li>
          <li>Кратность: 0..1, 1, 1..*, *.</li>
        </ul>
      </article>
      <article>
        <h2>Sequence и activity</h2>
        <ul>
          <li>Sequence: линии жизни, время вниз, возврат пунктиром.</li>
          <li>Activity: старт •, действия, ромб условия, fork/join, финал ◎.</li>
        </ul>
      </article>
      <article>
        <h2>Компоненты и развёртывание</h2>
        <ul>
          <li>Компонент — модуль, ball/socket — интерфейсы.</li>
          <li>Узел — устройство или среда, артефакт — файл ПО на узле.</li>
        </ul>
      </article>
      <article>
        <h2>IDEF0</h2>
        <ul>
          <li>ICOM: вход слева, управление сверху, выход справа, механизм снизу.</li>
          <li>A-0 — один блок. Декомпозиция 1-го уровня — A0 с блоками A1…An (обычно 3–6).</li>
          <li>2-й уровень: A1 → A11, A12… Дерево узлов — оглавление без стрелок.</li>
        </ul>
      </article>
      <article>
        <h2>DFD</h2>
        <ul>
          <li>Процесс, поток, хранилище, внешняя сущность.</li>
          <li>Контекст: один процесс. Уровень 1: 1.0, 2.0… Хранилище не стыковать с внешним миром напрямую.</li>
          <li>Баланс: внешние потоки родителя = внешние потоки детей.</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.sheet {
  display: grid;
  gap: 16px;
}
h1 {
  margin: 0;
  font-family: Unbounded, sans-serif;
  font-size: clamp(32px, 6vw, 48px);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}
article {
  background: rgba(14, 32, 42, 0.85);
  border: 1px solid rgba(62, 200, 216, 0.2);
  border-radius: 16px;
  padding: 16px;
}
h2 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #e8b86d;
  font-family: Unbounded, sans-serif;
}
ul {
  margin: 0;
  padding-left: 18px;
  color: #c5d5de;
}
.ghost {
  justify-self: start;
  font: inherit;
  background: transparent;
  color: #8aa3b3;
  border: 1px solid rgba(138, 163, 179, 0.3);
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
