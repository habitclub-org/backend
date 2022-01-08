import { userDao } from "../models";
import jwt from "jsonwebtoken";
import axios from "axios";

const kakaoLogin = async (kakaoToken) => {
  const kakaoAccessToken = kakaoToken.replace("Bearer ", "");
  const kakaoInfo = await axios({
    method: "POST",
    url: "https://kapi.kakao.com/v2/user/me",
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`,
    },
  });
  const { email, gender, profile } = kakaoInfo.data.kakao_account;
  const { nickname, profile_image_url } = profile;

  const existingUser = await userDao.getUserByKakaoAccount(email);
  if (!existingUser) {
    const newUser = await userDao.createUserWithKakaoAccount(
      email,
      gender,
      nickname,
      profile_image_url
    );
    return {
      accessToken: jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY),
      username: newUser.username,
      profileImageUrl: newUser.profileImageUrl,
    };
  }
  return {
    accessToken: jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET_KEY
    ),
    username: existingUser.username,
    profileImageUrl: existingUser.profileImageUrl,
  };
};

export default { kakaoLogin };
