import axios from 'axios';

const url = 'http://localhost:4000';

//api 연동 모음
export const writePost = ({ title, content }) => axios.post(`${url}/write`, { title, content }, { headers: { 'authorization': localStorage.getItem('Token') } })
export const getPost = (id) => axios.get(`${url}/post/${id}`)
export const getList = () => axios.get(`${url}/post`)
export const getComment = (id) => axios.get(`${url}/comment/${id}`)
export const WriteComment = (comment, id) => axios.post(`${url}/comment/${id}`, { comment: comment }, { headers: { 'authorization': localStorage.getItem('Token') } })
export const Login_Post = (id, password) => axios.post(`${url}/login`, { id: id, password: password })
export const DeleteComment = (commentId) => axios.delete(`${url}/comment/${commentId}`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const UpdateComment = (commentId, text) => axios.put(`${url}/comment/${commentId}`, { comment: text }, { headers: { 'authorization': localStorage.getItem('Token') } })