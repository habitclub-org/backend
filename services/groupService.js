import { groupDao } from "../models";
import { groupType } from "../types";

const getGroups = async (userId, type, search, limit=5, page=1) => {
  if (type == groupType.myGroup) {
    var groups = await groupDao.getGroupsByUserId(userId, limit, page)
  } else {
    var groups = await groupDao.getGroups(search, limit, page);
  }

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
    group.isAvailable = group.enrollmentAvailability
    group.tags = []

    for (let j = 0; j < group.groupTag.length; j++) {
      const { id, name, category } = group.groupTag[j].tag
      group.tags.push({id, name, tagCategory: category})
    }

    delete group.userGroup
    delete group.mission
    delete group.groupStatus
    delete group.groupTag
    delete group.enrollmentAvailability
  }
  return { numGroups: groups.length, groups }
};

const getGroup = async (groupId) => {
  const [group] = await groupDao.getGroup(groupId)
  console.log('group!!: ', group.missionEndDate - group.missionStartDate)
  const running = new Date(group.missionEndDate) - new Date(group.missionStartDate)

  group.runningWeeks = running/3600/24/1000/7

  delete group.missionEndDate

  if (!group) {
    const err = new Error('NOT_FOUND')
    err.status = 404

    throw err
  }
  return group
}

const getGroupsWithMissions = async (userId) => {
  const date = '2021-02-01T00:00:00.000Z'
  const groups = await groupDao.getGroupsWithMissions(userId, date)

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    
    for (let j = 0; j < group.mission.length; j++) {
      const mission = group.mission[j]
      const now = new Date() 

      if (mission.checkStartTime - now > 0) {
        console.log(mission.checkStartTime)
        mission.checkAvailability = 'waiting'
      } else if (mission.checkEndTime - now < 0) {
        mission.checkAvailability = 'failed'
      } else {
        mission.checkAvailability = 'available'
      }
      mission.isCompleted = mission.UserMission.length > 0

      delete mission.UserMission
    }
  }
  return groups
}

const createGroup = async (
  hostId,
  isPublic,
  missionType,
  tags,
  groupName,
  groupImage,
  groupDescription,
  maxMember,
  period,
  missionStartDate,
  missionName,
  missionDescription,
  checkStartTime,
  checkEndTime
) => {
  const date = new Date(missionStartDate)
  const missionEndDate = date.setDate(date.getDate() + period * 7)
  return await groupDao.createGroup(
    hostId,
    isPublic,
    missionType,
    tags,
    groupName,
    groupImage,
    groupDescription,
    maxMember,
    new Date(missionStartDate),
    new Date(missionEndDate),
    missionName,
    missionDescription,
    checkStartTime,
    checkEndTime
  )
}

const addGroupMember = async (userId, groupId) => {
  const date = new Date()
  const group = await groupDao.getGroup(Number(groupId))
  console.log(group)
  await groupDao.createUserGroup(userId, Number(groupId))
}

export default {
  getGroups,
  getGroup,
  getGroupsWithMissions,
  createGroup,
  addGroupMember
};