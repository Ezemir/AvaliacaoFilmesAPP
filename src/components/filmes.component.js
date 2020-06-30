import React, { Component } from "react";
import AvaliacaoFilmesService from "../services/filmes.service";

export default class Bookstore extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeProdutor = this.onChangeProdutor.bind(this);
    this.onChangeAtor = this.onChangeAtor.bind(this);
    this.onChangeAnoLancamento = this.onChangeAnoLancamento.bind(this);
    this.getFilme = this.getFilme.bind(this);
    this.updateFilme = this.updateFilme.bind(this);
    this.removeFilme = this.removeFilme.bind(this);

    this.state = {
      currentFilme: {
        id: null,
        titulo: "",
        nomeProdutor: "",
        nomeAtor: "",
        anoLancamento: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFilme(this.props.match.params.id);
  }

  onChangeTitulo(e) {
    const titulo = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFilme: {
          ...prevState.currentFilme,
          titulo: titulo
        }
      };
    });
  }

  onChangeProdutor(e) {
    const nomeProdutor = e.target.value;
    
    this.setState(prevState => ({
      currentFilme: {
        ...prevState.currentFilme,
        nomeProdutor: nomeProdutor
      }
    }));
  }

  onChangeAtor(e) {
    const nomeAtor = e.target.value;
    
    this.setState(prevState => ({
      currentFilme: {
        ...prevState.currentFilme,
        nomeAtor: nomeAtor
      }
    }));
  }

  onChangeAnoLancamento(e) {
    const anoLancamento = e.target.value;
    
    this.setState(prevState => ({
      currentFilme: {
        ...prevState.currentFilme,
        anoLancamento: anoLancamento
      }
    }));
  }

  getFilme(id) {
    AvaliacaoFilmesService.get(id)
      .then(response => {
        this.setState({
          currentFilme: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFilme() {
    AvaliacaoFilmesService.update(
      this.state.currentFilme.id,
      this.state.currentFilme
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Filme atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeFilme() {    
    AvaliacaoFilmesService.delete(this.state.currentFilme.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/filmes')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFilme } = this.state;

    return (
      <div>
        {currentFilme ? (  
          <div className="edit-form">
            { this.state.message ?
            <div className="alert alert-success" role="alert">
              {this.state.message}
            </div> : <div></div> }
            <h4>{currentFilme.title}</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Tirulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  value={currentFilme.titulo}
                  onChange={this.onChangeTitulo}
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Produtor</label>
                <input
                  type="text"
                  className="form-control"
                  id="produtor"
                  value={currentFilme.nomeProdutor}
                  onChange={this.onChangeProdutor}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ator">Ator</label>
                <input
                  type="text"
                  className="form-control"
                  id="ator"
                  value={currentFilme.nomeAtor}
                  onChange={this.onChangeAtor}
                />
              </div>

              <div className="form-group">
                <label htmlFor="anoLancamento">Ano Lançamento</label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  value={currentFilme.anoLancamento}
                  onChange={this.onChangeAnoLancamento}
                />
              </div>
            </form>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFilme}
            >
              Atualizar
            </button>

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeFilme}
            >
              Remover
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Plase click in some book...</p>
          </div>
        )}
      </div>
    );
  }
}
