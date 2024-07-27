/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getExpensesByFilter = /* GraphQL */ `query GetExpensesByFilter($userId: ID!, $filter: String!) {
  getExpensesByFilter(userId: $userId, filter: $filter) {
    key
    value
  }
}
` as GeneratedQuery<
  APITypes.GetExpensesByFilterQueryVariables,
  APITypes.GetExpensesByFilterQuery
>;
export const getExpensesByUser = /* GraphQL */ `query GetExpensesByUser($userId: ID!, $startDate: String!) {
  getExpensesByUser(userId: $userId, startDate: $startDate) {
    id
    userId
    vendor
    amount
    category
    currency
    tax
    items {
      item
      price
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetExpensesByUserQueryVariables,
  APITypes.GetExpensesByUserQuery
>;
export const getTotalExpenses = /* GraphQL */ `query GetTotalExpenses($userId: ID!, $filter: String!) {
  getTotalExpenses(userId: $userId, filter: $filter)
}
` as GeneratedQuery<
  APITypes.GetTotalExpensesQueryVariables,
  APITypes.GetTotalExpensesQuery
>;
export const getExpense = /* GraphQL */ `query GetExpense($id: ID!) {
  getExpense(id: $id) {
    id
    userId
    vendor
    amount
    category
    currency
    tax
    items {
      item
      price
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetExpenseQueryVariables,
  APITypes.GetExpenseQuery
>;
export const listExpenses = /* GraphQL */ `query ListExpenses(
  $filter: ModelExpenseFilterInput
  $limit: Int
  $nextToken: String
) {
  listExpenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      vendor
      amount
      category
      currency
      tax
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListExpensesQueryVariables,
  APITypes.ListExpensesQuery
>;
