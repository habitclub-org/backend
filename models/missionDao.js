import prisma from "../prisma";

const getMissions = async (userId, date, groupId) => {
  return await prisma.group.findMany({
    where: {
      groupId: groupId
    },
    select: {
      id: true,
      name: true,
      mission: {
        select: {
          id: true,
          name: true,
          content: true,
          checkStartTime: true,
          checkEndTime: true,
          UserMission: {
            where: {
              userId,
              date
            }
          } 
        },
      }
    }
  })
}

export default { getMissions };
