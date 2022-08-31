
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/users', component: () => import('pages/UsersPage.vue') },
      { path: '/roles', component: () => import('pages/RolesPage.vue') },
      { path: '/permissions', component: () => import('pages/PermissionsPage.vue') }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
