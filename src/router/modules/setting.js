import Layout from '@/layout'
import {
  rolesPerm
} from '@/utils/constantVariable'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/user/list',
  meta: {
    title: 'setting',
    icon: 'mdi-settings',
    roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
  },
  active: false,
  children: [
    {
      path: '/user/list',
      component: () => import('@/views/User/List'),
      meta: {
        title: 'user_management',
        icon: 'mdi-account-multiple',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
      }
    },
    {
      path: '/user/create',
      component: () => import('@/views/User/FormUser'),
      hidden: true,
      meta: {
        title: 'user_create',
        icon: 'mdi-book-plus',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
      }
    },
    {
      path: '/user/detail/:id',
      component: () => import('@/views/User/Detail'),
      hidden: true,
      meta: {
        title: 'user_detail',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
      }
    },
    {
      path: '/user/edit/:id',
      component: () => import('@/views/User/EditUser'),
      hidden: true,
      meta: {
        title: 'user_edit',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
      }
    },
    {
      path: '/user/update',
      component: () => import('@/views/User/EditUser'),
      hidden: true,
      meta: {
        title: 'user_edit',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA, rolesPerm.FASKES]
      }
    },
    {
      path: '/change-password/:id',
      component: () => import('@/views/ChangePassword/index'),
      hidden: true,
      meta: {
        title: 'change_password',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN]
      }
    }
  ]
}

export default settingRouter
