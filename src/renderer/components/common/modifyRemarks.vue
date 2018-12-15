<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>修改备注</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon t-a-c">
      <el-input v-model="remarkPerson.nickName" class="w-280 mt-40"></el-input>
    </div>
    <div class="pageBtns noBodTop">
      <el-button @click="closeWin()">取消</el-button>
      <el-button type='primary' @click="updateBaseFriendNickNameFn()">确定</el-button>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import {
  updateBaseFriendNickName
} from '@/API/contacts'

import { mapGetters } from 'vuex'
const { BrowserWindow } = require('electron').remote
export default {
  data () {
    return {
      remarkPerson: {
        nickName: '',
        friendId: ''
      }
    }
  },
  components: {
    Titlebtn
  },
  computed: {
    ...mapGetters([
      'rightClickperson'
    ])
  },
  methods: {
    // 关闭弹窗
    closeWin () {
      BrowserWindow.getFocusedWindow().close()
    },
    updateBaseFriendNickNameFn () {
      updateBaseFriendNickName(this.remarkPerson).then((response) => {
        this.closeWin()
      })
    }
  },
  mounted () {
    this.remarkPerson.nickName = this.rightClickperson.nickName || this.rightClickperson.userName
    this.remarkPerson.friendId = this.rightClickperson.friendId
  }
}
</script>
<style scoped>
</style>

