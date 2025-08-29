import axios from "axios"
//import AsyncStorage from "@react-native-async-storage/async-storage"

const getApiBaseUrl = async () => {
  try {
    const savedIp = "http://127.0.0.1" // await AsyncStorage.getItem("ipAddress")
    const savedPort = 9000 //await AsyncStorage.getItem("port")

    if (savedIp && savedPort) {
      return `${savedIp}:${savedPort}/`
    }

    // Se não houver um IP salvo, retorna um padrão
    return "http://127.0.0.1:9000/"
  } catch (error) {
    console.error("Erro ao carregar baseURL:", error)
    return "http://177.220.190.213:9000/" // Valor padrão em caso de erro
  }
}

const createApiInstance = async () => {
  const baseURL = await getApiBaseUrl()

  return axios.create({
    baseURL,
    timeout: 5000,
  })
}

/* 
const api = axios.create({
    
    //baseURL: "http://192.168.15.40:3001/", // substitua pelo seu endpoint real
    //baseURL: "https://jsonplaceholder.typicode.com/",
    //baseURL: "https://jsonplaceholder.typicode.com/posts",
    baseURL: "http://177.220.190.213:9000/", // substitua pelo seu endpoint real

    timeout: 5000, // 5 segundos (ajuste conforme necessário)
});
  */

export default createApiInstance
