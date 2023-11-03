import axios from "../Components/config/axiosConfig";
//import { message } from 'antd'

export const getShows = (id) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get(`http://localhost:8070/show/all/${id}`)
        dispatch({ type: "GET_ALL_SHOW", payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false })
    }
}
