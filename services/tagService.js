import { tagDao } from '../models'

const getUserTagByUserId = async (userId) => {
  const userTags = await tagDao.getUserTagByUserId(userId)

	// return userTags
	return userTags.map(({tag}) => ({tagId: tag.id, tag: tag.name, tagCategory: tag.category}))
}

export default { getUserTagByUserId };
