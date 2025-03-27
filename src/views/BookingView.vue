<template>
  <div class="booking-view container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Book Your Studio Session</h1>
    
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Studio Selection -->
      <div class="md:col-span-1">
        <div class="bg-white p-6 rounded-xl shadow-md sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Available Studios</h2>
          <ul class="space-y-3">
            <li 
              v-for="studio in studios" 
              :key="studio.id"
              @click="selectStudio(studio)"
              class="p-3 rounded-lg cursor-pointer transition-colors"
              :class="{
                'bg-indigo-100': selectedStudio?.id === studio.id,
                'hover:bg-gray-100': selectedStudio?.id !== studio.id
              }"
            >
              <h3 class="font-medium">{{ studio.name }}</h3>
              <p class="text-sm text-gray-600">{{ studio.description }}</p>
              <p class="text-sm mt-1">
                <span class="font-medium">{{ $filters.formatPrice(studio.price) }}</span>/hour
              </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Booking Calendar -->
      <div class="md:col-span-2">
        <div class="bg-white p-6 rounded-xl shadow-md">
          <h2 class="text-xl font-semibold mb-4">Select Date & Time</h2>
          <!-- Calendar component would go here -->
          <div class="calendar-placeholder h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p class="text-gray-500">Calendar will be displayed here</p>
          </div>

          <!-- Customization Options -->
          <div v-if="selectedStudio" class="mt-8">
            <h3 class="text-lg font-medium mb-4">Customize Your Session</h3>
            <div class="space-y-4">
              <div v-for="option in selectedStudio.customizationOptions" :key="option.id">
                <label class="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    v-model="selectedOptions"
                    :value="option.id"
                    class="rounded text-indigo-600"
                  >
                  <span>{{ option.name }} (+{{ $filters.formatPrice(option.price) }})</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Booking Summary -->
          <div class="mt-8 border-t pt-6">
            <h3 class="text-lg font-medium mb-4">Booking Summary</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Studio:</span>
                <span>{{ selectedStudio?.name || 'Not selected' }}</span>
              </div>
              <div class="flex justify-between">
                <span>Duration:</span>
                <span>2 hours</span>
              </div>
              <div class="flex justify-between">
                <span>Customizations:</span>
                <span>{{ selectedOptions.length }} selected</span>
              </div>
              <div class="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span>{{ $filters.formatPrice(calculateTotal()) }}</span>
              </div>
            </div>
            <button 
              class="btn-primary mt-6 w-full"
              :disabled="!selectedStudio"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAppStore } from '@/store'

export default {
  name: 'BookingView',
  setup() {
    const store = useAppStore()
    const selectedStudio = ref(null)
    const selectedOptions = ref([])

    const studios = [
      {
        id: 1,
        name: 'Natural Light Studio',
        description: 'Bright space with large windows and neutral backdrops',
        price: 75,
        customizationOptions: [
          { id: 1, name: 'Additional Lighting', price: 15 },
          { id: 2, name: 'Backdrop Change', price: 10 },
          { id: 3, name: 'Prop Package', price: 20 }
        ]
      },
      {
        id: 2,
        name: 'Dark Studio',
        description: 'Controlled lighting environment for product photography',
        price: 90,
        customizationOptions: [
          { id: 4, name: 'Lighting Package', price: 25 },
          { id: 5, name: 'Cyclorama Wall', price: 15 }
        ]
      }
    ]

    const selectStudio = (studio) => {
      selectedStudio.value = studio
      selectedOptions.value = []
    }

    const calculateTotal = () => {
      if (!selectedStudio.value) return 0
      
      const basePrice = selectedStudio.value.price * 2 // 2 hours
      const optionsTotal = selectedOptions.value.reduce((total, optionId) => {
        const option = selectedStudio.value.customizationOptions.find(o => o.id === optionId)
        return total + (option?.price || 0)
      }, 0)

      return basePrice + optionsTotal
    }

    return {
      studios,
      selectedStudio,
      selectedOptions,
      selectStudio,
      calculateTotal
    }
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed;
}

.calendar-placeholder {
  min-height: 300px;
}
</style>