<template>
  <div class="loginPage">
    <div class="winOperateBtn">
      <Titlebtn type="min" windowType="login" />
      <Titlebtn type="close" windowType="login" />
    </div>
    <div class="loginHeader">
      <img src="@/assets/images/luobologo.png" alt="">
      <h3>登录</h3>
    </div>
    <!-- 微信扫码 -->
    <el-form  :model="loginForm" :rules="loginRules" ref="loginForm" class="loginForm">
      <WxLogin class="wx" :appid="appid" :scope="scope" :redirect_uri="redirect_uri" :href="href"></WxLogin>
      <el-row class="mt-40">
        <el-button type="primary"  @click="$router.back(-1)" class="loginButton ml-85 fl w-210">返回</el-button>
      </el-row>
    </el-form>
    
    
  </div>
</template>
<script>
  import {webGetOpenId, webLogin} from '@/api/user'
  // import WxLogin from 'vue-wxlogin'
  import Titlebtn from '@/components/common/Titlebtn.vue'
  import {
    validateTelephone,
    validatePassword,
    validateAccount
  } from '@/utils/validate'
  import {
    openNewWindow
  } from '@/utils/function.js'
  
  // import {
  //   setTimeout
  // } from 'timers'
  export default {
    data () {
      // 用户名验证规则(手机号或邮箱)
      const validateUsername = (rule, value, callback) => {
        const Telephone = validateTelephone(value)
        const Account = validateAccount(value)
        if (value === '') {
          callback(new Error('请输入手机号/企业账号'))
        } else if (Telephone === false && Account === false) {
          callback(new Error('请输入正确的手机号/企业账号'))
        } else {
          callback()
        }
      }
      // 密码
      const validatePsd = (rule, value, callback) => {
        const psd = validatePassword(value)
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (psd === false) {
          callback(new Error('字母或者数字组合，长度6-35位'))
        } else {
          callback()
        }
      }
      return {
        active: 0,
        loginForm: {
          username: '',
          password: '',
          rememberPsd: true
        },
        loginRules: {
          username: [{
            validator: validateUsername,
            trigger: 'blur'
          }],
          password: [{
            validator: validatePsd,
            trigger: 'blur'
          }]
        }
      }
    },
    components: {
      Titlebtn
    },
    methods: {
      getCode () {
        if (window.location.href.indexOf('code') >= 0) {
          this.activeBar = 1
          let url = window.location.href.split('?')[1]
          this.code = url.substring(5, url.indexOf('&'))
          const params = {
            code: this.code
          }
          webGetOpenId(Object.assign({}, params)).then(res => {
            if (res.state === 200) {
              this.unionId = res.value.unionId
              this.webOpenId = res.value.webOpenId
              const params2 = {
                openId: this.webOpenId,
                unionId: this.unionId
              }
              webLogin(Object.assign({}, params2)).then(result => {
                if (res.state === 200) {
                  this.$store.commit('SET_TOKEN', result.value)
                  this.$store.dispatch('GetInfo').then((response) => {
                    this.$router.push({
                      path: '/admin'
                    })
                  })
                }
              })
            }
          })
        } else {
          this.activeBar = 0
        }
      },
      goFindPassword () {
        this.$router.push({
          path: '/findPassword'
        })
      },
      submitForm (loginForm) {
        // alert(1)
        console.log(this.$store)
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            /* eslint-disable */
            // debugger
            this.$store.originalDispatch('Login', {
              loginInput: this.loginForm.username,
              password: this.loginForm.password,
              loginClient: "2"
            }).then((response) => {
              // 登录成功
              /* eslint-disable */
              // console.log(this.$store)
              // // debugger
              this.$store.originalDispatch('GetInfo').then(res => {
                //记住密码
                if (this.loginForm.rememberPsd) {
                  let rememberInfo = {
                    'User': this.loginForm.username,
                    'Psd': this.loginForm.password
                  }
                  localStorage.setItem('rememberInfo', JSON.stringify(rememberInfo))
                }
              console.log(this.$store.state.user.userInfo)
                //打开main
                this.toMain()
                // var self = this
                // setTimeout(function () {
                //   console.log(self.$store)
                // }, 1500)
              })
            })
          }
        })
      },
      toMain() {
        // browserWindow 配置
        const windowConfig = {
          params: 'main',
          width: 280,
          height: 720,
          useContentSize: true,
          webSecurity: false,
          transparent: true,
          frame: false, // 无边框窗口
          resizable: true
        }
        // browserWindow 成功回调、事件处理（详看api）
        openNewWindow(windowConfig)
          .then((win) => {
            win.on('close', () => win.close())
          })
      }
    },
    mounted() {
      this.getCode()
      console.log(this.$store)
      let rememberInfo = localStorage.getItem("rememberInfo")
      rememberInfo = JSON.parse(rememberInfo)
      if (rememberInfo) {
        this.loginForm.username = rememberInfo.User
        this.loginForm.password = rememberInfo.Psd
      }
    }
  }
</script>
<style scoped>
 @import '../../../assets/css/login.css';
</style>