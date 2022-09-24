import { completeService } from "../services";

const createMissionComplete = async (req, res) => {
	try {
		const userId = req.foundUser.id 
		const { missionId } = req.params
		const { imageUrl, date, time, contents } = req.body

		const completes = await completeService.createMissionComplete(
			userId,
			Number(missionId),
			imageUrl,
			date,
			time,
			contents
		);

		return res.status(200).json({ completes })
	} catch (err) {
		if (err.code === 'P2002') {
			return res.status(409).json({message: "CHECK_ALREADY_COMPLETED"})
		}
		return res.status(400).json({message: err.message})
	}
}

export default { createMissionComplete };