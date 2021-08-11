import styled from 'styled-components'

export const TitleContainer = styled.div``

export const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const CloseButton = styled.button`
  -webkit-app-region: no-drag;
  border: none;
  background: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const Container = styled.div`
  -webkit-app-region: drag;
  width: 100%;
  position: fixed;
  height: ${props => props.theme.titleBarHeight};
  padding: 10px;
  background-color: #ccc;
`
