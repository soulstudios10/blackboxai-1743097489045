import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null,
    bookings: [],
    equipment: [],
    communityPosts: [],
    loading: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    upcomingBookings: (state) => {
      return state.bookings.filter(booking => 
        new Date(booking.startDate) > new Date()
      )
    }
  },
  actions: {
    async login(email, password) {
      this.loading = true
      try {
        // Authentication logic would go here
        this.user = { email, name: 'Demo User' }
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      } finally {
        this.loading = false
      }
    },
    async fetchBookings() {
      // Booking data fetching logic
    },
    async fetchEquipment() {
      // Equipment data fetching logic
    }
  }
})