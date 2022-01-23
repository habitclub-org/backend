// import { errorGenerator } from '../utils';
import { userService } from '../services';
import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env

const validateToken = async (req, res, next) => {
  try {
		console.log(req.headers)
    const { token } = req.headers;
    const { userId } = jwt.verify(token, JWT_SECRET_KEY) // 암호화된 토큰을 복호화 합니다.

    const foundUser = await userService.findUser(userId)

    req.foundUser = foundUser // request 객체에 새로운 키값에 찾아진 유저의 정보를 할당하고
    next() // next() 함수로 다음 미들웨어로 맥락(context)를 연결합니다.
  } catch (err) {
    next(err)
  }
}

export default validateToken;