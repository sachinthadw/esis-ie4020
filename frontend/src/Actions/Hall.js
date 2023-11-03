import axios from "../Components/config/axiosConfig";
//import { message } from 'antd'

export const getHalls = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('http://localhost:8070/hall/list')
        dispatch({ type: "GET_ALL_HALL", payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false })
    }
}
