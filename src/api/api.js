import {
  fetch,
  post
} from './isAxios'
import request from './request'

// 封装api
export const server = {
  // 登录方法
  toLogin(data) {
    return post(`/admin/admin/login?name=${data.name}&pwd=${data.pwd}`, data)
    // return post('/admin/admin/login', data)

  },
  // 获取管理原列表
  getAdminList(data) {
    return post('/admin/admin/selectAllAdmin', data)
    // /admin/admin/selectAllAdmin?page=${data.page}&limit=${data.limit}
  },
  // 新建角色的接口
  Addadmins(data) {
    return post('/admin/admin/addAdmin', data)
  },
  // 搜索接口管理员
  searchAdmin(data) {
    return post('/admin/admin/selectAdminByMsg', data)
  },
  // 修改管理员
  updateAdmin(data) {
    return post('/admin/admin/updateAdminById', data)
  },
  // 获取角色的接口
  getRoleListSlect(data) {
    return fetch('/admin/role/selectAllRole', data)
  },
  //id账号回显修改
  getAdminById(data) {
    return fetch(`/admin/admin/selectAdminById?id=${data.id}`, data)
  },
  // 删除管理员
  deleteAdmin(data) {
    return fetch('/admin/admin/deleteAdmin', data)
  },
  // 获取角色列表
  getRoleList(data) {
    return fetch('/admin/role/selectAllRoles', data)
  },
  // 模糊查询角色接口
  getSreachRoleList(data) {
    return fetch('/admin/role/selectRoleByMsg', data)
  },
  // 删除角色
  Deletroles(data) {
    return fetch('/admin/role/deleteRole', data)
  },
  // 操作日志的接口
  Getopration(data) {
    return fetch('/admin/log/seletAllLog', data)
  },
  // 日志模糊搜素
  SrechOpratin(data) {
    // return fetch (`/admin/log/selectLogByMsg?msg=${data.msg}&from=${data.from}&to=${data.to}&page=${data.page}&limit=${data.limit}`,data)
    return fetch('/admin/log/selectLogByMsg', data)
  },
  // 权限数据
  GetaccessArr(data) {
    return fetch('/admin/menu/selectAllMenu', data)
  },
  // 新增角色权限
  AddroleAceess(data) {
    return post('/admin/role/addRole', data)
  },
  // 修改密码接口
  updatePwd(data) {
    return post('/admin/admin/updateAdminByName', data)
  },
  // 角色编辑的接口
  getRoleClass(data) {
    return post('/admin/role/editRole', data)
  }

}