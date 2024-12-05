import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COHORT_CODE = "2109-UNF-HY-WEB-PT"; // Replace with the actual cohort code
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_CODE}/`;

// Configure the API slice with the base URL and a "Puppy" tag type
const api = createApi({
  reducerPath: "puppyBowlApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Puppy"],
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: () => "players",
      providesTags: ["Puppy"],
    }),
    addPlayer: builder.mutation({
      query: (newPlayer) => ({
        url: "players",
        method: "POST",
        body: newPlayer,
      }),
      invalidatesTags: ["Puppy"],
    }),
    removePlayer: builder.mutation({
      query: (playerId) => ({
        url: `players/${playerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useAddPlayerMutation,
  useRemovePlayerMutation,
} = api;

export default api;
