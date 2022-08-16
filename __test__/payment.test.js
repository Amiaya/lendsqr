const app = require('../app')
const AppError = require('../utils/appError')
const supertest = require('supertest')
const {Account_statement} = require('../services/paymentService')
const {Payment} = require('../models')

const user_id = 1
describe('Test Payment Services', ()=> {
    it('it should have returned', async() => {
        jest.spyOn(Payment, 'findAll').mockResolvedValue(user_id)
        const data = await Account_statement(user_id)
        expect(data).toHaveReturned
    })

    it('it should throw an Error if user is not found', async() => {
        try {
            await Account_statement()
        } catch (e){
            expect(e).toMatch('This user have no history')
        }
    })
})

