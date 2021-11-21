import { useAppDispatch } from '../redux'
import { useUpdateEffect } from '../util/update-effect'
import { useAuth } from '../selectors'
import { reportActions, userService } from '@/redux'

export function useReports() {
    const dispatch = useAppDispatch()
    const auth = useAuth()

    const skip = auth.token.length <= 0

    const getReports = userService.useGetReportsQuery(undefined, { skip })

    useUpdateEffect(() => {
        async function func() {
            if (typeof getReports.data !== 'undefined') {
                await dispatch(reportActions.setReports(getReports.data))
            }
        }
        func()
    }, [getReports])
}
