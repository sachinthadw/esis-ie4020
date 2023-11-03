import MovieReducer from "./MovieReducer";
import { createStore, combineReducers } from "redux";
import HallReducer from "./Halls";
import CategoryReducer from "./CategoryReducer";
import ShowReducer from "./Show";

const allreducers = new combineReducers({
    movies: MovieReducer,
    halls: HallReducer,
    categories: CategoryReducer,
    shows: ShowReducer
});

export default allreducers;