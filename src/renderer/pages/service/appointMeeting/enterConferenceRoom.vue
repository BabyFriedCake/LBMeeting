<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>进入会议室</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon">
      <!-- <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="70px" class="">
            <el-form-item label="会议室号">
                {{roomDetails.meetingRoomCode}}
            </el-form-item>
            <el-form-item label="会议昵称" prop="nickName">
                <el-input type="text" v-model="userInfo.user.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="会议角色" prop="loginType">
                <el-select v-model="ruleForm2.attentType" placeholder="请选择" class="wp-100">
                    <el-option label="主持人" value="1"></el-option>
                    <el-option label="参会人" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会议密码" prop="password">
                <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="" >
                <el-checkbox-group v-model="ruleForm2.checkList">
                    <el-checkbox label="关闭摄像头入会"></el-checkbox>
                    <el-checkbox label="关闭麦克风入会"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form> -->
      <div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="70px"
        >
          <el-form-item label="会议室号">
            {{roomDetails.meetingRoomCode}}
          </el-form-item>
          <el-form-item
            prop="nickname"
            label="昵称"
          >
            <el-input
              v-model="form.nickname"
              auto-complete="off"
              placeholder="请输入昵称"
              class="w-300"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="role"
            label="角色"
            class="mt-30"
          >
            <el-select
              v-model="role"
              placeholder="请选择"
              popper-class="w-300"
              class="wp-100"
              @change="changeSelect"
            >
              <el-option
                label="主持人"
                value="host"
              >主持人</el-option>
              <el-option
                label="参会人"
                value="attend"
              >参会人</el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            v-if="passEnabel"
          >
            <el-input
              v-model="form.password"
              auto-complete="off"
              placeholder="请输入会议密码"
              class="w-300"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="h-45 f-s-12 color36bdff pl-70">
          <span
            class="fl mr-10 cur-po"
            v-show="isCamera"
            @click="isCamera=!isCamera"
          ><i class="iconfont icon-camera fl"></i><label class="d-ib w-40 h-40 lh-40 fl color36bdff cur-po">摄像头</label></span>
          <span
            class="fl mr-10 cur-po"
            v-show="!isCamera"
            @click="isCamera=!isCamera"
          ><i class="iconfont icon-camera1 fl color7f7f7f"></i><label class="d-ib w-40 h-40 lh-40 fl color7f7f7f cur-po">摄像头</label></span>
          <span
            class="fl cur-po"
            v-show="isMic"
            @click="isMic=!isMic"
          ><i class="iconfont icon-mic fl"></i><label class="d-ib w-40 h-40 lh-40 fl color36bdff cur-po">麦克风</label></span>
          <span
            class="fl cur-po"
            v-show="!isMic"
            @click="isMic=!isMic"
          ><i class="iconfont icon-mic1 fl color7f7f7f"></i><label class="d-ib w-40 h-40 lh-40 fl color7f7f7f cur-po">麦克风</label></span>
        </div>
      </div>
    </div>
    <div class="pageBtns noBodTop">
      <el-button
        @click="closeWin()"
        class="w-120"
      >取 消</el-button>
      <el-button
        type="primary"
        @click="enter"
      >立即进入</el-button>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import { mapGetters, mapState } from 'vuex'
import {
  enterNew
} from '@/API/conference'

export default {
  components: {
    Titlebtn
  },
  data () {
    const nickname = (rules, value, callback) => { // 中文、英文、数字组成的名称,且不能以数字开头,不能超过10个字
      let Reg = /^[A-Za-z\u4e00-\u9fa5][A-Za-z0-9\u4e00-\u9fa5]{0,19}$/
      if (value === '') {
        callback(new Error('请输入昵称'))
      } else if (!Reg.test(value)) {
        callback(new Error('请输入中文、英文、数字组成的名称,且不能以数字开头,不能超过20个字'))
      } else {
        callback()
      }
    }
    const password = (rules, value, callback) => { // 4-8位数字
      let Reg = /^\d{4,8}$/
      if (value === '' && this.passEnabel) {
        callback(new Error('请输入密码'))
      } else if (!Reg.test(value)) {
        callback(new Error('请输入4-8位纯数字'))
      } else {
        callback()
      }
    }
    const passwordModi = (rules, value, callback) => { // 4-8位数字
      let Reg = /^\d{4,8}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!Reg.test(value)) {
        callback(new Error('请输入4-8位纯数字'))
      } else {
        callback()
      }
    }
    return {
      userType: this.userType,
      userId: this.userId,
      userName: this.userInfo.user.userName,
      companyId: 'companyId',
      companyName: 'companyName',
      activeName: 'common', // 激活的面板
      active: '0',
      commonRoomList: [],
      lastRooms: [],
      state: '',
      allmeetingRooms_c: [], // 企业会议室
      allmeetingRooms_p: [], // 个人会议室
      allmeetingRooms: [], // 所有会议室
      meetingCode: '',
      meetingType: '',
      bindNum: '',
      endTime: '',
      hostPwd: '', // 主持人密码
      attendPwd: '', // 参会人密码
      remark: '', // 会议室备注
      hostOpen: '',
      attendOpen: '',
      modiDisable: false,
      enterWindow: false,
      form: {
        nickname: this.userType === 'user' ? this.userInfo.user.userName : 'companyName',
        password: ''
      },
      isCamera: true,
      isMic: true,
      role: 'host',
      passEnabel: false,
      allmeetingRooms_company: [],
      rules: {
        nickname: [
          { validator: nickname, trigger: 'blur' }
        ],
        password: [
          { validator: password, trigger: 'blur' }
        ]
      },
      formModi: {
        hostpwd: '',
        attendpwd: '',
        remark: ''
      },
      rulesModi: {
        hostpwd: [
          { validator: passwordModi, trigger: 'blur' }
        ],
        attendpwd: [
          { validator: passwordModi, trigger: 'blur' }
        ]
      },
      modiWindow: false,
      meetingRoomId: '',
      company_search: '全部范围',
      selectCompany: [],
      search: ''
    }
  },
  computed: {
    ...mapGetters([
      'roomDetails'
    ]),
    ...mapState({
      userId: state => state.user.userInfo.user.userID,
      user: state => state.user,
      userType: state => state.user.userType,
      userInfo: state => state.user.userInfo
    })
  },
  watch: {

  },
  mounted () {
    // console.log(this.roomDetails)
    console.log(this.userInfo.user)
    if (this.userInfo.company) {
      this.userType = 'company'
      this.companyId = this.userInfo.company.companyId
      this.companyName = this.userInfo.company.companyName
    } else {
      this.userType = 'user'
      this.userId = this.userInfo.user.userID
      this.userName = this.userInfo.user.userName
    }
  },
  methods: {
    changeSelect (val) {
      /* eslint-disable */
      if (val === 'host' && this.hostOpen === '0' || val === 'attend' && this.attendOpen === '0') {
        this.passEnabel = true
      } else {
        this.passEnabel = false
      }
    },
    enter (data) {
      //        this.enterWindow=true
      var mediaType
      if (this.isCamera && this.isMic) {
        // 视频
        mediaType = '1'
      } else if (!this.isCamera && this.isMic) {
        // 音视频
        mediaType = '2'
      } else if (!this.isCamera && !this.isMic) {
        mediaType = '3'
      }
      //        if(this.active!== '3'){
      //          this.meetingCode=data.meetingRoomCode
      //        }
      var password
      if (this.passEnabel && this.role === 'host') {
        if (this.form.password !== data.hostPwd && this.form.password) {
          //   failure('密码错误请重新输入')
          this.$message.error('密码错误请重新输入')
          return
        } else {
          password = this.form.password
        }
      } else if (this.passEnabel && this.role === 'attend') {
        if (this.form.password !== data.attendPwd) {
          //   failure('密码错误请重新输入')
          this.$message.error('密码错误请重新输入')
          return
        } else {
          password = this.form.password
        }
      } else if (!this.passEnabel && this.role === 'host') {
        password = this.hostPwd
      } else if (!this.passEnabel && this.role === 'attend') {
        password = this.attendPwd
      }

      this.$refs['form'].validate((valid) => {
        if (valid) {
          let params = {
            roomCode: this.roomDetails.meetingRoomCode,
            nickName: this.form.nickname,
            mediaType: mediaType,
            password: password,
            loginType: this.userInfo.user ? 'user' : 'company',
            id: this.userInfo.user ? this.userInfo.user.userID : this.userInfo.company.companyId
          }
          enterNew(params).then((response) => {
            console.log(response)
          })
          //   request('post', global.API.meeting.entercheck, qs.stringify(params), function (res) {
          //     //          console.log(res)
          //     global.openConferenceWindow_enter(res.value)
          //   })
        }
      })
    }
  }
}
</script>
<style scoped>
.pageCon {
  padding: 20px 78px 0 70px;
  font-size: 13px;
}
.pageCon > ul {
  padding: 13px 0;
  font-size: 13px;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  color: #333;
}
.pageCon > ul label {
  display: inline-block;
  vertical-align: middle;
}
.pageCon > ul span {
  color: #999;
  display: inline-block;
  vertical-align: middle;
}
.el-form-item {
  margin-bottom: 9px;
}
</style>

