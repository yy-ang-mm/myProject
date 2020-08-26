import Vue from 'vue'
import Router from 'vue-router'
// 调用路由插件
Vue.use(Router)

export default new Router({
  routes: [
    // 一级路由
    {
      path: '/home',
      // 路由懒加载
      component: () => import('@/components/home'),
      children: [
        {
          path: '/index',
          component: () => import('@/components/erjirouter/index'),
        },
        {
          path: '/shopcart',
          component: () => import("@/components/erjirouter/shopcart"),
        },
        {
          path: '/mime',
          component: () => import("@/components/erjirouter/mime")
        },
        {
          path: '/search',
          component: () => import("@/components/erjirouter/search")
        },
        {
          path: '/order',
          component: () => import("@/components/erjirouter/order")
        },
        // 二级路由重定向
        {
          path: '',
          redirect: '/index'
        }
      ]
    },
    {
      path: '/classify',
      component: () => import('@/components/classify'),
      name: 'classify'
    },
    {
      path: '/shopDetail',
      component: () => import('@/components/shopDetail')
    },
    {
      path: '/login',
      component: () => import('@/components/login'),
    }, {
      path: '/register',
      component: () => import('@/components/register')
    },
    // 重定向
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
