import { missionService } from "../services";

const getMissions = async (req, res) => {
  try {
    const userId = 1
    const { groupId } = req.query
    const groupMissions = await missionService.getMissions(userId, groupId);
    return res.status(200).json({ groupMissions });
  } catch (err) {
    console.log(err);
  }
};

export default { getMissions };
