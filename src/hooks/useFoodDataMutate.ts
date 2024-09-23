import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { FoodData } from '../interface/FoodData';

export function getAuthToken(): string | null {
    return localStorage.getItem('token');
}

export function getApiUrl(): string | null  {
    return localStorage.getItem('API_URL');
}

const url = getApiUrl();

const postData = async (data: FoodData): AxiosPromise<any> => {
    const token = getAuthToken(); 
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; 

    const response = axios.post(url + '/food', data,  {headers});

    return response;
}

export function useFoodDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food-data']})
        }
    })

    return mutate;
}