import prisma from "../prisma";

const getGroups = async (search) => {
  return await prisma.group.findMany({
    where: {
      name: {
        contains: search
      }
    },
    select : {
      name: true,
      maximumMember: true,
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
              name: true
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

export default { getGroups };
