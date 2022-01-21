import { Stack } from '@chakra-ui/layout'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input
} from '@chakra-ui/react'
import { Feed } from '@shared/domain/feed'
import { useAppDispatchRenderer } from '@shared/store/configureStore/renderer'
import { addFeed } from '@shared/store/reducer/feed'
import React from 'react'
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

  const dispatch = useAppDispatchRenderer()

  const onSubmit: SubmitHandler<Feed> = form => {
    dispatch(addFeed({ id: uuidv4(), ...form }))
    reset()
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
          isLoading={isSubmitting}
        >
          Import
        </Button>
      </Stack>
    </form>
  )
}

export default Form
