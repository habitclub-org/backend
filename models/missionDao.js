import prisma from "../prisma";

const getMissions = async (userId, date, groupId) => {
  return await prisma.group.findMany({
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
  const checkStatistics = prisma.userMissionStatistics.findMany(
    {
      where: {
        userId
      },
      select: {
        missionId: true,
        checkCompleted: true,
        totalCheckNeeded: true
      }
    }
  )

  const checkDays = await prisma.userMission.groupBy({
    // by: ['date', 'id', 'userId', 'missionId'],
    by: ['date'],
    where: {
      userId
    },
    select: {
      id: true,
      userId: true,
      missionId: true,
      date: true
    }
  })

  console.log(checkDays)
}

export default { getMissions, getMissionStatistics };
