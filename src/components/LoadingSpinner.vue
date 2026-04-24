<template>
  <div class="spinner-container">
    <div class="spinner">
      <div class="spinner-ring"></div>
    </div>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-2xl);
}

.spinner-ring {
  width: 36px;
  height: 36px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.9s var(--ease-out) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
