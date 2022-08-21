import { completeService } from "../services";

const createMissionComplete = async (req, res) => {
  const userId = req.foundUser.id 
  const { missionId } = req.params
	const { imageUrl, date, time, contents } = req.body

	console.log('params: ', req.params)

  const completes = await completeService.createMissionComplete(
		userId,
		Number(missionId),
		imageUrl,
		date,
		time,
		contents
	);

  return res.status(200).json({ completes })
}

export default { createMissionComplete };