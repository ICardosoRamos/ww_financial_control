import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { AuthContext } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Global Axios Config
axios.defaults.baseURL = "http://192.168.100.137:8000/";
// axios.defaults.headers.common['Authorization'] = 'Bearer SEU_TOKEN_AQUI';

export default function useFetch(token: string) {
  const get = async (url: string) => {
    let requestParams: AxiosRequestConfig = {
      url: url,
      method: "GET",
    };

    // Se tem token é pq está logado e precisa do Authorization
    if (token) {
      requestParams = { ...requestParams };
    }

    const data = await axios.request(requestParams);

    return data;
  };

  async function post<TRequestData = unknown, TReturn = unknown>(
    url: string,
    requestData?: TRequestData
  ) {
    let requestParams: AxiosRequestConfig = {};

    // Se tem token é pq está logado e precisa do Authorization
    if (token) {
      const token = await AsyncStorage.getItem("@token");

      requestParams = {
        ...requestParams,
        headers: {
          Authorization: `Token ${token}`,
        },
      };
    }

    return new Promise((resolve, reject) => {
      axios
        .post(url, requestData, requestParams)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }) as TReturn;
  }

  // const post = async (url: string, requestData?: any) => {
  //   let requestParams: AxiosRequestConfig = {};

  //   // Se tem token é pq está logado e precisa do Authorization
  //   if (token) {

  //     const token = await AsyncStorage.getItem("@token");

  //     requestParams = {
  //       ...requestParams,
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     };
  //   }

  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(url, requestData, requestParams)
  //       .then((response) => {
  //         resolve(response);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // };

  return { get, post };
}
