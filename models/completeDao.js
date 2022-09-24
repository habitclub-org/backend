import prisma from "../prisma";

const createMissionComplete = async (
	userId,
	missionId,
	imageUrl,
	date,
	time,
	contents
) => {
  const boards = await prisma.$transaction([
		prisma.missionComplete.create({
			data: {
				userId,
				missionId,
				date: new Date(date),
				MissionImage: {
					create: 
						{ imageUrl }
				},
				missionBoard: {
					create: {
						board: {
							create: {
								userId,
								groupId: 1,
								boardTypeId: 1,
								content: contents
							}
						}
					}
				}
			}
		}),
		prisma.userMissionStatistics.update({
			where: {
				userId_missionId: {userId, missionId}
			},
			data: {
				checkCompleted : {
					increment: 1
				}
			}
		})
	])
  return boards	
}

export default { createMissionComplete };