import React from 'react'
import styled from 'styled-components'

import borderSvgUrl from '../../../../assets/svg/border.svg'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0.25;
`

const FileUploadContainer = styled.div`
  height: 30vh;
  width: 100%;
  background-image: url(${borderSvgUrl});
  border-radius: 8px;
`

const FileUpload: React.FC = () => {
  return (
    <>
      <FileUploadContainer>
        <Background />
      </FileUploadContainer>
    </>
  )
}

export default FileUpload
