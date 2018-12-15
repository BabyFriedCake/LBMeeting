<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>分享预约会议</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="sharePage">
      <div class="share-erweima-wrapper">
        <img class="share-erweima" ref="img" :src="shareImg" alt="">
      </div>
      <p class="share-tips"><img  src="../../../assets/images/wx.png" alt="">会议开始后30分钟后、会议结束、会议取消自动失效</p>
      <el-button class="share-btn" type="primary" @click="download">保存</el-button>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import {downloadFile} from '@/utils/function'
export default {
  data () {
    return {
      shareImg: require('../../../assets/images/photo.png')
    }
  },
  components: {
    Titlebtn
  },
  methods: {
    download () {
      console.log(this.$refs['img'].src)
      // 保存图片
      downloadFile('http://www.yougexing.net/uploads/180720/1-1PH0160022-lp.jpg', 'erweima.jpg', false)
    }
  }
}
</script>
<style>
@import '~/src/renderer/assets/css/myMeeting.css';
</style>
