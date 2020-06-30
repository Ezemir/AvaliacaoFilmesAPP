import React, { Component } from "react";
import FilmesService from "../services/filmes.service";

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeProdutor = this.onChangeProdutor.bind(this);
    this.onChangeAtor = this.onChangeAtor.bind(this);
    this.onChangeAnoLancamento = this.onChangeAnoLancamento.bind(this);
    this.saveFilme = this.saveFilme.bind(this);
    this.newFilme = this.newFilme.bind(this);

    this.state = {
      id: null,
      titulo: "",
      nomeProdutor: "",
      nomeAtor: "",
      anoLancamento: "",
      submitted: false
    };
  }

  onChangeTitulo(e) {
    this.setState({
      titulo: e.target.value
    });
  }

  onChangeAtor(e) {
    this.setState({
      nomeAtor: e.target.value
    });
  }

  onChangeProdutor(e) {
    this.setState({
      nomeProdutor: e.target.value
    });
  }

  onChangeAnoLancamento(e) {
    this.setState({
      anoLancamento: e.target.value
    });
  }

  saveFilme() {
    var data = {
      titulo: this.state.titulo,
      nomeProdutor: this.state.nomeProdutor,
      nomeAtor: this.state.nomeAtor,
      anoLancamento: this.state.anoLancamento,
    };

    FilmesService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          titulo: response.data.titulo,
          nomeProdutor: response.data.nomeProdutor,
          nomeAtor: response.data.nomeAtor,
          anoLancamento: response.data.anoLancamento,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newFilme() {
    this.setState({
      id: null,
      titulo: "",
      nomeProdutor: "",
      nomeAtor: "",
      anoLancamento: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h6>Filme cadastrado com sucesso!</h6>
            <button className="btn btn-success" onClick={this.newFilme}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="titulo">Titulo</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                required
                value={this.state.titulo}
                onChange={this.onChangeTitulo}
                name="titulo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Produtor</label>
              <input
                type="text"
                className="form-control"
                id="nomeProdutor"
                required
                value={this.state.nomeProdutor}
                onChange={this.onChangeProdutor}
                name="nomeProdutor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ator">Ator</label>
              <input
                type="text"
                className="form-control"
                id="nomeAtor"
                required
                value={this.state.nomeAtor}
                onChange={this.onChangeAtor}
                name="nomeAtor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="anoLancamento">Ano Lançamento</label>
              <input
                type="number"
                className="form-control"
                id="anoLancamento"
                required
                value={this.state.anoLancamento}
                onChange={this.onChangeAnoLancamento}
                name="anoLancamento"
              />
            </div>

            <button onClick={this.saveFilme} className="btn btn-success">
              Cadastrar
            </button>
          </div>
        )}
      </div>
    );
  }
}
