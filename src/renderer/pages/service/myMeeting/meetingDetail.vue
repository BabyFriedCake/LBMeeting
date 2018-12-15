<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>我的会议</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="myMeetingPage">
      <div class="pageHeader clearfix bd-b-10">
        <el-breadcrumb class="fl lh-20 pt-10" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-if="true" class="colorF3732D">待开始</el-breadcrumb-item>
          <el-breadcrumb-item v-else :to="{ path: '/' }">已结束</el-breadcrumb-item>
          <el-breadcrumb-item>会议详情</el-breadcrumb-item>
        </el-breadcrumb>  
        <el-button class="fr hover-change" icon="iconfont icon-pc-icon-27" type="text" @click="toShare()"></el-button>   
      </div>
      
      <el-scrollbar class="meetingDetail-scrollbar">
        <div class="container">
          <div class="bd-b-10">
            <div class="clearfix mb-10 pt-20">
              <p class="meeting-title fl mr-10  lh-25">{{detail.meetingTheme}}</p>
              <span class="meeting-tips living" v-if='detail.state==1'>进行中</span>
              <span class="meeting-tips before" v-if='detail.state==0'>待开始</span>
              <span class="meeting-tips end" v-if='detail.state==2'>已结束</span>
            </div>
          <div class="meeting-li">
            <span>会议室号：</span><p>{{detail.meetingRoomCode}}</p>
          </div>
            <div class="meeting-li">
            <span>开始时间：</span><p>{{detail.startTime | filterTime}}</p>
          </div> 
          <div class="meeting-li">
            <span>预计时长：</span><p>{{detail.meetingRoomCode}}</p>
          </div>
          <div class="meeting-li">
            <span>参与企业：</span><p>{{detail.companyName}}</p>
          </div>
          </div>
          <!-- 上传会议附件 -->
          <div class="bd-b-10 pb-20 clearfix">
            <div class="clearfix mt-20 mb-10">
              <span>会议附件</span>
              <div class="upload-type fr" v-show="fileList.length>0">
                <el-button icon="iconfont icon-pc-icon-1" type="text"> <label for="filelist" class="cur-po"> 本地上传 </label></el-button>
                <el-button icon="iconfont icon-pc-icon-2" type="text"> 云盘上传</el-button>
              </div>
            </div>
            <div class="upload-box fl mr-10 mb-10" v-show="fileList.length<=0"  >
                <div class="upload-btn" @click="showUploadType=!showUploadType">
                  <i class="iconfont icon-pc-icon-24 upload-icon mr-10"></i>上传会议文件
                </div>
                <div class="upload-type-pop" v-show='showUploadType'  @mouseleave="showUploadType=!showUploadType">
                  <p>
                    <label for="filelist" class="upload-label"> 
                      本地上传
                    </label>
                    <input type='file' class="d-n" id='filelist' ref='file' @change="changeInput">
                  </p>
                  <p>云盘上传</p>
                </div>
            </div>
            <div class="upload-box fl mr-10 mb-10" v-for="(item,index) in fileList" :key="index">
              <div class="file-box">
                <img :src="item.suffix | filterSuffix" :alt="item.newName">
                <p class="file-name">{{item.newName}}</p>
                <el-button type="text" v-if="!item.progressWidth" icon="iconfont icon-pc-icon-16" class="file-btn hover-change" @click="item.showMore=!item.showMore"></el-button>
                <el-button type="text" v-else icon="iconfont icon-pc-icon-7" class="file-btn hover-change" @click="deleteFile('filelist')"></el-button>
              </div> 
              <div class="file-progress" :key="index" :style="{'width':item.progressWidth+'%'}"></div>
              <div class="upload-type-pop" v-show='item.showMore' @mouseleave="item.showMore=!item.showMore">
                  <p>打开</p>
                  <p>保存到本地</p>
                  <p>分享给联系人</p>
                  <p>保存到云盘</p>
                  <p>删除</p>
                </div>
            </div>
          </div>
          <!-- 会议录像 -->
          <div class="bd-b-10 pb-20 clearfix" v-if='detail.state==2'>
          <div class="clearfix mt-20 mb-10">
              <span>会议录像</span>
            </div>
            <div class="upload-box fl mr-10 mb-10" v-for="(item,index) in videoList" :key="index">
              <div class="file-box">
                <img :src="item.suffix | filterSuffix" :alt="item.newName">
                <p class="file-name">{{item.newName}}</p>
                <el-button type="text" icon="iconfont icon-pc-icon-16" class="file-btn hover-change" @click="item.showMore=!item.showMore"></el-button>
              </div> 
              <div class="upload-type-pop" v-show='item.showMore' @mouseleave="item.showMore=!item.showMore">
                  <p>打开</p>
                  <p>保存到本地</p>
                  <p>分享给联系人</p>
                  <p>保存到云盘</p>
                  <p>删除</p>
                </div>
            </div>
          </div>
          <!-- 上传会议纪要 -->
          <div class="bd-b-10 pb-20 clearfix" v-if='detail.state==2'>
            <div class="clearfix mt-20 mb-10">
              <span>会议纪要</span>
            <div class="upload-type fr" v-show="recordsList.length>0">
                <el-button icon="iconfont icon-pc-icon-1" type="text"> <label for="recordsList" class="cur-po"> 本地上传 </label></el-button>
                <el-button icon="iconfont icon-pc-icon-2" type="text"> 云盘上传</el-button>
              </div>
            </div>
            <div class="upload-box fl mr-10 mb-10" v-show="recordsList.length<=0"  >
                <div class="upload-btn" @click="showUploadType2=!showUploadType2">
                  <i class="iconfont icon-pc-icon-24 upload-icon mr-10"></i>上传会议文件
                </div>
                <div class="upload-type-pop" v-show='showUploadType2'  @mouseleave="showUploadType2=!showUploadType2">
                  <p>
                    <label for="recordsList" class="upload-label"> 
                      本地上传
                    </label>
                    <input type='file' class="d-n" id='recordsList' ref='file2' @change="changeInput2">
                  </p>
                  <p>云盘上传</p>
                </div>
            </div>
            <div class="upload-box fl mr-10 mb-10" v-for="(item,index) in recordsList" :key="index">
              <div class="file-box">
                <img :src="item.suffix | filterSuffix" :alt="item.newName">
                <p class="file-name">{{item.newName}}</p>
                <el-button type="text" v-if="!item.progressWidth" icon="iconfont icon-pc-icon-16" class="file-btn hover-change" @click="item.showMore=!item.showMore"></el-button>
                <el-button type="text" v-else icon="iconfont icon-pc-icon-7" class="file-btn hover-change" @click="deleteFile('recordsList')"></el-button>
              </div> 
              <div class="file-progress" :key="index" :style="{'width':item.progressWidth+'%'}"></div>
              <div class="upload-type-pop" v-show='item.showMore' @mouseleave="item.showMore=!item.showMore">
                  <p>打开</p>
                  <p>保存到本地</p>
                  <p>分享给联系人</p>
                  <p>保存到云盘</p>
                  <p>删除</p>
                </div>
            </div>
          </div>
          
          <div class="pb-20 ml-20 mr-20">
            <div class="clearfix">
              <span class="fl attend-title">主持人</span>
              <ul class="attend-list clearfix">
                <li class="mr-20" v-for="item in attendList" :key="item.userId">
                  <img :src="item.loginImg" alt="">
                  <span>{{item.userName}}</span>
                </li>
              </ul>
            </div>
            <div class="clearfix">
              <span class="fl attend-title">参会人</span>
              <ul class="attend-list clearfix">
                <li class="mr-20" v-for="item in attendList" :key="item.userId">
                  <img :src="item.loginImg" alt="">
                  <span>{{item.userName}}</span>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </el-scrollbar>
      <div class="pageFooter">
        <el-button>取消会议</el-button>
        <el-button type="primary">立即入会</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import {uploadAtt} from '@/API/myMeeting'
import {openNewWindow} from '@/utils/function'
export default {
  data () {
    return {
      showUploadType: false,
      showUploadType2: false,
      videoList: [
        {
          newName: '朗云视讯.mp4',
          oldName: 'jq.mp4',
          sourceId: '2c9aea8d64f8fb840164f8fcc3940040',
          suffix: 'mp4',
          showMore: false
        },
        {
          newName: '朗云视讯.mp4',
          oldName: '阿里巴巴Java开发手册终极版v1.3.0.mp4',
          sourceId: '2c9aea8d64f8fb840164f8fce03b0042',
          suffix: 'mp4',
          showMore: false
        }
      ],
      fileList: [
        // {
        //   'newName': '朗云视讯.txt',
        //   'oldName': 'jq.txt',
        //   'sourceId': '2c9aea8d64f8fb840164f8fcc3940040',
        //   'suffix': 'TXT'
        // },
        // {
        //   'newName': '朗云视讯.doc',
        //   'oldName': '阿里巴巴Java开发手册终极版v1.3.0.doc',
        //   'sourceId': '2c9aea8d64f8fb840164f8fce03b0042',
        //   'suffix': 'doc'
        // },
        // {
        //   'newName': '朗云视讯朗云视讯朗云视讯.pdf',
        //   'oldName': '直播间修改信息.pdf',
        //   'sourceId': '2c9aea8d64f8fb840164f8fd162a0044',
        //   'suffix': 'pdf'
        // }
      ],
      recordsList: [
        // {
        //   'newName': '朗云视讯.txt',
        //   'oldName': 'jq.txt',
        //   'sourceId': '2c9aea8d64f8fb840164f8fcc3940040',
        //   'suffix': 'TXT'
        // },
        // {
        //   'newName': '朗云视讯.doc',
        //   'oldName': '阿里巴巴Java开发手册终极版v1.3.0.doc',
        //   'sourceId': '2c9aea8d64f8fb840164f8fce03b0042',
        //   'suffix': 'doc'
        // }
        // {
        //   'newName': '朗云视讯朗云视讯朗云视讯.pdf',
        //   'oldName': '直播间修改信息.pdf',
        //   'sourceId': '2c9aea8d64f8fb840164f8fd162a0044',
        //   'suffix': 'pdf'
        // }
      ],
      attendList: [{
        'attentType': '1',
        'attentTypeLabel': '主持人',
        'meetingOrderId': '2c9aeacb65404ab80165404ea27f0004',
        'meetingOrderJoinerId': '2c9aeacb65404ab80165404ea2a10007',
        'outsidersEmail': '',
        'userEmail': 'sunyuanyuan@troila.com',
        'userId': '2c9aeacb63f406610163f40efc2e06711',
        'userName': '孙沅沅',
        loginImg: require('../../../assets/images/photo.png')
      }, {
        'attentType': '1',
        'attentTypeLabel': '主持人',
        loginImg: require('../../../assets/images/photo.png'),
        'meetingOrderId': '2c9aeacb65404ab80165404ea27f0004',
        'meetingOrderJoinerId': '2c9aeacb65404ab80165404ea2a10007',
        'outsidersEmail': '',
        'userEmail': 'sunyuanyuan@troila.com',
        'userId': '2c9aeacb63f406610163f40efc2e06712',
        'userName': '孙沅沅'
      }, {
        'attentType': '1',
        'attentTypeLabel': '主持人',
        loginImg: require('../../../assets/images/photo.png'),
        'meetingOrderId': '2c9aeacb65404ab80165404ea27f0004',
        'meetingOrderJoinerId': '2c9aeacb65404ab80165404ea2a10007',
        'outsidersEmail': '',
        'userEmail': 'sunyuanyuan@troila.com',
        'userId': '2c9aeacb63f406610163f40efc2e06713',
        'userName': '孙沅沅'
      }, {
        'attentType': '1',
        'attentTypeLabel': '主持人',
        loginImg: require('../../../assets/images/photo.png'),
        'meetingOrderId': '2c9aeacb65404ab80165404ea27f0004',
        'meetingOrderJoinerId': '2c9aeacb65404ab80165404ea2a10007',
        'outsidersEmail': '',
        'userEmail': 'sunyuanyuan@troila.com',
        'userId': '2c9aeacb63f406610163f40efc2e06714',
        'userName': '孙沅沅'
      }],
      detail: {
        'attendCount': 1,
        'companyId': 'ff80808163f24a3a0163f3b55b30052e',
        'companyName': '天津卓朗科技发展有限公司，天津卓朗科技发展有限公司，天津卓朗科技发展有限公司，天津卓朗科技发展有限公司',
        'copyUrl': 'https://localhost/meeting/copyurl/1231530',
        'createUserId': '2c9aeacb63f406610163f40efc2e0671',
        'createUserName': '孙沅沅',
        'duration': 0,
        'endTime': 1531474499000,
        'meetingOrderId': '2c9aeacb64fd89180164fd8af1460030',
        'meetingRoomCode': '123153012',
        'meetingTheme': '萝卜开会项目讨论会',
        'modify': true,
        'startTime': 1531474497000,
        'state': '2',
        'summaryDownPath': ''
      }
    }
  },
  filters: {
    filterTime: function (value) {
      if (!value) return
      const date = new Date(value)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = date.getDay()
      if (day < 10) {
        day = '0' + day
      }
      let hour = date.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }
      let min = date.getMinutes()
      if (min < 10) {
        min = '0' + min
      }
      return year + '-' + month + '-' + day + ' ' + hour + ':' + min
    },
    filterSuffix: function (value) {
      if (!value) return
      switch (value) {
        case 'TXT' :
          return require('../../../assets/images/filesIcon/p.png')
        case 'PDF' || 'pdf' :
          return require('../../../assets/images/filesIcon/pp.png')
        case 'XLS' || 'XLSX':
          return require('../../../assets/images/filesIcon/p.png')
        case 'png' || 'jpg' || 'bmp' || 'jpeg':
          return require('../../../assets/images/filesIcon/j.png')
        case 'doc' || 'DOCX':
          return require('../../../assets/images/filesIcon/w.png')
        default:
          return require('../../../assets/images/filesIcon/j.png')
      }
    }
  },
  components: {
    Titlebtn
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.fileList.forEach((val, index) => {
        this.$set(this.fileList[index], '')
      })
    },
    changeInput (e) {
      // console.log(e)
      let file = e.target.files[0]
      let suffix = file.name.split('.')[file.name.split('.').length - 1]
      this.fileList.unshift({
        newName: file.name,
        oldName: file.name,
        sourceId: '2c9aea8d64f8fb840164f8fcc3940040111',
        suffix: suffix,
        progressWidth: 0,
        showMore: false
      })
      // 上传文件
      const formData = new FormData()
      formData.append('file', file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$set(this.fileList[0], 'progressWidth', 50)
      uploadAtt(formData, config).then(response => {
        this.$message({ message: '上传成功！', type: 'success' })
        this.$set(this.fileList[0], 'progressWidth', 100)
        this.$set(this.fileList[0], 'progressWidth', 0)
      }).catch(err => {
        this.$message({ message: '上传失败！请重新选择上传', type: 'error' })
        this.$set(this.fileList[0], 'progressWidth', 80)
        this.fileList[0].progressWidth = 0
        // this.fileList.shift()
        console.log(err)
      })
    },
    changeInput2 (e) {
      // console.log(e)
      let file = e.target.files[0]
      let suffix = file.name.split('.')[file.name.split('.').length - 1]
      this.recordsList.unshift({
        newName: file.name,
        oldName: file.name,
        sourceId: '2c9aea8d64f8fb840164f8fcc3940040111',
        suffix: suffix,
        progressWidth: 0,
        showMore: false
      })
      // 上传文件
      const formData = new FormData()
      formData.append('file', file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$set(this.recordsList[0], 'progressWidth', 50)
      uploadAtt(formData, config).then(response => {
        this.$message({ message: '上传成功！', type: 'success' })
        this.$set(this.recordsList[0], 'progressWidth', 100)
        this.$set(this.recordsList[0], 'progressWidth', 0)
      }).catch(err => {
        this.$message({ message: '上传失败！请重新选择上传', type: 'error' })
        this.$set(this.recordsList[0], 'progressWidth', 80)
        this.recordsList[0].progressWidth = 0
        // this.recordsList.shift()
        console.log(err)
      })
    },
    deleteFile (list) {
      // 取消正在上传的文件
      this.$message({ message: '取消上传！', type: 'success' })
      this.list.shift()
      console.log(this.list[0])
    },
    toShare () {
      const windowConfig = {
        params: 'shareMeeting',
        width: 400,
        height: 327,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false // 无边框窗口
        // resizable: true
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
<style>
@import '~/src/renderer/assets/css/myMeeting.css';
</style>