import { Action } from '@ngrx/store';

export enum SearchActionTypes {
  GET_SELECTED_CATEGORY = 'Search: Get Selected Category',
  GET_SELECTED_CATEGORY_SUCCESS = 'Search: Get Selected Category Success',
  CLEAR_SELECTED_CATEGORY = 'Search: Clear Selected Category',
  GET_SEARCH_RESULTS = 'Search: Get Search Results',
  GET_SEARCH_RESULTS_SUCCESS = 'Search: Get Search Results Success',
  ClEAR_SEARCH_RESULTS = 'Search: Clear Search Results',
}

export class GetSelectedCategory implements Action {
  readonly type = SearchActionTypes.GET_SELECTED_CATEGORY;
}

export class GetSelectedCategorySuccess implements Action {
  readonly type = SearchActionTypes.GET_SELECTED_CATEGORY_SUCCESS;
}

export class GetSearchResult implements Action {
  readonly type = SearchActionTypes.GET_SEARCH_RESULTS;
}

export class GetSearchResultSuccess implements Action {
  readonly type = SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS;
}

export type SearchActions =
  | GetSelectedCategory
  | GetSelectedCategorySuccess
  | GetSearchResult
  | GetSearchResultSuccess;
