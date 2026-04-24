<script setup lang="ts">
defineProps<{
  message: string
}>()

defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="error">
    <p class="error-text">{{ message }}</p>
    <button class="error-retry" @click="$emit('retry')">Try Again</button>
  </div>
</template>

<style scoped>
.error {
  text-align: center;
  padding: var(--space-2xl) var(--space-md);
}

.error-text {
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
  font-size: 0.95rem;
}

.error-retry {
  padding: var(--space-sm) var(--space-lg);
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.875rem;
  letter-spacing: 0.03em;
  transition:
    background var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.error-retry:hover {
  background: var(--color-accent);
  color: var(--vt-c-black);
}
</style>
