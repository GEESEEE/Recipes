import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { deleteRecipe } from '../actions/recipes'
import colors from '../config/colors'
import Recipe from '../data/recipe'
import MyButton from './MyButton'

export default function RecipeListItemComponent({
    recipe,
}: {
    recipe: Recipe
}): JSX.Element {
    const dispatch = useDispatch()

    async function removeRecipe(): Promise<void> {
        dispatch(deleteRecipe(recipe))
    }

    return (
        <View style={{ ...styles.container }}>
            {/* Recipe Name */}
            <Text style={styles.nameText}>{recipe.name}</Text>

            {/* Recipe Properties */}
            <View style={styles.propertiesContainer}>
                {/* Prepare Time */}
                <MaterialCommunityIcons
                    style={styles.prepareTimeIcon}
                    name="timer-sand"
                    size={20}
                />
                <Text style={styles.prepareTimeText}>{recipe.prepareTime}</Text>

                {/* People Count */}
                <Feather style={styles.peopleCountIcon} name="user" size={20} />
                <Text style={styles.peopleCountText}>{recipe.peopleCount}</Text>
            </View>
            <MyButton text="Delete Recipe" onPress={removeRecipe} viewStyle={styles.deleteButton}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        backgroundColor: colors.white,
        width: '100%',
        marginTop: 5,
        borderWidth: 3,
        borderColor: colors.primary,
        borderRadius: 20,
    },
    nameText: {
        left: 5,
        fontSize: 30,
    },
    propertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    prepareTimeIcon: {},
    prepareTimeText: {
        fontSize: 20,
        flex: 1,
    },
    peopleCountIcon: {},
    peopleCountText: {
        fontSize: 20,
        flex: 1,
    },
    deleteButton: {
    }
})
