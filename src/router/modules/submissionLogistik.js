import Layout from '@/layout'
import {
  rolesPerm
} from '@/utils/constantVariable'

const submissionLogistikRouter = {
  path: '/submission-logistik',
  component: Layout,
  redirect: '/submission-logistik/create',
  meta: {
    title: 'submission_Logistics',
    icon: 'mdi-clipboard-plus',
    roles: [rolesPerm.ADMIN, rolesPerm.DINKESKOTA, rolesPerm.FASKES]
  },
  active: false,
  children: [
    {
      path: '/submission-logistik/create',
      component: () => import('@/views/Logistik/SubmissionLogistik'),
      meta: {
        title: 'submission_Logistics',
        icon: 'mdi-clipboard-plus',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA, rolesPerm.FASKES]
      }
    }
  ]
}

export default submissionLogistikRouter
