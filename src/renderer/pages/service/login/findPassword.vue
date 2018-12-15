<template>
  <div class="loginPage">
    <div class="winOperateBtn">
      <Titlebtn type="min" />
      <Titlebtn type="close" />
    </div>
    <div class="loginHeader">
      <img src="@/assets/images/luobologo.png" alt="">
      <h3>{{title}}</h3>
    </div>
    <el-form class="loginForm" :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="username" v-if="active==1">
        <el-input v-model="ruleForm.username" placeholder="手机号/企业账号" clearable class="mb-20" key="name"></el-input>
      </el-form-item>
      <el-form-item v-if="active==1" prop="CAPTCHAofPNONE">
        <el-input v-model="ruleForm.CAPTCHAofPNONE" placeholder="手机验证码" class="mb-5 getPhoneCode" maxlength="4"></el-input>
        <el-button type="text" class="lh-32 getPhoneCodeBtn" :disabled="countState||phoneStatus" @click="getCAPTCHAofPNONE">
          <span v-if="!countState" class="vali-span">获取验证码</span>
          <span v-if="countState" class="count">{{count}}秒重新获取</span>
        </el-button>
      </el-form-item>

      <el-form-item prop="password" v-if="active==2" class="mt-90">
        <el-input type="password" key='ps' v-model="ruleForm.password" placeholder="密码为6-20位字母或数字" class="mb-20"></el-input>
      </el-form-item>

      <el-form-item prop="passwordDouble" v-if="active==2">
        <el-input type="password" key='pwd' v-model="ruleForm.passwordDouble" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-row class="mt-20">
        <el-button type="primary" v-if="active==1" @click="checkcode()" class="loginButton ml-85 fl w-210">下一步</el-button>
        <el-button type="text" v-if="active==1" @click="$router.back(-1)" class="lh-34">返回</el-button>
        <el-button type="primary" v-if="active==2" :disabled="finish" @click="findPwdUpdate" class="loginButton ml-85 fl w-210">完成</el-button>
        <el-button type="text" v-if="active==2" @click="prev" class="lh-34">上一步</el-button>
      </el-row>

      <!-- 重置成功 -->
              <div class="regi-box regi-succ" v-if="active==3">
                <div class="regi-succ-logo mt-10 mb-20" style="display:inline-block;vertical-align:middle;"><img src="@/assets/images/icon-success.png" alt="">&nbsp;&nbsp;<span>重置成功！</span></div>
                <p class="">账号：{{ruleForm.username}}</p>
                <p class="">密码：{{ruleForm.password}}</p>
                <p class="">请妥善保存您的账号和密码，以便下次登录</p>
                <el-button type="primary" class="loginButton ml-85 mt-20 fl w-210" v-if="active===3" key="3" :disabled="nextSecond" @click="goLogin" @keyup.enter.native="goLogin">立即登录</el-button>
              </div>
    </el-form>
  </div>
</template>
<script>
  import Titlebtn from '@/components/common/Titlebtn.vue'
  import { findPwdUpdate, valicode, checkValidCode } from '@/api/register'
  import {
    validateTelephone,
    validatePassword,
    validateAccount,
    validateCaptcha
  } from '@/utils/validate'
  import {
    openNewWindow
  } from '@/utils/function.js'
  export default {
    data () {
      // 用户名验证规则(手机号或邮箱)
      const validateUsername = (rule, value, callback) => {
        const Telephone = validateTelephone(value)
        // const Email = validateEmail(value)
        const Account = validateAccount(value)
        if (value === '') {
          callback(new Error('请输入手机号/账号'))
        } else if (Telephone === false && Account === false) {
          callback(new Error('请输入正确的手机号/企业账号'))
        } else {
          this.account = true
          callback()
        }
      }
      // 验证手机验证码
      const validateCAPTCHA = (rule, value, callback) => {
        this.CAPTCHAStatus = false
        const validateCap = validateCaptcha(value, 4)
        if (value === '') {
          callback(new Error('请输入手机验证码'))
        } else if (validateCap === false) {
          callback(new Error('请输入4位数字验证码'))
        } else {
          this.CAPTCHAStatus = true
          callback()
        }
      }
      // 验证密码输入一致
      const validatePass2 = (rule, value, callback) => {
        this.psdStatus2 = false
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (this.ruleForm.password !== this.ruleForm.passwordDouble) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          this.psdStatus2 = true
          callback()
        }
      }
      // 密码验证规则
      const validatePsd = (rule, value, callback) => {
        this.psdStatus = false
        const Telephone = validatePassword(value)
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6 || value.length > 20) {
          callback(new Error('密码至少为6位，至多20位'))
        } else if (Telephone === false) {
          callback(new Error('字母或者数字组合，长度6-20位'))
        } else {
          this.psdStatus = true
          callback()
        }
      }
      return {
        title: '找回密码',
        active: 1,
        psdStatus2: false, // 再次输入密码
        psdStatus: false, // 密码
        account: false,
        CAPTCHAStatus: false, // 手机验证码状态
        countState: false, // 手机验证码倒计时
        count: 60, // 手机验证码倒计时
        ruleForm: {
          username: '',
          password: '', // 密码规则
          passwordDouble: '', // 再次密码规则
          CAPTCHAofPNONE: '' // 手机验证码规则
        },
        rules: {
          username: [{
            required: true,
            validator: validateUsername,
            trigger: 'change'
          }],
          password: [{
            required: true,
            validator: validatePsd,
            trigger: 'change'
          }],
          passwordDouble: [{
            required: true,
            validator: validatePass2,
            trigger: 'change'
          }],
          CAPTCHAofPNONE: [{
            required: true,
            validator: validateCAPTCHA,
            trigger: 'change'
          }]
        }
      }
    },
    components: {
      Titlebtn
    },
    methods: {
      // 提交修改密码
      findPwdUpdate () {
        const params = {
          type: 'findPwd',
          target: this.ruleForm.username,
          validCode: this.ruleForm.CAPTCHAofPNONE,
          newPassword: this.ruleForm.password
        }
        findPwdUpdate(Object.assign({}, params)).then(res => {
          if (res.state === 200) {
            this.active = 3
          }
        })
      },
      // 获取手机验证码
      getCAPTCHAofPNONE () {
        if (!this.countState) { // 未获取状态
        // 获取验证码参数
          const params = {
            type: 'findPwd',
            target: this.ruleForm.username
          }
          // 请求验证码
          valicode(Object.assign({}, params)).then(res => {
            if (res.state === 200) {
              this.countState = true
              let count = 60
              let timer = setInterval(() => {
                count -= 1
                this.count = count
                if (count <= 0) {
                  clearInterval(timer)
                  this.countState = false
                  this.count = 60
                }
              }, 1000)
            }
          })
        }
      },
      // 验证手机验证码
      checkcode () {
      // 验证手机验证码参数
        const params = {
          type: 'regist',
          target: this.ruleForm.telephone,
          validCode: this.ruleForm.CAPTCHAofPNONE
        }
        checkValidCode(Object.assign({}, params)).then(res => {
          if (res.state === 200) {
            this.active = 2
          }
        })
      },
      prev () {
        if (this.active-- < 1) this.active = 0
      },
      goLogin () {
        this.$router.push({path: '/login'})
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
      },
      agreementShow () {
        alert(1)
      }
    },
    computed: {
      nextFirst () {
        if (this.account && this.CAPTCHAStatus) return false
        return true
      },
      finish () {
        if (this.psdStatus && this.psdStatus2) return false
        return true
      }
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/login.css';
  .loginPage .getPhoneCode {
    width: 266px;
    float: left;
  }

  .loginPage .getPhoneCodeBtn {
    position: absolute;
    right: 1px;
    width: 114px;
    float: left;
    border: 1px solid #C3C3C3;
    border-left: none;
    border-radius: 0 17px 17px 0;
    height: 34px !important;
  }
   .loginPage .getPhoneCodeBtn:hover {
    width: 114px;
    position: absolute;
    right: 1px;
    border:1px solid  rgba(243, 115, 45, 1);
    z-index: 10;
    text-decoration: none !important;
  }
</style>