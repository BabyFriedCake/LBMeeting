const getters = {
  token: state => state.user.token,
  userId: state => state.user.userId,
  userInfo: state => state.user.userInfo,
  accessChain: state => state.user.accessChain,
  menuFold: state => state.user.menuFold,
  approvalNum: state => state.app.approvalNum,
  winHeight: state => state.app.winHeight,
  userType: state => state.user.userType,
  isDot: state => state.app.isDot,
  searchContent: state => state.app.searchContent,
  screenWidth: state => state.user.screenWidth,
  screenHeight: state => state.user.screenHeight,
  loginLogo: state => state.user.loginLogo,
  loginBackground: state => state.user.loginBackground,
  selectTags: state => state.app.selectTags,
  rightClickperson: state => state.app.rightClickperson,
  roomDetails: state => state.app.roomDetails

}
export default getters
