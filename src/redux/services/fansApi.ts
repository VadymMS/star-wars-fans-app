import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {QueryParamsEnums} from '../../types/enums/QueryEnums';

export const fansApi = createApi({
  reducerPath: 'fansApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://swapi.dev/api/'}),
  endpoints: builder => ({
    getPeople: builder.query({
      query: (id?: string) => `${QueryParamsEnums.people}/${id}`,
    }),
    getPlanets: builder.query({
      query: (id?: string) => `${QueryParamsEnums.planets}/${id}`,
    }),
    getSpecies: builder.query({
      query: (id?: string) => `${QueryParamsEnums.species}/${id}`,
    }),
    getFilms: builder.query({
      query: (id?: string) => `${QueryParamsEnums.films}/${id}`,
    }),
    getStarships: builder.query({
      query: (id?: string) => `${QueryParamsEnums.starships}/${id}`,
    }),
    getVehicles: builder.query({
      query: (id?: string) => `${QueryParamsEnums.vehicles}/${id}`,
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useGetPlanetsQuery,
  useGetSpeciesQuery,
  useGetFilmsQuery,
  useGetStarshipsQuery,
  useGetVehiclesQuery,
} = fansApi;
