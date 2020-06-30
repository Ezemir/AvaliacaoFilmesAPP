import http from "../http-common";

class FilmesService {
  getAll() {
    return http.get("/filme");
  }

  get(id) {
    return http.get(`/filme/${id}`);
  }

  create(data) {
    return http.post("/filme", data);
  }

  update(id, data) {
    return http.put(`/filme/${id}`, data);
  }

  delete(id) {
    return http.delete(`/filme/${id}`);
  }
}

export default new FilmesService();
