import prisma from "../prisma";

const getBoardsByUserId= async (userId) => {
  const boards = await prisma.board.findMany({
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
			BoardLike: true,
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

export default { getBoardsByUserId };