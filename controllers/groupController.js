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
    const group = await groupService.getGroup(Number(groupId))
    return res.status(200).json (group)
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({message: err.message})
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
    const { id: userId } = req.foundUser
    const { groupId } = req.params
    const { invitationCode } = req.body

    const startDate = await groupService.addGroupMember(userId, groupId, invitationCode)
    return res.status(201).json({ message: "MEMBER_ADDED", startDate })
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: err.message })
  }
}

const getGroupMemberCompletes = async (req, res) => {
  try {
    const userId = req.foundUser.id
    const groupId = req.params.groupId

    const memberCompletes = await groupService.getGroupMemberCompletes(userId, groupId)
    return groupService.status(200).json({ memberCompletes })
  } catch (err) {
    console.log(err);
  }
}

export default {
  getGroups,
  getGroup,
  getGroupsWithMissions,
  createGroup,
  addGroupMember,
  getGroupMemberCompletes
};
