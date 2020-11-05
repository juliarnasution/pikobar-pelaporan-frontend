import store from '@/store'

export function completeAddress(districtCity, subDistrict, village, nameStreet) {
  const address = [
    nameStreet,
    village, ',',
    subDistrict, ',',
    districtCity
  ].join(' ')
    .replace(/(\s*,\s*)+/g, ', ')
    .replace(/\s+/g, ' ')
  return address
}

export async function getRequestDetailHomeAdress(villageCode, address) {
  const responseVillage = await store.dispatch('region/getDetailVillage', villageCode)
  const desa = responseVillage.data[0]
  return `${address}, ${desa.desa_nama}, ${desa.kecamatan_nama}, ${desa.kota_nama}`
}

export function groupAge(type, group) {
  const result = []
  const temp = []
  temp.push(group.find(x => x._id === 'bawah_5'))
  temp.push(group.find(x => x._id === '6_19'))
  temp.push(group.find(x => x._id === '20_29'))
  temp.push(group.find(x => x._id === '30_39'))
  temp.push(group.find(x => x._id === '40_49'))
  temp.push(group.find(x => x._id === '50_59'))
  temp.push(group.find(x => x._id === '60_69'))
  temp.push(group.find(x => x._id === '70_79'))
  temp.push(group.find(x => x._id === 'atas_80'))

  if (type === 'male') {
    for (let i = 0; i < temp.length; i++) {
      result.push(-Math.abs(varUndefined(temp[i])))
    }
  } else if (type === 'female') {
    for (let i = 0; i < temp.length; i++) {
      result.push(varUndefined(temp[i]))
    }
  }
  return result
}

export function varUndefined(variable) {
  if (typeof variable === 'undefined' || variable === null) {
    return 0
  }
  return Number(variable.count)
}

export function scrollUp(key) {
  const element = document.querySelector(key)
  if (element) {
    element.scrollIntoView()
  }
}

export function validateScrollUp() {
  const el = document.querySelector('.v-messages.error--text')
  this.$vuetify.goTo(el.parentElement.parentElement)
}

export function setUpDataCase2(caseV2, detail) {
  caseV2.interviewers_name = detail.interviewers_name
  caseV2.interviewers_phone_number = detail.interviewers_phone_number
  caseV2.interview_date = detail.interview_date
  caseV2.status = detail.status
  caseV2.final_result = detail.final_result
  caseV2.nik = detail.nik
  caseV2.is_nik_exists = detail.is_nik_exists
  caseV2.note_nik = detail.note_nik
  caseV2.is_phone_number_exists = detail.is_phone_number_exists
  caseV2.phone_number = detail.phone_number
  caseV2.note_phone_number = detail.note_phone_number
  caseV2.name = detail.name
  caseV2.gender = detail.gender
  caseV2.place_of_birth = detail.place_of_birth
  caseV2.birth_date = detail.birth_date
  caseV2.age = detail.age
  caseV2.month = detail.month
  caseV2.yearsOld = detail.yearsOld
  caseV2.monthsOld = detail.monthsOld
  caseV2.address_province_code = detail.address_province_code
  caseV2.address_province_name = detail.address_province_name
  caseV2.last_date_status_patient = detail.last_date_status_patient
  caseV2.address_district_code = detail.address_district_code
  caseV2.address_district_name = detail.address_district_name
  caseV2.address_subdistrict_code = detail.address_subdistrict_code
  caseV2.address_subdistrict_name = detail.address_subdistrict_name
  caseV2.address_village_code = detail.address_village_code
  caseV2.address_village_name = detail.address_village_name
  caseV2.address_street = detail.address_street
  caseV2.rt = detail.rt
  caseV2.rw = detail.rw
  caseV2.income = detail.income
  caseV2.nationality = detail.nationality
  caseV2.nationality_name = detail.nationality_name
  caseV2.occupation = detail.occupation
  caseV2.office_address = detail.office_address
  caseV2.report_source = detail.report_source
  caseV2.name_parents = detail.name_parents
  return caseV2
}
