import { missionDao } from "../models";

const getMissions = async (userId, date, groupId) => {
  const [yyyy, mm, dd] = date.split('-')

  let inputDate = new Date()
  inputDate.setUTCFullYear(yyyy, mm-1, dd)
  inputDate.setUTCHours(0,0,0,0)

  const groups = await missionDao.getMissions(userId, inputDate, groupId);

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]

    for (let j = 0; j < group.mission.length; j++) {
      const mission = group.mission[j]
      const now = new Date()

      const missionStartTime = mission.checkStartTime.toTimeString()
      const missionEndTime = mission.checkEndTime.toTimeString()
      const nowTime = now.toTimeString()

      const [mstH, mstM, mstS] = missionStartTime.split(':')
      const [metH, metM, metS] = missionEndTime.split(':')
      const [nowH, nowM, nowS] = nowTime.split(':')

      let mst = new Date()
      mst.setHours(+mstH)
      mst.setMinutes(mstM)

      let met = new Date()
      met.setHours(+metH)
      met.setMinutes(metM)

      let nowt = new Date()
      nowt.setHours(+nowH)
      nowt.setMinutes(nowM)

      if (nowt < mst) {
        mission.checkAvailability = 'waiting'
      } else if (met < nowt) {
        mission.checkAvailabilty = 'failed'
      } else {
        mission.checkAvailabilty = 'available'
      }

      mission.isChecked = mission.UserMission.length > 0
      mission.startTime = mission.checkStartTime.toLocaleTimeString()
      mission.endTime = mission.checkEndTime.toLocaleTimeString()

      delete mission.UserMission
      delete mission.checkStartTime
      delete mission.checkEndTime
    }
  }

  return groups 
};

const getMissionStatistics = async (userId) => {
  const s = await missionDao.getMissionStatistics(userId)
  return s
}

export default { getMissions, getMissionStatistics };
