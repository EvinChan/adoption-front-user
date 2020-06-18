const getters = {

  token: state => state.user.token,
  id: state => state.user.id,
  mobile: state => state.user.mobile,
  name: state => state.user.name,
  heading: state => state.user.heading,

  permission_routes: state => state.permission.routes,

  searchList: state => state.address.searchList,
  addressList: state => state.address.addressList

}
export default getters
