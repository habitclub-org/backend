import { boardDao } from '../models'

const getBoards = async (userId) => {
  const boards = await boardDao.getBoardsByUserId(userId)

	return boards
}

export default { getBoards };
