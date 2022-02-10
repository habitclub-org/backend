import prisma from "../prisma";

const getUserTagByUserId = async (userId) => {
  return await prisma.userTag.findMany({
    where: {
      userId
		},
		select: {
			tag: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})
}

export default { getUserTagByUserId };