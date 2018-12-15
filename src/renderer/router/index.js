import Vue from 'vue'
import Router from 'vue-router'
import aaa from '@/components/common/themeStyle'
import main from '@/components/common/main'
import login from '@/pages/service/login/login'
import loginWeChat from '@/pages/service/login/loginWeChat'
import register from '@/pages/service/login/register'
import index from '@/pages/index'
import fasterEnter from '@/pages/service/login/fasterEnter'
import findPassword from '@/pages/service/login/findPassword'
// import setPassword from '@/pages/service/login/setPassword'
import myMeeting from '@/pages/service/myMeeting'
import meetingDetail from '@/pages/service/myMeeting/meetingDetail'
import shareMeeting from '@/pages/service/myMeeting/share'
// import saveToYunFile from '@/pages/Cloud/myMeetingRoom/saveToYunFile'
// import setPassword from '@/pages/service/login/setPassword'
import saveToYunFile from '@/pages/Cloud/myMeetingRoom/saveToYunFile'
import appoint from '@/pages/service/appointMeeting/appoint'
import appointUpload from '@/pages/service/appointMeeting/upload'
import test1 from '@/pages/transferDemo/test1'
import test2 from '@/pages/transferDemo/test2'
// import myMeeting from '@/pages/service/myMeeting'
// import meetingDetail from '@/pages/service/myMeeting/meetingDetail'
// import appoint from '@/pages/service/appointMeeting/appoint'
// import saveToYunFile from '@/pages/Cloud/myMeetingRoom/saveToYunFile'
import callMeeting from '@/pages/service/myMeeting/callMeeting'
import message from '@/pages/message/index'
import systemSetting from '@/pages/service/setting/systemSetting'
import feedback from '@/pages/service/setting/feedback'
import userSetting from '@/pages/service/setting/userSetting'
import aboutUs from '@/pages/service/setting/aboutUs'
import groupList from '@/pages/service/appointMeeting/groupList'
import modifyRemarks from '@/components/common/modifyRemarks'
import addAontact from '@/components/common/addAontact'
import myCompany from '@/pages/service/setting/myCompany'
import createGroup from '@/pages/service/appointMeeting/addMeetingGroup'
import RoomDetails from '@/pages/service/appointMeeting/RoomDetails'
import enterConferenceRoom from '@/pages/service/appointMeeting/enterConferenceRoom'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: require('@/components/common/themeStyle').default
    // },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/loginWeChat',
      name: 'loginWeChat',
      component: loginWeChat
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: findPassword
    },
    // {
    //   path: '/setPassword',
    //   name: 'setPassword',
    //   component: setPassword
    // },
    {
      path: '/fasterEnter',
      name: 'fasterEnter',
      component: fasterEnter
    },
    {
      path: '/themeDemo',
      name: 'themeDemo',
      component: aaa
    },
    {
      path: '/saveToYunFile',
      name: 'saveToYunFile',
      component: saveToYunFile
    },
    {
      path: '/systemSetting',
      name: 'systemSetting',
      component: systemSetting
    },
    {
      path: '/userSetting',
      name: 'userSetting',
      component: userSetting
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    },
    {
      path: '/myCompany',
      name: 'myCompany',
      component: myCompany
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/callMeeting',
      name: 'callMeeting',
      component: callMeeting
    },
    {
      path: '/meetingDetail',
      name: 'meetingDetail',
      component: meetingDetail
    },
    {
      path: '/myMeeting',
      name: 'myMeeting',
      component: myMeeting
    },
    {
      path: '/shareMeeting',
      name: 'shareMeeting',
      component: shareMeeting
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/appoint',
      name: 'appoint',
      component: appoint
    },
    {
      path: '/appointUploading',
      name: 'appointUpload',
      component: appointUpload
    },
    {
      path: '/groupList',
      name: 'groupList',
      component: groupList
    },
    {
      path: '/modifyRemarks',
      name: 'modifyRemarks',
      component: modifyRemarks
    },
    {
      path: '/addAontact',
      name: 'addAontact',
      component: addAontact
    },
    {
      path: '/createGroup',
      name: 'createGroup',
      component: createGroup
    },
    {
      path: '/RoomDetails',
      name: 'RoomDetails',
      component: RoomDetails
    },
    {
      path: '/enterConferenceRoom',
      name: 'enterConferenceRoom',
      component: enterConferenceRoom
    },
    {
      path: '/test1',
      name: 'test1',
      component: test1
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
