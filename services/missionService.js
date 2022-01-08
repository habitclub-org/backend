import { missionDao } from "../models";

const getMissions = async (userId) => {
  const missions = await groupDao.getMissions();

  return missions 
};

export default { getMissions };
