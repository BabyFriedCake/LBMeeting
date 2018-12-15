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
      <div class="pageHeader clearfix bd-b-10 pt-10">
        <div class="toggleBtn fl">
          <span @click="toggleMenu(1)" :class="search.status?'actived':''">待开始</span>
          <div class="border-right-dotted"></div>
          <span @click="toggleMenu(0)" :class="search.status?'':'actived'">已结束</span>
        </div>
        <div class="searchWrapper fr">
          <el-select class="w-100 mr-10" v-model="search.status" placeholder="请选择">
            <el-option 
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input class="w-180 mr-10" v-model="search.meetingTheme" clearable placeholder="输入会议主题"></el-input>
          <el-button class="searchIcon" round icon="el-icon-search" @click="fetchData"></el-button>
        </div>
      </div>
      <div class="container">
        <el-scrollbar class="meeting-scrollbar">
            <div v-if="meetingList.length>0" >
              <div class="bd-b-10 mt-10" v-for=" item in meetingList" :key="item.meetingOrderId">
              <div class="clearfix">
                <p class="meeting-title fl">{{item.meetingTheme}}</p>
                <el-button class="smallBtn fr" @click="toDetail()">详情</el-button>
                <el-button type="primary" class="smallBtn fr mr-10" size="mini" v-if='item.state<=1'>进入</el-button>
              </div>
              <p>
                <span class="meeting-tips living" v-if='item.state==1'>进行中</span>
                <span class="meeting-tips before" v-if='item.state==0'>待开始</span>
                <span class="meeting-tips end" v-if='item.state==2'>已结束</span>
                <span class="meeting-detail ml-10">
                  <span class="mr-15">开始时间：{{item.startTime | filterTime}}</span>
                  <span class="mr-15">预计时长：</span>
                  <span>发起人：{{item.createUserName}}</span>
                </span>
              </p>
            </div>
            </div>
            
          <div v-else>
            <div class="noMeeting" v-if="!search.status&&!search.meetingTheme">
              <img src="../../../assets/images/meeting-empty.png" alt="">
               <p class="mb-5">暂无会议安排</p>
              <p class="f-s-13">请使用电脑客户端或手机app预约会议</p>
            </div>
            <div class="noMeeting" v-else>
              <img src="../../../assets/images/meeting-serch.png" alt="">
               <p class="mb-5">搜索结果为空</p>
              <p class="f-s-13">请重新输入会议主题</p>
            </div>
          </div>
       </el-scrollbar>
     </div>
     <div class="paging">
        <el-pagination class="t-a-c"
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="total">
      </el-pagination>
     </div>
    </div>
   
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import {openNewWindow} from '@/utils/function'

import {moPageList} from '@/API/myMeeting'

export default {
  data () {
    return {
      total: 0,
      currentPage: 1,
      activeMenu: 1,
      meetingList: [],
      search: {
        status: 0,
        meetingTheme: ''
      },
      options1: [{
        label: '已结束',
        value: 0
      }, {
        label: '待开始',
        value: 1
      }]
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
    }
  },
  components: {
    Titlebtn
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const params = {
        pageNum: this.currentPage,
        rowsNum: 10,
        meetingTheme: this.search.meetingTheme
      }
      moPageList(params).then(response => {
        if (response.state === 200) {
          let res = response.value
          if (res.meetingOrder) {
            this.meetingList = res.meetingOrder
          } else {
            this.meetingList = []
          }
          this.total = res.maxRows
        }
      })
    },
    toDetail () {
      const windowConfig = {
        params: 'meetingDetail',
        width: 640,
        height: 525,
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
    },
    toggleMenu (index) {
      this.search.status = index
    },
    fetch () {

    }
  }
}
</script>
<style>
@import '~/src/renderer/assets/css/myMeeting.css';
</style>
