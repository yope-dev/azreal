/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddOrganization
// ====================================================

export interface AddOrganization_insert_az_users_Organisation_returning {
  __typename: "az_users_Organisation";
  organisationId: number;
}

export interface AddOrganization_insert_az_users_Organisation {
  __typename: "az_users_Organisation_mutation_response";
  returning: AddOrganization_insert_az_users_Organisation_returning[];
}

export interface AddOrganization {
  insert_az_users_Organisation: AddOrganization_insert_az_users_Organisation | null;
}

export interface AddOrganizationVariables {
  fullName?: string | null;
  organisationRole?: string | null;
  registryLink?: string | null;
  rntrc?: any | null;
  shortName?: string | null;
}
