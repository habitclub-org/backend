import { boardDao } from '../models'

const getBoards = async (userId, groupId) => {
  const boards = await boardDao.getBoardsByGroupId(groupId)

	return boards
}

export default { getBoards };
