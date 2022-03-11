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
  return await prisma.group.findMany({
    select: {
      id: true,
      name: true,
      mission: {
        select: {
          userMission: {
            select: {
              userMissionImage: {
                select: {
                  imageUrl: true
                }
              }
            },
            where: {
              userId,
              date
            }
          }
        }
      }
    }
  })
}
export default { getMissions, getMissionStatistics, getUserMission };
