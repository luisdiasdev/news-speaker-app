import { Stack } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { Feed } from '@shared/domain/feed'
import { useAppDispatchRenderer } from '@shared/store/configureStore/renderer'
import { addFeed } from '@shared/store/reducer/feed'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

const Form: React.FC = () => {
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
      <Stack>
        <FormControl>
          <FormLabel htmlFor='name'>Feed Name</FormLabel>
          <Input
            id='name'
            type='text'
            placeholder='My favorite news'
            {...register('name', {
              required: 'The name is required',
              minLength: {
                value: 4,
                message: 'The minimum length should be 4 characters'
              }
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='url'>URL</FormLabel>
          <Input
            id='url'
            type='text'
            placeholder='https://some.podcast.com/rss'
            {...register('url', {
              required: 'The URL is required'
              // TODO: Add validation to the URL
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme='blue' type='submit' isLoading={isSubmitting}>
          Add
        </Button>
      </Stack>
    </form>
  )
}

export default Form
