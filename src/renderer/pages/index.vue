<template>
  <div class="loginPage">
  <div class="winOperateBtn">
    <Titlebtn type="min" />
    <Titlebtn type="close" />
  </div>
    <div class="drag" >
      <img src="@/assets/images/logo.png" alt="" >
    </div>
    <el-row class="mt-20">
        <el-button type="primary" @click="fasterEnter()" class="loginButton mgauto d-b w-210">快速入会</el-button>
      </el-row>
      <el-row class="mt-20">
        <el-button @click="goLogin()" class="loginButton mgauto d-b w-210">登录</el-button>
      </el-row>
    <div class="mt-40 pt-20 clearfix">
      <el-button type="text" @click="goRegister()" class="fl ml-12 lh-30">免费注册</el-button><span class="line-Y fl">|</span><el-button type="text" class="fl lh-30">体验会议室</el-button>
      <el-button type="text" icon="iconfont icon-pc-icon-6" class="fr mr-12 WeChatLoginBtn">微信登录</el-button>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import { validateTelephone, validatePassword, validateAccount } from '@/utils/validate'
import { openNewWindow } from '@/utils/function.js'
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
      loginForm: {
        loginInput: '',
        password: '',
        rememberPsd: false
      },
      loginRules: {
        loginInput: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePsd, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Titlebtn
  },
  methods: {
    fasterEnter () {
      this.$router.push({path: '/fasterEnter'})
    },
    goLogin () {
      this.$router.push({path: '/login'})
    },
    goRegister () {
      this.$router.push({path: '/register'})
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        // if (valid) {
        //   this.toMain()
        // } else {
        //   console.log('error submit!!')
        //   return false
        // }
        this.toMain()
      })
    },
    toMain () {
      // browserWindow 配置
      const windowConfig = {
        params: 'main',
        width: 280,
        height: 720,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false // 无边框窗口
      }
      // browserWindow 成功回调、事件处理（详看api）
      openNewWindow(windowConfig)
        .then((win) => {
          win.on('close', function () {
            console.info('窗口关闭')
            win = null
          })
        })
    }
  }
}
</script>
<style scoped>
@import '~/src/renderer/assets/css/login.css';
</style>

