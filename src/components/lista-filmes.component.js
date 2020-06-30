import React, { Component } from "react";
import FilmesService from "../services/filmes.service";
import { Link } from "react-router-dom";

export default class ListaFilmes extends Component {
  constructor(props) {
    super(props);
    this.retrieveFilmes = this.retrieveFilmes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFilme = this.setActiveFilme.bind(this);

    this.state = {
      books: [],
      currentFilme: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveFilmes();
  }

  retrieveFilmes() {
    FilmesService.getAll()
      .then(response => {
        this.setState({
          filmes: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFilmes();
    this.setState({
      currentFilme: null,
      currentIndex: -1
    });
  }

  setActiveFilme(filme, index) {
    this.setState({
      currentFilme: filme,
      currentIndex: index
    });
  }

  render() {
    const { filmes, currentFilme, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Filmes</h4>

          <ul className="list-group">
            {filmes &&
              filmes.map((filme, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFilme(filme, index)}
                  key={index}
                >
                  {filme.titulo}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          { currentFilme ? (
            <div>
              <h4>{currentFilme.titulo}</h4>
              <div>
                <label>
                  <strong>Título:</strong>
                </label>{" "}
                {currentFilme.titulo}
              </div>
              <div>
                <label>
                  <strong>Produtor:</strong>
                </label>{" "}
                {currentFilme.nomeProdutor}
              </div>
              <div>
                <label>
                  <strong>Ator:</strong>
                </label>{" "}
                {currentFilme.nomeAtor}
              </div>
              <div>
                <label>
                  <strong>Ano Lançamento:</strong>
                </label>{" "}
                {currentFilme.anoLancamento}
              </div>

              <div>
                <label>
                  <strong>Avaliações: </strong>
                </label>{" "}
                {currentFilme.avaliacoes.map(avaliacao =>
                  <div key={avaliacao.id}>
                    <div>{avaliacao.nomeAvaliador}</div>
                    <div>{avaliacao.notaAvaliacao}</div>
                    <div>{avaliacao.comentario}</div>
                    <hr></hr>
                  </div>
                )}
              </div>

              <Link
                to={"/filmes/" + currentFilme.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (<span></span>)}
        </div>
      </div>
    );
  }
}
