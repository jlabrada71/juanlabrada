export default class AggregateRoutes {
  static findAll () {
    const routes = []
    const testRoute = {
      path: '/test',
      name: 'Test',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "customers" */ '@/test-vuetify/views/TestView.vue')
    }
    routes.push(testRoute)
    /* Do not remove: new entity */
    const filesRoute = {
      path: '/files',
      name: 'Files',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "files" */ '@/files/views/FilesView.vue')
    }
    routes.push(filesRoute)
    const loginRoute = {
      path: '/login',
      name: 'Login',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ '@/login/views/LoginView.vue')
    }
    routes.push(loginRoute)
    const customersRoute = {
      path: '/customers',
      name: 'Customers',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "customers" */ '@/customers/views/CustomerView.vue'),
      meta: {
        requiresAuth: true
      }
    }
    routes.push(customersRoute)
    const productsRoute = {
      path: '/products',
      name: 'Products',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "products" */ '@/products/views/ProductView.vue'),
      meta: {
        requiresAuth: true
      }
    }
    routes.push(productsRoute)

    const notesRoute = {
      path: '/notes',
      name: 'Notes',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "notes" */ '@/note/views/NoteView.vue'),
      meta: {
        requiresAuth: true
      }
    }
    routes.push(notesRoute)

    const questionsRoute = {
      path: '/questions',
      name: 'Questions',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "questions" */ '@/questions/views/QuestionView.vue'),
      meta: {
        requiresAuth: true
      }
    }
    routes.push(questionsRoute)

    const ordersRoute = {
      path: '/orders',
      name: 'Orders',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orders" */ '@/orders/views/OrderView.vue'),
      meta: {
        requiresAuth: true
      }
    }
    routes.push(ordersRoute)
    const categorysRoute = {
      path: '/categorys',
      name: 'Categorys',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "categorys" */ '@/categories/views/CategoryView.vue'),
      meta: {
        requiresAuth: true
      }
    }
    routes.push(categorysRoute)

    const productsForSaleRoute = {
      path: '/productsForSale',
      name: 'ProductsForSale',
      // the import generates a separate chunk.
      // The webpack magic coment sets the name to "whatever" (whatever.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "productForSale" */ '@/sales/views/ProductsForSaleView.vue'),
      meta: {
        requiresAuth: true
      }
    }
    routes.push(productsForSaleRoute)

    return routes
  }
}
