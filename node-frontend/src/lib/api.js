import axios from 'axios';

const url = 'http://localhost:4000';

//api 연동 모음
export const writePost = ({ title, content }) => axios.post(`${url}/write`, { title, content }, { headers: { 'authorization': localStorage.getItem('Token') } })
export const writeGet = () => axios.get(`${url}/user`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const writePut = (title, content, id) => axios.put(`${url}/${id}`, { title, content }, { headers: { 'authorization': localStorage.getItem('Token') } })
export const getPost = (id) => axios.get(`${url}/post/${id}`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const deletePost = (id) => axios.delete(`${url}/post/${id}`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const getLike = (id) => axios.get(`${url}/like/${id}`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const postLike = (id) => axios.post(`${url}/like/${id}`, {}, { headers: { 'authorization': localStorage.getItem('Token') } })
export const getList = () => axios.get(`${url}/post`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const getComment = (id) => axios.get(`${url}/comment/${id}`)
export const WriteComment = (comment, id) => axios.post(`${url}/comment/${id}`, { comment: comment }, { headers: { 'authorization': localStorage.getItem('Token') } })
export const Login_Post = (id, password) => axios.post(`${url}/login`, { id: id, password: password })
export const Register_Post = (id, password) => axios.post(`${url}/register`, { id: id, password: password })
export const DeleteComment = (commentId) => axios.delete(`${url}/comment/${commentId}`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const UpdateComment = (commentId, text) => axios.put(`${url}/comment/${commentId}`, { comment: text }, { headers: { 'authorization': localStorage.getItem('Token') } })