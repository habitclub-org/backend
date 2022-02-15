import prisma from "../prisma";

const getUserTagByUserId = async (userId) => {
  const a = await prisma.userTag.findMany({
    where: {
      userId
		},
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
	})
  return a	
}

export default { getUserTagByUserId };