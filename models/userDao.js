import prisma from "../prisma";

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      name: true,
      // profileImageUrl: true,
    },
    where: {
      email: `${email}`,
    },
  });
}

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      name: true
    },
    where: {
      id
    }
  })
}

const createUser = async (email, name) => {
  return await prisma.user.create({
    data: {
      name,
      email
    }
  })
}
const getUserByKakaoAccount = async (email) => {
  return await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      username: true,
      profileImageUrl: true,
    },
    where: {
      email: `${email}`,
    },
  });
};

const createUserWithKakaoAccount = async (
  email,
  gender,
  nickname,
  profile_image_url
) => {
  const genders = {
    male: 2,
    female: 1,
  };
  return await prisma.user.create({
    data: {
      email: `${email}`,
      socialPlatformId: 1,
      genderId: Number(`${genders[gender]}`),
      username: `${nickname}`,
      profileImageUrl: `${profile_image_url}`,
    },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });
};

export default {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByKakaoAccount,
  createUserWithKakaoAccount,
  findUserById,
};
