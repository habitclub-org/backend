import { missionDao } from "../models";

const getMissions = async (userId, date, groupId, limit=5, page=1) => {
  const [yyyy, mm, dd] = date.split('-')

  let inputDate = new Date()
  inputDate.setUTCFullYear(yyyy, mm-1, dd)
  inputDate.setUTCHours(0,0,0,0)

  const groups = await missionDao.getMissions(userId, inputDate, groupId, limit, page);

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
        mission.checkAvailability = 'failed'
      } else {
        mission.checkAvailability = 'available'
      }

      mission.isCompleted = mission.missionComplete.length > 0
      mission.startTime = mission.checkStartTime.toLocaleTimeString()
      mission.endTime = mission.checkEndTime.toLocaleTimeString()

      delete mission.userMission
      delete mission.checkStartTime
      delete mission.checkEndTime
    }
  }

  return groups 
};

const getMissionStatistics = async (userId) => {
  const stat = await missionDao.getMissionStatistics(userId)
  return {
    user: stat.userInfo.name,
    userTags: stat.userInfo.userTag.map((e) => (e.tag)),
    completeRate: stat.checkCompletes._sum.checkCompleted / stat.checkNeeded._sum.totalCheckNeeded * 100,
    completes: stat.checkCompletes._sum.checkCompleted,
    completedDays: stat.checkDays.checkDays
  }
}

const getMissionCompleteness = async (userId, startDate, endDate) => {
  const [syyyy, smm, sdd] = startDate.split('-')
  const [eyyyy, emm, edd] = endDate.split('-')

  let inputDate = new Date()
  let inputStartDate = new Date()
  let inputEndDate = new Date()

  inputStartDate.setUTCFullYear(syyyy, smm-1, sdd)
  inputStartDate.setUTCHours(0,0,0,0)
  inputEndDate.setUTCFullYear(eyyyy, emm-1, edd)
  inputEndDate.setUTCHours(0,0,0,0)

  return await missionDao.getUserMission(userId, inputStartDate, inputEndDate);
}

export default { getMissions, getMissionStatistics, getMissionCompleteness };
