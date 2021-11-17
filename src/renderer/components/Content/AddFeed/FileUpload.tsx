import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import styled from 'styled-components'

import borderSvgUrl from '../../../../assets/svg/border.svg'

type BackgroundProps = {
  isDragging: boolean
}

const Background = styled.div<BackgroundProps>`
  width: 100%;
  height: 100%;
  background-color: ${p => (p.isDragging ? '#CCC' : '#FFF')};
  opacity: 0.25;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const FileUploadContainer = styled.div`
  height: 30vh;
  width: 100%;
  background-image: url(${borderSvgUrl});
  border-radius: 8px;
`

const FileUpload: React.FC = () => {
  const onDrop = useCallback(acceptedFiles => {
    // TODO: Handle file upload
    console.log(acceptedFiles)
  }, [])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop
  })

  return (
    <FileUploadContainer
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <Background isDragging={isDragActive || isDragAccept}>
        <input {...getInputProps()} />
        <AiOutlineFolderOpen fontSize='64px' />
        <p>Drag here or click to browse your OPML file</p>
      </Background>
    </FileUploadContainer>
  )
}

export default FileUpload
