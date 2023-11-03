const initialData = {
    halls: []
};

const HallReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_ALL_HALL': {
            return {
                ...state,
                halls: action.payload
            }
        }

        default:
            return state;
    }
}
export default HallReducer;