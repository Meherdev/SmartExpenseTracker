/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateExpense = /* GraphQL */ `subscription OnCreateExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onCreateExpense(filter: $filter) {
    id
    userId
    vendor
    amount
    currency
    tax
    items {
      item
      price
      __typename
    }
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateExpenseSubscriptionVariables,
  APITypes.OnCreateExpenseSubscription
>;
export const onUpdateExpense = /* GraphQL */ `subscription OnUpdateExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onUpdateExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateExpenseSubscriptionVariables,
  APITypes.OnUpdateExpenseSubscription
>;
export const onDeleteExpense = /* GraphQL */ `subscription OnDeleteExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onDeleteExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteExpenseSubscriptionVariables,
  APITypes.OnDeleteExpenseSubscription
>;
