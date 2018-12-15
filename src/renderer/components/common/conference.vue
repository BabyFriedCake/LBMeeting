<template>
  <div class="conferenceCom conCom">
    <el-scrollbar class="conComScroll">
      <el-tree
        class="conferenceTree"
        :data="allList"
        :props="defaultProps"
        :render-content="renderContent"
        @node-contextmenu="rihgtClick"
      >
      </el-tree>
    </el-scrollbar>
    <div v-show="menuVisible">
      <div
        class="menushadow"
        @contextmenu.prevent="closemenu()"
      ></div>
      <dl
        class="operationsBox"
        id="rightClickMenu"
      >
        <dd @click="toRoomDetails()"><i class="iconfont"></i><span>查看详情</span></dd>
        <dd @click="toenterConferenceRoom()"><i class="iconfont icon-pc-icon-20"></i><span>进入会议室</span></dd>
      </dl>
    </div>
  </div>
</template>
<script>
import {
  getAllMeetingRoomPList,
  getAllMeetingRoomCList
} from '@/API/conference'
import {
  openNewWindow
} from '@/utils/function.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      filterText: '',
      allList: [],
      defaultProps: {
        children: 'roomList',
        label: 'meetingRoomTypeLabel'
      },
      menuVisible: false,
      roomDetails: ''
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userInfo.user.userID
    }),
    myFriend () {
      return '我的好友'
    },
    groupMeeting () {
      return '会议群组 ' + this.groupMeetingNum
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    rihgtClick (event, object, value, element) {
      this.roomDetails = object
      console.log(this.roomDetails)
      if (this.objectID !== object.id) {
        this.objectID = object.id
        this.menuVisible = true
        this.DATA = object
        this.NODE = value
      } else {
        this.menuVisible = !this.menuVisible
      }
      document.addEventListener('click', (e) => {
        this.menuVisible = false
      })
      let menu = document.querySelector('#rightClickMenu')
      /* 菜单定位基于鼠标点击位置 */
      menu.style.left = event.clientX + 20 + 'px'
      menu.style.position = 'fixed'
      menu.style.width = 126 + 'px'
      var positionTop = event.clientY + 80 + 40
      if (positionTop > document.body.clientHeight) {
        menu.style.bottom = '40px'
        menu.style.top = 'inherit'
      } else {
        menu.style.top = event.clientY + 'px'
        menu.style.bottom = 'inherit'
      }
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    renderContent (h, { node, data, store }) {
      if (data.roomList) {
        return (
          <div class="conferenceList clearfix">
            <p class="conferenceListName f-s-13">{node.label}</p>
          </div>)
      } else {
        return (
          <div class="conferenceList clearfix">
            <p class="conferenceListName f-s-13 f-w-b">{node.label}</p>
            <p class="f-s-12">{data.meetingRoomCode}</p>
            <span class={'roomState' + data.state}>{data.stateLabel}</span>
          </div>)
      }
    },
    closemenu () {
      this.menuVisible = false
    },
    // 个人账号会议室
    getAllMeetingRoomPListFn () {
      var param = {
        type: 'All',
        ids: '',
        content: ''
      }
      getAllMeetingRoomPList(param).then((response) => {
        let res = response.value
        this.allList = res
        res.map((item, index) => {
          item.meetingRoomTypeLabel = item.companyName
        })
        console.log(res)
      })
    },
    // 企业会议室
    getAllMeetingRoomCListFn () {
      var param = {
        companyId: ''
      }
      getAllMeetingRoomCList(param).then((response) => {
        let res = response.value
        console.info(111, res)
        this.allList = res
        console.log(res)
      })
    },
    // 查看详情
    toRoomDetails () {
      this.$store.originalDispatch('roomDetails', this.roomDetails)
      const windowConfig = {
        params: 'RoomDetails',
        width: 560,
        height: 470,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false,
        resizable: false
      }
      openNewWindow(windowConfig)
    },
    // 进入会议室
    toenterConferenceRoom () {
      this.$store.originalDispatch('roomDetails', this.roomDetails)
      const windowConfig = {
        params: 'enterConferenceRoom',
        width: 560,
        height: 374,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false,
        resizable: false
      }
      openNewWindow(windowConfig)
    }

  },
  mounted () {
    this.getAllMeetingRoomPListFn()
    // this.getAllMeetingRoomCList()
  }
}
</script>
<style scoped>
.conCom {
  position: absolute;
  bottom: 40px;
  top: 0;
  width: 100%;
  top: 355px;
}
.conComScroll {
  height: 100%;
}

</style>
<style>
.conferenceList{
  padding: 10px 0
}
.conferenceList p{
  line-height: 20px;
}
</style>
