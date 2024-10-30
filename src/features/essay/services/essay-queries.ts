import { gql } from '@apollo/client'

export const CREATE_CORRECTION_MUTATION = gql`
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
`

export const UPDATE_CORRECTION_MUTATION = gql`
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
`

export const GET_LIST_CORRECTION_BY_ESSAY_QUERY = gql`
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
`

export const CHECK_CORRECTION_EXIST_QUERY = gql`
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
`
