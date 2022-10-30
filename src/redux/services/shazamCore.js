import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const key = process.env.VITE_SHAZAM_CORE_API_KEY;
const songsHeaders = {
  "x-rapidapi-host": "shazam-core.p.rapidapi.com",
  "x-rapidapi-key": "53ac660b86mshb7d36959119afcfp12487cjsn3f5e463078e0",
};

const createRequest = (url) => ({ url, headers: songsHeaders });

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    // prepareHeaders: (headers) => {
    //   headers.set(
    //     "X-RapidAPI-Key",
    //     ""
    //   );

    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => createRequest("/charts/world"),
    }),
    getSongDetails: builder.query({
      query: ({ songid }) =>
        createRequest(`/tracks/details?track_id=${songid}`),
    }),
    getSongRelated: builder.query({
      query: ({ songid }) =>
        createRequest(`/tracks/related?track_id=${songid}`),
    }),
    getArtistDetails: builder.query({
      query: ({ artistId }) =>
        createRequest(`/artists/details?artist_id=${artistId}`),
    }),
    getSongByCountry: builder.query({
      query: (countryCode) =>
        createRequest(`/charts/country?country_code=${countryCode}`),
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        createRequest(
          `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`
        ),
    }),
    getSongsByGenre: builder.query({
      query: (genre) =>
        createRequest(`/charts/genre-world?genre_code=${genre}`),
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongByCountryQuery,
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
} = shazamCoreApi;
