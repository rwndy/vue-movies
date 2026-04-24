<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()
</script>

<template>
  <div class="pagination">
    <button
      class="pagination-btn"
      :disabled="currentPage <= 1"
      @click="emit('page-change', currentPage - 1)"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m15 18-6-6 6-6" />
      </svg>
      Prev
    </button>

    <span class="pagination-info">
      <span class="pagination-current">{{ currentPage }}</span>
      <span class="pagination-sep">/</span>
      <span>{{ totalPages }}</span>
    </span>

    <button
      class="pagination-btn"
      :disabled="currentPage >= totalPages"
      @click="emit('page-change', currentPage + 1)"
    >
      Next
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  padding: var(--space-xl) 0 var(--space-md);
}

.pagination-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--card-bg);
  color: var(--color-text);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
}

.pagination-btn:not(:disabled):hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
}

.pagination-current {
  color: var(--color-accent);
  font-weight: 600;
}

.pagination-sep {
  margin: 0 var(--space-xs);
}
</style>
