// 导入Vue
import Vue from 'vue'

// 路由相关
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
// import index from '../views/index.vue'
// import login from '../views/login.vue'
// import notfound from '../views/notfound.vue'

// // 嵌套路由
// import users from '../views/users.vue'
// import roles from '../views/roles.vue'
// import rights from '../views/rights.vue'
// import categories from '../views/categories.vue'
// import orders from '../views/orders.vue'
// import reports from '../views/reports.vue'
// import params from '../views/params.vue'

// // 商品页面的路由规则
// import goods from '../views/goods/goods.vue'
// // 商品页面的嵌套路由
// import goodsIndex from '../views/goods/components/goodsIndex.vue'
// import goodsAdd from '../views/goods/components/goodsAdd.vue'

// 实现路由懒加载，代码拆分
const index = () => import('../views/index.vue')
const login = () => import('../views/login.vue')
const notfound = () => import('../views/notfound.vue')

// 嵌套路由
const users = () => import('../views/users.vue')
const roles = () => import('../views/roles.vue')
const rights = () => import('../views/rights.vue')
const categories = () => import('../views/categories.vue')
const orders = () => import('../views/orders.vue')
const reports = () => import('../views/reports.vue')
const params = () => import('../views/params.vue')

// 商品页面的路由规则
const goods = () => import('../views/goods/goods.vue')
// 商品页面的嵌套路由
const goodsIndex = () => import('../views/goods/components/goodsIndex.vue')
const goodsAdd = () => import('../views/goods/components/goodsAdd.vue')

// 规则
const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/index',
    // path: '/',
    component: index,
    // 添加元信息（盖章）
    meta: {
      // 需要验证
      needCheck: true,
      // 是否需要登录
      needLogin: true
    },
    // 嵌套路由
    children: [
      {
        path: 'users', // /index/users
        component: users
      },
      {
        path: 'roles', // /index/roles
        component: roles
      },
      {
        path: 'rights', // /index/rights
        component: rights
      },
      {
        path: 'goods', // /index/goods
        component: goods,
        // 嵌套路由
        children: [
          {
            path: '', // /index/goods
            component: goodsIndex
          },
          {
            path: 'add', // /index/goods/add
            component: goodsAdd
          }
        ]
      },
      {
        path: 'categories', // /index/categories
        component: categories
      },
      {
        path: 'orders', // /index/orders
        component: orders
      },
      {
        path: 'reports', // /index/reports
        component: reports
      },
      {
        path: 'params', // /index/params
        component: params
      }
    ]
  },
  // 找不到的路由
  {
    path: '/notfound',
    component: notfound
  },
  // 兜底
  {
    path: '*',
    redirect: '/notfound'
  }
]

// 创建路由
const router = new VueRouter({
  routes
})

// 全局前置守卫（回调函数）
router.beforeEach((to, from, next) => {
  console.log(to)
  // 根据地址判断
  // if (to.path.indexOf('/index') == 0) {
  // 使用元信息判断
  // if (to.meta.needLogin == true) {
  if (to.meta.needCheck == true) {
    // 去首页 判断登录
    // token
    if (window.localStorage.getItem('token') != undefined) {
      // 存在走你
      next()
    } else {
      // new一个实例出来
      new Vue().$message.error('滚犊子！！！')
      // 不存在
      router.push('/login')
    }
  } else {
    // 放过去
    next()
  }
})

// 暴露出去
export default router
