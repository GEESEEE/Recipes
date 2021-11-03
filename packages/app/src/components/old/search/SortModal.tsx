// import React from 'react'
// import styled from 'styled-components'
// import { View, Text, Modal } from 'react-native'
// import { v4 as uuid } from 'uuid'
// import { ReturnButton } from '../../user-input/Buttons'
// import SortRow from './SortRow'
// import { sortActions } from '@/redux/actions'

// function Sort({
//     routeName,
//     toggle,
// }: {
//     routeName: string
//     toggle: () => void
// }): JSX.Element {
//     const headerText = 'Sort (order matters)'

//     return (
//         <Modal animationType="fade" transparent>
//             <Container>
//                 <ReturnButton onPress={() => toggle()} />
//                 <CategoryHeader>{headerText}</CategoryHeader>
//                 {sortActions.sorts.map((sort) => (
//                     <SortRow
//                         key={uuid()}
//                         type={sort.type}
//                         name={sort.name}
//                         options={sort.options}
//                         routeName={routeName}
//                     />
//                 ))}
//             </Container>
//         </Modal>
//     )
// }

// export default Sort

// const Container = styled(View)`
//     flex: 1;
//     background-color: ${(props) => props.theme.background};
//     align-items: center;
//     justify-content: flex-start;
// `

// const CategoryHeader = styled(Text)`
//     width: 90%;
//     color: ${(props) => props.theme.primary};
//     font-size: 20px;
//     align-content: flex-start;
// `
