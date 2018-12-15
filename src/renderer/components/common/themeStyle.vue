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
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">云文件</el-breadcrumb-item>
        <el-breadcrumb-item>天津卓朗科技发展有限公司</el-breadcrumb-item>
        <el-breadcrumb-item>天津卓朗科技发展有限公司</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="yunFile">
        <el-button>按钮</el-button>
        <el-button disabled>按钮</el-button>
        <el-button type='primary'>按钮</el-button>
        <el-button type='primary' disabled>按钮</el-button>
        <el-select v-model="test">
          <el-option value="111"><el-checkbox>aaa</el-checkbox></el-option>
        </el-select>
        <br>
        <br>
        <el-input></el-input>
        <br><br>
        <el-checkbox>aaaa</el-checkbox>
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-radio v-model="radio" label="2">备选项</el-radio>
        <el-radio v-model="radio" disabled label="3">备选项</el-radio>
      </div>
    </div>
    <div class="pageBtns">
      <el-button>取消</el-button>
      <el-button type='primary'>保存</el-button>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
export default {
  data () {
    return {
      radio: '1',
      test: 1
    }
  },
  components: {
    Titlebtn
  },
  mounted () {
  }
}
</script>
