import { groupDao } from "../models";

const getGroups = async (userId, search) => {
  const groups = await groupDao.getGroups(search);

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]

    const numMembers = group.userGroup.length
    const daysLeft = group.mission[0].startsAt - Date.now()
    const weeks = group.mission[0].endsAt - group.mission[0].startsAt

    group.runningWeeks = weeks/3600/24/1000/7
    group.currentMember = numMembers
    group.daysLeft = Math.trunc(daysLeft/1000/3600/24)
    group.isPrivate = group.groupStatus.name === 'PRIVATE'
    group.isEnrolled = group.userGroup.filter(function(e) { return e.user.id === Number(userId) }).length > 0
    group.tags = []

    for (let j = 0; j < group.groupTag.length; j++) {
      const { id, name } = group.groupTag[j].tag
      group.tags.push({id, name})
    }

    delete group.userGroup
    delete group.mission
    delete group.groupStatus
    delete group.groupTag
  }
  return groups
};

const getGroupsWithMissions = async (userId) => {
  const date = '2021-02-01T00:00:00.000Z'
  const groups = await groupDao.getGroupsWithMissions(userId, date)

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    
    for (let j = 0; j < group.mission.length; j++) {
      const mission = group.mission[j]
      const now = new Date() 

      if (mission.checkStartTime - now > 0) {
        mission.checkAvailability = 'waiting'
      } else if (mission.checkEndTime - now < 0) {
        mission.checkAvailabilty = 'failed'
      } else {
        mission.checkAvailabilty = 'available'
      }
      mission.isChecked = mission.UserMission.length > 0

      delete mission.UserMission
    }
  }
  return groups
}

export default { getGroups, getGroupsWithMissions };