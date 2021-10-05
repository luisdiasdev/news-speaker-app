import { Stack } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { useContent } from '@contexts/ContentContext'
import { Feed } from '@shared/domain/feed'
import { useAppDispatchRenderer } from '@shared/store/configureStore/renderer'
import { getFeedById, updateFeed } from '@shared/store/reducer/feed'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

type FormProps = {
  id: string
}

const Form: React.FC<FormProps> = ({ id }) => {
  const { setAddFeed } = useContent()
  const feed = useSelector(getFeedById(id))
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm({ defaultValues: feed })

  const dispatch = useAppDispatchRenderer()

  const onSubmit: SubmitHandler<Feed> = form => {
    dispatch(updateFeed(form))
    setAddFeed()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormControl>
          <FormLabel htmlFor='id'>ID</FormLabel>
          <Input id='id' type='text' {...register('id')} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='name'>Name</FormLabel>
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
            readOnly
            {...register('url')}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme='blue' type='submit' isLoading={isSubmitting}>
          Save
        </Button>
      </Stack>
    </form>
  )
}

export default Form
