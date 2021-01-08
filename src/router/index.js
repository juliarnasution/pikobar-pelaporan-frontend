import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import dashboardRouter from './modules/Dashboard'
import reportRouter from './modules/Pelaporan'
import rdtRouter from './modules/Rdt'
import settingRouter from './modules/Setting'
import distributionCaseRouter from './modules/DistributionCase'
import submissionLogistikRouter from './modules/SubmissionLogistik'
import dailyReportRouter from './modules/DailyReport'
import hospitalReferralRouter from './modules/HospitalReferral'
// import closeContactCase from './modules/CloseContactCase'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/Login/AuthRedirect'),
    hidden: true
  },
  {
    path: '/change-password',
    component: Layout,
    hidden: true,
    meta: {
      title: 'change_password'
    },
    children: [
      {
        path: '/change-password',
        component: () => import('@/views/ChangePassword/index'),
        hidden: true,
        meta: {
          title: 'change_password'
        }
      }
    ]
  },
  {
    path: '/user/update',
    component: Layout,
    hidden: true,
    meta: {
      title: 'update_profile'
    },
    children: [{
      path: '/user/update',
      component: () => import('@/views/User/EditUser'),
      hidden: true,
      meta: {
        title: 'update_profile'
      }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  dashboardRouter,
  distributionCaseRouter,
  dailyReportRouter,
  reportRouter,
  // closeContactCase,
  rdtRouter,
  submissionLogistikRouter,
  hospitalReferralRouter,
  settingRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
