<template>
  <div class="appoint addMeetingGroup bgfff">
    <div class="fr mr-10 close"><Titlebtn type="close" /></div>
    <div class="w-420 mgauto pt-30">
      <el-input v-model="groupName"></el-input>
      <div class="wp-100 selected mt-20">
        <el-scrollbar class="groupScroll">
           <div class="pt-5 pb-5 pl-5 pr-5">
            <el-tag
                v-for="tag in tags"
                :key="tag.userID"
                closable
                @close="delUser(tag.userID)">
              <i :class="tag.meetingType"></i>{{tag.userName}}
            </el-tag>
          </div>
        </el-scrollbar>
      </div>
      <div class="t-a-c pt-30">
        <el-button class="w-80">取消</el-button>
        <el-button class="w-80"  type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import {transferTo, acceptData} from '@/utils/function'
export default {
  components: {
    Titlebtn
  },
  data () {
    return {
      groupName: '',
      tags: []

    }
  },
  created () {

  },
  methods: {
    delUser (id) {
      transferTo('/appoint', 'delTags', id)
      for (var i = 0; i < this.tags.length; i++) {
        if (this.tags[i].userID === id) {
          // this.tags[i].meetingType=0
          this.tags.splice(i, 1)
        }
      }
    }
  },
  mounted () {
    var self = this
    this.tags = this.$store.getters.selectTags
    // console.log(this.$store.getters.selectTags)
    acceptData('reloadTags', function (data) {
      self.tags = data
    })
  }
}
</script>

<style>

</style>
