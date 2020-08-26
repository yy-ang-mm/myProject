import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/menu',
          component: () => import('@/views/menu/index'),
          meta: {
            name: '菜单管理'
          }
        },
        {
          path: '/user',
          component: () => import('@/views/user/index'),
          meta: {
            name: '管理员管理'
          }
        },
        {
          path: '/role',
          component: () => import('@/views/role/index'),
          meta: {
            name: '角色管理'
          }
        },
        {
          path: '/cate',
          component: () => import('@/views/cate/index'),
          meta: {
            name: '商品分类'
          }
        },
        {
          path: '/specs',
          component: () => import('@/views/specs/index'),
          meta: {
            name: '商品规格'
          }
        },
        {
          path: '/goods',
          component: () => import('@/views/goods/index'),
          meta: {
            name: '商品管理'
          }
        },
        {
          path: '/home',
          component: () => import('@/views/home')
        },
        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
