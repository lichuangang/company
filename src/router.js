const routers = [
  {
    path: '/',
    component: (resolve) => require(['./views/index.vue'], resolve)
  },
  {
    path: '/grid/:type',
    component: (resolve) => require(['./views/grid.vue'], resolve)
  },
  {
    path: '/search',
    component: (resolve) => require(['./views/search.vue'], resolve)
  },
  {
    path: '/info/:id',
    component: (resolve) => require(['./views/info.vue'], resolve)
  }
]
export default routers
