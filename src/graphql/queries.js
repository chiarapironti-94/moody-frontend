import { gql } from '@apollo/client';

export const GET_PREFERENCES = gql`
  query GetPreferences {
    preferences {
      themeColor
      lastPromptDate
    }
  }
`;

export const GET_MOOD_ENTRIES = gql`
  query GetMoodEntries($limit: Int) {
    moodEntries(limit: $limit) {
      _id
      mood
      rating
      color
      note
      date
    }
  }
`;

export const GET_MOOD_ENTRY = gql`
  query GetMoodEntry($id: ID!) {
    moodEntry(id: $id) {
      _id
      mood
      rating
      color
      note
      date
    }
  }
`;
