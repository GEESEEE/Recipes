import { useState } from 'react'
import { useAppDispatch } from '../redux'
import { useUpdateEffect } from '../util/update-effect'
import { reportActions, userService } from '@/redux'

export function useReports() {
    const dispatch = useAppDispatch()

    const [skip, setSkip] = useState(true)

    const getReports = userService.useGetReportsQuery(undefined, { skip })

    useUpdateEffect(() => {
        async function func() {
            if (typeof getReports.data !== 'undefined') {
                await dispatch(reportActions.setReports(getReports.data))
            }
        }
        func()
    }, [getReports])

    function callback() {
        setSkip(false)
    }

    return [callback]
}
