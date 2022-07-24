import prisma from "../prisma";

const getBoardsByGroupId= async (groupId) => {
  const boards = await prisma.board.findMany({
		where: {
			group: {
				id: groupId
			}
		},
		select: {
			id: true,
			group: {
				select: {
					name: true
				}
			},
			user: {
				select: {
					id: true,
					name: true,
					profileImageUrl: true
				}
			},
			content: true,
			createdAt: true,
			BoardLike: {
				select: {
				  userId: true,
				  emoticonCode: true
				}
			},
			missionBoard: {
				select: {
					complete: {
						select: {
							MissionImage: {
								select: {
									imageUrl: true
								}
							}
						}
					}
				}
			}
		}
	})
  return boards	
}

export default { getBoardsByGroupId };