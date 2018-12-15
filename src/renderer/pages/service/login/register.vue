<template>
  <div class="loginPage">
    <div class="winOperateBtn">
      <Titlebtn type="min" />
      <Titlebtn type="close" />
    </div>
    <div class="loginHeader">
      <img src="@/assets/images/luobologo.png" alt="">
      <h3>注册</h3>
      <ul class="lr-tab" v-if="active==1">
        <li class="title-li" @click="changeHandle(0)" :class="[activeBar===0?'active':'']">企业注册</li>
        <label></label>
        <li class="title-li" @click="changeHandle(1)" :class="[activeBar===1?'active':'']">个人注册</li>
      </ul>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="loginForm" label-position="top">
      <el-form-item prop="companyName" v-if="active===1&&registerType===0" key="1">
        <el-input autofocus v-model.trim="ruleForm.companyName" clearable placeholder="企业名称" minlength="2" maxlength="20"
          class="mb-20"></el-input>
      </el-form-item>

      <el-form-item prop="companyAccount" v-if="active===1&&registerType===0" key="2">
        <el-input autofocus v-model.trim="ruleForm.companyAccount" clearable placeholder="企业账号" minlength="6" maxlength="30"
          class="mb-20"></el-input>
      </el-form-item>

      <el-form-item prop="telephone" v-if="active==1">
        <el-input v-model="ruleForm.telephone" key='tele' placeholder="手机号码" clearable :maxlength="11" class="mb-20"></el-input>
      </el-form-item>

      <el-form-item prop="CAPTCHAofPNONE" v-if="active==1">
        <el-input ref="eee" v-model="ruleForm.CAPTCHAofPNONE" placeholder="手机验证码" class="mb-5 getPhoneCode" maxlength="4"></el-input>
        <el-button type="text" class="lh-32 getPhoneCodeBtn" :disabled="countState||phoneStatus" @click="getCAPTCHAofPNONE">
          <span v-if="!countState" class="vali-span">获取验证码</span>
          <span v-if="countState" class="count">{{count}}秒重新获取</span>
        </el-button>
      </el-form-item>

      <el-row v-show="active===1" class="mt-5">
        <el-checkbox v-model="agreementChecked" class="fl" style="-webkit-app-region: no-drag">
          我已阅读并同意 <span class="c-ff824f" @click="agreementShow()">
            <el-button type="text">《萝卜开会用户协议》</el-button>
          </span>
        </el-checkbox>
      </el-row>

      <el-form-item prop="password" v-if="active==2">
        <el-input type="password" key='ps' v-model="ruleForm.password" placeholder="密码为6-20位字母或数字" class="mb-20"></el-input>
      </el-form-item>

      <el-form-item prop="passwordDouble" v-if="active==2">
        <el-input type="password" key='pwd' v-model="ruleForm.passwordDouble" placeholder="请再次确认密码"></el-input>
      </el-form-item>

      <el-row class="mt-10">
        <el-button type="primary" @click="checkcode" v-if="active==1" key="1" :disabled="nextFirst" class="loginButton ml-85 fl w-210">下一步</el-button>
        <el-button type="primary" class="loginButton ml-85 fl w-210" v-if="active===2" key="3" :disabled="nextSecond"
          @click="submitForm" @keyup.enter.native="submitForm">立即注册</el-button>
        <el-button type="text" @click="$router.back(-1)" v-if="active==1" class="lh-34">返回</el-button>
        <el-button type="text" @click="prev" v-if="active==2" class="lh-34">上一步</el-button>
      </el-row>

      <!-- 注册成功 -->
      <div class="regi-box regi-succ" v-if="active==3">
        <div class="regi-succ-logo mt-10 mb-20" style="display:inline-block;vertical-align:middle;"><img src="@/assets/images/icon-success.png"
            alt="">&nbsp;&nbsp;<span>注册成功！</span></div>
        <p class="">账号：{{ruleForm.telephone}}</p>
        <p class="">密码：{{ruleForm.password}}</p>
        <p class="">请妥善保存您的账号和密码，以便下次登录</p>
        <el-button type="primary" class="loginButton ml-85 mt-20 fl w-210" v-if="active===3" key="3" :disabled="nextSecond"
          @click="goLogin" @keyup.enter.native="goLogin">立即登录</el-button>
      </div>

      <!-- 注册失败 -->
      <div class="regi-box regi-fail" v-if="active==4">
        <div class="form-p1 pt-40 pb-40">注册失败</div>
        <div class="regi-fail-bg"></div>
        <div class="form-btn">
          <router-link to="/">
            <el-button type="primary" class="steps-btn">
              <a class="fail-to-index">返回首页</a>
            </el-button>
          </router-link>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
  import Titlebtn from '@/components/common/Titlebtn.vue'
  import {
    // checkCompanyName,
    // checkAccounts,
    register,
    checkValidCode,
    valicode,
    checkMobile
  } from '@/api/register'
  import {
    validateTelephone,
    validatePassword,
    validateCaptcha,
    validateName,
    validateAccount
  } from '@/utils/validate'
  import {
    openNewWindow
  } from '@/utils/function.js'
  export default {
    data () {
      // 验证企业名称
      const validateCmpName = (rule, value, callback) => {
        this.validateName = false
        const name = validateName(value)
        if (value === '') {
          callback(new Error('请输入企业名称'))
        } else if (name === false) {
          callback(new Error('请输入正确的企业名称'))
        } else if (value.length < 2) {
          callback(new Error('企业名称过短'))
        } else if (value.length > 20) {
          callback(new Error('企业名称过长'))
        } else {
          // 验证企业名称参数
          //
          // checkCompanyName(Object.assign({}, params)).then(res => {
          //   if (res.state === 200) {
          //     this.validateName = true
          //     callback()
          //   } else {
          //     this.validateName = false
          //     callback(new Error(res.message))
          //   }
          // })
        }
      }
      // 验证企业账号
      const validateAct = (rule, value, callback) => {
        this.account = false
        const act = validateAccount(value)
        if (value === '') {
          callback(new Error('请输入企业账号'))
        } else if (act === false) {
          callback(new Error('请输入正确的企业账号'))
        } else {
          // 验证企业账号参数
          // const params = {
          //   accounts: this.ruleForm.companyAccount
          // }
          // checkAccounts(Object.assign({}, params)).then(res => {
          //   if (res.state === 200) {
          //     this.account = true
          //     callback()
          //   } else {
          //     this.account = false
          //     callback(new Error(res.message))
          //   }
          // })
        }
      }
      // 手机号验证规则
      const validateTele = (rule, value, callback) => {
        this.phoneStatus = true
        const Telephone = validateTelephone(value)
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (Telephone === false) {
          callback(new Error('请输入正确的手机号'))
        } else {
          // 验证企业账号参数
          const params = {
            mobile: this.ruleForm.telephone
          }
          if (this.registerType === 1) {
            checkMobile(Object.assign({}, params)).then(res => {
              if (res.state === 200) {
                this.phoneStatus = false
                callback()
              } else {
                this.phoneStatus = true
                callback(new Error(res.message))
              }
            })
            // this.phoneStatus = false
          } else {
            this.phoneStatus = false
            callback()
          }
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
        bod: true,
        agreementChecked: true,
        psdStatus2: false, // 再次输入密码
        psdStatus: false, // 密码
        validateName: false, // 企业名称
        account: false, // 企业账号
        CAPTCHAStatus: false, // 手机验证码状态
        phoneStatus: true, // 手机号状态码
        activeBar: 0, // tab
        active: 1,
        registerType: 0,
        countState: false, // 手机验证码倒计时
        roomCode: '', // 会议室号码
        hostPwd: '', // 主持人密码
        attendPwd: '', // 参会人密码
        expiredDay: '', // 有效期
        count: 60, // 手机验证码倒计时
        ruleForm: {
          telephone: '', // 手机号规则
          password: '', // 密码规则
          passwordDouble: '', // 再次密码规则
          companyName: '', // 企业名称规则
          companyAccount: '', // 企业账号规则
          CAPTCHAofPNONE: '' // 手机验证码规则
        },
        rules: {
          telephone: [{
            required: true,
            validator: validateTele,
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
          companyName: [{
            required: true,
            validator: validateCmpName,
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'change'
          }
          ],
          companyAccount: [{
            required: true,
            validator: validateAct,
            trigger: 'blur'
          },
          {
            min: 6,
            max: 30,
            message: '长度在 6 到 30 个字符',
            trigger: 'change'
          }
          ],
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
      // getPhoneCodeBtnMouseover () {
      //   this.$refs['eee'].$refs.input.style.borderRight = 'none'
      // },
      // getPhoneCodeBtnMouseout () {
      //   this.$refs['eee'].$refs.input.style.borderRight = '1px soild #C3C3C3'
      // },
      // 获取手机验证码接口
      getCAPTCHAofPNONE () {
        if (!this.countState) { // 未获取状态
          // 获取验证码参数
          const params = {
            type: 'regist',
            target: this.ruleForm.telephone
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
      changeHandle (type) {
        // this.$refs['ruleForm'].resetFields()
        this.ruleForm = {
          telephone: '', // 手机号规则
          password: '', // 密码规则
          passwordDouble: '', // 再次密码规则
          companyName: '', // 企业名称规则
          companyAccount: '', // 企业账号规则
          CAPTCHAofPNONE: '' // 手机验证码规则
        }
        this.countState = false
        this.psdStatus = false
        this.psdStatus2 = false
        if (this.activeBar === type) {
          // TODO
        } else {
          // this.$refs['ruleForm'].resetFields()
          this.activeBar = type
          this.registerType = type
          this.phoneStatus = true
          if (this.active === 1) {
            // TODO
          } else {
            this.active = 1
          }
        }
      },
      // 验证手机验证码
      checkcode () {
        // 判断是否同意协议
        if (this.agreementChecked) {
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
        } else {
          this.$message.error({
            message: '请阅读并同意用户协议',
            center: true
          })
        }
      },
      prev () {
        if (this.active-- < 1) this.active = 0
      },
      // 注册
      submitForm () {
        // 注册接口
        const params = {
          mobile: this.ruleForm.telephone,
          password: this.ruleForm.password
        }
        if (this.registerType === 0) {
          // 企业用户
          params.registType = 'company'
          params.companyName = this.ruleForm.companyName
          params.accounts = this.ruleForm.companyAccount
        } else {
          // 个人用户
          params.registType = 'user'
        }
        register(Object.assign({}, params)).then(res => {
          if (res.state === 200) {
            this.active = 3
            this.roomCode = res.value.roomCode
            this.hostPwd = res.value.hostPwd
            this.attendPwd = res.value.attendPwd
            this.expiredDay = res.value.expiredDay
          }
          // this.ruleForm = {
          //   telephone: '',//手机号规则
          //   password: '',//密码规则
          //   passwordDouble: '',//再次密码规则
          //   companyName: '',//企业名称规则
          //   companyAccount: '',//企业账号规则
          //   CAPTCHAofPNONE: ''//手机验证码规则
          // }
        })
      },
      goLogin () {
        this.$router.push({
          path: '/login'
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
    border: 1px solid rgba(243, 115, 45, 1);
    z-index: 10;
    text-decoration: none !important;
  }
</style>