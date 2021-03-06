import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Filmes from "./components/filmes.component";
import AdicionaFilme from "./components/adiciona-filme.component";
import AdicionaAvaliacao from "./components/adiciona-avaliacao.component";
import ListaFilmes from "./components/lista-filmes.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              Avaliação de Filmes
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/filmes"} className="nav-link">
                  Filmes
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add-filme"} className="nav-link">
                  Adicionar Filme
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add-avaliacao"} className="nav-link">
                  Adicionar Avaliação
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/filmes"]} component={ListaFilmes} />
              <Route exact path="/add-filme" component={AdicionaFilme} />
              <Route exact path="/add-avaliacao" component={AdicionaAvaliacao} />
              <Route path="/filmes/:id" component={Filmes} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
