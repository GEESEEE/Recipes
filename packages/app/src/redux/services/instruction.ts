import {
    Instruction,
    InstructionCreate,
    InstructionUpdate,
} from '@recipes/api-types/v1'
import { api } from './base'

type BaseArg = { sectionId: number; recipeId: number }

const instructionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addInstructions: builder.mutation<
            Instruction[],
            BaseArg & { body: InstructionCreate[] }
        >({
            query: (args) => ({
                url: `/sections/${args.sectionId}/recipes/${args.recipeId}/instructions/bulk`,
                method: 'POST',
                body: args.body,
            }),
        }),

        updateInstructions: builder.mutation<
            Instruction[],
            BaseArg & { body: InstructionUpdate[] }
        >({
            query: (args) => ({
                url: `/sections/${args.sectionId}/recipes/${args.recipeId}/instructions/bulk`,
                method: 'PUT',
                body: args.body,
            }),
        }),

        deleteInstructions: builder.mutation<
            boolean[],
            BaseArg & { body: number[] }
        >({
            query: (args) => ({
                url: `/sections/${args.sectionId}/recipes/${args.recipeId}/instructions/bulk`,
                method: 'DELETE',
                body: args.body,
            }),
        }),
    }),
})

export const {
    useAddInstructionsMutation,
    useUpdateInstructionsMutation,
    useDeleteInstructionsMutation,
} = instructionApi
