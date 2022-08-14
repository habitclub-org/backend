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

const getGroup = async (groupId) => {
  return await prisma.$queryRaw`
    SELECT
      \`groups\`.id as groupId,
      \`groups\`.name as groupName,
      group_description,
      first_mission.name as missionName,
      first_mission.content as missionContent,
      first_mission.starts_at as missionStartDate,
      first_mission.ends_at as missionEndDate,
      mission_types.name as missionType,
      users.name as hostName,
      JSON_ARRAYAGG(ug.user_id) AS members
    FROM
      \`groups\`
    JOIN (
      SELECT DISTINCT
        group_id, 
        missions.name,
        missions.content,
        missions.starts_at,
        missions.ends_at
      FROM missions
      LIMIT 1
    ) AS first_mission ON first_mission.group_id = \`groups\`.id
    JOIN users ON users.id = \`groups\`.host_id
    JOIN mission_types ON mission_types.id = \`groups\`.mission_type_id
    JOIN user_groups ug ON ug.group_id = \`groups\`.id
    WHERE \`groups\`.id = ${groupId}
    GROUP BY \`groups\`.id
  `
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

// const getGroup = async (groupId) => {
//   return await prisma.group.findUnique({
//     where: {
//       id: groupId
//     },
//     select: {
//       maximumMember: true,
//       userGroup: true,
//       mission: {
//         select: {
//           startsAt: true
//         }
//       }
//     }
//   })
// }

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

const getGroupMemberCompletes = async(groupId) => {
  return await prisma.$queryRaw`
    SELECT 
      u.id as userId
      ,u.name as userName
      ,u.profile_image_url as profileImageUrl
      ,SUM(ums.total_check_needed) as checkNeeded
      ,SUM(ums.check_completed) as completed
    FROM habit_club.missions m
    JOIN \`groups\` g ON g.id = m.group_id
    JOIN user_mission_statistics ums ON ums.mission_id = m.id
    JOIN users u ON u.id = ums.user_id
    WHERE g.id = ${groupId}
    GROUP BY u.id, g.id
  `
}

export default {
  getGroups,
  getGroup,
  getGroupsByUserId,
  createGroup,
  getGroup,
  createUserGroup,
  getGroupMemberCompletes
};
