/* eslint-disable no-console */
import React from 'react'
import * as Yup from 'yup'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Divider
} from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FormProvider from '../../components/hook-form/FormProvider'
import { RHFTextField } from '../../components/hook-form'
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete'

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  'Singin\' in the Rain',
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
]

// Validation Schema
const NewGroupScheme = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  members: Yup.array().min(2, 'At least 2 members are required')
})

// Default form values
const defaultValues = {
  title: '',
  members: []
}

// Slide transition component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const CreateGroupForm = ({ handleClose }) => {

  const methods = useForm({
    resolver: yupResolver(NewGroupScheme),
    defaultValues
  })

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = methods

  const onSubmit = async (data) => {
    try {
      // API CALL
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <RHFTextField name='title' label='Title' />
        <RHFAutocomplete
          name='members'
          label='Members'
          multiple
          freeSolo
          options={TAGS_OPTION.map((option) => option)}
          ChipProps={{ size: 'medium' }}
        />
        <Stack
          spacing={2}
          direction='row'
          alignItems='center'
          justifyContent='end'
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' disabled={!isValid || isSubmitting}>
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  )

}


const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      {/* Title */}
      <DialogTitle sx={{ mb: 2 }}>Create New Group</DialogTitle>
      {/* Content */}
      <Divider />
      <DialogContent sx={{ mt: 2 }}>
        {/* Form */}
        <CreateGroupForm handleClose={handleClose} />

      </DialogContent>
    </Dialog>
  )
}

export default CreateGroup
