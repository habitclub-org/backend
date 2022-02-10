import { tagDao } from '../models'

const getUserTagByUserId = async (userId) => {
  const userTags = await tagDao.getUserTagByUserId(userId)
	return userTags.map(({tag}) => ({tagId: tag.id, tag: tag.name}))
}

export default { getUserTagByUserId };
