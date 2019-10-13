// 导入axios
import axios from 'axios'
// 导入Vue
import Vue from 'vue'
// 导入
import router from '../router/router'

// 创建一个副本 设置基地址
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
// axios的拦截器

// 添加请求的拦截器(回调函数，钩子函数，请求之前执行，添加自己的逻辑，比如统一设置token)
http.interceptors.request.use(
  function(config) {
    console.log('axios拦截器--request')
    // config.name='jack'
    // config.skill='唱跳rap'
    // 统一的设置token
    config.headers.Authorization = window.localStorage.getItem('token')
    // console.log(config)
    // 在发请求之后干一些事
    return config
  },
  function(error) {
    // 在请求失败的时候干一些事
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function(response) {
    console.log('axios拦截器--response')
    // console.log(response)
    if (
      response.data.meta.msg == '无效token' &&
      response.data.meta.status == 400
    ) {
      // 销毁token
      window.localStorage.clear()
      // 警告提示
      new Vue().$message.error(
        '哥们，你要小心一点，我已经盯上你了，晚上回家，看好路！！ [○･｀Д´･ ○]'
      )
      // 打会登录页
      router.push('/login')
    }
    // 在响应之前
    return response
  },
  function(error) {
    // 在响应出错的时候
    return Promise.reject(error)
  }
)

// 暴露 和接口相关的方法即可
// 接口抽取 - 登录验证接口
export const login = ({ username, password }) => {
  return http.post('login', {
    username,
    password
  })
}

// 接口抽取 - 用户数据列表
export const users = ({ query, pagenum, pagesize }) => {
  return http.get('users', {
    // get请求的参数 如何自动拼接
    params: {
      query,
      pagenum,
      pagesize
    }
    // 自行设置请求头
    // headers: {
    //   Authorization: window.localStorage.getItem('token')
    // }
  })
}

// 接口抽取 - 获取菜单数据
export const menus = () => {
  return http.get('/menus', {
    // 自行设置请求头
    // headers: {
    //   Authorization: window.localStorage.getItem('token')
    // }
  })
}

// 接口抽取 - 获取权限列表
export const rightList = () => {
  return http.get('/rights/list')
}

// 接口抽取 - 添加用户
export const addUser = ({ username, password, email, mobile }) => {
  return http.post('/users', { username, password, email, mobile })
}

// 接口抽取 - 删除用户
export const deleteUser = ({ id }) => {
  return http.delete(`/users/${id}`)
}
// 接口抽取 - 修改状态
export const updateUserState = ({ id, type }) => {
  return http.put(`/users/${id}/state/${type}`)
}

// 接口抽取 - 编辑用户提交
export const updateUserInfo = ({ id, email, mobile }) => {
  return http.put(`/users/${id}`, {
    email,
    mobile
  })
}

// 接口抽取 - 角色列表
export const roles = () => {
  return http.get('/roles')
}
// 接口抽取 - 分配用户角色
export const assignmentRole = ({ id, rid }) => {
  return http.put(`/users/${id}/role`, {
    rid
  })
}

// 接口抽取 - 删除角色指定权限
export const delRoleRight = ({ roleId, rightId }) => {
  return http.delete(`roles/${roleId}/rights/${rightId}`)
}

// 接口抽取 - 获取树形权限的接口
export const getRightsTree = () => {
  return http.get(`/rights/tree`)
}
// 接口抽取 -  为角色授权
export const giveRoleRights = ({ roleId, rids }) => {
  return http.post(`/roles/${roleId}/rights`, {
    rids
  })
}
// 接口抽取 -  商品数据列表
export const categories = () => {
  return http.get(`/categories`, {
    params: {
      type: 3
    }
  })
}
// 接口抽取 - 数据统计折线图
export const reports = () => {
  return http.get(`/reports/type/1`)
}
