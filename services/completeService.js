import { completeDao, missionDao } from '../models'
import { boardType } from '../types'

const createMissionComplete = async (
	userId,
	missionId,
	imageUrl,
	date,
	time,
	content
) => {
	const mission = await missionDao.getMission(missionId)

	const checkedTime = new Date(
		'1970-' + 
		mission.checkEndTime.getMonth() + 
		mission.checkEndTime.getDate() + 
		'T' + time
	)

	if (checkedTime > mission.checkEndTime) {
		const error = new Error("CHECK_TIME_LATE")
		error.statusCode = 400
		throw error 
	}

	// image S3 업로드 과정 추가 필요

	return completeDao.createMissionComplete(userId, missionId, mission.groupId, imageUrl, date, time, content, boardType.missionBoard) 
}

export default { createMissionComplete };
