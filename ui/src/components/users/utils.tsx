import { GetUserById_az_users_Users as UserType } from '../../graphql/query/users/types/GetUserById'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetUsersById } from 'src/graphql/query/users/getUserById'
import { NotFoundPage } from '../utils/NotFoundPage'
import { Loading } from '../utils/loading'
import { AddUserVariables } from 'src/graphql/query/users/types/AddUser'
import { useAuthObj } from '../auth/AuthContext'

type UserKeys = keyof UserType | keyof AddUserVariables
type UserSchema = Record<UserKeys, any>

const yupRequiredStr = yup.string().required()

export const getFiledName = (name: UserKeys) => name

export const userSchema = yup.object().shape({
  email: yupRequiredStr.email(),
  organisationId: yupRequiredStr,
  fullName: yupRequiredStr,
  userRole: yupRequiredStr,
  registryLink: yupRequiredStr.url(),
  phoneNumber: yup.number(),
  documentId: yup.number(),
  password: yup.number().min(8)
} as unknown as UserSchema)

export type UserProps = {
  user: UserType
}

export const withLoadUser = (Component: React.ComponentType<UserProps>) => {
  return (userId: number) => {
    const { data, loading, error } = useGetUsersById(userId)

    console.log('DAuseGetUserByIdTA', data)
  
    if (error) return null
  
    if (loading) return <Loading />
  
    const user = data?.az_users_Users.pop()

    if (!user) return <NotFoundPage />

    return <Component user={user} />
  }
}

export const withLoadUserFormUrl = (Component: React.ComponentType<UserProps>) => {
  return () => {
    const { query: { userId }} = useRouter()

    return withLoadUser(Component)(parseInt(userId as string))
  }
}

export const withLoadMyUser = (Component: React.ComponentType<UserProps>) => {
  return () => {
    const { userId } = useAuthObj()

    return withLoadUser(Component)(userId)
  }
}