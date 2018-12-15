<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>保存到云盘</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="ml-20">
        <el-breadcrumb-item :to="{ path: '/saveToYunFile' }">云文件</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!showListFlag">天津卓朗科技发展有限公司</el-breadcrumb-item>
      </el-breadcrumb>
      <el-scrollbar class="yunFileScroll">
        <div class="yunFile mr-20 ml-20">
          <dl v-if="showListFlag">
            <dt>
              <span>个人云盘</span>
            </dt>
            <dd @dblclick="openFolder(folderName)">
              <i class="documentIcons icon-file"></i>
              <p class="yunFileCell">
                <span class="yunFileCellName">个人云盘个人云盘个人云盘个人云盘个</span>
                <span class="badge bgF3732D ml-6">常用</span>
              </p>
              <div class="yunFileCellRight clearfix">
                <span class="color95B639">21.2M/100M</span>
                <i class="iconfont icon-pc-icon-3" @click="openFolder(folderName)"></i>
              </div>
            </dd>
            <dt>企业云盘</dt>
            <dd v-for="(company, index) in getClouddiskDirectoryForUser.companySpace" :key="index" @dblclick="openFolder(company.companyId)">
              <i class="documentIcons icon-file"></i>
              <p class="yunFileCell">
                <span>{{company.companyName}}</span>
                <span class="badge bgF3732D ml-6">常用</span>
              </p>
              <div class="yunFileCellRight clearfix">
                <span class="color95B639">{{company.usedSize | formatFileSize}}/{{company.totalSize | formatFileSize}}</span>
                <i class="iconfont icon-pc-icon-3" @dblclick="openFolder(company.companyId)"></i>
              </div>
            </dd>
            <!-- <dd>
              <i class="icon-file"></i>
              <p class="yunFileCell">
                <span>北京卓朗</span>
                <span class="badge bgF3732D ml-6">常用</span>
              </p>
              <div class="yunFileCellRight clearfix">
                <span class="color95B639">21.2M/100M</span>
                <i class="iconfont icon-pc-icon-3"></i>
              </div>
            </dd> -->
          </dl>
          <dl v-else>
            <dd>
              <i class="documentIcons icon-pdf"></i>
              <p class="yunFileCell">
                <span>朗云视讯项目文件.pptx</span>
              </p>
              <div class="yunFileCellRight">
                <span class="yunFileTime">2018-12-06 15:33</span>
              </div>
            </dd>
            <dd>
              <i class="documentIcons icon-ppt"></i>
              <p class="yunFileCell">
                <span>朗云视讯项目文件.pptx</span>
              </p>
              <div class="yunFileCellRight">
                <span class="yunFileTime">2018-12-06 15:33</span>
              </div>
            </dd>
            <dd>
              <i class="documentIcons icon-jpg"></i>
              <p class="yunFileCell">
                <span>朗云视讯项目文件.pptx</span>
              </p>
              <div class="yunFileCellRight">
                <span class="yunFileTime">2018-12-06 15:33</span>
              </div>
            </dd>
            <dd>
              <i class="documentIcons icon-word"></i>
              <p class="yunFileCell">
                <span>朗云视讯项目文件.pptx</span>
              </p>
              <div class="yunFileCellRight">
                <span class="yunFileTime">2018-12-06 15:33</span>
              </div>
            </dd>
          </dl>
        </div>
      </el-scrollbar>
    </div>
    <div class="pageBtns">
      <el-button @click="closeWin()">取消</el-button>
      <el-button type='primary' @click="save()">保存</el-button>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'

import { mapState } from 'vuex'
// import { formatFileSize } from '@/utils/validate'
const { BrowserWindow } = require('electron').remote
export default {
  data () {
    return {
      showListFlag: true,
      'getClouddiskDirectoryForUser': {
        'userSpace': {
          'totalSize': 52428901,
          'usedSize': 13385200
        },
        'companySpace': [
          {
            'companyId': '2c9aeacb674de3d901674de3d9b80001',
            'totalSize': 10737418240,
            'usedSize': 0,
            'companyName': '天津卓朗'
          },
          {
            'companyId': '2c9aeacb674de3d901674de3d9b80002',
            'totalSize': 10737418240,
            'usedSize': 0,
            'companyName': '天津卓朗2'
          }
        ]
      }
    }
  },
  components: {
    Titlebtn
  },
  computed: {
    ...mapState({
      userType: state => state.user.userType
    })
  },
  methods: {
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
    save () {

    }
  },
  mounted () {
    console.log(this.userType)
  }
}
</script>
<style scoped>
</style>

