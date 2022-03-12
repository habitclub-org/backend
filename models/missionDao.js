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

const getUserMission = async (userId, date) => {
	return await prisma.$queryRaw`
    WITH history AS (
      SELECT
        g.id as group_id
        ,g.name as group_name
        ,um.date
        ,JSON_ARRAYAGG(umi.image_url) AS images
      FROM user_missions um
      JOIN missions m ON m.id = um.mission_id
      JOIN \`groups\` g ON g.id = m.group_id
      JOIN users u ON u.id = um.user_id
      JOIN user_mission_images umi ON umi.user_mission_id = um.id
      WHERE um.user_id = ${userId}
      AND um.date <= ${date}
      GROUP BY g.id, um.date
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
    LIMIT 7
	`
}
export default { getMissions, getMissionStatistics, getUserMission };
