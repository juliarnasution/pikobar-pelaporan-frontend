import requestServer from '@/api'
import request from '@/utils/request'
import {
  getRequestDetailHomeAdress
} from '@/utils/utilsFunction'

export default {
  async listReportCase({ commit }, params) {
    try {
      const response = await requestServer('/api/cases', 'GET', params)
      if (response.data === null) {
        commit('SET_TOTAL_LIST_PASIEN', 1)
        commit('SET_TOTAL_DATA_PASIEN', 0)
        commit('SET_LIST_PASIEN', [])
      } else {
        commit('SET_TOTAL_LIST_PASIEN', response.data._meta.totalPages)
        commit('SET_TOTAL_DATA_PASIEN', response.data._meta.itemCount)
        commit('SET_LIST_PASIEN', response.data.cases)
      }
      return response
    } catch (error) {
      return error.response
    }
  },
  async createReportCase({ commit }, data) {
    try {
      const response = await requestServer('/api/cases', 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async createReportCaseV2({ commit }, data) {
    try {
      const response = await requestServer('/api/v2/cases', 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async getCases({ commit }, params) {
    try {
      const response = await requestServer('/api/cases/list-idcase', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async updateReportCase({ commit }, data) {
    const id_case = await data.id
    await delete data['id']
    try {
      const response = await requestServer(`/api/cases/${id_case}`, 'PUT', data.data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async detailReportCase({ commit }, id) {
    try {
      const response = await requestServer(`/api/cases/${id}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async deleteReportCase({ commit }, id) {
    try {
      const response = await requestServer(`/api/cases/${id}`, 'DELETE')
      return response
    } catch (error) {
      return error.response
    }
  },
  async detailHistoryCase({ commit }, id) {
    try {
      const response = await requestServer(`/api/cases/${id}/last-history`, 'GET')
      return response.data[0]
    } catch (error) {
      return error.response
    }
  },
  async countReportCase({ commit }, params) {
    try {
      const response = await requestServer('/api/cases-summary', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async countReportCaseFinal({ commit }, params) {
    try {
      const response = await requestServer('/api/cases-summary-final', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async listHistoryCase({ commit }, id) {
    try {
      const response = await requestServer(`/api/cases/${id}/history`, 'GET')
      const afterResponse = response.data.filter(async(item) => {
        if (item.current_location_type === 'RUMAH') {
          const address = await getRequestDetailHomeAdress(
            item.current_location_village_code,
            item.current_location_address
          )
          item['homeAddress'] = address
        }
      })
      return afterResponse
    } catch (error) {
      return error.response
    }
  },
  async createHistoryCase({ commit }, data) {
    try {
      const response = await requestServer('/api/history_cases', 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async exportExcel({ commit }, params) {
    try {
      const response = await request({
        url: `/api/cases-export`,
        method: 'GET',
        params: params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      return error.response
    }
  },
  async exportExcelDailyReport({
    commit
  }, params) {
    try {
      const response = await request({
        url: `/api/reports/daily-report-xls`,
        method: 'GET',
        params: params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      return error.response
    }
  },
  async importExcel({ commit }, data) {
    try {
      const response = await requestServer('/api/cases-import', 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async listNameCase({ commit }, params) {
    try {
      const response = await requestServer(`/api/cases-listid`, 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async getNik({ commit }, nik) {
    try {
      const response = await requestServer(`/api/cases-by-nik/${nik}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async listMedicalFacility({ commit }, params) {
    try {
      const response = await requestServer('/api/users-listid', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async verifyCase({ commit }, params) {
    const id = params.id
    const data = params.data
    try {
      const response = await requestServer(`/api/cases/${id}/verifications`, 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async countVerificationCase({ commit }) {
    try {
      const response = await requestServer('/api/cases-summary-verification', 'GET')
      commit('SET_TOTAL_PENDING', response.data.PENDING)
      return response
    } catch (e) {
      return e
    }
  },
  async printPEForm({ commit }, id) {
    try {
      const response = await request({
        url: `/api/cases/${id}/export-to-pe-form`,
        method: 'GET',
        responseType: 'blob'
      })
      return response
    } catch (error) {
      return error.response
    }
  },
  async hospitalRefferalNewCase({ commit }, data) {
    try {
      const response = await requestServer(`/api/cases-transfer`, 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async caseHospitalRefferal({ commit }, params) {
    const id = params.id
    const data = params.data
    try {
      const response = await requestServer(`/api/cases/${id}/transfers`, 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async caseHospitalRefferalRevise({ commit }, params) {
    const {
      idCase,
      idTransfer,
      data
    } = params
    try {
      const response = await requestServer(`api/cases/${idCase}/transfers/${idTransfer}/revise`, 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async caseHospitalReferralInOut({ commit }, data) {
    const {
      type,
      params
    } = data
    try {
      const response = await requestServer(`/api/cases-transfer/${type}`, 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async caseHospitalReferralSummary({ commit }, data) {
    const {
      type
    } = data
    try {
      const response = await requestServer(`/api/cases-transfer-summary/${type}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async actionHospitalReferral({ commit }, params) {
    const {
      idCase,
      idTransfer,
      actions,
      body
    } = params
    try {
      const response = await requestServer(`api/cases/${idCase}/transfers/${idTransfer}/${actions}`, 'POST', body)
      return response
    } catch (error) {
      return error.response
    }
  },
  async caseHospitalReferralHistory({ commit }, id) {
    try {
      const response = await requestServer(`/api/cases/${id}/transfers`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async revampGetNik({ commit }, params) {
    try {
      const response = await requestServer('/api/cases-revamp/check', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async casesList({ commit }, params) {
    try {
      const response = await requestServer(`/api/cases-listid`, 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
  async createRevampReportCase({ commit }, data) {
    try {
      const response = await requestServer('/api/cases-revamp', 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async updateCloseContact({ commit }, data) {
    const id_close_contact = await data.id
    await delete data['id']
    try {
      const response = await requestServer(`/api/cases-revamp/${id_close_contact}/contact`, 'PUT', data.data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async addCloseContact({ commit }, data) {
    const id_case = await data.id
    await delete data['id']
    try {
      const response = await requestServer(`/api/cases-revamp/${id_case}/contact`, 'POST', data.data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async correctCaseReport({ commi }, data) {
    const id_case = await data.id
    await delete data['id']
    try {
      const response = await requestServer(`/api/cases/${id_case}/verifications-revise`, 'PUT', data.data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async getDailyReport({ commit }, params) {
    try {
      const response = await requestServer(`/api/reports/daily-report`, 'GET', params)
      return response.data
    } catch (error) {
      return error.response
    }
  },
  resetListCase({ commit }) {
    commit('RESET_LIST_CASE')
  },
  resetFormPasien({ commit }) {
    commit('RESET_FORM_PASIEN')
  },
  resetRiwayatFormPasien({ commit }) {
    commit('RESET_RIWAYAT_FORM_PASIEN')
  }
}
