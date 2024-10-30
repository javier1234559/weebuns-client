import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** Authentication providers */
export enum AuthProvider {
  Facebook = 'facebook',
  Google = 'google',
  Local = 'local'
}

export type Correction = {
  __typename?: 'Correction';
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  creator?: Maybe<User>;
  essay?: Maybe<Essay>;
  essay_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  overall_comment?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  replies?: Maybe<Array<CorrectionReply>>;
  sentences?: Maybe<Array<CorrectionSentence>>;
  updated_at: Scalars['DateTime']['output'];
};

export type CorrectionReply = {
  __typename?: 'CorrectionReply';
  comment: Scalars['String']['output'];
  correction_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  creator?: Maybe<User>;
  id: Scalars['ID']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type CorrectionResponseAllDto = {
  __typename?: 'CorrectionResponseAllDto';
  data: Array<CorrectionResponseOneDto>;
  pagination: PaginationOutputDto;
};

export type CorrectionResponseOneDto = {
  __typename?: 'CorrectionResponseOneDto';
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  creator: User;
  essay_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  overall_comment?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  sentences?: Maybe<Array<CorrectionSentence>>;
  updated_at: Scalars['DateTime']['output'];
};

export type CorrectionSentence = {
  __typename?: 'CorrectionSentence';
  corrected_text: Scalars['String']['output'];
  correction?: Maybe<Correction>;
  created_at: Scalars['DateTime']['output'];
  explanation: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  id_correction: Scalars['String']['output'];
  index: Scalars['Float']['output'];
  is_correct: Scalars['Boolean']['output'];
  original_text: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type CreateCorrectionDto = {
  essay_id: Scalars['String']['input'];
  overall_comment?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  sentences: Array<CreateCorrectionSentenceDto>;
};

export type CreateCorrectionSentenceDto = {
  corrected_text: Scalars['String']['input'];
  explanation: Scalars['String']['input'];
  index: Scalars['Float']['input'];
  is_correct: Scalars['Boolean']['input'];
  original_text: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
};

export type CreateUserDto = {
  auth_provider?: InputMaybe<AuthProvider>;
  email: Scalars['String']['input'];
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  profile_picture?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  username: Scalars['String']['input'];
};

export type Essay = {
  __typename?: 'Essay';
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  corrections?: Maybe<Array<Correction>>;
  cover_url?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  hashtags?: Maybe<Array<EssayHashtag>>;
  id: Scalars['ID']['output'];
  id_space: Scalars['String']['output'];
  language: Scalars['String']['output'];
  space?: Maybe<Space>;
  status: EssayStatus;
  summary?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  upvote_count: Scalars['Float']['output'];
};

/** Association between essays and hashtags */
export type EssayHashtag = {
  __typename?: 'EssayHashtag';
  /** Timestamp when the association was created */
  created_at: Scalars['DateTime']['output'];
  /** The associated essay details. Only populated when explicitly requested. */
  essay?: Maybe<Essay>;
  /** ID of the associated essay */
  essay_id: Scalars['ID']['output'];
  /** The associated hashtag details. Only populated when explicitly requested. */
  hashtag?: Maybe<Hashtag>;
  /** ID of the associated hashtag */
  hashtag_id: Scalars['ID']['output'];
  /** Unique identifier for the essay-hashtag association */
  id: Scalars['ID']['output'];
};

/** The status of an essay */
export enum EssayStatus {
  Deleted = 'deleted',
  Draft = 'draft',
  Private = 'private',
  Public = 'public'
}

export type FindAllUsersDto = {
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Follower = {
  __typename?: 'Follower';
  followed_at: Scalars['DateTime']['output'];
  follower?: Maybe<User>;
  following?: Maybe<User>;
  id: Scalars['ID']['output'];
  id_follower: Scalars['String']['output'];
  id_following: Scalars['String']['output'];
};

export type GetCorrectionsByEssayDto = {
  essayId: Scalars['String']['input'];
  page?: Scalars['Int']['input'];
  perPage?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type GetUserSpacesDto = {
  page?: InputMaybe<Scalars['Float']['input']>;
  perPage?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type Hashtag = {
  __typename?: 'Hashtag';
  created_at: Scalars['DateTime']['output'];
  essays?: Maybe<Array<EssayHashtag>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  usage_count: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCorrectionEssay: CorrectionResponseOneDto;
  createUser: User;
  removeUser: User;
  updateCorrectionEssay: CorrectionResponseOneDto;
  updateUser: User;
};


export type MutationCreateCorrectionEssayArgs = {
  input: CreateCorrectionDto;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCorrectionEssayArgs = {
  input: UpdateCorrectionDto;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserDto;
};

export type PaginationOutputDto = {
  __typename?: 'PaginationOutputDto';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  itemsPerPage: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCorrectionIfExist?: Maybe<CorrectionResponseOneDto>;
  getCorrectionsByEssay: CorrectionResponseAllDto;
  getUserSpaces: SpacesResponse;
  user: User;
  users: UsersResponse;
};


export type QueryGetCorrectionIfExistArgs = {
  essayId: Scalars['String']['input'];
};


export type QueryGetCorrectionsByEssayArgs = {
  input: GetCorrectionsByEssayDto;
};


export type QueryGetUserSpacesArgs = {
  input: GetUserSpacesDto;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  findAllUsersDto: FindAllUsersDto;
};

export type Space = {
  __typename?: 'Space';
  _count?: Maybe<SpaceCount>;
  created_at: Scalars['DateTime']['output'];
  created_by: User;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type SpaceCount = {
  __typename?: 'SpaceCount';
  essays: Scalars['Int']['output'];
  quizzes: Scalars['Int']['output'];
  vocabularies: Scalars['Int']['output'];
};

export type SpacesResponse = {
  __typename?: 'SpacesResponse';
  data: Array<Space>;
  pagination: PaginationOutputDto;
};

export type UpdateCorrectionDto = {
  id: Scalars['String']['input'];
  overall_comment?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  sentences: Array<UpdateCorrectionSentenceDto>;
};

export type UpdateCorrectionSentenceDto = {
  corrected_text: Scalars['String']['input'];
  explanation: Scalars['String']['input'];
  index: Scalars['Float']['input'];
  is_correct: Scalars['Boolean']['input'];
  original_text: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
};

export type UpdateUserDto = {
  id?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  auth_provider: AuthProvider;
  auth_provider_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  essays?: Maybe<Array<Essay>>;
  first_name?: Maybe<Scalars['String']['output']>;
  followedBy?: Maybe<Array<Follower>>;
  following?: Maybe<Array<Follower>>;
  id: Scalars['ID']['output'];
  is_email_verified: Scalars['Boolean']['output'];
  languages?: Maybe<Array<UserLanguage>>;
  last_login?: Maybe<Scalars['DateTime']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  profile_picture?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  spaces?: Maybe<Array<Space>>;
  updated_at: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type UserLanguage = {
  __typename?: 'UserLanguage';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  is_native: Scalars['Boolean']['output'];
  language: Scalars['String']['output'];
  proficiency_level: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  user_id: Scalars['String']['output'];
};

/** User roles in the system */
export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

export type UsersResponse = {
  __typename?: 'UsersResponse';
  data: Array<User>;
  pagination: PaginationOutputDto;
};

export type CreateCorrectionEssayMutationVariables = Exact<{
  input: CreateCorrectionDto;
}>;


export type CreateCorrectionEssayMutation = { __typename?: 'Mutation', createCorrectionEssay: { __typename?: 'CorrectionResponseOneDto', id: string, essay_id: string, created_by: string, created_at: any, overall_comment?: string | null, rating?: number | null, updated_at: any, sentences?: Array<{ __typename?: 'CorrectionSentence', id: string, id_correction: string, original_text: string, corrected_text: string, explanation: string, is_correct: boolean, rating: number, updated_at: any, created_at: any }> | null, creator: { __typename?: 'User', id: string, username?: string | null, email: string, role: UserRole, auth_provider: AuthProvider, auth_provider_id?: string | null, first_name?: string | null, last_name?: string | null, profile_picture?: string | null, is_email_verified: boolean, last_login?: any | null, created_at: any, updated_at: any } } };

export type UpdateCorrectionEssayMutationVariables = Exact<{
  input: UpdateCorrectionDto;
}>;


export type UpdateCorrectionEssayMutation = { __typename?: 'Mutation', updateCorrectionEssay: { __typename?: 'CorrectionResponseOneDto', id: string, essay_id: string, created_by: string, overall_comment?: string | null, rating?: number | null, created_at: any, updated_at: any, creator: { __typename?: 'User', id: string, username?: string | null, email: string, role: UserRole, auth_provider: AuthProvider, auth_provider_id?: string | null, first_name?: string | null, last_name?: string | null, profile_picture?: string | null, is_email_verified: boolean, last_login?: any | null, created_at: any, updated_at: any }, sentences?: Array<{ __typename?: 'CorrectionSentence', id: string, id_correction: string, index: number, original_text: string, corrected_text: string, explanation: string, is_correct: boolean, rating: number, created_at: any, updated_at: any }> | null } };

export type GetCorrectionsByEssayQueryVariables = Exact<{
  input: GetCorrectionsByEssayDto;
}>;


export type GetCorrectionsByEssayQuery = { __typename?: 'Query', getCorrectionsByEssay: { __typename?: 'CorrectionResponseAllDto', data: Array<{ __typename?: 'CorrectionResponseOneDto', id: string, essay_id: string, created_by: string, overall_comment?: string | null, rating?: number | null, created_at: any, updated_at: any, creator: { __typename?: 'User', id: string, username?: string | null, email: string, password_hash?: string | null, role: UserRole, auth_provider: AuthProvider, auth_provider_id?: string | null, first_name?: string | null, last_name?: string | null, profile_picture?: string | null, is_email_verified: boolean, last_login?: any | null, created_at: any, updated_at: any }, sentences?: Array<{ __typename?: 'CorrectionSentence', id: string, id_correction: string, index: number, original_text: string, corrected_text: string, explanation: string, is_correct: boolean, rating: number, created_at: any, updated_at: any }> | null }>, pagination: { __typename?: 'PaginationOutputDto', totalItems: number, currentPage: number, totalPages: number, itemsPerPage: number, hasNextPage: boolean, hasPreviousPage: boolean } } };

export type GetCorrectionIfExistQueryVariables = Exact<{
  essayId: Scalars['String']['input'];
}>;


export type GetCorrectionIfExistQuery = { __typename?: 'Query', getCorrectionIfExist?: { __typename?: 'CorrectionResponseOneDto', essay_id: string, created_by: string, overall_comment?: string | null, rating?: number | null, created_at: any, updated_at: any, id: string } | null };

export type GetSpacesByUserSelectQueryVariables = Exact<{
  input: GetUserSpacesDto;
}>;


export type GetSpacesByUserSelectQuery = { __typename?: 'Query', getUserSpaces: { __typename?: 'SpacesResponse', data: Array<{ __typename?: 'Space', id: string, name: string, description?: string | null }> } };

export type GetSpacesByUserQueryVariables = Exact<{
  input: GetUserSpacesDto;
}>;


export type GetSpacesByUserQuery = { __typename?: 'Query', getUserSpaces: { __typename?: 'SpacesResponse', data: Array<{ __typename?: 'Space', id: string, name: string, description?: string | null, created_at: any, updated_at: any, _count?: { __typename?: 'SpaceCount', essays: number, quizzes: number, vocabularies: number } | null }>, pagination: { __typename?: 'PaginationOutputDto', totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean } } };


export const CreateCorrectionEssayDocument = gql`
    mutation CreateCorrectionEssay($input: CreateCorrectionDto!) {
  createCorrectionEssay(input: $input) {
    id
    essay_id
    created_by
    created_at
    overall_comment
    rating
    updated_at
    sentences {
      id
      id_correction
      original_text
      corrected_text
      explanation
      is_correct
      rating
      updated_at
      created_at
    }
    creator {
      id
      username
      email
      role
      auth_provider
      auth_provider_id
      first_name
      last_name
      profile_picture
      is_email_verified
      last_login
      created_at
      updated_at
    }
  }
}
    `;
export type CreateCorrectionEssayMutationFn = Apollo.MutationFunction<CreateCorrectionEssayMutation, CreateCorrectionEssayMutationVariables>;

/**
 * __useCreateCorrectionEssayMutation__
 *
 * To run a mutation, you first call `useCreateCorrectionEssayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCorrectionEssayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCorrectionEssayMutation, { data, loading, error }] = useCreateCorrectionEssayMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCorrectionEssayMutation(baseOptions?: Apollo.MutationHookOptions<CreateCorrectionEssayMutation, CreateCorrectionEssayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCorrectionEssayMutation, CreateCorrectionEssayMutationVariables>(CreateCorrectionEssayDocument, options);
      }
export type CreateCorrectionEssayMutationHookResult = ReturnType<typeof useCreateCorrectionEssayMutation>;
export type CreateCorrectionEssayMutationResult = Apollo.MutationResult<CreateCorrectionEssayMutation>;
export type CreateCorrectionEssayMutationOptions = Apollo.BaseMutationOptions<CreateCorrectionEssayMutation, CreateCorrectionEssayMutationVariables>;
export const UpdateCorrectionEssayDocument = gql`
    mutation UpdateCorrectionEssay($input: UpdateCorrectionDto!) {
  updateCorrectionEssay(input: $input) {
    id
    essay_id
    created_by
    overall_comment
    rating
    created_at
    updated_at
    creator {
      id
      username
      email
      role
      auth_provider
      auth_provider_id
      first_name
      last_name
      profile_picture
      is_email_verified
      last_login
      created_at
      updated_at
    }
    sentences {
      id
      id_correction
      index
      original_text
      corrected_text
      explanation
      is_correct
      rating
      created_at
      updated_at
    }
  }
}
    `;
export type UpdateCorrectionEssayMutationFn = Apollo.MutationFunction<UpdateCorrectionEssayMutation, UpdateCorrectionEssayMutationVariables>;

/**
 * __useUpdateCorrectionEssayMutation__
 *
 * To run a mutation, you first call `useUpdateCorrectionEssayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCorrectionEssayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCorrectionEssayMutation, { data, loading, error }] = useUpdateCorrectionEssayMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCorrectionEssayMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCorrectionEssayMutation, UpdateCorrectionEssayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCorrectionEssayMutation, UpdateCorrectionEssayMutationVariables>(UpdateCorrectionEssayDocument, options);
      }
export type UpdateCorrectionEssayMutationHookResult = ReturnType<typeof useUpdateCorrectionEssayMutation>;
export type UpdateCorrectionEssayMutationResult = Apollo.MutationResult<UpdateCorrectionEssayMutation>;
export type UpdateCorrectionEssayMutationOptions = Apollo.BaseMutationOptions<UpdateCorrectionEssayMutation, UpdateCorrectionEssayMutationVariables>;
export const GetCorrectionsByEssayDocument = gql`
    query GetCorrectionsByEssay($input: GetCorrectionsByEssayDto!) {
  getCorrectionsByEssay(input: $input) {
    data {
      id
      essay_id
      created_by
      overall_comment
      rating
      created_at
      updated_at
      creator {
        id
        username
        email
        password_hash
        role
        auth_provider
        auth_provider_id
        first_name
        last_name
        profile_picture
        is_email_verified
        last_login
        created_at
        updated_at
      }
      sentences {
        id
        id_correction
        index
        original_text
        corrected_text
        explanation
        is_correct
        rating
        created_at
        updated_at
      }
    }
    pagination {
      totalItems
      currentPage
      totalPages
      itemsPerPage
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useGetCorrectionsByEssayQuery__
 *
 * To run a query within a React component, call `useGetCorrectionsByEssayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCorrectionsByEssayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCorrectionsByEssayQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCorrectionsByEssayQuery(baseOptions: Apollo.QueryHookOptions<GetCorrectionsByEssayQuery, GetCorrectionsByEssayQueryVariables> & ({ variables: GetCorrectionsByEssayQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCorrectionsByEssayQuery, GetCorrectionsByEssayQueryVariables>(GetCorrectionsByEssayDocument, options);
      }
export function useGetCorrectionsByEssayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCorrectionsByEssayQuery, GetCorrectionsByEssayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCorrectionsByEssayQuery, GetCorrectionsByEssayQueryVariables>(GetCorrectionsByEssayDocument, options);
        }
export function useGetCorrectionsByEssaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCorrectionsByEssayQuery, GetCorrectionsByEssayQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCorrectionsByEssayQuery, GetCorrectionsByEssayQueryVariables>(GetCorrectionsByEssayDocument, options);
        }
export type GetCorrectionsByEssayQueryHookResult = ReturnType<typeof useGetCorrectionsByEssayQuery>;
export type GetCorrectionsByEssayLazyQueryHookResult = ReturnType<typeof useGetCorrectionsByEssayLazyQuery>;
export type GetCorrectionsByEssaySuspenseQueryHookResult = ReturnType<typeof useGetCorrectionsByEssaySuspenseQuery>;
export type GetCorrectionsByEssayQueryResult = Apollo.QueryResult<GetCorrectionsByEssayQuery, GetCorrectionsByEssayQueryVariables>;
export const GetCorrectionIfExistDocument = gql`
    query GetCorrectionIfExist($essayId: String!) {
  getCorrectionIfExist(essayId: $essayId) {
    essay_id
    created_by
    overall_comment
    rating
    created_at
    updated_at
    id
  }
}
    `;

/**
 * __useGetCorrectionIfExistQuery__
 *
 * To run a query within a React component, call `useGetCorrectionIfExistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCorrectionIfExistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCorrectionIfExistQuery({
 *   variables: {
 *      essayId: // value for 'essayId'
 *   },
 * });
 */
export function useGetCorrectionIfExistQuery(baseOptions: Apollo.QueryHookOptions<GetCorrectionIfExistQuery, GetCorrectionIfExistQueryVariables> & ({ variables: GetCorrectionIfExistQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCorrectionIfExistQuery, GetCorrectionIfExistQueryVariables>(GetCorrectionIfExistDocument, options);
      }
export function useGetCorrectionIfExistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCorrectionIfExistQuery, GetCorrectionIfExistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCorrectionIfExistQuery, GetCorrectionIfExistQueryVariables>(GetCorrectionIfExistDocument, options);
        }
export function useGetCorrectionIfExistSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCorrectionIfExistQuery, GetCorrectionIfExistQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCorrectionIfExistQuery, GetCorrectionIfExistQueryVariables>(GetCorrectionIfExistDocument, options);
        }
export type GetCorrectionIfExistQueryHookResult = ReturnType<typeof useGetCorrectionIfExistQuery>;
export type GetCorrectionIfExistLazyQueryHookResult = ReturnType<typeof useGetCorrectionIfExistLazyQuery>;
export type GetCorrectionIfExistSuspenseQueryHookResult = ReturnType<typeof useGetCorrectionIfExistSuspenseQuery>;
export type GetCorrectionIfExistQueryResult = Apollo.QueryResult<GetCorrectionIfExistQuery, GetCorrectionIfExistQueryVariables>;
export const GetSpacesByUserSelectDocument = gql`
    query GetSpacesByUserSelect($input: GetUserSpacesDto!) {
  getUserSpaces(input: $input) {
    data {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useGetSpacesByUserSelectQuery__
 *
 * To run a query within a React component, call `useGetSpacesByUserSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpacesByUserSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpacesByUserSelectQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSpacesByUserSelectQuery(baseOptions: Apollo.QueryHookOptions<GetSpacesByUserSelectQuery, GetSpacesByUserSelectQueryVariables> & ({ variables: GetSpacesByUserSelectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpacesByUserSelectQuery, GetSpacesByUserSelectQueryVariables>(GetSpacesByUserSelectDocument, options);
      }
export function useGetSpacesByUserSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpacesByUserSelectQuery, GetSpacesByUserSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpacesByUserSelectQuery, GetSpacesByUserSelectQueryVariables>(GetSpacesByUserSelectDocument, options);
        }
export function useGetSpacesByUserSelectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSpacesByUserSelectQuery, GetSpacesByUserSelectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSpacesByUserSelectQuery, GetSpacesByUserSelectQueryVariables>(GetSpacesByUserSelectDocument, options);
        }
export type GetSpacesByUserSelectQueryHookResult = ReturnType<typeof useGetSpacesByUserSelectQuery>;
export type GetSpacesByUserSelectLazyQueryHookResult = ReturnType<typeof useGetSpacesByUserSelectLazyQuery>;
export type GetSpacesByUserSelectSuspenseQueryHookResult = ReturnType<typeof useGetSpacesByUserSelectSuspenseQuery>;
export type GetSpacesByUserSelectQueryResult = Apollo.QueryResult<GetSpacesByUserSelectQuery, GetSpacesByUserSelectQueryVariables>;
export const GetSpacesByUserDocument = gql`
    query GetSpacesByUser($input: GetUserSpacesDto!) {
  getUserSpaces(input: $input) {
    data {
      id
      name
      description
      created_at
      updated_at
      _count {
        essays
        quizzes
        vocabularies
      }
    }
    pagination {
      totalItems
      itemsPerPage
      totalPages
      currentPage
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

/**
 * __useGetSpacesByUserQuery__
 *
 * To run a query within a React component, call `useGetSpacesByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpacesByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpacesByUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSpacesByUserQuery(baseOptions: Apollo.QueryHookOptions<GetSpacesByUserQuery, GetSpacesByUserQueryVariables> & ({ variables: GetSpacesByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpacesByUserQuery, GetSpacesByUserQueryVariables>(GetSpacesByUserDocument, options);
      }
export function useGetSpacesByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpacesByUserQuery, GetSpacesByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpacesByUserQuery, GetSpacesByUserQueryVariables>(GetSpacesByUserDocument, options);
        }
export function useGetSpacesByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSpacesByUserQuery, GetSpacesByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSpacesByUserQuery, GetSpacesByUserQueryVariables>(GetSpacesByUserDocument, options);
        }
export type GetSpacesByUserQueryHookResult = ReturnType<typeof useGetSpacesByUserQuery>;
export type GetSpacesByUserLazyQueryHookResult = ReturnType<typeof useGetSpacesByUserLazyQuery>;
export type GetSpacesByUserSuspenseQueryHookResult = ReturnType<typeof useGetSpacesByUserSuspenseQuery>;
export type GetSpacesByUserQueryResult = Apollo.QueryResult<GetSpacesByUserQuery, GetSpacesByUserQueryVariables>;