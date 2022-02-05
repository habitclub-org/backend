import prisma from "../prisma";

const getGroupsByUserId = async (userId) => {
  return await prisma.group.findMany({
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
}

const getGroups = async (search) => {
  return await prisma.group.findMany({
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

export default { getGroups, getGroupsByUserId };
