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
                    size={25}
                />
                <Text style={styles.prepareTimeText}>{recipe.prepareTime}</Text>

                {/* People Count */}
                <Feather style={styles.peopleCountIcon} name="user" size={25} />
                <Text style={styles.peopleCountText}>{recipe.peopleCount}</Text>
            </View>
            <MyButton text="Delete Recipe" onPress={removeRecipe}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        backgroundColor: colors.white,
        alignSelf: 'baseline',
        width: '100%',
    },
    nameText: {
        left: 5,
        fontSize: 50,
    },
    propertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    prepareTimeIcon: {},
    prepareTimeText: {
        fontSize: 25,
        flex: 1,
    },
    peopleCountIcon: {},
    peopleCountText: {
        fontSize: 25,
        flex: 1,
    },
})
