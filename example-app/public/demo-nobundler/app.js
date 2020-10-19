import Secure from './layouts/secure.js'
import Public from './layouts/public.js'

const { onMounted, computed } = Vue
const { useStore } = Vuex
const { useRoute } = VueRouter

export default {
  components: {
    'layout-secure': Secure,
    'layout-public': Public
  },

  template: /*html*/`
    <div>
      <component :is="route.meta.layout || 'layout-public'"></component>
    </div>
  `,
  // template: /*html*/`
  //   <div>
  //     <!-- h1>App<a href="/index.html">Back To Express Demo</a></h1 -->
  //     <layout-public v-if="!storeUser" />
  //     <layout-secure v-else />
  //   </div>
  // `,
  setup() {
    const store = useStore()
    const route = useRoute()
    const storeUser = computed(() => store.state.user)

    onMounted(async () => {
      console.log('App mounted!', store.state.user)
    })

    return {
      route,
      storeUser
    }
  }
}
