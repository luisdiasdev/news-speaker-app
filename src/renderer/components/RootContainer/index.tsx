import styled from 'styled-components'

export const RootContainer = styled.div`
  display: grid;
  grid-template-rows: ${props => props.theme.titleBarHeight} 1fr;
`
