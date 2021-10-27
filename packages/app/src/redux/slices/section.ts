import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { Section } from '@recipes/api-types/v1'

const sectionsAdapter = createEntityAdapter<Section>({})

const sectionsSlice = createSlice({
    name: 'sections',
    initialState: sectionsAdapter.getInitialState(),
    reducers: {
        setSections: sectionsAdapter.setAll,
        addSection: sectionsAdapter.addOne,
        removeSection: sectionsAdapter.removeOne,
        upsertSection: sectionsAdapter.upsertOne,
    },
})

export const sectionsSelector = sectionsAdapter.getSelectors()
export const sectionsActions = sectionsSlice.actions
export const sectionsReducer = sectionsSlice.reducer
