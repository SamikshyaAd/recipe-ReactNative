import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { promotions } from './promotions';
import {recipes} from './recipes';
import { favorites } from './favorites';
import { founders } from './founders';
import { feedbacks } from './feedbacks';
import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/storage';



export const ConfigureStore = () => {
     const config = {
        key : 'root',
        storage,
        debug : true
    };
    const store = createStore(
        persistCombineReducers(config, {
            promotions,
            recipes,
            favorites,
            feedbacks,
            founders
        }),
        applyMiddleware(thunk, logger)
    );
    const persistor = persistStore(store);
    return {persistor,store};
}