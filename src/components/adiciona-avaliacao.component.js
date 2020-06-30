import React, { Component } from "react";
import AvaliacaoService from "../services/avaliacao.service";
import FilmesService from "../services/filmes.service";

export default class AddAvaliacao extends Component {
  constructor(props) {
    super(props);
    this.onChangeFilme = this.onChangeFilme.bind(this);
    this.onChangeNomeAvaliador = this.onChangeNomeAvaliador.bind(this);
    this.onChangeNotaAvaliacao = this.onChangeNotaAvaliacao.bind(this);
    this.onChangeComentario = this.onChangeComentario.bind(this);
    this.saveAvaliacao = this.saveAvaliacao.bind(this);
    this.newAvaliacao = this.newAvaliacao.bind(this);

    this.state = {
      id: null,
      filmes: [],
      filme: "",
      nomeAvaliador: "",
      notaAvaliacao: "",
      comentario: "",
      submitted: false
    };
  }

  componentDidMount() {
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

  onChangeFilme(e) {
    this.setState({
      titulo: e.target.value
    });
  }

  onChangeNomeAvaliador(e) {
    this.setState({
      nomeAvaliador: e.target.value
    });
  }

  onChangeNotaAvaliacao(e) {
    this.setState({
        notaAvaliacao: e.target.value
    });
  }

  onChangeComentario(e) {
    this.setState({
        comentario: e.target.value
    });
  }

  saveAvaliacao() {
    var data = {
      filme: this.state.filme,
      nomeAvaliador: this.state.nomeAvaliador,
      notaAvaliacao: this.state.notaAvaliacao,
      comentario: this.state.comentario,
    };

    console.log(data);

    AvaliacaoService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          filme: response.data.filme,
          nomeAvaliador: response.data.nomeAvaliador,
          notaAvaliacao: response.data.notaAvaliacao,
          comentario: response.data.comentario,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newAvaliacao() {
    this.setState({
      id: null,
      filme: "",
      nomeAvaliador: "",
      notaAvaliacao: "",
      comentario: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h6>Avaliação cadastrada com sucesso!</h6>
            <button className="btn btn-success" onClick={this.newFilme}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div>
                <select
                    className="form-control"
                    value={this.state.filme}
                    onChange={(e) => this.setState({filme: e.target.value})}>
                        {this.state.filmes.map((filme) => <option key={filme.id} value={filme.id}>{filme.titulo}</option>)}
                </select>
            </div>

            <div className="form-group">
              <label htmlFor="nomeAvaliador">Nome Avaliador</label>
              <input
                type="text"
                className="form-control"
                id="nomeAvaliador"
                required
                value={this.state.nomeAvaliador}
                onChange={this.onChangeNomeAvaliador}
                name="nomeAvaliador"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notaAvaliacao">Nota Avaliação</label>
              <input
                type="number"
                className="form-control"
                id="notaAvaliacao"
                required
                value={this.state.notaAvaliacao}
                onChange={this.onChangeNotaAvaliacao}
                name="notaAvaliacao"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comentario">Comentário</label>
              <input
                type="text"
                className="form-control"
                id="comentario"
                required
                value={this.state.comentario}
                onChange={this.onChangeComentario}
                name="comentario"
              />
            </div>

            <button onClick={this.saveAvaliacao} className="btn btn-success">
              Cadastrar
            </button>
          </div>
        )}
      </div>
    );
  }
}
