<template>
  <div class='bgfff h-273'>
    <div class="fr mr-10 mt-10"><Titlebtn type="close" /></div>    
    <div class="w-360 h-66 lh-66 b-b-1 color999 f-s-14 mgauto">会议附件(共{{count}}个)</div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
export default {
  components: {
    Titlebtn
  },
  data () {
    return {
      count: 0
    }
  },
  mounted () {
  }
}
</script>