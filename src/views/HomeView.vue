<template>
  <main class="container mx-auto px-4 py-8">
    <section class="hero-section mb-16">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="md:w-1/2">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-indigo-600">
            Creative Spaces for Every Vision
          </h1>
          <p class="text-lg mb-6 text-gray-700">
            Book stunning studios, connect with creatives, and access premium equipment - all in one platform.
          </p>
          <div class="flex gap-4">
            <button class="btn-primary">Explore Studios</button>
            <button class="btn-secondary">Join Community</button>
          </div>
        </div>
        <div class="md:w-1/2">
          <img 
            src="@/assets/images/studio-hero.jpg" 
            alt="Modern photography studio"
            class="rounded-xl shadow-lg"
          >
        </div>
      </div>
    </section>

    <section class="features-section mb-16">
      <h2 class="text-3xl font-bold mb-8 text-center">Why Choose Our Studios</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
        />
      </div>
    </section>
  </main>
</template>

<script>
import FeatureCard from '@/components/FeatureCard.vue'

export default {
  name: 'HomeView',
  components: {
    FeatureCard
  },
  data() {
    return {
      features: [
        {
          title: 'Customizable Spaces',
          description: 'Tailor every aspect of your shoot with modular backdrops and lighting',
          icon: 'palette'
        },
        {
          title: 'Affordable Rates',
          description: 'Flexible pricing for all budgets with no hidden fees',
          icon: 'tag'
        },
        {
          title: 'Premium Equipment',
          description: 'Rent high-quality gear on demand for your projects',
          icon: 'camera'
        }
      ]
    }
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.btn-primary {
  @apply bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors;
}

.btn-secondary {
  @apply border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors;
}
</style>