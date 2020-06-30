import http from "../http-common";

class AvaliacaoService {
  create(data) {
    return http.post("/avaliacao", data);
  }
}

export default new AvaliacaoService();
