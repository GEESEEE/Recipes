import React from 'react'
import { Dimensions, View } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { createRecipe } from '../actions/recipes'
import ListButtonComponent from '../components/list-button'
import { ButtonBorderless, ButtonFilled } from '../components/user-input/buttons'
import {
    InstructionListItem,
    IngredientListItem,
} from '../components/list-items'
import { Ingredient, Recipe, Instruction, RecipeIngredient } from '../data'
import { useAppDispatch, useAppSelector } from '../types/ReduxHooks'

function NewRecipeScreen(): JSX.Element {
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    function getInitialRecipe(): Recipe {
        return {
            name: '',
            description: '',
            prepareTime: 0,
            peopleCount: 1,
            key: uuid(),
            id: 0,
            recipeIngredients: [],
            instructions: [],
        }
    }

    const [recipeData, setRecipeData] = React.useState<Recipe>(
        getInitialRecipe()
    )

    const [ingredientsData, setIngredientData] = React.useState<Ingredient[]>(
        []
    )

    const [instructionsData, setInstructionsData] = React.useState<
        Instruction[]
    >([])

    function handleNameChange(name: string): void {
        setRecipeData({ ...recipeData, name })
    }

    function handleDescriptionChange(description: string): void {
        setRecipeData({ ...recipeData, description })
    }

    function handlePrepareTimeChange(prepareTime: number): void {
        setRecipeData({ ...recipeData, prepareTime })
    }

    function handlePeopleCountChange(peopleCount: number): void {
        setRecipeData({ ...recipeData, peopleCount })
    }

    function handleAddIngredient(): void {
        const ingredient = new Ingredient()
        ingredient.name = ''
        ingredient.unit = ''
        ingredient.key = uuid()

        const recipeIngredient = new RecipeIngredient()
        recipeIngredient.amount = 0
        recipeIngredient.ingredient = ingredient
        ingredient.recipeIngredients = [recipeIngredient]

        setIngredientData([...ingredientsData, ingredient])
        recipeData.recipeIngredients?.push(recipeIngredient)
    }

    function handleRemoveIngredient(key: string): void {
        const ingredients = ingredientsData.filter((item) => item.key !== key)
        setIngredientData([...ingredients])
    }

    function handleIngredientNameChange(key: string, name: string): void {
        const ingredient = ingredientsData.filter((item) => item.key === key)[0]
        ingredient.name = name
        setIngredientData([...ingredientsData])
    }

    function handleIngredientUnitChange(key: string, unit: string): void {
        const ingredient = ingredientsData.filter((item) => item.key === key)[0]
        ingredient.unit = unit
        setIngredientData([...ingredientsData])
    }

    function handleIngredientAmountChange(key: string, amount: string): void {
        const ingredient = ingredientsData.filter((item) => item.key === key)[0]
        const recipeIngredient = ingredient
            .recipeIngredients?.[0] as RecipeIngredient
        recipeIngredient.amount = parseFloat(amount)
        setIngredientData([...ingredientsData])
    }

    function handleAddInstruction(): void {
        const instruction = new Instruction()
        instruction.text = ''
        instruction.key = uuid()

        setInstructionsData([...instructionsData, instruction])
        recipeData.instructions?.push(instruction)
    }

    function handleRemoveInstruction(key: string): void {
        const instructions = instructionsData.filter((item) => item.key !== key)
        setInstructionsData([...instructions])
    }

    function handleInstructionTextChange(key: string, text: string): void {
        const instruction = instructionsData.filter(
            (item) => item.key === key
        )[0]
        instruction.text = text
        setInstructionsData([...instructionsData])
    }

    async function handleCreateRecipe(): Promise<void> {
        const recipe = { ...recipeData }
        const recipeIngredients: RecipeIngredient[] = []
        // Set the recipe correctly without Cycles
        recipeData.recipeIngredients?.forEach((recipeIngredient) => {
            const ingredient = { ...recipeIngredient.ingredient } as Ingredient
            ingredient.recipeIngredients = []
            const newRecipeIngredient = new RecipeIngredient()
            newRecipeIngredient.amount = recipeIngredient.amount
            newRecipeIngredient.ingredient = ingredient
            recipeIngredients.push(newRecipeIngredient)
        })
        recipe.recipeIngredients = recipeIngredients
        dispatch(createRecipe(recipe))
        clearRecipeData()
    }

    function clearRecipeData(): void {
        setRecipeData(getInitialRecipe())
        setIngredientData([])
        setInstructionsData([])
    }

    return (
        <Container>
            <Header>
                {/* Recipe Name Input Field */}
                <RecipeNameTextInput
                    value={recipeData.name}
                    placeholder="New Recipe"
                    placeholderTextColor={theme.grey}
                    onChangeText={(text: string) => handleNameChange(text)}
                    multiline
                />

                {/* Recipe Description Input Field */}
                <DescriptionTextInput
                    placeholder="Description"
                    value={recipeData.description}
                    placeholderTextColor={theme.grey}
                    onChangeText={(text: string) =>
                        handleDescriptionChange(text)
                    }
                    multiline
                />
            </Header>

            {/* <View style={{...globalStyles.userinput, ...styles.description}}>

            </View> */}

            {/* Ingredients List Container */}
            <ListButtonComponent
                headerText="Ingredients"
                buttonText="Add Ingredient"
                onButtonClick={handleAddIngredient}
            >
                {[
                    <List
                        key={0}
                        data={ingredientsData}
                        renderItem={({ item}) => (
                            <IngredientListItem
                                item={item as Ingredient}
                                onRemove={handleRemoveIngredient}
                                onChangeName={handleIngredientNameChange}
                                onChangeAmount={handleIngredientAmountChange}
                                onChangeUnit={handleIngredientUnitChange}
                            />
                        )}
                    />,
                ]}
            </ListButtonComponent>

            {/* Instructions List Container */}
            <ListButtonComponent
                buttonText="Add Instruction"
                onButtonClick={handleAddInstruction}
                headerText="Instructions"
            >
                {[
                    <List
                        key={0}
                        data={instructionsData}
                        renderItem={({ item }) => (
                            <InstructionListItem
                                instructionsData={instructionsData}
                                item={item as Instruction}
                                onRemove={handleRemoveInstruction}
                                onChangeText={handleInstructionTextChange}
                            />
                        )}
                    />,
                ]}
            </ListButtonComponent>

            {/* Create Recipe Button */}
            <ButtonFilled text="Create Recipe" onPress={handleCreateRecipe} />

            {/* Clear Recipe Button */}
            <ButtonBorderless text="Clear Recipe" onPress={clearRecipeData} />
        </Container>
    )
}

export default NewRecipeScreen

const { height } = Dimensions.get('screen')

const Container = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: ${(props) => props.theme.background};
`

const Header = styled(View)`
    bottom: ${height * 0.03}px;
    width: 85%;
    background-color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
    border-radius: 20px;
    border-width: 3px;
    padding-top: 5px;
    padding-bottom: 5px;
`

const RecipeNameTextInput = styled(TextInput)`
    margin-top: 10px;
    padding-bottom: 10px;
    font-size: 25px;
    color: ${(props) => props.theme.text};
    text-align: center;
    border-bottom-color: ${(props) => props.theme.primary};
    border-bottom-width: 1px;
`

const DescriptionTextInput = styled(TextInput)`
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.text};
`

const List = styled(FlatList)`
    padding-top: 5px;
    flex-direction: column;
`
