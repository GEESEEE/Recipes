// import { expect } from 'chai'
// import { Container } from 'inversify'
// import { Connection, Repository } from 'typeorm'
// import { User } from '../entities'
// import containerLoader from '../loaders/container'
// import { RecipeService } from '../services'
// import { TYPES } from '../util/constants'

// describe('RecipeServiceTest', function () {
//     let container: Container
//     let recipeService: RecipeService

//     before(async function () {
//         container = await containerLoader()
//         recipeService = container.get<RecipeService>(TYPES.RecipeService)
//         const userBody = {
//             name: 'GEESE',
//             password: 'admin',
//             email: 'admin@admin.com',
//         }
//         const userRepository = container.get<Repository<User>>(
//             TYPES.UserRepository
//         )
//         await userRepository.save(userBody)
//     })

//     after(async function () {
//         const connection = container.get<Connection>(TYPES.Connection)
//         await connection.close()
//     })

//     const recipeBody = {
//         name: 'Jonko',
//         description: 'Dikke Jonko Ouleh',
//         prepareTime: 300,
//         peopleCount: 1,
//         authorId: 1,
//     }

//     // it('should create a recipe', async function () {
//     //     const r = await recipeService.createRecipe(recipeBody)
//     //     expect(r).to.deep.equal({ ...recipeBody, id: 1 })
//     // })

//     it('should get the recipe', async function () {
//         const r = await recipeService.getRecipe(1)
//         expect(r).to.deep.equal({
//             ...recipeBody,
//             id: 1,
//             instructions: [],
//             recipeIngredients: [],
//         })
//     })

//     const newRecipeBody = {
//         name: 'Elloe',
//         description: 'Dikke Elloe Ouleh',
//         prepareTime: 600,
//         peopleCount: 2,
//         authorId: 1,
//     }

//     it('should update the recipe', async function () {
//         const rNew = await recipeService.updateRecipe(1, newRecipeBody)
//         expect(rNew).to.deep.equal({ ...newRecipeBody, id: 1 })
//     })

//     it('should delete the recipe', async function () {
//         const res = await recipeService.deleteRecipe(1)
//         expect(res).to.be.equal(true)
//         const r = await recipeService.getRecipe(1)
//         expect(typeof r).to.be.equal('undefined')
//     })

//     const ingredient = {
//         name: 'wiet',
//         unit: 'g',
//     }

//     it('should create an ingredient', async function () {
//         const i = await recipeService.createIngredient(ingredient)
//         expect(i).to.deep.equal({ ...ingredient, id: 1 })
//     })

//     it('should get an ingredient', async function () {
//         const i = await recipeService.getIngredient(1)
//         expect(i).to.deep.equal({ ...ingredient, id: 1 })
//     })

//     it('should delete an ingredient', async function () {
//         const res = await recipeService.deleteIngredient(1)
//         expect(res).to.be.equal(true)
//         const i = await recipeService.getIngredient(1)
//         expect(typeof i).to.be.equal('undefined')
//     })

//     const recipeIngredient = {
//         recipeId: -1,
//         ingredientId: -1,
//         amount: 0.25,
//     }

//     // it('should add an ingredient to the recipe', async function () {
//     //     const r = await recipeService.createRecipe(recipeBody)
//     //     const i = await recipeService.createIngredient(ingredient)
//     //     const ri = await recipeService.addIngredient(
//     //         r.id,
//     //         i.id,
//     //         recipeIngredient.amount
//     //     )
//     //     expect(ri).to.deep.equal({
//     //         recipeId: r.id,
//     //         ingredientId: i.id,
//     //         amount: recipeIngredient.amount,
//     //     })
//     //     recipeIngredient.recipeId = r.id
//     //     recipeIngredient.ingredientId = i.id
//     // })

//     it('should get the ingredients from the recipe', async function () {
//         const ris = await recipeService.getRecipeIngredients(
//             recipeIngredient.recipeId
//         )
//         expect(ris).to.deep.equal([
//             { ...recipeIngredient, ingredient: { ...ingredient, id: 2 } },
//         ])
//     })

//     it('should remove an ingredient from the recipe', async function () {
//         const res = await recipeService.removeIngredient(
//             recipeIngredient.recipeId,
//             recipeIngredient.ingredientId
//         )
//         expect(res).to.be.equal(true)
//         const ris = await recipeService.getRecipeIngredients(
//             recipeIngredient.recipeId
//         )
//         expect(ris).to.deep.equal([])
//     })

//     const instruction = {
//         recipeId: 2,
//         text: 'Draai die jonko a Niffo',
//     }
//     it('should add an instruction', async function () {
//         const i = await recipeService.addInstruction(
//             instruction.recipeId,
//             instruction.text
//         )
//         expect(i).to.deep.equal({ ...instruction, id: 1 })
//     })

//     it('should get the instructions of a recipe', async function () {
//         const is = await recipeService.getInstructions(instruction.recipeId)
//         expect(is).to.deep.equal([{ ...instruction, id: 1 }])
//     })

//     it('should update an instruction', async function () {
//         const newText = 'Draai die shit jo'
//         const i = await recipeService.updateInstruction(1, newText)
//         instruction.text = newText
//         expect(i).to.deep.equal({ ...instruction, id: 1 })
//     })

//     it('should delete an instruction', async function () {
//         const res = await recipeService.deleteInstruction(1)
//         expect(res).to.be.equal(true)
//         const is = await recipeService.getInstructions(instruction.recipeId)
//         expect(is).to.deep.equal([])
//     })

//     // it('should collect a recipe with ingredients and instructions', async function () {
//     //     const r = await recipeService.createRecipe(recipeBody)
//     //     const ig = await recipeService.createIngredient(ingredient)

//     //     await recipeService.addIngredient(r.id, ig.id, recipeIngredient.amount)
//     //     const is = await recipeService.addInstruction(r.id, instruction.text)
//     //     instruction.recipeId = r.id
//     //     const recipe = await recipeService.getRecipe(r.id)

//     //     expect(recipe?.instructions).to.deep.equal([
//     //         { ...instruction, id: is.id },
//     //     ])
//     //     expect(recipe?.recipeIngredients).to.deep.equal([
//     //         {
//     //             recipeId: r.id,
//     //             ingredientId: ig.id,
//     //             amount: recipeIngredient.amount,
//     //             ingredient: ig,
//     //         },
//     //     ])
//     // })

//     // const i1 = {
//     //     name: 'wiet',
//     //     unit: 'g',
//     // }

//     // const i2 = {
//     //     name: 'purple haze',
//     //     unit: 'ml',
//     // }

//     // const r1 = {
//     //     name: 'Jonko',
//     //     description: 'Dikke Jonko Ouleh',
//     //     prepareTime: 300,
//     //     peopleCount: 1,
//     //     authorId: 1,
//     // }

//     // const r2 = {
//     //     name: 'Elloe',
//     //     description: 'Dikke Elloe Ouleh',
//     //     prepareTime: 600,
//     //     peopleCount: 2,
//     //     authorId: 1,
//     // }

//     // it('should fetch all the recipes', async function() {
//     //     await recipeService.deleteRecipe(2)
//     //     await recipeService.deleteRecipe(3)
//     //     const re1 = await recipeService.createRecipe(r1)
//     //     const re2 = await recipeService.createRecipe(r2)
//     //     const ig1 = await recipeService.createIngredient(i1)
//     //     const ig2 = await recipeService.createIngredient(i2)
//     //     const ri1 = await recipeService.addIngredient(re1.id, ig1.id, 0.25)
//     //     const ri2 = await recipeService.addIngredient(re2.id, ig2.id, 0.5)
//     //     const is1 = await recipeService.addInstruction(re1.id, 'Draai die Jonko')
//     //     const is2 = await recipeService.addInstruction(re2.id, 'Draai die Elloe')
//     //     const recipes = await recipeService.getAllRecipes()

//     //     expect(recipes).to.deep.equal([{
//     //         ...re1,
//     //         instructions: [is1],
//     //         recipeIngredients: [{...ri1, ingredient: ig1}]
//     //     }, {
//     //         ...re2,
//     //         instructions: [is2],
//     //         recipeIngredients: [{...ri2, ingredient: ig2}]
//     //     }
//     //     ])
//     // })
// })
