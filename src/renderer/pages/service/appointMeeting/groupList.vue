<template>
  <div class="groupList bgfff pt-30">
    <div class="fr mr-10 close"><Titlebtn type="close" /></div>
    <div class="w-360 mgauto mt-30">
      <el-input
            placeholder="输入群组名称"
            suffix-icon="iconfont icon-pc-icon-26"
            v-model="keyword"></el-input>
      <div class="h-250">
        <el-scrollbar class="groupListScroll">
          <el-table
            :data="groupList"
            style="width: 100%">
            <el-table-column
              prop="groupName"
              label="群组名称"
              >
            </el-table-column>
            <el-table-column
              prop="userNum"
              label="群组人数"
              >
            </el-table-column>
             <el-table-column prop="domore" label="操作">
            <template slot-scope="scope">
              <span class="d-in mr-10 color0099ff c-p" @click="add(scope.$index, scope.row)">
                    <span>选择</span>
                    <span v-if='scope.row.addFile'>取消选择</span>
              </span>      
            </template>
          </el-table-column>
          </el-table>
          <div class="list-pagination ta-c" v-if="getTableData.pager_total">
          <el-pagination  @current-change="handleCurrentChange" :current-page="getTableData.pager_current_page" :page-size="getTableData.pager_page_size" layout="prev, pager, next" :total="getTableData.pager_total" ></el-pagination>
        </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<style>

</style>

<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import groupList from '@/api/appoint'
export default {
  components: {
    Titlebtn
  },
  data () {
    return {
      keyword: '',
      groupList: [],
      getTableData: {
        groupName: '',
        userName: [],
        pager_current_page: 1, // 当前页
        pager_page_size: 10, // 每页显示条数
        pager_total: 0 // 总页数
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.getTableData.pager_current_page = val
      // this.getDataList()
    },
    getData () {
      groupList({pageNum: this.getTableData.pager_current_page, rowsNum: this.getTableData.pager_page_size}).then((res) => {
        this.groupList = res.value
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>


