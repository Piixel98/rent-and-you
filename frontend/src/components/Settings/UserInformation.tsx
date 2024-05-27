import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel, Grid,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {SubmitHandler, useForm} from 'react-hook-form'

import {ApiError, AuthService, UserReadModel, UserUpdateModel} from '../../client'
import useAuth from '../../hooks/useAuth'
import {useMutation, useQueryClient} from "react-query";
import useCustomToast from "../../hooks/useCustomToast.ts";


const UserInformation: React.FC = () => {
  const queryClient = useQueryClient()
  const color = useColorModeValue('green.700', 'white')
  const [editMode, setEditMode] = useState(false)
  const toast = useCustomToast()
  const { user: user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<UserReadModel>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      email: user?.email || '',
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      city: user?.city || '',
      postal_code: user?.postal_code || '',
      address: user?.address || '',
    },
  })

  const updateInfo = async (data: UserUpdateModel) => {
    await AuthService.updateUserMeApiV1AuthUserPatch({ requestBody: data })
  }

  const mutation = useMutation(updateInfo, {
    onSuccess: () => {
      toast('Actualizado!', 'Usuario actualizado correctamente.', 'success')
    },
    onError: (err: ApiError) => {
      const errDetail = err.body.detail
      console.error(errDetail)
      toast('Oops! Algo fué mal.', `Inténtalo de nuevo más tarde.`, 'error')
    },
    onSettled: () => {
      queryClient.invalidateQueries('users')
      queryClient.invalidateQueries('currentUser')
    },
  })

  const onSubmit: SubmitHandler<UserUpdateModel> = async (data) => {
    mutation.mutate(data)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const onCancel = () => {
    reset()
    toggleEditMode()
  }

  return (
    <>
      <Container maxW="full" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Heading size="sm" py={4}>
          Información de usuario
        </Heading>
        <Box w={{ sm: 'full' }}>
          <Grid templateColumns="2fr 1fr" gap={2} width={"100%"}>
            <FormControl>
              <FormLabel color={color} htmlFor="name">
                Nombre
              </FormLabel>
              {editMode ? (
                <Input
                  id="name"
                  {...register('first_name', { maxLength: 30 })}
                  type="text"
                  size="md"
                />
              ) : (
                <Text size="md" py={2}>
                  {user?.first_name || 'N/A'}
                </Text>
              )}
            </FormControl>
          <FormControl>
            <FormLabel color={color} htmlFor="name">
              Apellidos
            </FormLabel>
            {editMode ? (
              <Input
                id="last_name"
                {...register('last_name', { maxLength: 30 })}
                type="text"
                size="md"
              />
            ) : (
              <Text size="md" py={2}>
                {user?.last_name || 'N/A'}
              </Text>
            )}
          </FormControl>
            </Grid>
          <FormControl mt={4} isInvalid={!!errors.email}>
            <FormLabel color={color} htmlFor="email">
              Email
            </FormLabel>
            {editMode ? (
              <Input
                id="email"
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Dirección de email inválida',
                  },
                })}
                type="text"
                size="md"
              />
            ) : (
              <Text size="md" py={2}>
                {user?.email || 'N/A'}
              </Text>
            )}
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <Grid templateColumns="2fr 1fr" gap={2} width={"100%"}>
            <FormControl>
              <FormLabel color={color} htmlFor="city">
                Ciudad
              </FormLabel>
              {editMode ? (
                <Input
                  id="city"
                  {...register('city')}
                  type="text"
                  size="md"
                />
              ) : (
                <Text size="md" py={2}>
                  {user?.city || 'N/A'}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel color={color} htmlFor="postal_code">
                Código Postal
              </FormLabel>
              {editMode ? (
                <Input
                  id="postal_code"
                  {...register('postal_code')}
                  type="text"
                  size="md"
                />
              ) : (
                <Text size="md" py={2}>
                  {user?.postal_code || 'N/A'}
                </Text>
              )}
            </FormControl>
            </Grid>
          <FormControl>
            <FormLabel color={color} htmlFor="address">
              Dirección
            </FormLabel>
            {editMode ? (
              <Input
                id="address"
                {...register('address')}
                type="text"
                size="md"
              />
            ) : (
              <Text size="md" py={2}>
                {user?.address || 'N/A'}
              </Text>
            )}
          </FormControl>
          <Flex mt={4} gap={3}>
            <Button
              bg="green.400"
              color="white"
              _hover={{ opacity: 0.8 }}
              onClick={toggleEditMode}
              type={editMode ? 'button' : 'submit'}
              isLoading={editMode ? isSubmitting : false}
              isDisabled={editMode ? !isDirty || !getValues('email') : false}
            >
              {editMode ? 'Guardar' : 'Editar'}
            </Button>
            {editMode && (
              <Button onClick={onCancel} isDisabled={isSubmitting} bg="green.400" color="white">
                Cancelar
              </Button>
            )}
          </Flex>
        </Box>
      </Container>
    </>
  )
}

export default UserInformation
