import Layout from '@/layout'
import { rolesPerm } from '@/utils/constantVariable'

const dashboardRouter = {
  path: '/',
  component: Layout,
  redirect: '/',
  meta: {
    title: 'dashboard',
    icon: 'dashboard',
    roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA, rolesPerm.FASKES]
  },
  active: false,
  children: [
    // {
    //   path: '/',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: {
    //     title: 'dashboard_case',
    //     icon: 'dashboard',
    //     child: true,
    //     noCache: true,
    //     roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
    //   }
    // },
    {
      path: '/',
      component: () => import('@/views/Dashboard/CaseNew'),
      meta: {
        title: 'dashboard_case_new',
        icon: 'dashboard',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA, rolesPerm.FASKES]
      }
    },
    {
      path: '/dashboard/test-result',
      component: () => import('@/views/Dashboard/TestResult'),
      meta: {
        title: 'dashboard_test_result',
        icon: 'dashboard',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA, rolesPerm.FASKES]
      }
    }
  ]
}

export default dashboardRouter
