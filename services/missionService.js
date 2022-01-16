import { missionDao } from "../models";

const getMissions = async (userId, groupId) => {
  const date = '2021-02-01T00:00:00.000Z'
  const groups = await missionDao.getMissions(userId, date, groupId);

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    
    for (let j = 0; j < group.mission.length; j++) {
      const mission = group.mission[j]
      const now = new Date()

      console.log('start: ', mission.checkStartTime.getUTCHours())
      console.log('end: ', mission.checkEndTime.getUTCHours())
      console.log('nowOriginal: ', now)
      console.log('now: ', now.getUTCHours())
      console.log(mission.checkStartTime.getUTCHours() - now.getUTCHours())

      if (mission.checkStartTime.toTimeString() - now.toTimeString() > 0) {
        mission.checkAvailability = 'waiting'
      } else if (mission.checkEndTime.toTimeString() - now.toTimeString() < 0) {
        mission.checkAvailabilty = 'failed'
      } else {
        mission.checkAvailabilty = 'available'
      }
      mission.isChecked = mission.UserMission.length > 0

      delete mission.UserMission
    }
  }

  return groups 
};

export default { getMissions };
