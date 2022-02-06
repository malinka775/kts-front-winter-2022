import qs from "qs";
import {ApiResponse, HTTPMethod, IApiStore, RequestParams, StatusHTTP} from "./types";

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        // TODO: Примите из параметров конструктора baseUrl
        this.baseUrl = baseUrl;
    }

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        // TODO: Напишите здесь код, который с помощью fetch будет делать запрос
        try{
            let fetchingUrl: string;
            if(params.method === HTTPMethod.GET && params.data) {
                fetchingUrl = `${this.baseUrl}${params.endpoint}?${qs.stringify(params.data)}`
            } else {
                fetchingUrl = `${this.baseUrl}${params.endpoint}`
            }

            return fetch(fetchingUrl, {
                method: params.method,
                headers: params.headers
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    return {
                    success: true,
                    data: data,
                    status: StatusHTTP.success,
                }})}
        catch (error){
            return new Promise((error) => {
                return {
                success: false,
                data: error,
                status: StatusHTTP.error,
            }})
        }
    }
}