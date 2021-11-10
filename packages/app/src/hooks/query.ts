import { useNavigation } from '@react-navigation/native'

export function useQuery(queryHook: any) {
    const navigation = useNavigation()
    const hookResult = queryHook()
    console.log('HookResult', hookResult)
    return queryHook
}
