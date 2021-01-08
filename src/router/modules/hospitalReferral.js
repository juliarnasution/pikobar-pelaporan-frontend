import Layout from '@/layout'
import {
  rolesPerm
} from '@/utils/constantVariable'

const hospitalReferralRouter = {
  path: '/hospital-referral',
  component: Layout,
  redirect: '/hospital-referral/list',
  meta: {
    title: 'refer_patient',
    icon: 'mdi-account-switch',
    roles: ['superadmin', 'faskes']
  },
  active: false,
  children: [
    {
      path: '/hospital-referral/create',
      component: () => import('@/views/HospitalReferral/form'),
      meta: {
        title: 'make_referral',
        icon: 'mdi-account-switch',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.FASKES]
      }
    },
    {
      path: '/hospital-referral/list',
      component: () => import('@/views/HospitalReferral/list'),
      meta: {
        title: 'referral_patient_list',
        icon: 'mdi-account-switch',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.FASKES]
      }
    }
  ]
}

export default hospitalReferralRouter
