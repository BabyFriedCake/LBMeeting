<template>
  <div class="conCom">
    <el-scrollbar class="conComScroll">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          :title="oftenFriendList"
          name="oftenFriendList"
        >
          <el-tree
            :data="allList.oftenFriendList"
            :props="defaultProps"
            :render-content="renderContent"
            @node-contextmenu="rihgtClick"
          >
          </el-tree>
        </el-collapse-item>
        <el-collapse-item
          :title="myFriend"
          name="friendList"
        >
          <el-tree
            :data="allList.friendList"
            :props="defaultProps"
            :render-content="renderContent"
            @node-contextmenu="rihgtClick"
          >
          </el-tree>
        </el-collapse-item>
        <el-collapse-item
          :title="groupMeeting"
          name="groupList"
        >
          <el-tree
            :data="allList.groupList"
            :props="groupProps"
            :render-content="renderContent"
            @node-contextmenu="rihgtClick"
          >
          </el-tree>
        </el-collapse-item>
        <el-collapse-item
          :title="companyName"
          name="companyList"
        >
          <el-tree
            class="conferenceTree"
            :data="allList.companyList"
            :props="companyProps"
            :filter-node-method="filterNode"
            ref="tree4"
          >
          </el-tree>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
    <div v-show="menuVisible">
      <div class="menushadow" @contextmenu.prevent="closemenu()"></div>
      <dl class="operationsBox" id="rightClickMenu">
        <dd><i class="iconfont icon-pc-icon-38"></i><span>发送消息</span></dd>
        <dd><i class="iconfont icon-pc-icon-37"></i><span>视频会议</span></dd>
        <dd v-if="canFriend"><i class="iconfont"></i><span>加为好友</span></dd>
        <dd><i class="iconfont icon-pc-icon-36"></i><span>消息记录</span></dd>
        <dd v-if="!canFriend" @click="delBaseFriendFn()"><i class="iconfont"></i><span>删除好友</span></dd>
        <dd @click="modifyRemarksFn()"><i class="iconfont icon-pc-icon-30"></i><span>修改备注</span></dd>
      </dl>
    </div>
  </div>
</template>
<script>
import {
  getExeAllList, delBaseFriend
} from '@/API/contacts'
import { mapState } from 'vuex'
import {
  openNewWindow
} from '@/utils/function.js'
export default {
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  data () {
    return {
      filterText: '',
      canFriend: '',
      allList: {},
      defaultProps: {
        label: 'userName'
      },
      groupProps: {
        label: 'groupName'
      },
      companyProps: {
        children: 'children',
        label: 'companyName'
      },
      activeNames: ['friendList'],
      menuVisible: false,
      groupMeetingNum: '',
      rightClickperson: {
        friendId: '',
        nickName: '',
        userName: ''
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userInfo.user.userID
    }),
    oftenFriendList () {
      return '常用联系人'
    },
    myFriend () {
      return '我的好友'
    },
    groupMeeting () {
      return '会议群组 ' + this.groupMeetingNum
    },
    companyName () {
      return '企业名称？？？？？ '
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getExeAllListFn () {
      var param = {
        userId: this.userId
      }
      getExeAllList(param).then((response) => {
        let res = response.value
        this.allList = res
        this.groupMeetingNum = res.groupList.length
        console.log(res)
      })
    },
    // rightClick(event,object,value,element){
    //   document.getElementsByClassName('operations')[0].style.display="none"
    //   element.$refs.node.children[0].children[1].children[2].style.display="block"
    // },
    rihgtClick (event, object, value, element) {
      console.log(event)
      console.log(object)
      console.log(value)
      console.log(element)
      if (object.friendId) {
        this.canFriend = false
      } else {
        this.canFriend = true
      }
      this.rightClickperson.userName = object.userName
      this.rightClickperson.friendId = object.friendId
      this.rightClickperson.nickName = object.nickName
      if (this.objectID !== object.id) {
        debugger
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
      // menu.style.top = event.clientY + "px";
      menu.style.position = 'fixed' // 为新创建的DIV指定绝对定位
      menu.style.width = 126 + 'px'
      // console.log(menu.style.top)
      // console.log(document.body.clientHeight)
      // console.log(event.clientY+192)
      var positionTop = event.clientY + 192 + 40
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
      return (
        <div class="allListNode clearfix">
          <img src={data.loginImg || require('@/assets/images/photo.png')} class="allListPhoto" alt=""/>
          <span class="allListUsername lh-60">{data.nickName || data.userName}</span>
          <i class="iconfont icon-pc-icon-37"></i>
        </div>)
    },
    closemenu () {
      this.menuVisible = false
    },
    // 修改备注
    modifyRemarksFn () {
      const windowConfig = {
        params: 'modifyRemarks',
        width: 400,
        height: 216,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false,
        resizable: false
      }
      openNewWindow(windowConfig)
      this.$store.originalDispatch('rightClickperson', this.rightClickperson)
    },
    // 删除好友
    delBaseFriendFn () {
      var param = {
        friendId: this.rightClickperson.friendId
      }
      delBaseFriend(param).then((response) => {
        if (response.state === 200) {
          this.$message({
            message: '删除好友成功',
            type: 'success'
          })
        }
      })
    }
  },
  mounted () {
    this.getExeAllListFn()
    console.log(this.userId)
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
.allListNode{
  position: relative;
  width: 100%;
}
.allListNode .allListPhoto{
  width:40px;
  height:40px;
  border-radius:50%;
  float: left;
  margin: 10px 10px 10px 15px;
}
.allListNode .allListUsername{
  float: left;
  font-weight:bold;
  color:rgba(51,51,51,1);
}
/* .allListNode .operations{
  position: absolute;
  right: 10px;
  top: 46px;
  padding:20px 0;
  background:rgba(255,255,255,0.9);
  box-shadow:0px 0px 24px 0px rgba(173,174,188,0.4);
  display:none
}
.allListNode .operations dd{
  padding:0 20px;
  font-size:12px;
  color:rgba(51,51,51,1);
  line-height:28px;
}
.allListNode .operations dd:hover{
  background:rgba(246,241,237,1);
}
.allListNode .operations .iconfont{
  margin-right: 10px;
  width: 16px;
  display: inline-block;
  vertical-align: middle;
}
.allListNode .operations span{
  display: inline-block;
  vertical-align: middle;
  line-height:26px;
} */
.operationsBox{
  padding:12px 0;
  background:rgba(255,255,255,0.9);
  box-shadow:0px 0px 24px 0px rgba(173,174,188,0.4);
  position: absolute;
  border-radius:3px;
}
.operationsBox dd{
  padding:0 20px;
  font-size:12px;
  color:rgba(51,51,51,1);
  height:28px;
  cursor: pointer;
}
.operationsBox dd:hover{
  background:rgba(246,241,237,1);
}
.operationsBox .iconfont{
  margin-right: 10px;
  width: 16px;
  line-height:28px;
  display: inline-block;
  vertical-align: middle;
}
.operationsBox span{
  display: inline-block;
  vertical-align: middle;
  line-height:28px;
}
.menushadow{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.allListNode .iconfont {
  font-size: 20px;
  position: absolute;
  right: 15px;
  top: 50%;
  margin-top: -17px;
  color:#999;
  cursor: pointer;
  display: none;
}
.allListNode:hover .iconfont {
  color:#333;
  display: block
}
</style>
