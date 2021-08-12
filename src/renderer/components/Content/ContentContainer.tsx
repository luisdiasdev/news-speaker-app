import styled from 'styled-components'

export const ContentContainer = styled.div`
  background-color: #fff;
  position: relative;
  height: calc(100vh - ${props => props.theme.titleBarHeight});
  overflow: auto;
  padding: 10px;
`
