import prisma from "../prisma";

const getGroupsByUserId = async (userId, limit, page) => {
  return await prisma.group.findMany({
    take: +limit,
    skip: (+page - 1) * +limit,
    where: {
      userGroup: {
        some: {
          userId: userId
        }
      }
    },
    select : {
      id: true,
      name: true,
      thumbnailImageUrl: true,
      maximumMember: true,
      enrollmentAvailability: true,
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
              name: true,
              category: {
                select: {
                  id: true,
                  name: true
                }
              }
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
}

const getGroups = async (search, limit, page) => {
  return await prisma.group.findMany({
    take: +limit,
    skip: (+page - 1) * +limit,
    where: {
      name: {
        contains: search
      }
    },
    select : {
      id: true,
      name: true,
      thumbnailImageUrl: true,
      maximumMember: true,
      enrollmentAvailability: true,
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
              name: true,
              category: {
                select: {
                  id: true,
                  name: true
                }
              }
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

const getGroup = async (groupId) => {
  return await prisma.group.findUnique({
    where: {
      id: groupId
    },
    select: {
      maximumMember: true,
      userGroup: true,
      mission: {
        select: {
          startsAt: true
        }
      }
    }
  })
}

const createGroup = async (
  hostId,
  isPublic,
  missionType,
  tags,
  groupName,
  thumbnailImageUrl,
  groupDescription,
  maximumMember,
  missionStartDate,
  missionEndDate,
  missionName,
  missionDescription,
  checkStartTime,
  checkEndTime
) => {
  console.log(checkStartTime)
  console.log(new Date(checkStartTime))
  const createdGroup = await prisma.$transaction([
    prisma.group.create({
      data: {
        groupTag: {
          create: tags
        },
        name: groupName,
        thumbnailImageUrl,
        maximumMember,
        groupDescription,
        groupStatus: {
          connect: {
           id: isPublic
          }
        },
        missionType: {
          connect: {
            id: missionType
          }
        },
        host: {
          connect: {
            id: hostId
          }
        },
        userGroup: {
          create: {
            userId: hostId
          }
        },
        mission: {
          create: {
            name: missionName,
            content: missionDescription,
            startsAt: missionStartDate,
            endsAt: missionEndDate,
            checkStartTime: new Date(checkStartTime),
            checkEndTime: new Date(),
            userMission: {
              create: {
                userId: hostId
              }
            }
          }
        }
      }
    })
  ])
}

const createUserGroup = async (userId, groupId) => {
  return await prisma.userGroup.create({
    data: {
      userId,
      groupId
    }
  })
}

export default {
  getGroups,
  getGroupsByUserId,
  createGroup,
  getGroup,
  createUserGroup
};
