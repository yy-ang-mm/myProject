import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//获取本地存储中的登录信息
let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : ''
// 查找登录时每个角色存在的url
function getUrl(url) {
  return userInfo.menus_url.some(item => item == url)
}


const route = new Router({
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
          },
          beforeEnter(to, from, next) {
            getUrl('/menu') ? next() : next('/home')
          }
        },
        {
          path: '/user',
          component: () => import('@/views/user/index'),
          meta: {
            name: '管理员管理'
          },
          beforeEnter(to, from, next) {
            getUrl('/user') ? next() : next('/home')
          }
        },
        {
          path: '/role',
          component: () => import('@/views/role/index'),
          meta: {
            name: '角色管理'
          },
          beforeEnter(to, from, next) {
            getUrl('/role') ? next() : next('/home')
          }
        },
        {
          path: '/cate',
          component: () => import('@/views/cate/index'),
          meta: {
            name: '商品分类'
          },
          beforeEnter(to, from, next) {
            getUrl('/cate') ? next() : next('/home')
          }
        },
        {
          path: '/specs',
          component: () => import('@/views/specs/index'),
          meta: {
            name: '商品规格'
          },
          beforeEnter(to, from, next) {
            getUrl('/specs') ? next() : next('/home')
          }
        },
        {
          path: '/member',
          component: () => import('@/views/member/index'),
          meta: {
            name: '会员管理'
          },
          beforeEnter(to, from, next) {
            getUrl('/member') ? next() : next('/home')
          }
        },
        {
          path: '/banner',
          component: () => import('@/views/banner/index'),
          meta: {
            name: '轮播图管理'
          },
          beforeEnter(to, from, next) {
            getUrl('/banner') ? next() : next('/home')
          }
        },
        {
          path: '/seck',
          component: () => import('@/views/seck/index'),
          meta: {
            name: '限时秒杀管理'
          },
          beforeEnter(to, from, next) {
            getUrl('/seck') ? next() : next('/home')
          }
        },
        {
          path: '/goods',
          component: () => import('@/views/goods/index'),
          meta: {
            name: '商品管理'
          },
          beforeEnter(to, from, next) {
            getUrl('/goods') ? next() : next('/home')
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

//登录权限之全局导航守卫
route.beforeEach((to, from, next) => {
  // 判断是否进入的是登录页面
  if (to.path == '/login') {
    next()
    // return 不再执行下一步
    return
  }
  // 如果进入的不是登录页，就判断是否已登录
  // 获取本地存储中的token,登陆了就有token,没有登录就没有token
  let token = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : ''
  if (token) {
    next()
    return
  }
  //如果以上两个都没有就跳转到登录
  next('/login')

})

export default route
