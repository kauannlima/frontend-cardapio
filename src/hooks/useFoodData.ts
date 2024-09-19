import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from '../interface/FoodData';

const API_URL = 'https://backend-cardapio-5kjd.onrender.com';

export function getAuthToken(): string | null {
    return localStorage.getItem('token');
}

const fetchData = async (): AxiosPromise<FoodData[]> => {
    const token = getAuthToken(); 

    const headers = token ? { Authorization: `Bearer ${token}` } : {}; 

    const response = await axios.get(API_URL + '/food', { headers }); 
    return response;
}

export function useFoodData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    };
}
