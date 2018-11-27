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
  switch (action.type) {

    case SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS:
      draft.loadingData = true;
  }
}, initialState);
