import { Stack } from '@chakra-ui/layout'
import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useView } from '@context/ViewContext'
import { useAppDispatchRenderer } from '@renderer/store/configureStore'
import { FeedFile } from '@shared/domain/feedFile'
import { addFeedFile } from '@shared/store/reducer/feedFile'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import FileUpload from './FileUpload'
import { Separator } from './Separator'

type Props = {
  isOPMLEnabled: boolean
}

const Form: React.FC<Props> = ({ isOPMLEnabled }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [localId, setLocalId] = useState<string>()
  const { setCustomizeFeed } = useView()
  const dispatch = useAppDispatchRenderer()

  useEffect(() => {
    if (loading && localId) {
      const timeoutId = setTimeout(() => {
        setCustomizeFeed({ localId })
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [loading, localId, setCustomizeFeed])

  const onSubmit: SubmitHandler<FeedFile> = form => {
    const localId = uuidv4()
    dispatch(
      addFeedFile({
        localId,
        type: 'RSS',
        state: 'CREATED',
        stateTimestamp: +new Date(),
        ...form
      })
    )
    reset()
    setLoading(true)
    setLocalId(localId)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing='10'>
        <FormControl>
          <Input
            id='url'
            type='text'
            placeholder='Paste your feed URL here, something like: https://my.favoritenews.com/rss'
            {...register('url', {
              required: 'The URL is required'
              // TODO: Add validation to the URL
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        {isOPMLEnabled ? (
          <>
            <Separator text='or' />
            <FileUpload />
          </>
        ) : null}
        <Button
          alignSelf='flex-end'
          colorScheme='blue'
          type='submit'
          width='48'
          isLoading={isSubmitting || loading}
        >
          Import
        </Button>
      </Stack>
    </form>
  )
}

export default Form
