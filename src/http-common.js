import axios from "axios";

export default axios.create({
    /*baseURL: "https://5ecd9c557c528e00167cd64d.mockapi.io/avaliacao-filmes",*/
    baseURL: "https://5ecd9c557c528e00167cd64d.mockapi.io/avaliacao-filmes",
  headers: {
    "Content-type": "application/json"
  }
});
