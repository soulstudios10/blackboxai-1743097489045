<template>
  <div class="community-view container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Main Content -->
      <div class="md:w-2/3">
        <h1 class="text-3xl font-bold mb-6">Creative Community</h1>
        
        <!-- Post Creation -->
        <div class="bg-white p-6 rounded-xl shadow-md mb-6">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <i class="fas fa-user text-indigo-600"></i>
            </div>
            <div class="flex-1">
              <textarea 
                v-model="newPostContent"
                placeholder="Share your creative ideas, projects, or questions..."
                class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
              ></textarea>
              <div class="flex justify-between items-center mt-3">
                <div class="flex gap-2">
                  <button class="text-gray-500 hover:text-indigo-600">
                    <i class="fas fa-image"></i>
                  </button>
                  <button class="text-gray-500 hover:text-indigo-600">
                    <i class="fas fa-link"></i>
                  </button>
                </div>
                <button 
                  @click="createPost"
                  class="btn-primary"
                  :disabled="!newPostContent.trim()"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Posts Feed -->
        <div class="space-y-6">
          <div 
            v-for="post in posts" 
            :key="post.id"
            class="bg-white p-6 rounded-xl shadow-md"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <i class="fas fa-user text-indigo-600"></i>
              </div>
              <div>
                <h3 class="font-medium">{{ post.user.name }}</h3>
                <p class="text-sm text-gray-500">{{ formatDate(post.createdAt) }}</p>
              </div>
            </div>
            <p class="mb-4">{{ post.content }}</p>
            <div class="flex gap-4 text-gray-500 border-t pt-3">
              <button class="flex items-center gap-1 hover:text-indigo-600">
                <i class="far fa-heart"></i>
                <span>{{ post.likes }}</span>
              </button>
              <button class="flex items-center gap-1 hover:text-indigo-600">
                <i class="far fa-comment"></i>
                <span>{{ post.comments.length }}</span>
              </button>
              <button class="flex items-center gap-1 hover:text-indigo-600">
                <i class="fas fa-share"></i>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="md:w-1/3">
        <!-- Upcoming Events -->
        <div class="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 class="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div class="space-y-4">
            <div 
              v-for="event in events" 
              :key="event.id"
              class="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <h3 class="font-medium">{{ event.title }}</h3>
              <p class="text-sm text-gray-600">{{ formatDate(event.date) }}</p>
              <p class="text-sm mt-1">{{ event.location }}</p>
            </div>
          </div>
          <button class="btn-outline mt-4 w-full">
            View All Events
          </button>
        </div>

        <!-- Suggested Connections -->
        <div class="bg-white p-6 rounded-xl shadow-md">
          <h2 class="text-xl font-semibold mb-4">Suggested Connections</h2>
          <div class="space-y-4">
            <div 
              v-for="user in suggestedUsers" 
              :key="user.id"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <i class="fas fa-user text-indigo-600"></i>
                </div>
                <div>
                  <h3 class="font-medium">{{ user.name }}</h3>
                  <p class="text-sm text-gray-500">{{ user.role }}</p>
                </div>
              </div>
              <button class="text-sm text-indigo-600 hover:text-indigo-800">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAppStore } from '@/store'

export default {
  name: 'CommunityView',
  setup() {
    const store = useAppStore()
    const newPostContent = ref('')

    // Sample data - in a real app this would come from the store or API
    const posts = ref([
      {
        id: 1,
        user: { name: 'Alex Johnson', avatar: '' },
        content: 'Looking for a makeup artist to collaborate on a creative portrait series next week. DM me if interested!',
        likes: 12,
        comments: [
          { id: 1, user: 'Sam Wilson', content: 'I might be available!' }
        ],
        createdAt: new Date(Date.now() - 3600000 * 2)
      },
      {
        id: 2,
        user: { name: 'Maria Garcia', avatar: '' },
        content: 'Just booked the natural light studio for Saturday morning. Would anyone like to split the cost and share the space?',
        likes: 8,
        comments: [],
        createdAt: new Date(Date.now() - 3600000 * 5)
      }
    ])

    const events = ref([
      {
        id: 1,
        title: 'Photography Workshop',
        date: new Date(Date.now() + 86400000 * 3),
        location: 'Main Studio'
      },
      {
        id: 2,
        title: 'Creative Networking Mixer',
        date: new Date(Date.now() + 86400000 * 7),
        location: 'Community Space'
      }
    ])

    const suggestedUsers = ref([
      {
        id: 1,
        name: 'Jamie Smith',
        role: 'Product Photographer'
      },
      {
        id: 2,
        name: 'Taylor Chen',
        role: 'Makeup Artist'
      },
      {
        id: 3,
        name: 'Jordan Lee',
        role: 'Videographer'
      }
    ])

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const createPost = () => {
      if (!newPostContent.value.trim()) return

      const newPost = {
        id: posts.value.length + 1,
        user: { name: 'You', avatar: '' },
        content: newPostContent.value,
        likes: 0,
        comments: [],
        createdAt: new Date()
      }

      posts.value.unshift(newPost)
      newPostContent.value = ''
    }

    return {
      newPostContent,
      posts,
      events,
      suggestedUsers,
      formatDate,
      createPost
    }
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed;
}

.btn-outline {
  @apply border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors;
}
</style>