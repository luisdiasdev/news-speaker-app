import React from 'react'
import styled from 'styled-components'

const SeparatorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`

const Line = styled.div<{ left?: boolean; right?: boolean }>`
  flex: 1;
  border: 0.5px solid rgba(196, 196, 196, 0.25);
  border-radius: 16px;
  ${({ left, right }) =>
    left ? `margin-left: 4rem` : right ? `margin-right: 4rem` : ``}
`

const Text = styled.h2`
  padding: 0 4rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 2rem;
  line-height: 19px;

  /* identical to box height */
  letter-spacing: 0.02em;

  color: #c6c6c6;
  opacity: 80%;
`

type SeparatorProps = {
  text: string
}

const Separator: React.FC<SeparatorProps> = ({ text }) => {
  return (
    <SeparatorContainer>
      <Line left />
      <Text>{text}</Text>
      <Line right />
    </SeparatorContainer>
  )
}

export { Separator }
