import { missionService } from "../services";

const getMissions = async (req, res) => {
  try {
    const userId = req.foundUser.id 
    const groupId = req.query.groupId ? Number(req.query.groupId) : req.query.groupId
    const date = req.query.date
    const groupMissions = await missionService.getMissions(userId, date, groupId);
    return res.status(200).json({ groupMissions });
  } catch (err) {
    console.log(err);
  }
};

export default { getMissions };
