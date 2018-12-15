<template>
  <div class="loginPage">
  <div class="winOperateBtn">
    <Titlebtn type="min" />
    <Titlebtn type="close" />
  </div>
    <div class="loginHeader">
      <img src="@/assets/images/luobologo.png" alt="" >
      <h3>快速入会</h3>
    </div>
    <el-form :model="form" :rules="rules" ref="form" class="loginForm">
      <el-form-item prop="name" >
        <el-input v-model="form.name" auto-complete="off"  placeholder="请输入昵称" class="mb-20"></el-input>
      </el-form-item>
      <el-form-item prop="meetingRoomCode">
        <el-input v-model="form.meetingRoomCode" auto-complete="off" placeholder="请输入会议室号" class="mb-20"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" auto-complete="off" placeholder="请输入会议密码"></el-input>
      </el-form-item>
      <el-row class="mt-5">
        <el-checkbox label="关闭摄像头入会" class="fl" v-model="form.closeCamera" style="-webkit-app-region: no-drag" v-on:change="closeCamera"></el-checkbox>
        <el-checkbox label="关闭麦克风入会" class="fr" v-model="form.closeAudio" style="-webkit-app-region: no-drag" v-on:change="closeAudio"></el-checkbox>
      </el-row>
      <el-row class="mt-40">
        <el-button type="primary" @click="enterMeeting" class="loginButton ml-85 fl w-210">立即入会</el-button>
        <el-button type="text" @click="$router.back(-1)" class="lh-34">返回</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import $ from 'jquery'
import Titlebtn from '@/components/common/Titlebtn.vue'
// import {failure} from '@/utils/function'
// import { validateTelephone, validatePassword, validateAccount } from '@/utils/validate'
import { failure, openNewWindow } from '@/utils/function.js'
export default {
  data () {
    const meetingRoomCode = (rules, value, callback) => { // 纯数字
      let Reg = /^\d+$/
      if (value === '') {
        callback(new Error('请输入会议室号'))
      } else if (!Reg.test(value)) {
        callback(new Error('请输入纯数字'))
      } else {
        callback()
      }
    }
    const nickname = (rules, value, callback) => { // 中文、英文、数字组成的名称,且不能以数字开头,不能超过10个字
      let Reg = /^[A-Za-z\u4e00-\u9fa5][A-Za-z0-9\u4e00-\u9fa5]{0,19}$/
      if (value === '') {
        callback(new Error('请输入昵称'))
      } else if (!Reg.test(value)) {
        callback(new Error('请输入中文、英文、数字组成的名称,不能以数字开头,不超过20个字'))
      } else {
        callback()
      }
    }
    const password = (rules, value, callback) => { // 4-8位数字
      let Reg = /^\d{4,8}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!Reg.test(value)) {
        callback(new Error('请输入4-8位纯数字'))
      } else {
        callback()
      }
    }
    const linkMethod = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请选择连接方式'))
      } else {
        callback()
      }
    }
    return {
      meetingTitle: '',
      form: {
        meetingRoomCode: '',
        name: '',
        password: '',
        role: [],
        type: '1',
        closeCamera: '',
        closeAudio: ''
      },
      formLabelWidth: '60px',
      host: '',
      attend: '',
      selectResult: '',
      selectStatusFaster: false,
      password: '',
      rules: {
        meetingRoomCode: [
          {required: true, validator: meetingRoomCode, trigger: 'blur'}
        ],
        name: [
          {required: true, validator: nickname, trigger: 'blur'}
        ],
        password: [
          {required: true, validator: password, trigger: 'blur'}
        ],
        type: [
          {required: true, validator: linkMethod, trigger: 'blur'}
        ]
      }
    }
  },
  wathch: {

  },
  components: {
    Titlebtn
  },
  methods: {
    closeAudio () {
      if (this.form.closeAudio) {
        this.form.closeCamera = true
      }
    },
    closeCamera () {
      if (!this.form.closeCamera) {
        this.form.closeAudio = false
      }
    },
    enterMeeting () {
      this.$refs.form.validate((valid) => {
        var loginType = this.$store.getters.userInfo.user ? 'user' : 'company'
        // var id
        // if (loginType === 'user') {
        //   id = this.$store.getters.userInfo.user.userID
        // } else {
        //   id = this.$store.getters.userInfo.company.companyId
        // }
        // 判断摄像头和麦克风
        if (!this.form.closeCamera && !this.form.closeAudio) {
          this.form.type = 1
        } else if (this.form.closeCamera && this.form.closeAudio) {
          this.form.type = 3
        } else if (this.form.closeCamera && !this.form.closeAudio) {
          this.form.type = 2
        }
        var param = {
          roomCode: this.form.meetingRoomCode,
          nickName: this.form.name,
          password: this.form.password,
          mediaType: this.form.type,
          loginType: loginType,
          // id: id
          attentType: 2
        }
        if (valid) {
          this.$emit('waitingdata', true)
          // window.open(process.env.BASE_API+'/p/end/waitting?roomcode=' + param.roomCode + '&nickname=' + param.nickName + '&password=' + param.password + '&mediaType=' + param.mediaType + '&loginType=' + loginType +'&id='+id)
          var that = this
          $.ajax({
            url: process.env.BASE_API + '/meeting/enterNew',
            async: false,
            type: 'post',
            headers: {
              version: '1_0'
              // token: that.$store.getters.token
            },
            data: param,
            success: function (value) {
              var data = JSON.parse(value)
              if (data.state === 200) {
                // var tempwindow = window.open()
                // tempwindow.location = data.value
                this.message('200')
              } else {
                failure(data.message)
              }
              setTimeout(() => {
                that.$emit('waitingdata', false)
              }, 3000)
            }
          })
          this.$emit('update:meetingWindow', false)
          this.$refs['form'].resetFields()
        }
      })
    },
    toMain () {
      // browserWindow 配置
      const windowConfig = {
        params: 'main',
        width: 300,
        height: 740,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false // 无边框窗口
      }
      // browserWindow 成功回调、事件处理（详看api）
      openNewWindow(windowConfig)
        .then((win) => {
          win.on('close', () => win.close())
        })
    }
  }
}
</script>
<style scoped>
@import '../../../assets/css/login.css';
</style>

