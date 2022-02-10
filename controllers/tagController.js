import { tagService } from "../services";

const getUserInterests = async (req, res) => {
  const userId = req.foundUser.id 
  const userInterestTags = await tagService.getUserTagByUserId(userId);

	console.log(userInterestTags)

  return res.status(200).json({ userInterestTags })
}

export default { getUserInterests };