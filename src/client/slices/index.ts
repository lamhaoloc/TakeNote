import { combineReducers, Reducer } from 'redux';

import { RootState } from '../types/index';

import authReducer from './auth';
import settingsReducer from './settings';
import noteReducer from './note';
import categoryReducer from './category';
import syncReducer from './sync';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  settingsState: settingsReducer,
  categoryState: categoryReducer,
  noteState: noteReducer,
  syncState: syncReducer,
});
 
export default rootReducer;
