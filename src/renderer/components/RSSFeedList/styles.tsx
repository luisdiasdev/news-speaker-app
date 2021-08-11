import styled from 'styled-components'

export const Container = styled.div`
  background-color: #edebf1;
  position: relative;
  height: calc(100vh - ${props => props.theme.titleBarHeight});
  overflow: auto;
  padding: 10px;
`
