import React from 'react'
import { HeaderComponent, HeaderConfig } from '@/components/molecules'

export function useHeader(navigation: any, config: HeaderConfig): void {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderComponent navigation={navigation} config={config} />
            ),
        })
    }, [navigation, config])
}
