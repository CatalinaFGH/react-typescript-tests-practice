import {getUser} from './get-user'
describe("when everything is ok", () => {
    test('should return a response', async () => {
        // In a real project you would use AXIOS and MOCK the get method
        const result = await getUser();
        expect(result).toEqual({ id: '1', name: 'David'})
    })
    test('should fail', async () => {
        // In a real project you would use AXIOS and MOCK the get method
        const result = await getUser();
        expect(result).not.toEqual({ id: '1', name: 'David '})
    })
})