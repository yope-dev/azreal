import { EuiButton, EuiFieldPassword, EuiForm, EuiFormErrorText, EuiFormRow, EuiLoadingSpinner, EuiSpacer } from '@elastic/eui'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useChangePassword } from 'src/graphql/query/users/chagePassword'
import { ChangePasswordVariables } from 'src/graphql/query/users/types/ChangePassword'
import * as yup from 'yup'
import { getErrorMsg } from '../utils'
import * as sha256 from 'fast-sha256'
import { useAuthObj } from './AuthContext'
import CenteredPage from '../utils/CenteredPage'

type ChangePasswordKeys = keyof ChangePasswordVariables

type SchemaType = Record<ChangePasswordKeys, any>

export const schema = yup.object().shape({
  password: yup.string().min(8),
  oldpassword: yup.string().min(8),
  userId: yup.number().required()
} as SchemaType)

export const getFiledName = (name: ChangePasswordKeys) => name

export const ChangePassword = () => {
  const [ changePassword ] = useChangePassword()
  const { userId } = useAuthObj()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState('')
  const router = useRouter()

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async changePasswordData => {
    console.log('SUBMIT', changePasswordData)
    setLoading(true)
    try {
      const { data, errors } = await changePassword({
        variables: {
          userId,
          password: sha256.hash(changePasswordData.password).toString(),
          oldpassword: sha256.hash(changePasswordData.oldpassword).toString()
        },
      })

      if (errors) throw errors

      if (data?.insert_az_users_AuthData_one.userId) {
        setLoading(false)
        router.back()
      }

      throw new Error('Ви ввели неправильний старий пароль')
    } catch (error) {
      console.error(error)
      setError(error.toString())
      setLoading(false)
    }
  }

  const SubmitButton = useCallback(
    () =>
      loading ? (
        <EuiLoadingSpinner size='m' />
      ) : (
        <EuiButton type='submit' fill fullWidth>
          Змінити пароль
        </EuiButton>
      ),
    [ loading ]
  )

  return (
    <EuiForm component='form' onSubmit={handleSubmit(onSubmit)}>

      <EuiFormRow label="Старий пароль" fullWidth>
        <EuiFieldPassword name={getFiledName('oldpassword')} inputRef={register} fullWidth />
      </EuiFormRow>
      <EuiFormErrorText>{getErrorMsg(errors.getFiledName('oldpassword'))}</EuiFormErrorText>

      <EuiFormRow label="Новий пароль" fullWidth>
        <EuiFieldPassword name={getFiledName('password')} inputRef={register} fullWidth />
      </EuiFormRow>
      <EuiFormErrorText>{getErrorMsg(errors.getFiledName('password'))}</EuiFormErrorText>
      <EuiFormErrorText>{error}</EuiFormErrorText>
      
      <EuiSpacer />
      <SubmitButton />
    </EuiForm>
  )
}

export const ChangePasswordPage = () => {
  return <CenteredPage title='Зміна паролю'>
    <ChangePassword />
  </CenteredPage>
}