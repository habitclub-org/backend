import { completeDao } from '../models'

const createMissionComplete = async (
	userId,
	missionId,
	imageUrl,
	date,
	time,
	contents
) => {
	// STEP 1 : 인증 마감 validation

  // STEP 2, STEP 3, STEP 4는 transaction으로 같이 처리해야함

	console.log(userId, missionId, imageUrl, date, time, contents)

	return 1 
}

export default { createMissionComplete };
