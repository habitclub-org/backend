import { completeDao, missionDao } from '../models'

const createMissionComplete = async (
	userId,
	missionId,
	imageUrl,
	date,
	time,
	contents
) => {
	const mission = await missionDao.getMission(missionId)

	const checkedTime = new Date(
		'1970-' + 
		mission.checkEndTime.getMonth() + 
		mission.checkEndTime.getDate() + 
		'T' + time
	)

	if (checkedTime > mission.checkEndTime) {
		throw new Error("CHECK_TIME_LATE")
	}

	// image S3 업로드 과정 추가 필요

	return completeDao.createMissionComplete(userId, missionId, imageUrl, date, time, contents) 
}

export default { createMissionComplete };
