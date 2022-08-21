import { PrismaClient } from "@prisma/client";
import request from 'supertest'
import createApp from '../../app'

const prisma = new PrismaClient();

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY0NDAzNjAyNH0.K4QROiv5OiIQyaaB6hJeGuH_JAJNUML2PO6R2lsoiVc'
let app;

describe('🚀 Group tests', () => {
	beforeAll(async () => {
		app = createApp()
	})

	afterAll(() => {
		// return clearDatabase();
	})
	describe('Get groups', () => {
		beforeAll(async() => {
			await prisma.userMission.deleteMany()
			await prisma.userGroup.deleteMany()
			await prisma.group.deleteMany()
			await prisma.user.deleteMany()
			await prisma.mission.deleteMany()
			await prisma.missionType.deleteMany()
			await prisma.groupStatus.deleteMany()

			await prisma.groupStatus.create({
				data: {
					id: 1,
					name: 'status 1'
				}
			})

			await prisma.missionType.create({
				data: {
					id: 1,
					name: 'type name'
				}
			})

			await prisma.user.create({
				data: {
					id: 2,
					email: 'sj@h진bitclub.com',
					name: '김선진',
					profileImageUrl: 'hh'
				}
			})

			await prisma.group.create({
				data: {
					id: 1,
					name: 'aa',
					hostId: 2,
					groupStatusId: 1,
					missionTypeId: 1
				}
			})

			await prisma.userGroup.create({data: {
				userId: 2,
				groupId: 1
			}})

			await prisma.mission.create({
				data: {
					id: 1,
					name: 'mission 1',
					content: 'aa',
					startsAt: "2022-09-02T00:00:00.000Z",
					endsAt: "2022-11-11T00:00:00.000Z",
					// checkStartTime: "T03:59:59.000Z",
					// checkEndTime: "09:59:59.000",
					groupId: 1
				}
			})

			await prisma.userMission.create({data: {
				userId: 2,
				missionId: 1
			}})
			// clear Groups
		})


		test('SUCCESS: get groups', async () => {
			const result = await request(app).get("/groups").set('token', token)
			// console.log(result)
		})

		const data = 1

		expect(data).toEqual(1)
	})
})