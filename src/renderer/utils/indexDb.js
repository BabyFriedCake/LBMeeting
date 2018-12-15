
import 'babel-polyfill'
import Dexie from 'dexie'
let database = ''
let totalRecord = ''
let loginMobiles = ''
// 初始化数据库
export const initialIndexDb = (loginMobile, pageSize) => {
  const db = new Dexie('Chat' + loginMobile)
  db.version(1).stores({
    friends: '++id,from,to,time,content,type,groupid,extend'
  })
  return db.transaction('rw', db.friends, async () => {
    database = db
    loginMobiles = loginMobile
    let record = await readData(pageSize)
    return record
  })
}
// 根据条件查询数据库
export const readData = async (pageSize) => {
  totalRecord = await database.friends.orderBy('time').reverse().limit(pageSize).toArray()
  let jsonArr = []
  totalRecord.reverse().map((i) => jsonArr.push(i))
  return jsonArr
}
// 新增数据
export const addData = async (messages, pageSize) => {
  let id = await database.friends.add(
    {
      cmd: messages.cmd,
      from: messages.from,
      to: messages.to,
      time: messages.time,
      content: messages.data.content,
      type: messages.data.type
    }
  )
  if (id > 0) {
    console.log('数据写入成功', id)
    return initialIndexDb(loginMobiles, 5)
  } else {
    console.log('数据写入失败')
  }
}
// 搜索历史记录
export const searchData = async (searchResult) => {
  const historyRecord = await database.friends.where({content: searchResult}).toArray()
  let jsonArr = []
  historyRecord.map((i) => jsonArr.push(i))
  return Promise.resolve(jsonArr)
}
