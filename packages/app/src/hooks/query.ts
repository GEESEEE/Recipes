import { useNavigation } from '@react-navigation/native'
import { isFetchError } from '@/utils'
import { showPopup } from '@/utils/screen'

export function withPopupMutation(hook: any) {
    const [func, state] = hook()

    const useFunc = async (args: any, extraArgs: any) => {
        const navigation = useNavigation<any>()
        const funcRes = await func(args, extraArgs)

        if (isFetchError(funcRes)) {
            showPopup(navigation, funcRes.error.message)
        }
        return funcRes
    }
    return () => [useFunc, state]
}

export function withPopupQuery(hook: any) {
    return (args: any, extraArgs: any) => {
        const navigation = useNavigation<any>()
        const hookRes = hook(args, extraArgs)

        if (isFetchError(hookRes)) {
            showPopup(navigation, hookRes.error.message)
        }

        return hookRes
    }
}
