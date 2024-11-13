import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from '../interface/FoodData';

export function getApiUrl(): string | null  {
    return localStorage.getItem('API_URL');
  }

const fetchData = async (): AxiosPromise<FoodData[]> => {
    const url = getApiUrl();

    const response = await axios.get(`${url}food/cliente`); 
    return response;
}

export function useFoodDataCliente() {
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
