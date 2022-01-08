import prisma from "../prisma";

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
  getUserByKakaoAccount,
  createUserWithKakaoAccount,
  findUserById,
};
