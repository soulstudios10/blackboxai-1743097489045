<template>
  <div class="rentals-view container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Equipment Rentals</h1>
    
    <div class="grid md:grid-cols-4 gap-6 mb-8">
      <div class="md:col-span-3">
        <div class="flex items-center mb-6">
          <div class="relative flex-1 max-w-md">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search equipment..."
              class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <div class="ml-4">
            <select 
              v-model="selectedCategory"
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option 
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="item in filteredEquipment"
            :key="item.id"
            class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <i class="fas text-4xl" :class="item.icon" style="color: var(--primary);"></i>
            </div>
            <h3 class="font-semibold text-lg mb-1">{{ item.name }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ item.description }}</p>
            <div class="flex justify-between items-center">
              <span class="font-medium">{{ $filters.formatPrice(item.price) }}/day</span>
              <button 
                @click="addToCart(item)"
                class="btn-primary text-sm px-3 py-1"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="md:col-span-1">
        <div class="bg-white p-6 rounded-xl shadow-md sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Your Rental Cart</h2>
          
          <div v-if="cartItems.length === 0" class="text-center py-8 text-gray-500">
            <i class="fas fa-shopping-cart text-3xl mb-2"></i>
            <p>Your cart is empty</p>
          </div>

          <div v-else>
            <div 
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-center justify-between py-3 border-b"
            >
              <div>
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">{{ $filters.formatPrice(item.price) }} × {{ item.quantity }}</p>
              </div>
              <button 
                @click="removeFromCart(item.id)"
                class="text-red-500 hover:text-red-700"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <div class="mt-4 pt-4 border-t">
              <div class="flex justify-between font-medium mb-2">
                <span>Subtotal:</span>
                <span>{{ $filters.formatPrice(cartTotal) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-500 mb-4">
                <span>Tax:</span>
                <span>{{ $filters.formatPrice(cartTotal * 0.08) }}</span>
              </div>
              <div class="flex justify-between font-bold">
                <span>Total:</span>
                <span>{{ $filters.formatPrice(cartTotal * 1.08) }}</span>
              </div>
            </div>

            <button class="btn-primary w-full mt-6">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Rental Policies -->
    <div class="bg-white p-6 rounded-xl shadow-md">
      <h2 class="text-xl font-semibold mb-4">Rental Policies</h2>
      <ul class="space-y-3">
        <li class="flex items-start gap-3">
          <i class="fas fa-check-circle text-green-500 mt-1"></i>
          <div>
            <h3 class="font-medium">Damage Waiver</h3>
            <p class="text-sm text-gray-600">Optional damage waiver available at checkout (10% of rental cost)</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <i class="fas fa-clock text-indigo-500 mt-1"></i>
          <div>
            <h3 class="font-medium">Pickup & Return</h3>
            <p class="text-sm text-gray-600">Equipment must be picked up and returned during studio hours</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <i class="fas fa-exclamation-triangle text-yellow-500 mt-1"></i>
          <div>
            <h3 class="font-medium">Late Fees</h3>
            <p class="text-sm text-gray-600">25% daily fee for late returns</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAppStore } from '@/store'

export default {
  name: 'RentalsView',
  setup() {
    const store = useAppStore()
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const cartItems = ref([])

    // Sample data - in a real app this would come from the store or API
    const categories = ref([
      { id: 'cameras', name: 'Cameras' },
      { id: 'lenses', name: 'Lenses' },
      { id: 'lighting', name: 'Lighting' },
      { id: 'audio', name: 'Audio' },
      { id: 'accessories', name: 'Accessories' }
    ])

    const equipment = ref([
      {
        id: 1,
        name: 'Canon EOS R5',
        description: 'Full-frame mirrorless camera',
        price: 75,
        category: 'cameras',
        icon: 'fa-camera'
      },
      {
        id: 2,
        name: 'Sony 24-70mm f/2.8',
        description: 'Professional zoom lens',
        price: 40,
        category: 'lenses',
        icon: 'fa-camera-retro'
      },
      {
        id: 3,
        name: 'Godox AD200 Pro',
        description: 'Portable strobe light',
        price: 25,
        category: 'lighting',
        icon: 'fa-lightbulb'
      },
      {
        id: 4,
        name: 'Rode Wireless Go II',
        description: 'Compact wireless mic system',
        price: 30,
        category: 'audio',
        icon: 'fa-microphone'
      },
      {
        id: 5,
        name: 'Tripod Kit',
        description: 'Professional tripod with head',
        price: 15,
        category: 'accessories',
        icon: 'fa-phone-stand'
      }
    ])

    const filteredEquipment = computed(() => {
      return equipment.value.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                             item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value
        return matchesSearch && matchesCategory
      })
    })

    const cartTotal = computed(() => {
      return cartItems.value.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    })

    const addToCart = (item) => {
      const existingItem = cartItems.value.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cartItems.value.push({
          ...item,
          quantity: 1
        })
      }
    }

    const removeFromCart = (id) => {
      const index = cartItems.value.findIndex(i => i.id === id)
      if (index !== -1) {
        cartItems.value.splice(index, 1)
      }
    }

    return {
      searchQuery,
      selectedCategory,
      categories,
      equipment,
      filteredEquipment,
      cartItems,
      cartTotal,
      addToCart,
      removeFromCart
    }
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors;
}
</style>