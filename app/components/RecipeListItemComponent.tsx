import React from 'react'
import { StyleSheet,  View, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
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
        <Container>
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

            <MyButton text="Delete Recipe" onPress={removeRecipe} viewStyle={styles.deleteButton} />

        </Container>
    )
}

const Container = styled(View)`
    alignItems: center;
    backgroundColor: ${(props) => props.theme.background};
    flex: 1;
    marginTop: 5px;
    borderWidth: 3px;
    borderColor: ${(props) => props.theme.primary};
    borderRadius: 20px;
    width: 80%;
`

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        marginTop: 5,
        borderWidth: 3,
        borderColor: colors.primary,
        borderRadius: 20,
        width: '80%'
    },
    nameText: {
        left: 5,
        fontSize: 30,
    },
    propertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        width: '50%'
    }
})
