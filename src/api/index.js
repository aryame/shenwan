

import axios from 'axios';
import data from './mockData'
let serverIp = 'http://127.0.0.1'
let port = '8081'
let baseURL = `${serverIp}:${port}`
export const login = (url, param) => {
    return new Promise((resolve, reject) => {resolve({code: '200'})})
    // return axios({
    //     method: 'post',
    //     url,
    //     baseURL,
    //     data: param
    // })
}

export const getUserInfo = (url, param) => {
    return new Promise((resolve, reject) => {resolve({
        code: '200', msg: 'success',
        data: {
            userName: 'abc',
            email: '163ssss@163.com',
            phone: {
                phoneNumber: '163xxxxxx',
                isVerified: false
            },
            password: '******'
        }
    })})
    // return axios({
    //     method: 'post',
    //     url,
    //     baseURL,
    //     data: param
    // })
}

export const getAllData = (url, param) => {
    return new Promise((resolve, reject) => {resolve({
        code: '200', msg: 'success',
        data: data
    })})
    // return axios({
    //     method: 'post',
    //     url,
    //     baseURL,
    //     data: param
    // })
}