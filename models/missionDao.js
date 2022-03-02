import prisma from "../prisma";

const getMissions = async (userId, date, groupId, limit, page) => {
  return await prisma.group.findMany({
    take: +limit,
    skip: (+page - 1) * +limit,
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
          userMission: {
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

const getUserMission = async (userId, date) => {
  return histories = await prisma.userMission.findMany({
    where: {
      userId,
      date
    },
    select: {
      id: true,
      mission: {
        select: {
          id: true,
          name: true,
        }
      },
      userMissionImage: {
        select: {
          id: true,
          imageUrl: true,
          createdAt: true
        }
      } 
    }
  })
}
export default { getMissions, getMissionStatistics, getUserMission };
