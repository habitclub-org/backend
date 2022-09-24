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

	return completeDao.createMissionComplete(userId, missionId, imageUrl, date, time, contents) 
}

export default { createMissionComplete };
