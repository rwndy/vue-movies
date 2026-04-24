<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-brand">
      <span class="brand-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 8h20M7 4v4M12 4v4M17 4v4" />
        </svg>
      </span>
      <span class="brand-text">Vue Movies</span>
    </RouterLink>
  </header>

  <RouterView />
</template>

<style scoped>
.app-header {
  padding: var(--space-lg) 0;
  margin-bottom: var(--space-md);
  border-bottom: 1px solid var(--card-border);
}

.app-brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: var(--color-heading);
  transition: color var(--duration-fast) var(--ease-out);
}

.app-brand:hover {
  color: var(--color-accent);
}

.brand-icon {
  display: flex;
}

.brand-icon svg {
  width: 24px;
  height: 24px;
}

.brand-text {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
</style>
