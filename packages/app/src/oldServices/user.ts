import handleError from './base'
import { Section, Settings, User } from '@/data'

export async function getUser(headers: { token: string }): Promise<User> {
    return handleError('GET', `/users`, { headers })
}

export async function getSettings(): Promise<Settings> {
    return handleError('GET', `/users/settings`)
}

export async function updateSettings(body: {
    theme?: string
    color?: string
    invertedColors?: boolean
}): Promise<void> {
    return handleError('PUT', `/users/settings`, { body })
}

export async function createSection(body: {
    name: string
    description: string
}): Promise<Section> {
    return handleError('POST', `/users/sections`, { body })
}

export async function getSections(): Promise<Section[]> {
    return handleError('GET', '/users/sections')
}

export async function updateSection(
    sectionId: number,
    body: { name?: string; description?: string }
): Promise<Section> {
    return handleError('PUT', `/users/sections/${sectionId}`, { body })
}

export async function deleteSection(sectionId: number): Promise<boolean> {
    return handleError('DELETE', `/users/sections/${sectionId}`)
}
