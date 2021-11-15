import React from 'react'

declare module 'react-native-vector-icons/FontAwesome'
declare module 'react-native-vector-icons/Feather'
declare module '*.png'
declare module '*.json'
declare module '*.TTF'
declare module '@env' {
    export const API_URL: string
    export const APPLICATION_ID: string
}

declare module 'react' {
    function forwardRef<T, P = {}>(
        render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}
