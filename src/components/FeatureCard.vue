<template>
  <div class="feature-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div class="icon-container mb-4 p-3 rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center">
      <i class="fas" :class="`fa-${icon}`" style="color: var(--primary);"></i>
    </div>
    <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.feature-card {
  transition: transform 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.icon-container {
  transition: background-color 0.2s ease;
}

.feature-card:hover .icon-container {
  @apply bg-indigo-200;
}
</style>