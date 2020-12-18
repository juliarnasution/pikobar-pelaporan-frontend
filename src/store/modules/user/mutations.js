export default {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_DISTRICT: (state, district) => {
    state.district_user = district
  },
  SET_DISTRICT_NAME: (state, districtName) => {
    state.user_district_name = districtName
  },
  SET_UNIT_NAME: (state, unit_name) => {
    state.unitName = unit_name
  },
  SET_UNIT_TYPE: (state, unit_type) => {
    state.unitType = unit_type
  },
  SET_FULLNAME: (state, fullName) => {
    state.fullName = fullName
  },
  SET_PHONENUMBER: (state, phoneNumber) => {
    state.phoneNumber = phoneNumber
  },
  SET_LIST_USER: (state, data) => {
    state.userList = data
  },
  SET_TOTAL_LIST_USER: (state, data) => {
    state.totalList = data
  },
  RESET_FORM_USER: (state) => {
    state.formUser.username = ''
    state.formUser.password = ''
    state.formUser.email = ''
    state.formUser.role = ''
    state.formUser.code_district_city = ''
    state.formUser.name_district_city = ''
    state.formUser.address_subdistrict_code = ''
    state.formUser.address_subdistrict_name = ''
    state.formUser.address_village_code = ''
    state.formUser.address_village_name = ''
    state.formUser.address_street = ''
    state.formUser.fullname = ''
    state.formUser.phone_number = ''
  }
}
