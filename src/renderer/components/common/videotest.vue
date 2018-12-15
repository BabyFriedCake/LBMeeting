<template>
  <div id='wrapper'>
    <video id='video' width='400' height='300'></video>
    <Button id='tack'>snap shot</Button>
    <el-button>默认按钮</el-button>
    <canvas id='canvas' width='400' height='300'></canvas>
    <img id='img' src>
    <div>
      <el-Select name="音频输出" id="" v-model="audiooutput">
        <template v-for="(item, index) in MediaDeviceInfo">
          <el-option :key="index" value="item.deviceId" v-if="item.kind === 'audiooutput'">{{ item.label }}</el-option>
        </template>
      </el-Select>
      <el-Select name="音频输入" id="" v-model="audiooutput">
        <template v-for="(item, index) in MediaDeviceInfo">
          <el-option :key="index" value="item.deviceId" v-if="item.kind === 'audioinput'">{{ item.label }}</el-option>
        </template>
      </el-Select>
      <el-Select name="视频输入" id="" v-model="audiooutput">
        <template v-for="(item, index) in MediaDeviceInfo">
          <el-option :key="index" value="item.deviceId" v-if="item.kind === 'videoinput'">{{ item.label }}</el-option>
        </template>
      </el-Select>
    </div>
  </div>
</template>
<script>
import { Select, Option, Button } from 'element-ui'

export default {
  components: {
    'el-Select': Select,
    'el-option': Option,
    Button
  },
  data () {
    return {
      MediaDeviceInfo: []
    }
  },
  methods: {},
  mounted () {
    let video = document.getElementById('video')
    let canvas = document.getElementById('canvas')
    let snap = document.getElementById('tack')
    let img = document.getElementById('img')
    let vendorUrl = window.URL || window.webkitURL

    // 媒体对象
    window.navigator.getMedia =
    window.navigator.getUserMedia ||
    window.navagator.webkitGetUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia
    window.navigator.getMedia(
      {
        video: true, // 使用摄像头对象
        audio: false // 不适用音频
      },
      function (strem) {
        console.log(strem)
        video.src = vendorUrl.createObjectURL(strem)
        video.play()
      },
      function (error) {
        // error.code
        console.log(error)
      }
    )
    snap.addEventListener('click', function () {
      // 绘制canvas图形
      canvas.getContext('2d').drawImage(video, 0, 0, 400, 300)

      // 把canvas图像转为img图片
      img.src = canvas.toDataURL('image/png')
    })
    // 方法MediaDevices.enumerateDevices() 用于收集系统上可用的多媒体输入和输出设备的信息。
    navigator.mediaDevices.enumerateDevices()
      .then((MediaDeviceInfo) => {
        console.info(123, MediaDeviceInfo)
        this.MediaDeviceInfo = MediaDeviceInfo
      })
    console.info(222, Select)
    console.info(222, Option)
  }
}
</script>

<style lang="scss">

</style>