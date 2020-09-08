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
