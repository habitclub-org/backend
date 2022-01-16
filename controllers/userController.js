import { userService } from "../services";

const signUp = async (req, res) => {
  try {
    const { name, email } = req.params
    await userService.signUp(name, email)

    return res.status(201).json({ message: 'CREATED' })
  } catch (err) {
    console.log(err);
  }
}

const signIn = async (req, res) => {
  try {
    const { email } = req.params
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

export default { kakaoLogin, signUp };
