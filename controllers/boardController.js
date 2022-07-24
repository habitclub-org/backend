import { boardService } from "../services";

const getBoards = async (req, res) => {
  const userId = req.foundUser.id 
  const boards = await boardService.getBoards(userId);

  return res.status(200).json({ boards })
}

export default { getBoards };