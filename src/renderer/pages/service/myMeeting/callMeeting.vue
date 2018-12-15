<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>召开会议</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon po-re">
      <div class="callMeetingLeft po-re">
        <div class="CMLeftTop">
          <span class="peopleNum">当前人数/上限人数（{{dynamicTags.length}}/35）</span>
          <el-scrollbar class="tagsScroll">
            <div class="callMeetingTags">
              <el-tag
                :key="tag.id"
                v-for="tag in dynamicTags"
                closable
                size="small"
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                <b class="tagText">{{tag.label}}</b>
              </el-tag>
            </div>
          </el-scrollbar>
        </div>
        <div class="CMLeftBottom">
          <el-form
            ref="meeting"
            :model="meeting"
            label-width="70px"
          >
            <el-form-item
              label="会议主题"
              class="mb-15"
            >
              <el-input v-model="meeting.meetingTheme"></el-input>
            </el-form-item>
            <el-form-item
              label="会议室"
              class="mb-17"
            >
              <el-select
                v-model="meeting.meetingRoomCode"
                placeholder="请选择活动区域"
              >
                <el-option
                  label="11111"
                  value="11111"
                ></el-option>
                <el-option
                  label="22222"
                  value="22222"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="callMeetingRight">
        <div class="searchInpBox">
          <el-input
            placeholder="搜索用户或群组名称"
            suffix-icon="iconfont icon-pc-icon-26"
            v-model="filterText"
            clearable
          >
          </el-input>
        </div>
        <el-scrollbar class="contactsScroll conComScroll">
          <el-collapse v-model="activeNames" v-show='!noData'>
            <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in allList" :key="index" v-show='!item.showStatus'>
              <el-tree
                class="contactsTree"
                show-checkbox
                :data="item.data"
                node-key="id"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                :render-content="renderContent"
                :ref="'tree'+index"
                @check-change="handleCheckChange"
                @check='handleNodeCheck'
              >
              </el-tree>
            </el-collapse-item>
            <!-- 懒加载组织架构 -->
            <el-collapse-item v-if='$store.getters.userInfo.company' :title="$store.getters.userInfo.company.companyName" :name="999" :key="companyTree.title">
              <el-tree
                v-show='!filterText'
                class="contactsTree"
                show-checkbox
                :props="props1"
                :load="loadNode1"
                :render-content="renderContent"
                lazy
                :render-after-expand='false'
                node-key="userId"
                ref='companyTree'
                :filter-node-method="filterNode"
                @check-change="handleCheckChange"
                @check='handleNodeCheck'
              >
              </el-tree>
              <!-- //搜索的树 -->
              <el-tree
                v-show='filterText'
                class="contactsTree"
                show-checkbox
                :data="searchTree"
                :props="props1"
                :render-content="renderContent"
                node-key="userId"
                ref='searchTree'
                @check-change="handleCheckChange"
                @check='handleNodeCheck'
              >
              </el-tree>
            </el-collapse-item>
          </el-collapse>
          <div v-show="noData" class="nodata">
            <img class="nodata-img" src="../../../assets/images/meeting-serch.png" alt="">
            <p>没有找到包含以下内容的结果 </p>
            <p>“{{filterText}}”</p>
          </div>
        </el-scrollbar>
      </div>

    </div>
    <div class="pageBtns">
      <el-button @click="closeWin()">取消</el-button>
      <el-button
        type='primary'
        @click="save()"
      >发起会议</el-button>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import {getExeAllList, getDIForApp, getCCByKeyword, getRoomListQM, createMeetingNow} from '@/API/myMeeting'
const { BrowserWindow } = require('electron').remote
export default {
  data () {
    return {
      userId: null,
      noData: false,
      searchTree: [{
        userId: '1',
        userName: '鲁洋搜索的'
      }, {
        userId: '2',
        userName: '孙沅沅搜索的'
      }],
      companyTree: {
        title: '卓朗科技',
        data: [{
          userId: '999',
          userName: '一级部门',
          children: [{
            userId: '2',
            userName: '孙沅沅'
          }, {
            userId: '3',
            userName: '孙沅沅3'
          }]
        }, {
          userId: '4',
          userName: '孙沅沅4'
        }]
      },
      props1: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      allList: [{
        title: '常用联系人',
        data: [
          // {
          //   'createTime': 1544080957000,
          //   'friendId': '2c9aea8d6782619d016782619d480000',
          //   'friendUserId': '11',
          //   'useCount': 0,
          //   'userId': '1',
          //   'userName': '鲁洋',
          //   img: 'http://www.yougexing.net/uploads/180720/1-1PH0160022-lp.jpg'
          // },
          // {
          //   'createTime': 1543472430000,
          //   'friendId': '2c9aeacb674dfc9501674e0f16ca0105',
          //   'friendUserId': '2c9aeacb674dfc9501674e0f16ca0105',
          //   'useCount': 0,
          //   'userEngName': 'S',
          //   'userId': '2',
          //   'userName': '孙沅沅'
          // }
        ]
      }, {
        title: '我的好友',
        data: [
          // {
          //   'createTime': 1544080957000,
          //   'friendId': '2c9aea8d6782619d016782619d480000',
          //   'friendUserId': '22',
          //   'useCount': 0,
          //   'userId': '1',
          //   'userName': '鲁洋'
          // },
          // {
          //   'createTime': 1543472430000,
          //   'friendId': '2c9aeacb674dfc9501674e0f16ca0105',
          //   'friendUserId': '2c9aeacb674dfc9501674e0f16ca0105',
          //   'useCount': 0,
          //   'userEngName': 'S',
          //   'userId': '2',
          //   'userName': '孙沅沅'
          // }
        ]
      }, {
        title: '会议群组',
        data: []
      }],
      activeNames: [0],
      meeting: {
        name: '',
        region: ''
      },
      filterText: '',
      dynamicTags: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  components: {
    Titlebtn
  },
  watch: {
    filterText (val) {
      this.activeNames = [0, 1, 2, 999]
      this.$refs.tree0[0].filter(val)
      this.$refs.tree1[0].filter(val)
      this.$refs.tree2[0].filter(val)
      this.$refs.companyTree.filter(val)

      if (!val) {
        // 为空时填补懒加载树的勾选情况
        const choosed = []
        this.dynamicTags.forEach((val, index) => {
          choosed.push(val.userId)
        })
        this.$refs.companyTree.setCheckedKeys(choosed)
      } else { // 异步搜索
      // searchTree
        const params = {
          userId: this.userId,
          keyword: this.filterText
        }
        getCCByKeyword(params).then(response => {
          let res = response.value
          console.log(res)
          const list = []
          Object.keys(res).forEach(function (key) {
            res[key].map((item, index) => {
              item.label = item.userName
              item.id = item.userId
              item.leaf = true
              list.push(item)
            })
          })
          this.searchTree = list
        })
      }
      // 无搜索结果时 隐藏
      this.$nextTick(() => {
        let flag = true
        this.allList.forEach((val, index) => {
          if (this.$refs['tree' + index][0].$el.outerText.indexOf('暂无数据') > -1) {
            this.$set(this.allList[index], 'showStatus', true)
          } else {
            this.$set(this.allList[index], 'showStatus', false)
            flag = false
          }
        })
        if (this.searchTree) {
          flag = false
        }
        if (flag) {
          // 都搜不到结果
          this.noData = true
        } else {
          this.noData = false
        }
      })
    }
  },
  mounted () {
    // this.userId = this.$store.state.user.userInfo.user.userID
    this.userId = '2c9aeacb674de3d901674de3d9b80001'
    getExeAllList({userId: this.userId}).then(response => {
      if (response.state === 200) {
        let res = response.value
        console.log(res)
        res.oftenFriendList.map((item, index) => {
          item.id = item.friendUserId || item.groupId
          item.label = item.userName || item.groupName
        })

        res.friendList.map((item, index) => {
          item.id = item.friendUserId || item.groupId
          item.label = item.userName || item.groupName
        })

        res.groupList.map((item, index) => {
          item.id = item.friendUserId || item.groupId
          item.label = item.userName || item.groupName
        })

        this.allList[0].data = res.oftenFriendList ? res.oftenFriendList : ''
        this.allList[1].data = res.friendList ? res.friendList : ''
        this.allList[2].data = res.groupList ? res.groupList : ''
      }
    })
    getRoomListQM().then(response => {
      let res = response.value
      console.log(res)
    })
  },
  methods: {
    renderContent (h, { node, data, store }) {
      return (
        <div class="allListNode clearfix">
          <img src="{node.img}" class="allListPhoto" alt=""/>
          <span class="allListUsername lh-60">{node.label}</span>
        </div>)
    },
    loadNode1 (node, resolve) {
      const { userInfo } = this.$store.getters
      // console.log('懒加载子节点', node, node.data)this.$store.getters.userInfo.company.companyId
      let params = {
        companyId: userInfo.company.companyId,
        departmentId: null
      }
      if (node.level === 0) {
        params.departmentId = params.companyId
      } else {
        params.departmentId = node.data.departmentId
      }
      getDIForApp(params).then(response => {
        let res = response.value
        let list = []
        if (res.department && res.department.length > 0) {
          res.department.map((item, index) => {
            item.label = item.departmentName
            item.id = item.departmentId
          })
          list = res.department
        } else {
          Object.keys(res).forEach(function (key) {
            res[key].map((item, index) => {
              item.label = item.userName
              item.id = item.userId
              item.leaf = true
              list.push(item)
            })
          })
          this.$nextTick(() => {
            list.forEach((val, index) => {
              this.dynamicTags.forEach((val2, index2) => {
                if (val.id === val2.id) {
                  this.$refs['companyTree'].setChecked(val.id, true)
                }
              })
            })
          })
        }
        console.log(list)
        return resolve(list)
      })
    },
    // 关闭弹窗
    closeWin () {
      BrowserWindow.getFocusedWindow().close()
    },
    // 打开文件夹
    openFolder (folderName) {
      console.log(folderName)
      this.showListFlag = false
    },
    goback () {
      this.showListFlag = true
    },
    save (confirm) {
      let params = {
        'createUserId': this.userId,
        'meetingTheme': this.meeting.meetingTheme,
        'meetingRoomType': '2',
        'meetingRoomId': '2c9aeacb674dfc9501674e10187d013a',
        'meetingRoomCode': '7705682',
        'confirm': '0',
        'joinerList': [{
          'attentType': '1',
          'userId': '2c9aeacb674dfc9501674e0f16ca0105'
        },
        {
          'attentType': '2',
          'userId': '2c9aeacb674dfc9501674e0f16ca0106'
        },
        {
          'attentType': '2',
          'userId': '2c9aeacb674dfc9501674e0f16ca0107'
        },
        {
          'attentType': '2',
          'userId': '2c9aeacb674dfc9501674e0f16ca0108'
        },
        {
          'attentType': '2',
          'userId': '',
          'userMobile': '18622567768'
        },
        {
          'attentType': '2',
          'userId': '',
          'userMobile': '18622771012'
        }
        ]
      }
      createMeetingNow(params).then(response => {

      })
    },
    handleNodeCheck (value, status) {
      // console.log(value, status)
    },
    handleCheckChange (value, status, has) {
      console.log(value, status, has)
      // 分情况勾选 取消勾选
      if (status && !value.children) { // 如果被选中了
        // 判断兄弟数组中是否存在相同联系人
        this.filterTag(value)
        this.findSameItem(value.id, true)
      } else {
        this.findSameItem(value.id, false)
        this.dynamicTags.forEach((val, idx) => {
          if (val.id === value.id) {
            this.dynamicTags.splice(idx, 1)
          }
        })
      }
    },
    filterTag (value) {
      if (!value) return
      let flag = 0
      this.dynamicTags.forEach((val, index) => {
        if (val.id === value.id) {
          flag = 1
        }
      })
      if (!flag) {
        this.dynamicTags.push(value)
      }
    },
    findSameItem (id, status = true) {
      // const params = status
      if (this.allList.length <= 0) return
      this.allList.forEach((val1, index1) => {
        this.$refs['tree' + index1][0].setChecked(id, status)
      })
      this.$refs['companyTree'].setChecked(id, status)
      this.$refs['searchTree'].setChecked(id, status)
    },
    // 树递归选中/取消选中相同子节点
    // findTreeSameitem (id, status = true, list = this.companyTree.data) {
    //   // 遍历公司树
    //   if (list.length <= 0) return
    //   list.forEach((val, index) => {
    //     if (val.userId === id) {
    //       this.$refs['companyTree'].setChecked(id, status)
    //     }
    //     if (val.children && val.children.length > 0) {
    //       this.findTreeSameitem(id, status, val.children)
    //     }
    //   })
    // },
    handleClose (tag) {
      this.findSameItem(tag.userId, false)
    },
    filterNode (value, data) {
      // console.log(value, data)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style scoped>
.CMLeftTop {
  padding-left: 10px;
  padding-top: 15px;
}
.peopleNum {
  font-size: 13px;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  margin-left: 10px;
  margin-bottom: 5px;
  display: inline-block;
}
.CMLeftBottom {
  padding: 0 20px;
  border-top: 1px solid rgba(229, 229, 229, 1);
  padding-top: 18px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.CMLeftBottom .el-select {
  display: block;
}
.searchInpBox {
  padding: 10px 20px;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
}
.contactsScroll {
  height: calc(100% - 55px);
}
.tagsScroll {
  bottom: 131px;
  position: absolute;
  top: 42px;
}
.tagText {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  font-weight: normal;
}
.nodata{
  color: #999999;
  font-size: 13px;
  text-align: center;
}

.nodata-img{
  margin: 110px auto 22px;
  display: block;
}
</style>

