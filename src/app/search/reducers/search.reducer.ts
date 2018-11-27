import { SearchActions, SearchActionTypes } from '../actions/search.actions';
import ISearchFilter from '../models/search-filters.model';
import { produce } from 'immer';

export interface IState extends ISearchFilter {
  loadingData?: boolean;
}

export const initialState: IState = {
  query: '',
  loadingData: false
};

export const reducer = produce<IState, SearchActions>((draft, action) => {
  // Will keep showing loading animation for any action,
  // unless that action is stoping animation.
  draft.loadingData = true;

  switch (action.type) {
    case SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS:
      draft = action.payload;
      draft.loadingData = false;
      break;
    case SearchActionTypes.GET_SELECTED_CATEGORY_SUCCESS:
      draft.loadingData = false;
      break;
  }
}, initialState);
