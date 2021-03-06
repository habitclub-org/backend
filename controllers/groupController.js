import { groupService } from "../services";

const getGroups = async (req, res) => {
  try {
    const userId = req.foundUser.id
    const { search, type, limit, page } = req.query
    const groups = await groupService.getGroups(userId, type, search, limit, page);
    return res.status(200).json( groups );
  } catch (err) {
    console.log(err);
  }
};

const getGroup = async (req, res) => {
  try {
    const { id: groupId } = req.params
    console.log('groupId: ', groupId)
    const group = await groupService.getGroup(Number(groupId))
    console.log('group: ', group)
    return res.status(200).json ({ group })
  } catch (err) {
    console.log(err);
  }
}

const getGroupsWithMissions = async (req, res) => {
  try {
    const userId = 1
    const groupMissions = await groupService.getGroupsWithMissions(userId);
    return res.status(200).json({ groupMissions })
  } catch (err) {
    console.log(err);
  }
};

const createGroup = async (req, res) => {
  try {
    const {
      isPublic,
      missionTypeId,
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
      checkEndTime,
    } = req.body

    const hostId = req.foundUser.id
    
    await groupService.createGroup(
      hostId,
      isPublic,
      missionTypeId,
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
    )
    return res.status(201).json({ message: "CREATED" })
  } catch (err) {
    console.log(err);
  }
}

const addGroupMember = async (req, res) => {
  try {
    const userId = req.foundUser.id
    const groupId = req.params.groupId

    await groupService.addGroupMember(userId, groupId)
    return res.status(201).json({message: "MEMBER_ADDED"})
  } catch (err) {
    console.log(err);
  }
}

export default {
  getGroups,
  getGroup,
  getGroupsWithMissions,
  createGroup,
  addGroupMember
};
