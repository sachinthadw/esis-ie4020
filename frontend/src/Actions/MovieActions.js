import axios from "../Components/config/axiosConfig";



//import { message } from 'antd'
export const getfiltermovies = async (skip, limit, filters, isSupervisor) => {
    const data = {
        limit,
        skip,
        filters,

    }
    let tok = "";
    await axios.get('http://localhost:8070/api/csrf-token')
        .then(response => {
            tok = response.data.csrfToken
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
        });
    return fetch('http://localhost:8070/movies/by/search', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'CSRF-Token': tok,
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    })
}

export const getmovies = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('http://localhost:8070/movies/list')
        dispatch({ type: "GET_ALL_MOVIES", payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false })
    }
}