const initialData = {
    shows: []
};

const ShowReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_ALL_SHOW': {
            return {
                ...state,
                shows: action.payload
            }
        }

        default:
            return state;
    }
}
export default ShowReducer;