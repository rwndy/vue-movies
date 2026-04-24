<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  initialQuery?: string
}>()

const emit = defineEmits<{
  search: [query: string]
}>()

const query = ref(props.initialQuery ?? '')

function onSubmit() {
  const trimmed = query.value.trim()
  if (trimmed) emit('search', trimmed)
}
</script>

<template>
  <form class="search-bar" @submit.prevent="onSubmit">
    <div class="search-field">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        v-model="query"
        type="text"
        placeholder="Search movies..."
        class="search-input"
        autocomplete="off"
      />
    </div>
    <button type="submit" class="search-button">Search</button>
  </form>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: var(--space-sm);
  max-width: 640px;
  margin: 0 auto var(--space-xl);
}

.search-field {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  background: var(--card-bg);
  color: var(--color-text);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  outline: none;
  transition:
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.search-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.search-button {
  padding: 0.75rem 1.5rem;
  background: var(--color-accent);
  color: var(--vt-c-black);
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.search-button:hover {
  background: var(--color-accent-hover);
}

.search-button:active {
  transform: scale(0.97);
}
</style>
