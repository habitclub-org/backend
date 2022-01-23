import { userService } from "../services";

const signUp = async (req, res) => {
  const { name, email } = req.body
  await userService.signUp(email, name)

  return res.status(201).json({ message: 'CREATED' })
}

const signIn = async (req, res) => {
  try {
    const { email } = req.body
    const userToken = await userService.signIn(email)
    return res.status(200).json({ message: 'SUCCESS', token: userToken })
  } catch (err) {
    console.log(err);
  }
}

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

export default { kakaoLogin, signUp, signIn };
