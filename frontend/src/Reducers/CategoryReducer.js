const initialData = {
    categories: []
};

const CategoryReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_ALL_CATE': {
            return {
                ...state,
                categories: action.payload
            }
        }

        default:
            return state;
    }
}
export default CategoryReducer;