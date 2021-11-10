import { useNavigation } from '@react-navigation/native'
import { isFetchError } from '@/utils'
import { showPopup } from '@/utils/screen'

export function usePopup(hook: any, args: any, extraArgs?: any) {
    const navigation = useNavigation<any>()
    const hookRes = hook(args, extraArgs)
    console.log('Hookres', Object.keys(hookRes))
    if (isFetchError(hookRes)) {
        console.log('IsFetchError', hookRes)
        navigation.navigate('Popup', {
            title: hookRes.error.message,
        })
        // showPopup(navigation, hookRes.error.message)
    }
    return hookRes
}
