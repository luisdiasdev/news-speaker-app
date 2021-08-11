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
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: ${props => props.theme.titleBarHeight};
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
`
