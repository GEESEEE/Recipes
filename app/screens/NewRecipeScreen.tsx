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
import { v4 as uuid } from 'uuid'
import { createRecipe } from '../actions/recipes'
import MyButton from '../components/MyButton'
import MyFeather from '../components/MyFeather'
import colors from '../config/colors'
import globalStyles from '../config/globalStyles'
import Ingredient from '../data/ingredient'
import Instruction from '../data/instruction'
import Recipe from '../data/recipe'
import RecipeIngredient from '../data/recipe-ingredient'

function NewRecipeScreen(): JSX.Element {
    const recipes = useSelector((state: any) => state.recipes)
    const dispatch = useDispatch()

    const initialRecipe = {
        name: '',
        description: '',
        prepareTime: 0,
        peopleCount: 1,
        key: uuid(),
        id: 0,
        recipeIngredients: [],
        instructions: [],
    }

    const [recipeData, setRecipeData] = React.useState<Recipe>(initialRecipe)

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
        console.log('Creating Recipe')
        const recipe = { ...recipeData }
        const recipeIngredients: RecipeIngredient[] = []
        // Set the recipe correctly without Cycles
        recipeData.recipeIngredients?.forEach((recipeIngredient, id) => {
            const ingredient = { ...recipeIngredient.ingredient } as Ingredient
            ingredient.recipeIngredients = []
            const newRecipeIngredient = new RecipeIngredient()
            newRecipeIngredient.amount = recipeIngredient.amount
            newRecipeIngredient.ingredient = ingredient
            recipeIngredients.push(newRecipeIngredient)
        })
        recipe.recipeIngredients = recipeIngredients
        dispatch(createRecipe(recipe))
        setRecipeData(initialRecipe)
        setIngredientData([])
        setInstructionsData([])
    }

    return (
        <View style={styles.background}>
            {/* Recipe Name Input Field */}
            <View style={styles.header}>
                <TextInput
                    style={{ ...styles.headerText }}
                    value={recipeData.name}
                    placeholder="New Recipe"
                    placeholderTextColor={colors.darkgrey}
                    onChangeText={(text: string) => handleNameChange(text)}
                    multiline
                />
            </View>

            {/* Recipe Description Input Field */}
            <View style={globalStyles.userinput}>
                <TextInput
                    style={{ ...globalStyles.textinput }}
                    placeholder="Description"
                    value={recipeData.description}
                    onChangeText={(text: string) =>
                        handleDescriptionChange(text)
                    }
                    multiline
                />
            </View>

            {/* Ingredients List Container */}
            <View
                style={{
                    ...globalStyles.userinput,
                    ...styles.ingredientsContainer,
                }}
            >
                {/* Ingredients Header */}
                <View style={styles.ingredientsHeader}>
                    {/* Header Text */}
                    <Text style={styles.ingredientHeaderText}>Ingredients</Text>

                    {/* Add Ingredient Button */}
                    <TouchableOpacity
                        style={styles.addIngredientButton}
                        onPress={handleAddIngredient}
                    >
                        <MyFeather name="plus" />
                    </TouchableOpacity>
                </View>

                {/* Ingredients List */}
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
            </View>

            {/* Instructions List Container */}
            <View
                style={{
                    ...globalStyles.userinput,
                    ...styles.instructionsContainer,
                }}
            >
                {/* Instructions Header */}
                <View style={styles.instructionsHeader}>
                    {/* Header Text */}
                    <Text style={styles.instructionHeaderText}>
                        Instructions
                    </Text>

                    {/* Add Ingredient Button */}
                    <TouchableOpacity
                        style={styles.addInstructionButton}
                        onPress={handleAddInstruction}
                    >
                        <MyFeather name="plus" />
                    </TouchableOpacity>
                </View>

                {/* Instructions List */}
                <FlatList
                    style={styles.instructionsList}
                    data={instructionsData}
                    renderItem={({ item }) => (
                        <View style={styles.instructionsListItem}>
                            {/* Instruction Number */}
                            <Text style={styles.instructionNumber}>
                                {(
                                    instructionsData.indexOf(item) + 1
                                ).toString()}
                            </Text>

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
            </View>

            {/* Create Recipe Button */}
            <MyButton text="Create Recipe" onPress={handleCreateRecipe} />
        </View>
    )
}

export default NewRecipeScreen

const { height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: colors.white,
    },
    header: {
        bottom: height * 0.05,
        width: '85%',
        color: colors.black,
    },
    headerText: {
        fontSize: height * 0.04,
        color: colors.black,
        textAlign: 'center',
    },
    ingredientsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    ingredientsHeader: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    ingredientHeaderText: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
    },
    addIngredientButton: {},
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

    instructionsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    instructionsHeader: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    instructionHeaderText: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
    },
    addInstructionButton: {},
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
    instructionNumber: {
        width: '10%',
        fontSize: 18,
    },
    instructionText: {
        width: '80%',
        paddingEnd: 5,
    },
    removeInstructionButton: {},
})
