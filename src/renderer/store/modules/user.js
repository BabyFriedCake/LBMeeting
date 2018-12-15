import { login, logout, getInfo } from '@/api/user'
import { getCookie, setCookie, delCookie } from '@/utils/storage'

const TokenKey = 'Meeting-Admin-Token'
const UserInfo = 'Meeting-Admin-UserInfo'
const UserId = 'Meeting-Admin-UserId'
const UserAccessChain = 'Meeting-Admin-AccessChain'
const MenuFold = 'Meeting-Admin-MenuFold'
const UserType = 'Meeting-Admin-UserType'
const LoginLogo = 'Meeting-Login-Logo'
const LoginBackground = 'Meeting-Login-Background'

const user = {
  state: {
    token: getCookie(TokenKey),
    userId: getCookie(UserId),
    userInfo: JSON.parse(decodeURI(getCookie(UserInfo))),
    accessChain: getCookie(UserAccessChain),
    userType: getCookie(UserType),
    // menuFold: (getCookie(MenuFold) === 'false' || getCookie(MenuFold) === null) ? false : true
    menuFold: !((getCookie(MenuFold) === 'false' || getCookie(MenuFold) === null)),
    // 定制化logo
    loginLogo: getCookie(LoginLogo),
    loginBackground: getCookie(LoginBackground),
    // 屏幕分辨率
    screenWidth: 0,
    screenHeight: 0,
    // 购买弹窗
    buyPopOpen: false
    /*
    userInfo的结构：
    "createTime",
    "departmentId",
    "departmentName",
    "enterpriseId",`
    "enterpriseName",
    "userEmail",
    "userId",
    "userName",
    "userPassword",
    "userPhone",
    "userRole",
    "userType"
    */
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      // debugger
      state.token = token
      setCookie(TokenKey, token)
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
      setCookie(UserId, userId)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      setCookie(UserInfo, userInfo)
    },
    SET_ACCESSCHAIN: (state, accessChain) => {
      state.accessChain = accessChain
      setCookie(UserAccessChain, accessChain)
    },
    SET_USERTYPE: (state, userType) => {
      state.userType = userType
      setCookie(UserType, userType)
    },
    SET_FLOD: (state, menuFold) => {
      state.menuFold = menuFold
      setCookie(MenuFold, menuFold)
    },
    screenWidth: (state, num) => {
      state.screenWidth = num
    },
    screenHeight: (state, num) => {
      state.screenHeight = num
    },
    SET_Logo: (state, loginLogo) => {
      /*eslint-disable*/ 
      debugger
      state.loginLogo = loginLogo
      setCookie(LoginLogo, loginLogo)
    },
    SET_Background: (state, loginBackground) => {
      /*eslint-disable*/ 
      debugger
      state.loginBackground = loginBackground
      setCookie(LoginBackground, loginBackground)
    }
  },
  actions: {
    // 登录
    Login ({ commit }, loginInfo) {
      // debugger
      // const loginInput = loginInfo.loginInput
      // console.info(loginInput)
      return new Promise((resolve, reject) => {
        login(loginInfo.loginInput, loginInfo.password,loginInfo.loginClient).then(response => {
          console.log(response.value)
          console.log(commit)
          commit('SET_TOKEN', response.value)
          // commit('SET_USERID', response.value.userId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.info(state.token)
        getInfo().then(response => {
          
          commit('SET_USERINFO', response.value)
          const getUser = response.value
          var userType = ''
          if (getUser.company && getUser.companyId != '') {
            userType = 'company'
            // this.$router.push({
            //   path: '/admin/meetingroom_company'
            // })
          } else {
            userType = 'user'
          }
          let userAccessChain = '000'
          switch (userType) {
            // 超级管理员
            case 0:
              userAccessChain = '100'
              break
              // 企业管理员
            case 1:
              userAccessChain = '010'
              break
              // 普通员工
            case 2:
              userAccessChain = '001'
              break
              // 个人用户
            case 3:
              userAccessChain = '001'
              break
          }
          commit('SET_ACCESSCHAIN', userAccessChain)
          commit('SET_USERTYPE', userType)
          var screenWidth = document.body.clientWidth
          var screenHeight = document.body.clientHeight
          // console.log('client'+document.body.clientWidth)
          commit('screenWidth', screenWidth)
          commit('screenHeight', screenHeight)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USERINFO', null)
          commit('SET_USERID', '')
          commit('SET_ACCESSCHAIN', '000')
          commit('SET_USERTYPE', '')
          commit('SET_FLOD', true)
          // commit('SET_Logo','')
          // commit('SET_Background','')
          delCookie(TokenKey)
          delCookie(UserInfo)
          delCookie(UserId)
          delCookie(UserAccessChain)
          delCookie(UserType)
          delCookie(MenuFold)
          // delCookie(LoginLogo)
          // delCookie(LoginBackground)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user