import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AggregateRoutes from './AggregateRoutes'
import Logger from '@/lib/logger'

Vue.use(VueRouter)

const aggregateRoutes = AggregateRoutes.findAll()

let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }]
routes = routes.concat(aggregateRoutes)

routes.push({
  path: '/admin',
  name: 'Admin',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '@/app/views/Admin.vue'),
  meta: {
    requiresAuth: true
  }
})

routes.push({
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '@/app/views/About.vue')
})

const router = new VueRouter({
  mode: 'history',
  routes
})

function isAuthenticated () {
  Logger.debug('isAuthenticated?', 'router')
  const accessToken = localStorage.getItem('accessToken')
  Logger.debug(accessToken, 'router')
  return accessToken
}

router.beforeEach((to, from, next) => {
  Logger.debug('From: to:')
  const rou = (ro) => ({
    name: ro.name,
    path: ro.path,
    query: ro.query,
    params: ro.params,
    fullPath: ro.fullPath,
    meta: ro.meta
  })
  Logger.debug(JSON.stringify(rou(from), null, 2), 'routes')
  Logger.debug(JSON.stringify(rou(to), null, 2), 'routes')
  Logger.debug('----------------------------------------')
  if (to.name === 'Home' && isAuthenticated()) {
    // = / and is Authenticated to = admin
    next({
      path: '/admin'
    })
    return
  }
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    Logger.debug('doesnt requires auth', 'Auth')
    next()
    return
  }
  Logger.debug('requires auth', 'router')
  if (!isAuthenticated()) {
    Logger.debug('is not authenticated.', 'router')
    Logger.debug(to.fullPath, 'router')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }
  Logger.debug('Is authenticated', 'router')
  next()
  // TODO implement role based access
  // let user = JSON.parse(localStorage.getItem('user'))
  // if (to.matched.some(record => record.meta.is_admin)) {
  //   if (user.is_admin == 1) {
  //     next()
  //   } else {
  //     next({ name: 'userboard' })
  //   }
  // }
})

export default router
