import { missionService } from "../services";

const getMissions = async (req, res) => {
  try {
    const userId = 1
    const missions = await missionService.getMissions(userId);
    return res.status(200).json({ missions });
  } catch (err) {
    console.log(err);
  }
};

export default { getMissions };
