/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export type CreateUserInput = {
  email: string;
  name?: string | null;
};

export type UpdateUserInput = {
  id: string;
  email?: string | null;
  name?: string | null;
  signupDate?: number | null;
  firstPooDate?: number | null;
  hourlyRate?: number | null;
  totalPaid?: number | null;
  currency?: string | null;
  longestPooTime?: number | null;
  numberOfPoos?: number | null;
  totalPooTime?: number | null;
};

export type DeleteUserInput = {
  id: string;
};

export type CreatePooInput = {
  pooId: string;
  userId: string;
  duration?: number | null;
  createdAt?: number | null;
};

export type UpdatePooInput = {
  pooId: string;
  userId: string;
  duration?: number | null;
  createdAt?: number | null;
};

export type DeletePooInput = {
  pooId: string;
  userId: string;
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

export type TablePooFilterInput = {
  pooId?: TableStringFilterInput | null;
  userId?: TableStringFilterInput | null;
  duration?: TableFloatFilterInput | null;
  createdAt?: TableFloatFilterInput | null;
};

export type TableFloatFilterInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  contains?: number | null;
  notContains?: number | null;
  between?: Array<number | null> | null;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  name: string | null;
  signupDate: number | null;
  firstPooDate: number | null;
  hourlyRate: number | null;
  totalPaid: number | null;
  currency: string | null;
  longestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  name: string | null;
  signupDate: number | null;
  firstPooDate: number | null;
  hourlyRate: number | null;
  totalPaid: number | null;
  currency: string | null;
  longestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  name: string | null;
  signupDate: number | null;
  firstPooDate: number | null;
  hourlyRate: number | null;
  totalPaid: number | null;
  currency: string | null;
  longestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
};

export type CreatePooMutation = {
  __typename: "Poo";
  pooId: string;
  userId: string;
  duration: number | null;
  createdAt: number | null;
};

export type UpdatePooMutation = {
  __typename: "Poo";
  pooId: string;
  userId: string;
  duration: number | null;
  createdAt: number | null;
};

export type DeletePooMutation = {
  __typename: "Poo";
  pooId: string;
  userId: string;
  duration: number | null;
  createdAt: number | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  email: string;
  name: string | null;
  signupDate: number | null;
  firstPooDate: number | null;
  hourlyRate: number | null;
  totalPaid: number | null;
  currency: string | null;
  longestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
};

export type ListUsersQuery = {
  __typename: "UserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    email: string;
    name: string | null;
    signupDate: number | null;
    firstPooDate: number | null;
    hourlyRate: number | null;
    totalPaid: number | null;
    currency: string | null;
    longestPooTime: number | null;
    numberOfPoos: number | null;
    totalPooTime: number | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetPooQuery = {
  __typename: "Poo";
  pooId: string;
  userId: string;
  duration: number | null;
  createdAt: number | null;
};

export type ListPoosQuery = {
  __typename: "PooConnection";
  items: Array<{
    __typename: "Poo";
    pooId: string;
    userId: string;
    duration: number | null;
    createdAt: number | null;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  email: string;
  name: string | null;
  signupDate: number | null;
  firstPooDate: number | null;
  hourlyRate: number | null;
  totalPaid: number | null;
  currency: string | null;
  longestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  email: string;
  name: string | null;
  signupDate: number | null;
  firstPooDate: number | null;
  hourlyRate: number | null;
  totalPaid: number | null;
  currency: string | null;
  longestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  email: string;
  name: string | null;
  signupDate: number | null;
  firstPooDate: number | null;
  hourlyRate: number | null;
  totalPaid: number | null;
  currency: string | null;
  longestPooTime: number | null;
  numberOfPoos: number | null;
  totalPooTime: number | null;
};

export type OnCreatePooSubscription = {
  __typename: "Poo";
  pooId: string;
  userId: string;
  duration: number | null;
  createdAt: number | null;
};

export type OnUpdatePooSubscription = {
  __typename: "Poo";
  pooId: string;
  userId: string;
  duration: number | null;
  createdAt: number | null;
};

export type OnDeletePooSubscription = {
  __typename: "Poo";
  pooId: string;
  userId: string;
  duration: number | null;
  createdAt: number | null;
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
          name
          signupDate
          firstPooDate
          hourlyRate
          totalPaid
          currency
          longestPooTime
          numberOfPoos
          totalPooTime
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
          name
          signupDate
          firstPooDate
          hourlyRate
          totalPaid
          currency
          longestPooTime
          numberOfPoos
          totalPooTime
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
          name
          signupDate
          firstPooDate
          hourlyRate
          totalPaid
          currency
          longestPooTime
          numberOfPoos
          totalPooTime
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
  async CreatePoo(input: CreatePooInput): Promise<CreatePooMutation> {
    const statement = `mutation CreatePoo($input: CreatePooInput!) {
        createPoo(input: $input) {
          __typename
          pooId
          userId
          duration
          createdAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePooMutation>response.data.createPoo;
  }
  async UpdatePoo(input: UpdatePooInput): Promise<UpdatePooMutation> {
    const statement = `mutation UpdatePoo($input: UpdatePooInput!) {
        updatePoo(input: $input) {
          __typename
          pooId
          userId
          duration
          createdAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePooMutation>response.data.updatePoo;
  }
  async DeletePoo(input: DeletePooInput): Promise<DeletePooMutation> {
    const statement = `mutation DeletePoo($input: DeletePooInput!) {
        deletePoo(input: $input) {
          __typename
          pooId
          userId
          duration
          createdAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePooMutation>response.data.deletePoo;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: String!) {
        getUser(id: $id) {
          __typename
          id
          email
          name
          signupDate
          firstPooDate
          hourlyRate
          totalPaid
          currency
          longestPooTime
          numberOfPoos
          totalPooTime
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
            name
            signupDate
            firstPooDate
            hourlyRate
            totalPaid
            currency
            longestPooTime
            numberOfPoos
            totalPooTime
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
  async GetPoo(userId: string, pooId: string): Promise<GetPooQuery> {
    const statement = `query GetPoo($userId: String!, $pooId: String!) {
        getPoo(userId: $userId, pooId: $pooId) {
          __typename
          pooId
          userId
          duration
          createdAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId,
      pooId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPooQuery>response.data.getPoo;
  }
  async ListPoos(
    filter?: TablePooFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPoosQuery> {
    const statement = `query ListPoos($filter: TablePooFilterInput, $limit: Int, $nextToken: String) {
        listPoos(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            pooId
            userId
            duration
            createdAt
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
    return <ListPoosQuery>response.data.listPoos;
  }
  OnCreateUserListener: Observable<OnCreateUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser($id: String, $email: String, $name: String) {
        onCreateUser(id: $id, email: $email, name: $name) {
          __typename
          id
          email
          name
          signupDate
          firstPooDate
          hourlyRate
          totalPaid
          currency
          longestPooTime
          numberOfPoos
          totalPooTime
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
          name
          signupDate
          firstPooDate
          hourlyRate
          totalPaid
          currency
          longestPooTime
          numberOfPoos
          totalPooTime
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
          name
          signupDate
          firstPooDate
          hourlyRate
          totalPaid
          currency
          longestPooTime
          numberOfPoos
          totalPooTime
        }
      }`
    )
  ) as Observable<OnDeleteUserSubscription>;

  OnCreatePooListener: Observable<OnCreatePooSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreatePoo($pooId: String, $userId: String, $duration: Float, $createdAt: Float) {
        onCreatePoo(pooId: $pooId, userId: $userId, duration: $duration, createdAt: $createdAt) {
          __typename
          pooId
          userId
          duration
          createdAt
        }
      }`
    )
  ) as Observable<OnCreatePooSubscription>;

  OnUpdatePooListener: Observable<OnUpdatePooSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePoo($pooId: String, $userId: String, $duration: Float, $createdAt: Float) {
        onUpdatePoo(pooId: $pooId, userId: $userId, duration: $duration, createdAt: $createdAt) {
          __typename
          pooId
          userId
          duration
          createdAt
        }
      }`
    )
  ) as Observable<OnUpdatePooSubscription>;

  OnDeletePooListener: Observable<OnDeletePooSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeletePoo($pooId: String, $userId: String, $duration: Float, $createdAt: Float) {
        onDeletePoo(pooId: $pooId, userId: $userId, duration: $duration, createdAt: $createdAt) {
          __typename
          pooId
          userId
          duration
          createdAt
        }
      }`
    )
  ) as Observable<OnDeletePooSubscription>;
}
