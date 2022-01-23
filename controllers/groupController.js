import { groupService } from "../services";

const getGroups = async (req, res) => {
  try {
    const userId = req.foundUser
    const { search } = req.query
    const groups = await groupService.getGroups(userId, search);
    return res.status(200).json({ groups });
  } catch (err) {
    console.log(err);
  }
};

const getGroupsWithMissions = async (req, res) => {
  try {
    const userId = 1
    const groupMissions = await groupService.getGroupsWithMissions(userId);
    return res.status(200).json({ groupMissions })
  } catch (err) {
    console.log(err);
  }
};

export default { getGroups, getGroupsWithMissions };
