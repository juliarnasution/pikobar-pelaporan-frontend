import Layout from '@/layout/DistributionCase'
import {
  rolesPerm
} from '@/utils/constantVariable'

const distributionCaseRouter = {
  path: '/distribution-case',
  component: Layout,
  redirect: '/distribution-case/network',
  meta: {
    title: 'distribution_case',
    icon: 'mdi-map-marker-radius',
    roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA, rolesPerm.FASKES]
  },
  active: false,
  children: [
    {
      path: '/distribution-case/map',
      component: () => import('@/views/DistributionCase/mapv2'),
      meta: {
        title: 'distribution_case_map',
        icon: 'mdi-map-marker-radius',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA, rolesPerm.FASKES]
      }
    },
    {
      path: '/distribution-case/network',
      component: () => import('@/views/DistributionCase/networkv2'),
      meta: {
        title: 'distribution_case_network',
        icon: 'location_on',
        child: true,
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA, rolesPerm.FASKES]
      }
    },
    {
      path: '/distribution-case/network/:id',
      component: () => import('@/views/DistributionCase/network_detail'),
      hidden: true,
      meta: {
        title: 'distribution_case_network',
        icon: 'location_on',
        noCache: true,
        roles: [rolesPerm.ADMIN, rolesPerm.DINKESPROV, rolesPerm.DINKESKOTA]
      }
    }
  ]
}

export default distributionCaseRouter
