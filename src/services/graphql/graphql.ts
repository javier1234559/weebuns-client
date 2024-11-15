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
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  creator?: Maybe<User>;
  deletedAt: Scalars['DateTime']['output'];
  essay?: Maybe<Essay>;
  essayId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  overallComment?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['String']['output']>;
  replies?: Maybe<Array<CorrectionReply>>;
  sentences?: Maybe<Array<CorrectionSentence>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CorrectionReply = {
  __typename?: 'CorrectionReply';
  comment: Scalars['String']['output'];
  correctionId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  creator?: Maybe<User>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CorrectionResponseAllDto = {
  __typename?: 'CorrectionResponseAllDto';
  data: Array<CorrectionResponseOneDto>;
  pagination: PaginationOutputDto;
};

export type CorrectionResponseOneDto = {
  __typename?: 'CorrectionResponseOneDto';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  creator?: Maybe<User>;
  essayId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  overall_comment?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  sentences?: Maybe<Array<CorrectionSentence>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CorrectionSentence = {
  __typename?: 'CorrectionSentence';
  correctedText?: Maybe<Scalars['String']['output']>;
  correctionId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  index: Scalars['Float']['output'];
  isCorrect: Scalars['Boolean']['output'];
  originalText: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
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

export type Essay = {
  __typename?: 'Essay';
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  corrections?: Maybe<Array<Correction>>;
  coverUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt: Scalars['DateTime']['output'];
  hashtags?: Maybe<Array<EssayHashtag>>;
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  space?: Maybe<Space>;
  spaceId: Scalars['String']['output'];
  status: EssayStatus;
  summary?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  upvoteCount: Scalars['Float']['output'];
};

export type EssayHashtag = {
  __typename?: 'EssayHashtag';
  createdAt: Scalars['DateTime']['output'];
  essay?: Maybe<Essay>;
  essayId: Scalars['ID']['output'];
  hashtag?: Maybe<Hashtag>;
  hashtagId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

/** The status of an essay */
export enum EssayStatus {
  Deleted = 'deleted',
  Draft = 'draft',
  Private = 'private',
  Public = 'public'
}

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
  _count?: Maybe<HashtagCount>;
  createdAt: Scalars['DateTime']['output'];
  essays?: Maybe<Array<EssayHashtag>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  usageCount: Scalars['Float']['output'];
};

export type HashtagCount = {
  __typename?: 'HashtagCount';
  essays: Scalars['Float']['output'];
};

/** Available language codes */
export enum LanguageCode {
  English = 'ENGLISH',
  Vietnamese = 'VIETNAMESE'
}

/** Proficiency level codes */
export enum LevelCode {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Elementary = 'ELEMENTARY',
  Intermediate = 'INTERMEDIATE',
  Master = 'MASTER',
  UpperIntermediate = 'UPPER_INTERMEDIATE'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCorrectionEssay: CorrectionResponseOneDto;
  updateCorrectionEssay: CorrectionResponseOneDto;
};


export type MutationCreateCorrectionEssayArgs = {
  input: CreateCorrectionDto;
};


export type MutationUpdateCorrectionEssayArgs = {
  input: UpdateCorrectionDto;
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
  getCorrectionsByEssay?: Maybe<CorrectionResponseAllDto>;
  getUserSpaces: SpacesResponse;
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

export type Space = {
  __typename?: 'Space';
  _count?: Maybe<SpaceCount>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  creator?: Maybe<User>;
  currentLevel: LevelCode;
  deletedAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language: LanguageCode;
  name: Scalars['String']['output'];
  target: TargetCode;
  targetLevel: LevelCode;
  topic: TopicCode;
  updatedAt: Scalars['DateTime']['output'];
};

export type SpaceCount = {
  __typename?: 'SpaceCount';
  essays: Scalars['Int']['output'];
  notes: Scalars['Int']['output'];
  vocabularies: Scalars['Int']['output'];
};

export type SpacesResponse = {
  __typename?: 'SpacesResponse';
  data: Array<Space>;
  pagination: PaginationOutputDto;
};

/** Learning target codes */
export enum TargetCode {
  Communication = 'COMMUNICATION',
  Ielts = 'IELTS',
  Other = 'OTHER',
  Toeic = 'TOEIC'
}

/** Learning topic codes */
export enum TopicCode {
  Academic = 'ACADEMIC',
  Business = 'BUSINESS',
  DailyLife = 'DAILY_LIFE',
  Other = 'OTHER',
  Technology = 'TECHNOLOGY',
  Travel = 'TRAVEL'
}

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

export type User = {
  __typename?: 'User';
  authProvider: AuthProvider;
  authProviderId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  nativeLanguage: LanguageCode;
  passwordHash?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

/** User roles in the system */
export enum UserRole {
  Admin = 'admin',
  Teacher = 'teacher',
  User = 'user'
}

export type GetSpacesByUserSelectQueryVariables = Exact<{
  input: GetUserSpacesDto;
}>;


export type GetSpacesByUserSelectQuery = { __typename?: 'Query', getUserSpaces: { __typename?: 'SpacesResponse', data: Array<{ __typename?: 'Space', id: string, name: string, description?: string | null }> } };

export type GetSpacesByUserQueryVariables = Exact<{
  input: GetUserSpacesDto;
}>;


export type GetSpacesByUserQuery = { __typename?: 'Query', getUserSpaces: { __typename?: 'SpacesResponse', data: Array<{ __typename?: 'Space', id: string, name: string, description?: string | null, target: TargetCode, createdAt: any, updatedAt: any, language: LanguageCode, currentLevel: LevelCode, topic: TopicCode, targetLevel: LevelCode, _count?: { __typename?: 'SpaceCount', essays: number, notes: number, vocabularies: number } | null }>, pagination: { __typename?: 'PaginationOutputDto', totalItems: number, currentPage: number, totalPages: number, itemsPerPage: number, hasNextPage: boolean, hasPreviousPage: boolean } } };


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
      target
      createdAt
      updatedAt
      _count {
        essays
        notes
        vocabularies
      }
      language
      currentLevel
      topic
      targetLevel
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