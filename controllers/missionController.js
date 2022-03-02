import { missionService } from "../services";

const getMissions = async (req, res) => {
  try {
    const userId = req.foundUser.id 
    const groupId = req.query.groupId ? Number(req.query.groupId) : req.query.groupId
    const { date, limit, page } = req.query
    const groupMissions = await missionService.getMissions(userId, date, groupId, limit, page);
    return res.status(200).json({ groupMissions });
  } catch (err) {
    console.log(err);
  }
};

const getMissionStatistics = async (req, res) => {
  try {
    const userId = req.foundUser.id
    const missionStatistics = await missionService.getMissionStatistics(userId);
    return res.status(200).json(missionStatistics)
  } catch (err) {
    console.log(err)
  }
}

const getMissionCompleteness = async (req, res) => {
  try {
    const userId = req.foundUser.id
    const { date } = req.query
    const completeness = await missionService.getMissionCompleteness(userId, date)
    return res.status(200).json(completeness)
  } catch (err) {
    console.log(err)
  }
}

export default { getMissions, getMissionStatistics, getMissionCompleteness };
