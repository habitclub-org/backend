import prisma from "../prisma";

const getMissions = async () => {
  return await prisma.mission.findMany({

  });
};

export default { getMissions };
