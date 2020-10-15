/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export type CreateUserInput = {
  id: string;
  email?: string | null;
  name?: string | null;
  hourlyRate?: number | null;
  currency?: string | null;
  firstLogin?: boolean | null;
  signupDate?: number | null;
  longestPooTime?: number | null;
  shortestPooTime?: number | null;
  numberOfPoos?: number | null;
  totalPooTime?: number | null;
  lastPooDate?: number | null;
  pooStreak?: number | null;
};

export type UpdateUserInput = {
  id: string;
  email?: string | null;
  firstLogin?: boolean | null;
  name?: string | null;
  signupDate?: number | null;
  hourlyRate?: number | null;
  currency?: string | null;
  longestPooTime?: number | null;
  shortestPooTime?: number | null;
  numberOfPoos?: number | null;
  totalPooTime?: number | null;
  lastPooDate?: number | null;
  pooStreak?: number | null;
};

export type DeleteUserInput = {
  id: string;
};

export type TableUserFilterInput = {
  id?: TableStringFilterInput | null;
  email?: TableStringFilterInput | null;
  name?: TableStringFilterInput | null;
};

export type TableStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  firstLogin: boolean | null;
  name: string | null;
  signupDate: number | null;
  hourlyRate: number | null;
  currency: string | null;
  longestPooTime: number | null;
  shortestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
  lastPooDate: number | null;
  pooStreak: number | null;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  firstLogin: boolean | null;
  name: string | null;
  signupDate: number | null;
  hourlyRate: number | null;
  currency: string | null;
  longestPooTime: number | null;
  shortestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
  lastPooDate: number | null;
  pooStreak: number | null;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  firstLogin: boolean | null;
  name: string | null;
  signupDate: number | null;
  hourlyRate: number | null;
  currency: string | null;
  longestPooTime: number | null;
  shortestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
  lastPooDate: number | null;
  pooStreak: number | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  email: string;
  firstLogin: boolean | null;
  name: string | null;
  signupDate: number | null;
  hourlyRate: number | null;
  currency: string | null;
  longestPooTime: number | null;
  shortestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
  lastPooDate: number | null;
  pooStreak: number | null;
};

export type ListUsersQuery = {
  __typename: "UserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    email: string;
    firstLogin: boolean | null;
    name: string | null;
    signupDate: number | null;
    hourlyRate: number | null;
    currency: string | null;
    longestPooTime: number | null;
    shortestPooTime: number | null;
    numberOfPoos: number | null;
    totalPooTime: number | null;
    lastPooDate: number | null;
    pooStreak: number | null;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  email: string;
  firstLogin: boolean | null;
  name: string | null;
  signupDate: number | null;
  hourlyRate: number | null;
  currency: string | null;
  longestPooTime: number | null;
  shortestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
  lastPooDate: number | null;
  pooStreak: number | null;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  email: string;
  firstLogin: boolean | null;
  name: string | null;
  signupDate: number | null;
  hourlyRate: number | null;
  currency: string | null;
  longestPooTime: number | null;
  shortestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
  lastPooDate: number | null;
  pooStreak: number | null;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  email: string;
  firstLogin: boolean | null;
  name: string | null;
  signupDate: number | null;
  hourlyRate: number | null;
  currency: string | null;
  longestPooTime: number | null;
  shortestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
  lastPooDate: number | null;
  pooStreak: number | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateUser(input: CreateUserInput): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          __typename
          id
          email
          firstLogin
          name
          signupDate
          hourlyRate
          currency
          longestPooTime
          shortestPooTime
          numberOfPoos
          totalPooTime
          lastPooDate
          pooStreak
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(input: UpdateUserInput): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
          __typename
          id
          email
          firstLogin
          name
          signupDate
          hourlyRate
          currency
          longestPooTime
          shortestPooTime
          numberOfPoos
          totalPooTime
          lastPooDate
          pooStreak
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(input: DeleteUserInput): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!) {
        deleteUser(input: $input) {
          __typename
          id
          email
          firstLogin
          name
          signupDate
          hourlyRate
          currency
          longestPooTime
          shortestPooTime
          numberOfPoos
          totalPooTime
          lastPooDate
          pooStreak
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: String!) {
        getUser(id: $id) {
          __typename
          id
          email
          firstLogin
          name
          signupDate
          hourlyRate
          currency
          longestPooTime
          shortestPooTime
          numberOfPoos
          totalPooTime
          lastPooDate
          pooStreak
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    filter?: TableUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: TableUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            email
            firstLogin
            name
            signupDate
            hourlyRate
            currency
            longestPooTime
            shortestPooTime
            numberOfPoos
            totalPooTime
            lastPooDate
            pooStreak
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  OnCreateUserListener: Observable<OnCreateUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser($id: String, $email: String, $name: String) {
        onCreateUser(id: $id, email: $email, name: $name) {
          __typename
          id
          email
          firstLogin
          name
          signupDate
          hourlyRate
          currency
          longestPooTime
          shortestPooTime
          numberOfPoos
          totalPooTime
          lastPooDate
          pooStreak
        }
      }`
    )
  ) as Observable<OnCreateUserSubscription>;

  OnUpdateUserListener: Observable<OnUpdateUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser($id: String, $email: String, $name: String) {
        onUpdateUser(id: $id, email: $email, name: $name) {
          __typename
          id
          email
          firstLogin
          name
          signupDate
          hourlyRate
          currency
          longestPooTime
          shortestPooTime
          numberOfPoos
          totalPooTime
          lastPooDate
          pooStreak
        }
      }`
    )
  ) as Observable<OnUpdateUserSubscription>;

  OnDeleteUserListener: Observable<OnDeleteUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser($id: String, $email: String, $name: String) {
        onDeleteUser(id: $id, email: $email, name: $name) {
          __typename
          id
          email
          firstLogin
          name
          signupDate
          hourlyRate
          currency
          longestPooTime
          shortestPooTime
          numberOfPoos
          totalPooTime
          lastPooDate
          pooStreak
        }
      }`
    )
  ) as Observable<OnDeleteUserSubscription>;
}
