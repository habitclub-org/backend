import { userService } from "../services";

const kakaoLogin = async (req, res) => {
  try {
    const kakaoToken = req.headers.authorization;
    const { accessToken, username, profileImageUrl } =
      await userService.kakaoLogin(kakaoToken);
    return res.status(200).json({ accessToken, username, profileImageUrl });
  } catch (err) {
    console.log(err);
  }
};

export default { kakaoLogin };
