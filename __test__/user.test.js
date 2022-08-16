const app = require('../app')
const AppError = require('../utils/appError')
const supertest = require('supertest')
const {deposit,transfer,withdrawal} = require('../services/userService')
const {Payment,User} = require('../models')






describe('Test User Service', () => {
    describe('Test Deposit', () => {
        const userMock = {save: jest.fn()}
        it("it should test if a user is returned ", async() =>{
            const value = 10
            jest.spyOn(Payment, 'create').mockResolvedValue(userMock)
            const data = await deposit(userMock,value)
            expect(data).toHaveReturned
        })
        it("it should throw an Error if deposit is not found", async() => {
            const value = 0
            expect.assertions(1);
            try {
                await deposit(userMock,value)
            } catch (e) {
                expect(e.message).toBe("please fill the deposit form");
            }
        })
        it("it should throw an Error if deposit is negative", async() => {
            const value = -20
            expect.assertions(1);
            try {
                await deposit(userMock,value)
            } catch (e) {
                expect(e.message).toBe("You cannot deposit a negative number");
            }
        })
    })

    describe('Test withdrawal', () => {
        const user = {
            Balance : 100,
            pin:"1234"
        }

        const userMock = {save: jest.fn()}
        console.log(userMock)
        it("it should test if a user is returned ", async() =>{
            const value = 10
            jest.spyOn(Payment,'create').mockResolvedValue(userMock)
            const data = await withdrawal(user,value,user.pin)
            expect(data).toHaveReturned
        })
        
        // it("it should throw an Error if withdrawal is not found", async() => {
        //     const value = 0
        //     expect.assertions(1);
        //     try {
        //         await withdrawal(userMock,value,user.pin)
        //     } catch (e) {
        //         expect(e.message).toBe("please fill the withdrawal form");
        //     }
        // })

        // it("it should throw an Error if withdrawal is greater than the balance", async() => {
        //     const value = 150
        //     try {
        //         await withdrawal(userMock,value,user.pin)
        //     } catch (e) {
        //         expect(e.message).toBe("insufficient balance");
        //     }
        // })

        // it("it should throw an Error if withdral is negative", async() => {
        //     const value = -20
        //     expect.assertions(1);
        //     try {
        //         await withdrawal(userMock,value,user.pin)
        //     } catch (e) {
        //         expect(e.message).toBe('You can not make a negative withdrawal');
        //     }
        // })
    })

//     describe("Test transfer", () => {
//         it("it should test if a user is returned ", async() =>{
//             const value = 10
//             const userMock = {save: jest.fn()}
//             jest.spyOn(Payment, 'create').mockResolvedValue(userMock)
//             const data = await withdrawal(userMock,userMock,value)
//             expect(data).toHaveReturned
//         })
//     })
    
})

