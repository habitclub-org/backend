import { boardService } from "../services";

const getBoards = async (req, res) => {
  const userId = req.foundUser.id 
  const { groupId } = req.query
  const boards = await boardService.getBoards(userId, Number(groupId));

  return res.status(200).json({ boards })
}

export default { getBoards };