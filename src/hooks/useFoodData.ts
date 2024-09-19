import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from '../interface/FoodData';

export function getAuthToken(): string | null {
    return localStorage.getItem('token');
}

export function getApiUrl(): string | null  {
    return localStorage.getItem('API_URL');
  }

const fetchData = async (): AxiosPromise<FoodData[]> => {
    const token = getAuthToken(); 
    const url = getApiUrl();

    const headers = token ? { Authorization: `Bearer ${token}` } : {}; 

    const response = await axios.get(url+ '/food', { headers }); 
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
