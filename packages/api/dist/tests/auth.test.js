"use strict";
// import { expect } from 'chai'
// import { Container } from 'inversify'
// import { Connection, Repository } from 'typeorm'
// import Application from '../entities/application'
// import User from '../entities/user'
// import containerLoader from '../loaders/container'
// import { AuthService } from '../services'
// import { AuthError, OAuthError } from '../services/auth'
// import { TYPES } from '../util/constants'
// describe('AuthServiceTest', function () {
//     let container: Container
//     let authService: AuthService
//     before(async function () {
//         container = await containerLoader()
//         authService = container.get<AuthService>(TYPES.AuthService)
//         const applicationBody = {
//             name: 'app 1',
//             secret: 'secret',
//             redirectUri: 'http://localhost',
//         }
//         const applicationRepository = container.get<Repository<Application>>(
//             TYPES.ApplicationRepository
//         )
//         await applicationRepository.save(applicationBody)
//     })
//     after(async function () {
//         const connection = container.get<Connection>(TYPES.Connection)
//         await connection.close()
//     })
//     const userBody = {
//         name: 'GEESE',
//         password: 'admin',
//         email: 'admin@admin.com',
//     }
//     it('should sign and verify a token correctly', async function () {
//         const payload = { id: 1 }
//         const token = authService.signToken(payload)
//         const verify = authService.verifyToken(token)
//         expect(verify).to.have.property('id', 1)
//     })
//     it('should not verify an incorrect token', async function () {
//         const verify = authService.verifyToken('foobar')
//         expect(verify).to.not.be.a('string')
//         expect(verify).to.equal(OAuthError.INVALID_GRANT)
//     })
//     it('should create a user', async function () {
//         const user = (await authService.signUp(userBody)) as User
//         const verifyPassword = await authService.verifyPassword(
//             userBody.password,
//             user.password
//         )
//         expect(verifyPassword).to.equal(true)
//         expect(user.name).to.equal(userBody.name)
//         expect(user.email).to.equal(userBody.email)
//     })
//     it('should not create a user with the same name', async function () {
//         const user = await authService.signUp({
//             ...userBody,
//             email: 'foo@bar.com',
//         })
//         expect(user).to.not.be.an.instanceOf(User)
//         expect(user).to.equal(AuthError.USER_EXISTS)
//     })
//     it('should not create a user with the same email', async function () {
//         const user = await authService.signUp({ ...userBody, name: 'foobar' })
//         expect(user).to.not.be.an.instanceOf(User)
//         expect(user).to.equal(AuthError.EMAIL_EXISTS)
//     })
//     // let token: string
//     // it('should return a token to a user that exists', async function () {
//     //     const tok = await authService.signIn(userBody)
//     //     expect(tok).to.be.a('string')
//     //     token = tok as string
//     // })
//     // it('should return invalied Client error to a user that does not exist', async function () {
//     //     const token = await authService.signIn({
//     //         ...userBody,
//     //         name: 'foobar',
//     //         email: 'foo@bar.com',
//     //     })
//     //     expect(token).to.not.be.a('string')
//     //     expect(token).to.equal(OAuthError.INVALID_CLIENT)
//     // })
//     // it('should return invalied Grant error when an incorrect password is provided', async function () {
//     //     const token = await authService.signIn({ ...userBody, password: 'foo' })
//     //     expect(token).to.not.be.a('string')
//     //     expect(token).to.equal(OAuthError.INVALID_GRANT)
//     // })
//     it('should return Invalid Grant error if an incorrect token is provided to sign out', async function () {
//         const result = await authService.signOut('foobar')
//         expect(result).to.not.be.a('boolean')
//         expect(result).to.equal(OAuthError.INVALID_GRANT)
//     })
//     // it('should return a boolean if the token is correct', async function () {
//     //     const result = await authService.signOut(token)
//     //     expect(result).to.be.a('boolean')
//     // })
// })
