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
    <el-form  :model="loginForm" :rules="loginRules" ref="loginForm" class="loginForm">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="手机号/企业账号" class="mb-20"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-row class="mt-5">
        <el-checkbox label="记住密码" class="fl" v-model="loginForm.rememberPsd" style="-webkit-app-region: no-drag"></el-checkbox>
        <el-button type="text" @click="goFindPassword()" class="fr lh-18">忘记密码</el-button>
      </el-row>
      <el-row class="mt-40">
        <el-button type="primary" @click="submitForm('loginForm')" class="loginButton ml-85 fl w-210">登录</el-button>
        <el-button type="text" @click="$router.back(-1)" class="lh-34">返回</el-button>
      </el-row>
    </el-form>
    <div class="bottomRow clearfix">
      <el-button type="text" @click="$router.push({path: '/register'})" class="fl ml-12 lh-30">立即注册</el-button>
      <el-button type="text" icon="iconfont icon-pc-icon-6" class="fr mr-12 WeChatLoginBtn" @click="$router.push({path: '/loginWeChat'})">微信登录</el-button>
    </div>
  </div>
</template>
<script>
  // import {webGetOpenId, webLogin} from '@/api/user'
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
      weixinLogin () {
        console.log(1)
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
          width: 560,
          height: 416,
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