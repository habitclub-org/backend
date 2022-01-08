import prisma from "../prisma";

const getGroups = async () => {
  return await prisma.group.findMany({
    select : {
      name: true,
      maximumMember: true,
      groupStatus: {
        select: {
          id: true,
          name: true
        }
      },
      mission: {
        select: {
          name: true,
          startsAt: true,
          endsAt: true
        },
        orderBy: {
          startsAt: 'desc'
        },
        take: 1
      },
      groupTag: {
        select: {
          tag: {
            select: {
              id: true,
              name: true
            }
          }
        }
      },
      userGroup: {
        select: {
          user: true
        }
      }
    },
  });
};

const getGroupsWithMissions = async (userId, date, groupId) => {
  return await prisma.group.findMany({
    where: {
      id: groupId
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

export default { getGroups, getGroupsWithMissions };
