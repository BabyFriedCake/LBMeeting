<template>
  <div class="popPage appoint">
    <div class="pageTit drag">
          <div class="left-drag"></div>
          <div class="right-drag"></div>
          <span>预约会议</span>
          <div class="winOperateBtn">
            <Titlebtn type="min" />
            <Titlebtn type="close" />
          </div>
        </div>
  <div class="content">
    <div class="w-310 mgauto mt-20 mb-40">
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="与会人员"></el-step>
        <el-step title="会议设置"></el-step>
      </el-steps>
    </div>
  <div id="1" v-show="active==0" class="w-500">
    <el-form :model="form" :rules="rules" ref='form' class="ml-40">
        <el-form-item label="会议主题" :label-width="formLabelWidth" prop="theme">
          <el-input v-model="form.theme" auto-complete="off" placeholder="请输入会议主题"></el-input>
        </el-form-item>
        <div style="height:8px" class="f-l clear w100"></div>
        <el-form-item label="会议时间" :label-width="formLabelWidth" prop="startTime">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="开始时间"
              default-time="12:00:00"
              :picker-options="pickerOptionsStart"
              prefix-icon="el-icon-date"
              popper-class="noArrow">
            </el-date-picker>

        </el-form-item>
        <div class="selectDown">
        <span class="d-ib w-90 t-a-r f-s-14 pr-5">会议时长</span>
          <el-select v-model="form.hours" collapse-tags>
            <el-option v-for="selectHour in hours" :value="selectHour.value" :label="selectHour.label" ></el-option>
          </el-select>

        <span class="d-ib w-50 t-a-c f-s-14">小时</span>
          <el-select v-model="form.second" placeholder="小时" collapse-tags popper-class="w-100">
            <el-option v-for="selectSecond in second" :value="selectSecond.value" :label="selectSecond.label" ></el-option>
          </el-select>
          <span class="d-ib w-50 t-a-c f-s-14">分钟</span>
        </div>
      <!--<label class="labelStyle">-->
      <el-form-item label="参会企业" :label-width="formLabelWidth" v-show='userType === "user"' prop="companyIds">
        <el-select v-model="form.companyIds" placeholder="请选择企业" class="wp-100" @change="changeCompany" multiple collapse-tags
                   popper-class='noArrow'>
          <el-option v-for="companyItem in joinedCompanyList" :value="companyItem.companyId" :label="companyItem.companyName"></el-option>
        </el-select>
      </el-form-item>
      <!--</label>-->
      <div v-if='userType === "company"' class=" t-a-l h-40 lh-40 f-s-14 mt-25"><span class="d-ib t-a-r w-90 pr-12 mr-10">参会企业</span><span>{{companyName}}</span></div>
      <div class="h-110">
        <el-form-item label="会议室" :label-width="formLabelWidth" prop="roomNum">
        <el-select v-model="form.roomNum" placeholder="请选择会议室号" class="wp-100" collapse-tags
                     popper-class='noArrow' @change="changeRoomNum" :disabled='isFixroom=form.room === "0"'>
            <el-option v-for="room in fixRoomList" :value="room.meetingRoomId" :label="room.meetingRoomCode"></el-option>
          </el-select>
      </el-form-item>
      <!-- <span class="d-ib w-90 t-a-r fl f-s-14 pr-20 h-40 lh-40 mb-35 mr-10">选择会议室</span> -->
        <div class="fl _radio noLine">
          <el-radio v-model="form.room" label="1">固定会议室</el-radio>
          <el-radio v-model="form.room" label="0">临时会议室</el-radio>
      </div>
      </div>
    </el-form>
    </div>
      <div id="2" v-show="active==1" class="w-420 mgauto" style="margin-top:-30px;">
        <label class="search">
          <el-input v-model="search" auto-complete="off" placeholder="请输入部门或人员名称" @keyup.enter.native="searchStaffHandler">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
          </label>
          <span class="searchBtn" @click="searchStaffHandler"></span>
          <div class="treeContainer mb-10">
            <el-scrollbar class='inviteScroll'>
              <div class="pl-10 pb-20">
                <el-collapse v-model="departmentStruct">
                  <el-collapse-item :title="company.companyName+'(共'+company.userCount+'人)'" :name="company.departmentId" v-for="company in companyList" :key='company.companyId'>
                    <div class="ml-15" style="margin-top:-10px">
                      <el-collapse-item :title="department.departmentName+'(共'+department.userCount+'人)'" :name="department.departmentId" v-for="department in company.departmentList" :key='department.departmentId'>
                        <div v-for="user in department.userList" :key="user.userID" class="pl-25 h-30 mr-20 selectUser">
                          <el-tooltip class="item" effect="dark" :content="user.userName" placement="top-start">
                            <span class="d-in w-100 text-dot">{{user.userName}}</span>
                          </el-tooltip>
                          <template :slot-scope="user">
                            <el-radio-group  v-model="user.selectUserType" @change="changeType(user)">
                              <el-radio  :label="user.userName+','+user.userID+'-1'"><i class="iconfont icon-pc-icon-35 color999 mr-10"></i>主持人</el-radio> -->
                              <el-radio :label="user.userName+','+user.userID+'-2'"><i class="iconfont icon-pc-icon-34 color999 mr-10"></i>参会人</el-radio>
                            </el-radio-group>
                            <!-- <el-radio v-model="user.selectUserType" :label="user.userName+','+user.userID+'-1'" @change="changeType"><i class="iconfont icon-maikefeng1 color8b9ab1 mr-10"></i>主持人</el-radio> -->
                            <!-- <el-radio v-model="user.selectUserType" :label="user.userName+','+user.userID+'-2'" @change="changeType"><i class="iconfont icon-yonghuzu color8b9ab1 mr-10"></i>参会人</el-radio> -->
                          </template>
                        </div>
                      </el-collapse-item>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-scrollbar>
          </div>
          <el-input v-model="inputEmail" auto-complete="off" placeholder="输入员工邮箱邀请(可按回车进行确认)" @keyup.enter.native="confirmEmail(inputEmail)">
            <template slot="append"><span @click="selectGroup">选择群组</span></template>
          </el-input>
          <div class="selected mt-10 pl-10 pt-5 pr-10 pb-5">
            <el-scrollbar class="tag_scroll">
              <div class="pt-5 pb-5">
                <el-tag
                    v-for="tag in tags"
                    :key="tag.userID"
                    closable
                    @close="delUser(tag.userID)">
                  <i :class="tag.meetingType"></i>{{tag.userName}}
                </el-tag>
                <div class="h-30 lh-30 t-a-r colorF3732D f-s-14 cur-po" :style='marginTop' @click="createGroup">新建群组</div>
                <div class="h-15"></div>
              </div>
              
            </el-scrollbar>
          </div>
        
      </div>
    <div id="3" v-show="active==2" class="w-420 mgauto">
      <div class="mb-20 f-s-14">会议附件</div>
      <div class="ml-30">
        <span class="d-ib w-420 h-36 lh-36 bgFEF3EC f-s-14" @click="openAssest">
          <label class="d-ib pl-10">共{{assetsCount}}个</label>
          <i class="iconfont icon-pc-icon-3 fr pr-10 f-s-12 colorF3732D"></i>
        </span>
      <div class="setButton po-re t-a-r f-s-14 mb-30">
        <el-upload
            class="d-ib"
            :action=upload.url
            multiple
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-change="uploadChange"
            :on-remove="removeFile"
            auto-upload
            :file-list="fileList"
            ref="upload"
            >
          <span class="colorF3732D"><i class="iconfont icon-pc-icon-1 pr-10 cur-po"></i>本地上传</span>
          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
        <div class="d-ib w-20 h-40"></div>
        <span @click="getCloudFile" class="cur-po colorF3732D"><i class="iconfont icon-pc-icon-2 pr-10"></i>云盘上传</span>
      </div>
      <!--<div class="c-both"></div>-->
      <!-- <div class="setMeeting mb-10"> -->
      <!-- <el-scrollbar style="height:100%">
      <ul class="mt-20 ml-40">
        <li class="uploadFrame fl" :class="file.status | uploadBg" v-if="file" v-for="file in fileList">
          <div class="pi10 w-228">
            <i :class="file.iconFix | filterIcon" class="fl fix-icon"></i><span class="d-ib w-110 text-dot fl">{{file.name}}</span>
            <span v-show="file.size / 1024 / 1024>200 || file.error" class="colore85749 cur-po d-ib" @click="removeFile(file)"><i class="iconfont icon-delete fl cur-po"></i><label class="d-ib cur-po">失败</label></span>
            <span v-show="file.status === 'success' && !file.error" class="colore85749 cur-po d-ib" @click="removeFile(file)"><i class="iconfont icon-delete fl cur-po"></i><label class="d-ib cur-po">删除</label></span>
            <span v-show="file.status === 'uploading' && !file.error" class="color36bdff cur-po d-ib" @click="removeFile(file)"><i class="iconfont icon-cancel fl cur-po"></i><label class="d-ib cur-po">取消</label></span>
            </div>
          <el-progress  v-show='!file.error && file.status !== "success"' :percentage="file.percentage" :show-text="showText" :stroke-width="4" :width="228"></el-progress>
        </li>
        <div class="c-both"></div>
      </ul>
      </el-scrollbar> -->
      <!-- </div> -->
      <div class="b-t-1 pt-20">
        <span class="d-b f-s-14 f-w-b pb-10">会议设置</span>
        <el-checkbox v-model="meetingRecord">会议开始时自动录制会议</el-checkbox>
        <div class="c-b mb-10"></div>
        <el-checkbox v-model="isModify">修改会议室密码</el-checkbox>
        <div class="c-b"></div>
        <div class="mt-20">
          <span class="f-s-14 d-ib ml-10">主持人密码</span>
          <el-input class='w-120' placeholder='请输入主持人密码' v-model="host"></el-input>
          <span class="f-s-14 d-ib ml-10">参会人密码</span>
          <el-input class='w-120' placeholder='请输入参会人密码' v-model="attend"></el-input>

        </div>
      </div>
      </div>
      </div>
    <el-dialog title="云盘上传" :visible="cloudOpen" width="480px" :before-close='closeHandler' custom-class="cloud">
      <div class="mb-10">
        <span class="d-ib w-360">
        <el-input type="text" class="f-l ypInputLarge" placeholder="文件名称" @keyup.enter.native="searchFile" v-model="getTableData.fileName"></el-input>
          </span>
        <!--<a class="srhBtn f-r"  @click="search">搜索</a>-->
        <span class="d-ib fr"><el-button type="primary" @click="searchFile" class="w-60">搜索</el-button></span>
        <div class="clear"></div>
      </div>
      <div class="tableBox">
        <el-table :data="cloudData" style="width: 100%" :show-header="false">
          <el-table-column prop="fileName" label="名称" show-overflow-tooltip >{{cloudData}}</el-table-column>

          <el-table-column prop="domore" label="操作" width="120">

            <template slot-scope="scope">
              <span class="d-in mr-10 cur-po" @click="add(scope.$index, scope.row)">
                  <!-- <transition name="fade"> -->
                    <span v-show='!scope.row.addFile' class="color0099FF"><i class="iconfont icon-add2" style="font-size: 25px;vertical-align:sub"></i><span class="d-ib">加入附件</span></span>
                <!-- </transition> -->
                <!--{{scope.row}}-->
                  <transition name="fade">
                    <span v-show='scope.row.addFile' class="d-ib fr">加入附件
                    <i class="el-icon-success color50c14e fr w-30" style="margin-top: 5px;margin-left: 4px;"></i>
                    </span>
                  </transition>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="list-pagination ta-c" v-if="getTableData.pager_total">
          <el-pagination  @current-change="handleCurrentChange" :current-page="getTableData.pager_current_page" :page-size="getTableData.pager_page_size" layout="total,prev, pager, next" :total="getTableData.pager_total" ></el-pagination>
        </div>
      </div>
      <div class="clear"></div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="closeHandler">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
        title=""
        :visible="sucStatus"
        width="350px"
        :before-close="sucClose" custom-class="suc">
      <span class="lh-30 ft-16 d-in" style="padding:10px;text-align: left">您已成功预约会议，会议室号 {{appSuccess.meetingRoomCode}},<br>开始时间 {{appSuccess.startTime}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="transStatus">确 定</el-button>
        </span>
    </el-dialog>
    <!--<el-dialog-->
        <!--title=""-->
        <!--:visible="sucStatus"-->
        <!--width="350px"-->
        <!--:before-close="handleClose" custom-lass="meetingSuccess">-->
      <!--<span class="lh-30 ft-16 d-in" style="padding:10px">您已成功预约会议，会议室号{{appSuccess.meetingRoomCode}},<br>开始时间{{appSuccess.startTime}}</span>-->
        <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button type="primary" @click="transStatus">确 定</el-button>-->
        <!--</span>-->
    <!--</el-dialog>-->
    <div class="c-both"></div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="prev" v-show="active===0">取消</el-button>
      <el-button @click="prev" v-show="active>0">上一步</el-button>
      <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
      <el-button type="primary"  @click="next" v-show="active<2">下一步</el-button>
      <span class="setFont ml-10">
        <el-button type="primary"  @click="submit" v-show="active===2">立即提交</el-button>
      </span>
    </div>
    </div>
</div>
</template>
<style>
.appoint .el-collapse-item__arrow{
  position:absolute;
  left:0;
  top:15px;
}
.appoint .el-collapse-item__header{
  padding-left:20px;
  position:relative;
  border:0
}
  .noArrow .popper__arrow{
    display:none !important
  }
  .el-date-editor.el-input {
    width:100% !important
  }
  .selectDown {
    margin-bottom:20px;
  }
  .selectDown .el-input__inner{
    width:120px;
  }
  ._radio {
    width:300px;
    margin-left:100px;
  }
  ._radio .el-radio{
    margin-right:20px
  }
  .dialog-footer {
    width:200px;
    left:50%;
    margin-left:-100px;
    position:absolute;
    bottom:30px;
  }
  .dialog-footer .el-button {
    padding:0;
    width:80px;    
  }
  .search .el-input__inner {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px
  }
  /* .dialog-footer .setFont .el-button {
    width:88px;
  } */
  .labelStyle .el-form-item{
    margin-top:25px;
  }
  .iconfont.icon-date {
    font-size: 25px !important;
  }
  .el-date-editor .el-input--prefix .el-input__inner {
    padding-left:15px;
    padding-right:30px;
  }
  .el-date-editor .el-input__prefix {
    left:initial;
    width:25px;   
    right:5px;
  }
  .treeContainer{
    overflow: hidden;

  }
  .inviteScroll{
    height:100%;
  }
  .inviteScroll .el-scrollbar__wrap {
    overflow-x:hidden
  }
  .el-collapse-item__header {
    border:0;
    height:40px;
    font-size: 14px;
  }
  .appoint .el-collapse-item__wrap {
    border:0
  }
  .el-collapse-item__content{
    /*margin-bottom:10px;*/
    padding-bottom:0
  }
  .el-collapse-item__arrow{
    float:left;
    line-height:40px;
    /*height:30px;*/
  }
  .appoint .el-collapse-item__arrow {
    font-family: 'iconfont' !important;
    font-size: 10px;
    -webkit-transform:rotate(-90deg);
    transform:rotate(-90deg);
    color:#999999;
    margin-right:0
  }
  .appoint .el-collapse-item__arrow.is-active{
    font-family: 'iconfont' !important;
    font-size: 10px;
    -webkit-transform:rotate(0deg);
    transform:rotate(0deg);
    color:#999999
  }
  .appoint .el-icon-arrow-right:before {
    content:"\e607"
  }
  .selectUser span{
    display: inline-block;
  }
  .tag_scroll{
    height:100%
  }
  .tag_scroll .el-scrollbar__wrap {
    overflow-x:hidden
  }
  .el-tag{
    border-radius: 13px;
    margin-right:10px;
    margin-bottom: 10px;
    color:#333333;
    /*background:rgba(0,153,255,1);*/
    /*opacity:0.11*/
  }
  .el-tag i{
    color:#8C9AB0;
    margin-right: 5px;
  }
  .el-tag .el-icon-close {
    color:#0099ff
  }
  .el-collapse {
    border:0
  }
  .searchBtn{
    width:40px;
    height:40px;
    /*background-color:red;*/
    position: absolute;
    right: 60px;
    top: 120px;
    display: inline-block;
    cursor:pointer
  }
  .el-button--warning{
    background:#FFBA00;
    border-color: #FFBA00;
  }

  .el-icon-document{

  }
  .el-upload-list__item{
    position:relative;
    margin-top:0;
  }
  .el-upload-list{
    display:none;
  }
  .uploadFrame{
    width:228px;
    height:50px;
    border:1px solid #0099ff;
    /*padding:10px;*/
    line-height: 28px;
    box-sizing: content-box;
  }
  .iconfont.icon-delete {
    font-size:35px
  }
  .iconfont.icon-cancel {
    font-size:35px
  }
  .el-progress-bar__inner{
    border-radius: 0;
    background-color:#4DCC21
  }
  .setMeeting{
    height:280px;
    margin-top:10px;
  }
  .setMeeting .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .cloud.el-dialog {
    height:345px;
  }
  .cloud .el-dialog__title{
    color:white;
    font-size: 16px;

  }
  .cloud .el-dialog__header{
    padding:0;
    height:40px;
    padding-left:30px;
    color:white;
    background-color: #36BDFF;
    line-height: 40px;
  }
  .cloud .el-dialog__headerbtn .el-dialog__close{
    color:white;
  }
  .cloud .el-dialog__headerbtn {
    top:10px;
  }
  .cloud .el-dialog__body {
    padding:20px;
  }
  .cloud .el-pagination .btn-prev .el-icon,.el-dialog .el-pagination .btn-next .el-icon {
    font-family: iconfont !important;
    font-size: 40px;
    margin-top:-5px;
    font-weight: normal;
  }
  .cloud .el-icon-arrow-left:before{
    content:"\e634"
  }
  .cloud .el-icon-arrow-right:before {
    content:"\e638"
  }
  .el-pagination {
    color:#666
  }
  .el-pagination .btn-next,.el-pagination .btn-prev{
    color:#666666;
  }
  .el-pager li {
    font-size: 12px;
  }
  .confirmStyle{
    width:460px;
    height:200px;
    border:0
  }
  .confirmStyle .el-message-box__header{
    padding:0;
    padding-left:30px;
    width:100%;
    height:40px;
    line-height: 40px;
    background:#36BDFF
  }
  .confirmStyle .el-message-box__title {
    line-height: 40px;
    color:#fff;
    font-size: 16px;;
  }
  .confirmStyle .el-message-box__message p {
    text-align: center;
    font-size: 16px;
    color:#666;
    margin-top:45px;
    margin-bottom:25px;
  }
  .confirmStyle .el-message-box__status.el-icon-warning{
    display:none
  }
  #appoint .el-button {
    padding:0;
    height:32px;
    line-height: 32px;
  }
  .el-button.el-picker-panel__link-btn {
    width:50px;
    height:25px;
    line-height: 25px;
  }
  .noLine {
    margin-top:-20px;
  }
  .appoint .el-radio-group {
    height:30px;
  }
</style>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import {openNewWindow, failure, acceptData, transferTo} from '@/utils/function'
import {joinedCompany, getMultipe, getMultipeCompanyOrg} from '@/api/appoint'
// const {
//   BrowserWindow
// } = require('electron').remote
export default {
  filters: {
    filterIcon: function (value) {
      switch (value) {
        case 'PPT':
          return 'ppt'
        case 'pptx':
          return 'ppt'
        case 'pdf':
          return 'pdf'
        case 'xls':
          return 'xls'
        case 'xlsx':
          return 'xls'
        case 'doc':
          return 'word'

        case 'docx':
          return 'word'
        case 'png':
          return 'pic'
        case 'jpg':
          return 'pic'
        case 'bmp':
          return 'pic'
        case 'mp4':
          return 'mov'
        case 'txt':
          return 'txt'
        default:
          return 'other'
      }
    },
    uploadBg: function (value) {
      switch (value) {
        case 'success':
          return 'bgfff'
        default:
          return 'bgcebf8ff'
      }
    }
  },
  components: {
    Titlebtn
  },
  data () {
    const meetingTheme = (rules, value, callback) => {
      if (!value) {
        callback(new Error('会议主题不能为空'))
      } else if (value.length > 50) {
        callback(new Error('会议主题不能超过50个字'))
      } else {
        callback()
      }
    }
    const companyIds = (rules, value, callback) => {
      if (value.length === 0 && !this.companyId && this.userType === 'user') {
        callback(new Error('请选择企业'))
      } else {
        callback()
      }
    }
    const selectTime = (rules, value, callback) => {
      if (!value) {
        callback(new Error('请选择时间'))
      } else {
        callback()
      }
    }
    const roomNum = (rules, value, callback) => {
      if (!value && !this.isFixroom) {
        callback(new Error('请选择会议室号'))
      } else {
        callback()
      }
    }
    //      const selectcompany=(rules,value,callback) => {
    //        console.log(value)
    //        if(!value) {
    //          callback(new Error('请选择企业'))
    //        }else{
    //          callback()
    //        }
    //      }

    return {
      active: 0, // 步骤
      form: {
        companyId: [],
        theme: '',
        startTime: new Date(),
        room: '1', // 会议室类型
        roomNum: '', // 会议室号
        hours: 0,
        second: 0
      },
      hours: [],
      second: [],
      rules: {
        theme: [{ validator: meetingTheme, trigger: 'blur' }],
        companyIds: [{ validator: companyIds, message: '请选择企业', trigger: 'blur' }],
        startTime: [{ validator: selectTime, trigger: 'blur' }],
        roomNum: [{ validator: roomNum, trigger: 'blur' }]
      },
      userType: '',
      formLabelWidth: '100px',
      joinedCompanyList: [],
      pickerOptionsStart: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      pickerOptionsEnd: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      error: 0,
      companyName: [],
      userId: '',
      userName: '',
      companyId: '',
      fixRoomList: [], // 固定会议室列表
      departmentStruct: [], // 公司结构
      companyList: [],
      tags: [],
      inputEmail: '', // 邀请人员
      inviteList: [],
      search: '',
      mockId: 0, // 为tags循环模拟userid
      upload: {
        file: [],
        url: global.baseURL + '/meeting/uploadAtt',
        header: {
          version: '2_2',
          token: 'token'
        }
      },
      fileList: [],
      percent: 0,
      documentType: '',
      showText: false,
      meetingRecord: true,
      cloudOpen: false,
      getTableData: {
        // 获取表格所需传入数据
        endDate: '',
        startDate: '',
        fileName: '',
        pager_current_page: 1, // 当前页
        pager_page_size: 4, // 每页显示条数
        pager_total: 0 // 总页数
      },
      cloudData: [],
      addFile: false,
      sourceIds: [], // 所有附件
      meetingRoomCode: '', // 固定会议室ID
      sucStatus: false, // 对话框状态
      appSuccess: {},
      assetsCount: '',
      arr: [],
      marginTop: '',
      isFixroom: false
    }
  },
  created () {
    // this.userType = this.$store.getters.userInfo.user ? 'user' : 'company'
    if (this.$store.getters.userInfo.user) {
      this.userType = 'user'
    } else {
      this.userType = 'company'
      this.companyId = this.$store.getters.userInfo.company.companyId
    }
  },
  watch: {
    //      fileList:function(n) {
    //        console.log(n)
    //      }
  },
  methods: {
    changeCompany (m) {
      this.$refs.form.clearValidate('selectCompany')
      var self = this
      if (m.length > 0) {
        // var id = m.join(',')
        // request('post', global.API.meeting.getFixRoom, qs.stringify({companyIds: id}), function (res) {
        //   self.fixRoomList = res.value
        //   //            console.log(res.value)
        //   self.form.roomNum = self.fixRoomList[0].meetingRoomCode
        //   self.meetingRoomCode = self.fixRoomList[0].meetingRoomCode
        //   self.meetingRoomId = self.fixRoomList[0].meetingRoomId
        //   //            self.meetingRoomId=self.fixRoomList[0].meetingRoomId
        // })
        getMultipe({companyIds: m.join(',')}).then((res) => {
          this.fixRoomList = res.value
          this.form.roomNum = this.fixRoomList[0].meetingRoomCode
          this.meetingRoomCode = this.fixRoomList[0].meetingRoomCode
          this.meetingRoomId = this.fixRoomList[0].meetingRoomId
        })
      } else {
        self.fixRoomList = []
        self.form.roomNum = ''
        //          console.log(self.form)
      }
    },
    setTime () {

    },
    transferClose () {

    },
    next () {
      // this.active++
      if (this.active === 0) { // 判断第一步表格
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.active++
            this.getAllCompanyStruct() // 获取多公司所有结构
          }
        })
      } else if (this.active === 1) { // 第2步时，点击下一步，判断与会人员
        var count = 0
        for (var i = 0; i < this.tags.length; i++) {
          if (this.tags[i].attentType === '1') {
            count++
          }
        }
        if (this.tags.length === 0) {
          failure('请选择参加会议人员')
        } else if (count === 0) {
          failure('请选择主持人')
        } else {
          this.active++
        }
      } else {
        this.active = 2
      }
    },
    prev () {
      if (this.active > 0) {
        this.active--
      } else {
        this.active = 0
      }
    },
    getHourValue () {
      for (var i = 1; i < 13; i++) {
        this.hours.push({'label': i, 'value': i})
      }
      console.log(this.hours[1].label)
      this.form.hours = this.hours[1].label
    },
    getSecondValue () {
      for (var i = 0; i < 60; i += 10) {
        this.second.push({'label': i, 'value': i})
      }
      this.form.second = this.second[0].label
    },
    stepFirst () {
      console.log(this.userType)
      // var self = this
      if (this.userType === 'user') {
        var param = {
          'userId': this.userId
        }

        // request('post', global.API.meeting.joinedCompany, qs.stringify(param), function (res) {
        //   self.joinedCompanyList = res.value
        //   //            console.log(self.joinedCompanyList[0].companyId)
        //   var arr = []
        //   //            arr.push(self.joinedCompanyList[0])
        // })
        /* eslint-disable*/
        debugger
        joinedCompany(param).then((res) => {
          this.joinedCompanyList = res.value
        })
      } else {
        this.companyName = this.$store.getters.userInfo.company.companyName
        var param = {
          companyIds: this.companyId
        }
        getMultipe(param).then((res)=>{
          this.fixRoomList = res.value
          this.form.roomNum = self.fixRoomList[0].meetingRoomCode
          this.meetingRoomCode = self.fixRoomList[0].meetingRoomCode
          this.meetingRoomId = self.fixRoomList[0].meetingRoomId
        })
      }
    },
    getAllCompanyStruct () { // 获取多个企业结构
      var companyIds = this.companyId || this.form.companyIds.join(',')
      // var self = this
      getMultipeCompanyOrg({companyIds: companyIds, keyword: this.search}).then((res)=>{
        this.companyList=res.value
      })
      // request('post', global.API.meeting.getCompaniesOrg, qs.stringify({companyIds: companyIds, keyword: this.search}), function (res) {
      //   self.companyList = res.value
      //   //          console.log(res.value)
      // })
    },
    changeType (val) {
      // v-model绑定多个值
      var meetingUserType = ''
      var pType
      var id
      // var temp
      var selectUserType = val.selectUserType
      id = selectUserType.split(',')[1].split('-')[0]
      for (var j = 0; j < this.companyList.length; j++) {
        for (var m = 0; m < this.companyList[j].departmentList.length; m++) {
          for (var n = 0; n < this.companyList[j].departmentList[m].userList.length; n++) {
            if (id === this.companyList[j].departmentList[m].userList[n].userID) {
              this.companyList[j].departmentList[m].userList[n].selectUserType = selectUserType
              val = selectUserType
            }
          }
        }
      }
      if (val[val.length - 1] === '1') {
        meetingUserType = 'iconfont icon-pc-icon-35'
        pType = '1'
      } else {
        meetingUserType = 'iconfont icon-pc-icon-34'
        pType = '2'
      }
      var userName = val.split(',')[0]
      var param = {
        userID: id,
        userName: userName,
        meetingType: meetingUserType,
        attentType: pType
      }
      var count = 0
      for (var i = 0; i < this.tags.length; i++) {
        if (this.tags[i].userID === id) {
          count++
          this.tags[i].meetingType = param.meetingType
          this.tags[i].attentType = param.attentType
        }
      }
      if (count === 0) {
        this.tags.push(param)
      }

      // 新建群组的位置
      if(this.tags.length === 0){
        this.marginTop='margin-top:40px;'
      }else{
        this.marginTop='margin-top:10px;'
      }
      transferTo('/createGroup','reloadTags',this.tags)
    },
    delUser (val) {
      for (var i = 0; i < this.tags.length; i++) {
        if (this.tags[i].userID === val) {
          // this.tags[i].meetingType=0
          this.tags.splice(i, 1)
        }
      }
      for (var j = 0; j < this.companyList.length; j++) {
        for (var m = 0; m < this.companyList[j].departmentList.length; m++) {
          for (var n = 0; n < this.companyList[j].departmentList[m].userList.length; n++) {
            if (val === this.companyList[j].departmentList[m].userList[n].userID) {
              this.companyList[j].departmentList[m].userList[n].selectUserType = ''
            }
          }
        }
      }
    },
    confirmEmail (val) {
      var reg = new RegExp(
        '^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$'
      )
      if (!reg.test(val)) {
        failure('邮箱错误，请重新输入')
        this.inputEmail = ''
      } else {
        var param = {
          userID: this.mockId++,
          userName: this.inputEmail,
          attentType: '2',
          outsidersEmail: this.inputEmail
        }
        this.tags.push(param)
        this.inputEmail = ''
      }
       if(this.tags.length === 0){
        this.marginTop='margin-top:40px;'
      }else{
        this.marginTop='margin-top:10px;'
      }
    },
    searchStaffHandler () {
      this.getAllCompanyStruct()
    },
    uploadSuccess (response, file, fileList) {
      var index = fileList.indexOf(file)
      if (response && response.state !== 200) {
        this.$set(this.fileList[index], 'error', true)
        // failure('上传失败,' + response.message)
      } else {
        //          this.sourceIds.push(response.value.sourceId)
        this.$set(this.fileList[index], 'sourceId', response.value.sourceId)
      }
    },

    uploadChange (file, fileList) {
      if (!file.error) {
        this.fileList = fileList
        var postfix = file.name.split('.')
        var postFixName = postfix[postfix.length - 1]
        var index = fileList.indexOf(file)
        this.$set(this.fileList[index], 'iconFix', postFixName)
      }
    },
    beforeUpload (file) {
      var isUpload = file.size / 1024 / 1024 > 200 // 判断文件是否小于200MB
      if (isUpload) {
        failure('上传失败，文件不能超过200MB')
        return false
      }
    },
    removeFile (file, fileList) {
      this.$confirm('是否确认删除该文件?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'confirmStyle'
      }).then(() => {
        this.$refs.upload.abort(file)
        var index = this.fileList.indexOf(file)
        this.fileList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submit () {
      var isUpLoading = 0
      for (var i = 0; i < this.fileList.length; i++) {
        if (!this.fileList[i].response && !this.fileList[i].sourceId) {
          isUpLoading++
        }
      }
      if (isUpLoading > 0) {
        // failure('请等待文件上传完毕后再提交')
        return
      }
      // var cid
      // if (userType === 'user') {
      //   cid = this.form.companyIds.join(',')
      // } else {
      //   cid = companyId
      // }
      // var startTime = this.form.startTime.getTime()
      // var endTime = startTime + this.form.hours * 60 * 60 * 1000 + this.form.second * 60 * 1000

      console.log(new Date(this.form.startTime))
      //        console.log(this.form.hours)
      //        var meetingRoomId=form.room === '1'?
      // var meetingRoomCode = this.form.room === '1' ? this.form.roomNum : ''
      console.log(this.tags)
      var joinerList = []
      // 给所有参会人赋值
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].outsidersEmail) {
          joinerList.push({attentType: '2', outsidersEmail: this.tags[i].outsidersEmail, userId: ''})
        } else {
          if (this.tags[i].attentType === '1') {
            joinerList.push({attentType: '1', userId: this.tags[i].userID, outsidersEmail: ''})
          } else {
            joinerList.push({attentType: '2', userId: this.tags[i].userID, outsidersEmail: ''})
          }
        }
      }
      // 为附件赋值
      var attList = []
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].sourceId) {
          attList.push({sourceId: this.fileList[i].sourceId})
        }
      }
      // var paramJsonStr = {
      //   companyId: cid,
      //   startTime: startTime,
      //   endTime: endTime,
      //   meetingTheme: this.form.theme,
      //   meetingRoomType: this.form.room,
      //   meetingRoomCode: this.meetingRoomCode,
      //   meetingRoomID: this.meetingRoomId,
      //   orderJoinerList: joinerList,
      //   attList: attList,
      //   isRecord: this.meetingRecord ? '1' : '0'
      // }
      // var self = this
      // request('post', global.API.meeting.createMeeting, qs.stringify({paramJsonStr: JSON.stringify(paramJsonStr)}), function (res) {
      //   self.sucStatus = true
      //   self.appSuccess = res.value
      // })
    },
    handleClose () {
      this.cloudOpen = false
    },
    getCloudFile () {
      // var param = {
      //   pageNum: this.getTableData.pager_current_page,
      //   pageSize: this.getTableData.pager_page_size,
      //   fileName: this.getTableData.fileName,
      //   startDate: this.getTableData.startDate,
      //   endDate: this.getTableData.endDate
      // }
      var self = this
      // request('post', global.API.meeting.getCloudFile, qs.stringify(param), function (response) {
      //   self.cloudData = response.value.list
      //   self.getTableData.pager_total = response.value.total
      //   for (var i = 0; i < self.fileList.length; i++) {
      //     if (self.fileList[i].id) {
      //       for (var j = 0; j < self.cloudData.length; j++) {
      //         if (self.fileList[i].id === self.cloudData[j].id) {
      //           self.$set(self.cloudData[j], 'addFile', 'true')
      //           self.$set(self.cloudData[j], 'status', 'success')
      //         }
      //       }
      //     }
      //   }
      // })
      console.log(self.getTableData)
      this.cloudOpen = true
    },
    handleCurrentChange (val) { // 换页
      this.getTableData.pager_current_page = val
      this.getCloudFile()
    },
    closeHandler () {
      this.cloudOpen = false
    },
    add (index, row) {
      // var self = this
      console.log(this.companyId)
      // var params = {
      //   id: row.id,
      //   companyId: this.companyId[0]
      // }
      // console.log(row)
      if (!row.addFile) {
        // request('post', global.API.meeting.uploadToAtt, qs.stringify(params), function (response) {
        //   var param = {
        //     sourceId: response.value.sourceId,
        //     name: response.value.name,
        //     suffix: response.value.suffix
        //   }
        //   row.addFile = true
        //   self.$set(row, row.addFile) // 添加加入附件的动画
        //   //            self.$emit('getUploadData', param)
        //   var postfix = param.name.split('.')
        //   var postFixName = postfix[postfix.length - 1]
        //   //            console.log(param.name)
        //   self.fileList.push({name: param.name, sourceId: param.sourceId, iconFix: postFixName, id: params.id})
        // })
      }
    },
    searchFile () { // 搜索云文件
      this.getCloudFile()
    },
    changeRoomNum (val) { // 切换会议室号
      //        this.meetingRoomId=val
      //        console.log(val)
      //        console.log(this.form.roomNum)
      let obj = {}
      obj = this.fixRoomList.find((room) => { // 这里的userList就是上面遍历的数据源
        return room.meetingRoomId === val// 筛选出匹配数据
      })
      this.meetingRoomCode = obj.meetingRoomCode
      this.meetingRoomId = val
    },
    sucClose () { // 预约成功对话框关闭
      this.sucStatus = false
    },
    transStatus () {
      this.sucStatus = false
      this.active = 0
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
      this.form.room = '1'
      this.tags = []
      this.fileList = []
      this.companyList = []
      this.stepFirst()
    },
    openAssest () {
      var windowConfig = {
        params: 'appointUploading',
        width: 418,
        height: 275,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false // 无边框窗口
      }
      openNewWindow(windowConfig)
    },
    selectGroup () {
       var windowConfig = {
        params: 'groupList',
        width: 418,
        height: 354,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        resizable:false,
        frame: false // 无边框窗口
      }
      openNewWindow(windowConfig)
    },
    createGroup() {
      var self=this
      var windowConfig = {
        params: 'createGroup',
        width: 478,
        height: 286,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        resizable:false,
        frame: false // 无边框窗口
      }
      openNewWindow(windowConfig)
      this.$store.originalDispatch('initSelect',this.tags)
    }    
  },
  mounted () {
    this.getHourValue() // 初始化小时值
    this.getSecondValue() // 初始化分钟值
    this.stepFirst()
     if(this.tags.length === 0){
        this.marginTop='margin-top:40px;'
      }else{
        this.marginTop='margin-top:10px;'
      }
    // 变量初始化
    var self=this
    acceptData('delTags',function(data) {
      self.delUser(data)
    })
  }
}
</script>

