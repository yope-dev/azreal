import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { UpsertOrganization, UpsertOrganizationVariables } from './types/UpsertOrganization'

const UPSERT_ORGANIZATION = gql`
  mutation UpsertOrganization($country: String, $documentId: Int, $fullName: String, $organisationRole: String, $registryLink: String, $rntrc: bpchar, $shortName: String, $organisationId: Int) {
    insert_az_users_Organisation_one(object: {shortName: $shortName, rntrc: $rntrc, registryLink: $registryLink, organisationRole: $organisationRole, fullName: $fullName, country: $country, documentId: $documentId, organisationId: $organisationId}, on_conflict: {constraint: Organisation_pkey, update_columns: [country, fullName, shortName, registryLink, organisationRole, rntrc, documentId]}) {
      organisationId
    }
  }
`

const ADD_ORGANIZATION = gql`
  mutation AddOrganization($country: String, $documentId: Int, $fullName: String, $organisationRole: String, $registryLink: String, $rntrc: bpchar, $shortName: String) {
    insert_az_users_Organisation_one(object: {shortName: $shortName, rntrc: $rntrc, registryLink: $registryLink, organisationRole: $organisationRole, fullName: $fullName, country: $country, documentId: $documentId}, on_conflict: {constraint: Organisation_pkey, update_columns: [country, fullName, shortName, registryLink, organisationRole, rntrc, documentId]}) {
      organisationId
    }
  }
`

export const useUpsetOrganization = (id?: number) => useMutation<UpsertOrganization, UpsertOrganizationVariables>(id ? UPSERT_ORGANIZATION : ADD_ORGANIZATION, { variables: { organisationId: id }})