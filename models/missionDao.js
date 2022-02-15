import prisma from "../prisma";

const getMissions = async (userId, date, groupId, item, page) => {
  return await prisma.group.findMany({
    take: +item,
    skip: (+page - 1) * +item,
    where: {
      id: groupId,
      userGroup: {
        some: {
          userId
        }
      }
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
            select: {
              date: true,
              userId: true,
              missionId: true,
            },
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

const getMissionStatistics = async (userId) => {
  const checkNeeded= await prisma.userMissionStatistics.aggregate({
    where: {
      userId
    },
    _sum: {
      totalCheckNeeded: true
    }
  })

  const checkCompletes = await prisma.userMissionStatistics.aggregate({
    where: {
      userId
    },
    _sum: {
      checkCompleted: true
    }
  })

  const checkDays = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      checkDays: true
    }
  })

  return { checkNeeded, checkCompletes, checkDays }
}

export default { getMissions, getMissionStatistics };
