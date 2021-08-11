import styled from 'styled-components'

export const Container = styled.div``

interface PanelProps {
  isOpen: boolean
  panelWidth: string
}

export const LeftPanel = styled.div<PanelProps>`
  position: fixed;
  top: ${props => props.theme.titleBarHeight};
  left: ${props => (props.isOpen ? '0' : `-${props.panelWidth}`)};
  bottom: 0;
  border-right: 1px solid #ccc;
  transition: 0.3s;
  width: ${props => props.panelWidth};
`

export const RightPanel = styled.div<PanelProps>`
  position: fixed;
  top: ${props => props.theme.titleBarHeight};
  right: 0;
  bottom: 0;
  transition: 0.3s;
  width: calc(100% - ${props => (props.isOpen ? props.panelWidth : '0px')});
`
