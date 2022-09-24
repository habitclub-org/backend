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
          missionComplete: {
            select: {
              // date: true,
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
	const userInfo = await prisma.user.findUnique({
		where: {
			id: userId
		},
		select: {
			name: true,
			userTag: {
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
			}
		}
	})

  const checkNeeded = await prisma.userMissionStatistics.aggregate({
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

  return { userInfo, checkNeeded, checkCompletes, checkDays }
}

const getMission = async (missionId) => {
  return await prisma.mission.findUnique({
    where: {
      id: missionId 
    }
  })
}

const getUserMission = async (userId, startDate, endDate) => {
	return await prisma.$queryRaw`
    WITH history AS (
      SELECT
        g.id as group_id
        ,g.name as group_name
        ,mc.date
        ,JSON_ARRAYAGG(mi.image_url) AS images
      FROM mission_completes mc
      JOIN missions m ON m.id = mc.mission_id
      JOIN \`groups\` g ON g.id = m.group_id
      JOIN users u ON u.id = mc.user_id
      JOIN mission_images mi ON mi.mission_complete_id = mc.id
      WHERE mc.user_id = ${userId}
      AND mc.date <= ${endDate}
      AND mc.date >= ${startDate}
      GROUP BY g.id, mc.date
    ) SELECT
      h.date
      ,JSON_ARRAYAGG(
        JSON_OBJECT(
          "groupId", group_id 
          ,"groupName", group_name
          ,"images", images
        )
      ) AS history 
    FROM history h
    GROUP BY date
    ORDER BY date DESC
	`
}
export default { getMissions, getMissionStatistics, getMission, getUserMission };
