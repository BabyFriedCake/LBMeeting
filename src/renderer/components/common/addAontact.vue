<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>添加联系人</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon addAontactCon">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" @submit.native.prevent>
      <el-form-item prop="username">
        <el-input placeholder="请输入手机号" v-model="loginForm.username" class="searchGrp">
          <el-button slot="append" icon="iconfont icon-pc-icon-26" @click="submitForm(loginForm)"></el-button>
        </el-input>
      </el-form-item>
    </el-form>
      <div class="addAontactRes" v-if="addAontactRes.friendId">
        <img :src="addAontactRes.loginImg || require('@/assets/images/photo.png')" alt="">
        <div class="d-ib v-a-m">
          <b class="f-s-13 d-b color333333">{{addAontactRes.userName}}</b>
          <span class="f-s-12 d-b color999 mt-5">手机号：{{addAontactRes.loginMobile}}</span>
        </div>
        <el-button type='primary' v-if="addAontactRes.friendId===''" @click="addBaseFriendFn()">添加</el-button>
        <el-button type="text" disabled v-else>【已添加】</el-button>
      </div>
    </div>
    <div class="pageBtns noBodTop">
      <el-button type='primary' @click="closeWin()">关闭</el-button>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import {
  validateTelephone
} from '@/utils/validate'
import {
  getCUByPhoneNum,
  addBaseFriend
} from '@/API/contacts'
import { mapState } from 'vuex'
const { BrowserWindow } = require('electron').remote
export default {
  data () {
    // 用户名验证规则(手机号或邮箱)
    const validateUsername = (rule, value, callback) => {
      const Telephone = validateTelephone(value)
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (Telephone === false) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      phoneNum: '',
      loginForm: {
        username: ''
      },
      loginRules: {
        username: [{
          validator: validateUsername,
          trigger: 'blur'
        }]
      },
      addAontactRes: {}
    }
  },
  components: {
    Titlebtn
  },
  computed: {
    ...mapState({
      userId: state => state.user.userInfo.user.userID
    })
  },
  methods: {
    // 关闭弹窗
    closeWin () {
      BrowserWindow.getFocusedWindow().close()
    },
    submitForm (loginForm) {
      let self = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          var param = {
            phoneNum: self.loginForm.username
          }
          getCUByPhoneNum(param).then((response) => {
            console.log(response)
            this.addAontactRes = response.value
          })
        }
      })
    },
    // 添加好友
    addBaseFriendFn () {
      var param = {
        userId: this.userId,
        friendUserId: this.addAontactRes.friendId
      }
      addBaseFriend(param).then((response) => {
        console.log(response)
      })
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.addAontactCon{
  padding: 30px 20px 0 20px
}
.addAontactRes{
  margin-top: 20px;
  padding:10px 15px;
  background:rgba(254,243,236,1);
  border-radius:2px;
  font-size: 0
}
.addAontactRes img{
  height: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle
}
.addAontactRes .el-button{
  width:64px;
  height:22px;
  line-height:20px;
  background:rgba(243,115,45,1);
  border-radius:11px;
  float: right;
  margin-top: 9px;
  font-size: 13px
}
.el-button.is-disabled.el-button--text{
  text-decoration: none;
  color:#999;
  border:0
}
.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  text-decoration: none;
  color:#999;
  border:0
} 

</style>

