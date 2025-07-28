import { gql } from '@apollo/client';

export const UPDATE_PREFERENCES = gql`
  mutation UpdatePreferences($themeColor: String!, $lastPromptDate: String) {
    updatePreferences(
      themeColor: $themeColor
      lastPromptDate: $lastPromptDate
    ) {
      themeColor
      lastPromptDate
    }
  }
`;

export const CREATE_MOOD_ENTRY = gql`
  mutation CreateMoodEntry(
    $mood: String!
    $rating: Int!
    $color: String!
    $note: String
  ) {
    createMoodEntry(mood: $mood, rating: $rating, color: $color, note: $note) {
      _id
      mood
      rating
      color
      note
      date
    }
  }
`;

export const DELETE_MOOD_ENTRY = gql`
  mutation DeleteMoodEntry($id: ID!) {
    deleteMoodEntry(id: $id)
  }
`;
