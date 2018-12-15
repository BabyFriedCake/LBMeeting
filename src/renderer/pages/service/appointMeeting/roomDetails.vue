<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>会议室详情</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon po-re">
        <b class="f-s-14">会议室号：{{roomDetails.meetingRoomCode}}</b>
        <span class="roomState1 po-st">{{roomDetails.stateLabel}}</span>
        <i class="iconfont icon-pc-icon-30 colorF3732D f-s-16 fr cur-po"></i>
        <div class="clear"></div>
        <ul>
            <li>
                <label for="">会议室类型：</label>
                <span>{{roomDetails.meetingRoomTypeLabel}}</span>
            </li>
            <li>
                <label for="">绑定并发数：</label>
                <span>{{roomDetails.maxConcurrent}}</span>
            </li>
            <li>
                <label for="">绑定并发到期时间：</label>
                <span>{{roomDetails.endTime}}</span>
            </li>
            <li>
                <label for="">会议主持人：</label>
                <span>???</span>
            </li>
        </ul>
        <ul class="hasbodTopE5">
            <li>
                <label for="">主持人密码：</label>
                <span>{{(roomDetails.hostOpenFlag==='1')?(roomDetails.hostPwd):'********'}}</span>
            </li>
            <li>
                <label for="">参会人密码：</label>
                <span>{{(roomDetails.attendeeOpenFlag==='1')?roomDetails.attendeePwd:'********'}}</span>
            </li>
        </ul>
        <ul class="hasbodTopE5">
            <li>
                <label for="">会议室备注：</label>
                <span>??????</span>
            </li>
        </ul>
    </div>
    <div class="pageBtns noBodTop">
      <el-button
        class="w-210"
        type='primary'
        @click="save()"
      >进入会议室</el-button>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    Titlebtn
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'roomDetails'
    ])
  },
  watch: {

  },
  mounted () {
    console.log(this.roomDetails)
  },
  methods: {

  }
}
</script>
<style scoped>
.pageCon{
    padding: 20px 20px 0 20px
}
.pageCon>ul{
    padding: 13px 0;
    font-size:13px;
    color:rgba(51,51,51,1);
    line-height:24px;
    color: #333;
}
.pageCon>ul label{
    display: inline-block;
    vertical-align: middle
}
.pageCon>ul span{
    color: #999;
    display: inline-block;
    vertical-align: middle
}
.hasbodTopE5{
    border-top: 1px solid #E5E5E5
}
.pageBtns .el-button{
    width: 210px
}
.icon-pc-icon-30:hover,.icon-pc-icon-30:active{
    color: #ffb186
}
</style>

