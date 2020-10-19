import store from './store.js'

const { createRouter, createWebHistory } = VueRouter
const routerHistory = createWebHistory()

const AuthGuard = async (to, from, next) => {
  // console.log('AuthGuard', store)
  const loggedIn = Boolean(store.state.user)
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (loggedIn === requiresAuth) {
    return next()
  } else if (!loggedIn && requiresAuth) {
    return next('/signin')
  } else if (loggedIn && !requiresAuth) {
    return next('/predict')
  } else {
    // should not get here
    // console.log(loggedIn, requiresAuth)
    return next('/signin')
  }
}

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      meta: { requiresAuth: true, layout: 'layout-secure' },
      beforeEnter: AuthGuard,
      // props: (route) => {
      //   return { storeName: route.name, parentId: route.params.parentId || null }
      // },
      path: '/predict',
      component: () => import('./views/predict/index.js'),
      name: 'predict'
    },
    {
      meta: { requiresAuth: true, layout: 'layout-secure' },
      beforeEnter: AuthGuard,
      path: '/cnn-train',
      component: () => import('./views/cnnTrain.js'),
      name: 'cnn-train'
    },
    {
      meta: { requiresAuth: true, layout: 'layout-secure' },
      beforeEnter: AuthGuard,
      path: '/yolov5-train',
      component: () => import('./views/yolov5Train.js'),
      name: 'yolov5-train'
    },
    {
      meta: { requiresAuth: true, layout: 'layout-secure' },
      beforeEnter: AuthGuard,
      path: '/cnn-models',
      component: () => import('./views/cnnModels.js'),
      name: 'cnn-models'
    },
    {
      meta: { requiresAuth: false, layout: 'layout-public' },
      path: '/',
      component: () => import('./views/signin.js'),
      name: 'signIn'
    },
    {
      meta: { requiresAuth: false, layout: 'layout-public' },
      path: '/:catchAll(.*)',
      name: 'catchAll',
      redirect: { name: 'signIn' }
    }, // should have 404 page
  ]
})

export default router
