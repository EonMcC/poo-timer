/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export type CreatePooTimerInput = {
  title?: string | null;
};

export type UpdatePooTimerInput = {
  id: string;
  title?: string | null;
};

export type DeletePooTimerInput = {
  id: string;
};

export type TablePooTimerFilterInput = {
  id?: TableIDFilterInput | null;
  title?: TableStringFilterInput | null;
};

export type TableIDFilterInput = {
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

export type CreatePooTimerMutation = {
  __typename: "PooTimer";
  id: string;
  title: string;
  reason: string | null;
};

export type UpdatePooTimerMutation = {
  __typename: "PooTimer";
  id: string;
  title: string | null;
};

export type DeletePooTimerMutation = {
  __typename: "PooTimer";
  id: string;
  title: string | null;
};

export type GetPooTimerQuery = {
  __typename: "PooTimer";
  id: string;
  title: string | null;
};

export type ListPooTimersQuery = {
  __typename: "PooTimerConnection";
  items: Array<{
    __typename: "PooTimer";
    id: string;
    title: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreatePooTimerSubscription = {
  __typename: "PooTimer";
  id: string;
  title: string | null;
};

export type OnUpdatePooTimerSubscription = {
  __typename: "PooTimer";
  id: string;
  title: string | null;
};

export type OnDeletePooTimerSubscription = {
  __typename: "PooTimer";
  id: string;
  title: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreatePooTimer(
    input: CreatePooTimerInput
  ): Promise<CreatePooTimerMutation> {
    const statement = `mutation CreatePooTimer($input: CreatePooTimerInput!) {
        createPooTimer(input: $input) {
          __typename
          id
          title
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePooTimerMutation>response.data.createPooTimer;
  }
  async UpdatePooTimer(
    input: UpdatePooTimerInput
  ): Promise<UpdatePooTimerMutation> {
    const statement = `mutation UpdatePooTimer($input: UpdatePooTimerInput!) {
        updatePooTimer(input: $input) {
          __typename
          id
          title
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePooTimerMutation>response.data.updatePooTimer;
  }
  async DeletePooTimer(
    input: DeletePooTimerInput
  ): Promise<DeletePooTimerMutation> {
    const statement = `mutation DeletePooTimer($input: DeletePooTimerInput!) {
        deletePooTimer(input: $input) {
          __typename
          id
          title
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePooTimerMutation>response.data.deletePooTimer;
  }
  async GetPooTimer(id: string): Promise<GetPooTimerQuery> {
    const statement = `query GetPooTimer($id: ID!) {
        getPooTimer(id: $id) {
          __typename
          id
          title
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPooTimerQuery>response.data.getPooTimer;
  }
  async ListPooTimers(
    filter?: TablePooTimerFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPooTimersQuery> {
    const statement = `query ListPooTimers($filter: TablePooTimerFilterInput, $limit: Int, $nextToken: String) {
        listPooTimers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            title
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
    return <ListPooTimersQuery>response.data.listPooTimers;
  }
  OnCreatePooTimerListener: Observable<
    OnCreatePooTimerSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePooTimer($id: ID, $title: String) {
        onCreatePooTimer(id: $id, title: $title) {
          __typename
          id
          title
        }
      }`
    )
  ) as Observable<OnCreatePooTimerSubscription>;

  OnUpdatePooTimerListener: Observable<
    OnUpdatePooTimerSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePooTimer($id: ID, $title: String) {
        onUpdatePooTimer(id: $id, title: $title) {
          __typename
          id
          title
        }
      }`
    )
  ) as Observable<OnUpdatePooTimerSubscription>;

  OnDeletePooTimerListener: Observable<
    OnDeletePooTimerSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePooTimer($id: ID, $title: String) {
        onDeletePooTimer(id: $id, title: $title) {
          __typename
          id
          title
        }
      }`
    )
  ) as Observable<OnDeletePooTimerSubscription>;
}
