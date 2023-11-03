const initialData = {
    movies: []
};

const MovieReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_ALL_MOVIES': {
            return {
                ...state,
                movies: action.payload
            }
        }

        default:
            return state;
    }
}

export default MovieReducer;