import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { createRecipe } from '../actions/recipes'
import AddableListComponent from '../components/AddableListComponent'
import { ButtonBorderless, ButtonFilled } from '../components/Buttons'
import {MyFeather} from '../components/Icons'
import { Ingredient, Recipe, Instruction, RecipeIngredient } from '../data'

const IngredientListView = (
    {
        ingredientsData,
        handleIngredientNameChange,
        handleIngredientAmountChange,
        handleIngredientUnitChange,
        handleRemoveIngredient
    }: {
        ingredientsData: Ingredient[]
        handleIngredientNameChange: (key: string, name: string) => void
        handleIngredientAmountChange: (key: string, amount: string) => void
        handleIngredientUnitChange: (key: string, unit: string) => void
        handleRemoveIngredient: (key: string) => void
    }
): JSX.Element => (
    <FlatList
            style={styles.ingredientsList}
            data={ingredientsData}
            renderItem={({ item }) => (
                <View style={styles.ingredientsListItem}>
                    {/* Ingredient Name Input */}
                    <TextInput
                        style={styles.ingredientName}
                        onChangeText={(text: string) =>
                            handleIngredientNameChange(item.key, text)
                        }
                        value={item.name}
                        placeholder="New Ingredient"
                    />

                    {/* Ingredient Amount Input */}
                    <TextInput
                        style={styles.ingredientAmount}
                        onChangeText={(text: string) =>
                            handleIngredientAmountChange(item.key, text)
                        }
                        value={
                            item.recipeIngredients[0].amount
                                ? item.recipeIngredients[0].amount.toString()
                                : ''
                        }
                        placeholder="0"
                    />

                    {/* Ingredient Unit Input */}
                    <TextInput
                        style={styles.ingredientUnit}
                        onChangeText={(text: string) =>
                            handleIngredientUnitChange(item.key, text)
                        }
                        value={item.unit}
                        placeholder="Unit"
                    />

                    {/* Remove Ingredient Button */}
                    <TouchableOpacity
                        style={styles.removeIngredientButton}
                        onPress={() => handleRemoveIngredient(item.key)}
                    >
                        <MyFeather name="minus" size={15} />
                    </TouchableOpacity>
                </View>
            )}
        />
    )

const InstructionsListView = (
   {
       instructionsData,
       handleInstructionTextChange,
       handleRemoveInstruction
   }:{
    instructionsData: Instruction[],
    handleInstructionTextChange: (key: string, text: string) => void,
    handleRemoveInstruction: (key: string) => void
    }
): JSX.Element => (
    <FlatList
            style={styles.instructionsList}
            data={instructionsData}
            renderItem={({ item }) => (
                <View key={item.key} style={styles.instructionsListItem}>
                    {/* Instruction Number */}
                    <InstructionNumber>
                        {(
                            instructionsData.indexOf(item) + 1
                        ).toString()}
                    </InstructionNumber>

                    {/* Instruction Text Input */}
                    <TextInput
                        style={styles.instructionText}
                        onChangeText={(text: string) =>
                            handleInstructionTextChange(item.key, text)
                        }
                        value={item.text}
                        placeholder="Text"
                        multiline
                    />

                    {/* Remove Instruction Button */}
                    <TouchableOpacity
                        style={styles.removeInstructionButton}
                        onPress={() =>
                            handleRemoveInstruction(item.key)
                        }
                    >
                        <MyFeather name="minus" size={15} />
                    </TouchableOpacity>
                </View>
            )}
        />
)

function NewRecipeScreen(): JSX.Element {
    const theme = useSelector((state: any) => state.theme)
    const dispatch = useDispatch()

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

    const [recipeData, setRecipeData] = React.useState<Recipe>(getInitialRecipe())

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
            <AddableListComponent
                buttonText = "Add Ingredient"
                onButtonClick = {handleAddIngredient}
                headerText = "Ingredients"
            >
                {[<IngredientListView
                    key = {0}
                    ingredientsData={ingredientsData}
                    handleIngredientNameChange={handleIngredientNameChange}
                    handleIngredientAmountChange={handleIngredientAmountChange}
                    handleIngredientUnitChange={handleIngredientUnitChange}
                    handleRemoveIngredient={handleRemoveIngredient}
                />]}
            </AddableListComponent>

            {/* Instructions List Container */}
            <AddableListComponent
                buttonText = "Add Instruction"
                onButtonClick={handleAddInstruction}
                headerText = "Instructions"
            >
                {[<InstructionsListView
                    key = {0}
                    instructionsData={instructionsData}
                    handleInstructionTextChange={handleInstructionTextChange}
                    handleRemoveInstruction={handleRemoveInstruction}
                />]}
            </AddableListComponent>

            {/* Create Recipe Button */}
            <ButtonFilled text="Create Recipe" onPress={handleCreateRecipe} />

            {/* Clear Recipe Button */}
            <ButtonBorderless text="Clear Recipe" onPress={clearRecipeData}/>
        </Container>
    )
}

export default NewRecipeScreen

const {height} = Dimensions.get('screen')

const Container = styled(View)`
    flex: 1;
    flexDirection: column;
    justifyContent: center;
    alignItems: center;
    alignContent: center;
    backgroundColor: ${(props) => props.theme.background};
`

// Bottom height * 0.03
const Header = styled(View)`
    bottom: ${height * 0.03}px;
    width: 85%;
    backgroundColor: ${(props) => props.theme.background};
    borderColor: ${(props) => props.theme.primary};
    borderRadius: 20px;
    borderWidth: 3px;
    paddingTop: 5px;
    paddingBottom: 5px;
`

const RecipeNameTextInput = styled(TextInput)`
    marginTop: 10px;
    paddingBottom: 10px;
    fontSize: 25px;
    color: ${(props) => props.theme.text};
    textAlign: center;
    borderBottomColor: ${(props) => props.theme.primary};
    borderBottomWidth: 1px;
`

const DescriptionTextInput = styled(TextInput)`
    marginTop: 8px;
    marginLeft: 8px;
    marginRight: 8px;
    marginBottom: 5px;
    color: ${(props) => props.theme.text}
`

const InstructionNumber = styled(Text)`
    width: 10%;
    fontSize: 18px;
    color: ${(props) => props.theme.grey}
`

const styles = StyleSheet.create({
    ingredientsList: {
        paddingTop: 5,
        flexDirection: 'column',
    },
    ingredientsListItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    ingredientName: {
        width: '50%',
        paddingEnd: 5,
    },
    ingredientAmount: {
        width: '15%',
        paddingEnd: 5,
    },
    ingredientUnit: {
        width: '25%',
        paddingEnd: 5,
    },
    removeIngredientButton: {
        alignContent: 'flex-end',
    },
    instructionsList: {
        paddingTop: 5,
        flexDirection: 'column',
    },
    instructionsListItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'space-between',
        width: '100%',
    },
    instructionText: {
        width: '80%',
        paddingEnd: 5,
    },
    removeInstructionButton: {},
})
