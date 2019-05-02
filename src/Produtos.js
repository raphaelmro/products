import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ProdutosHome from "./ProdutosHome";
import Categoria from "./Categoria";
import axios from "axios";

class Produtos extends Component {
  state = {
    categorias: []
  };

  loadCategorias = () => {
    axios.get("http://localhost:3001/categorias").then(response => {
      this.setState({
        categorias: response.data
      });
    });
  };
  componentDidMount() {
    this.loadCategorias();
  }

  renderCategoria(cat) {
    return (
      <li key={cat.id}>
        <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
      </li>
    );
  }

  handleNewCategoria = key => {
    if (key.keyCode === 13) {
      axios
        .post("http://localhost:3001/categorias", {
          categoria: this.refs.categoria.value
        })
        .then(response => {
          this.refs.categoria.value = "";
          this.loadCategorias();
        });
    }
  };

  render() {
    const { match } = this.props;
    const { categorias } = this.state;
    return (
      <div className="row">
        <div className="col-md-2">
          <h3>Categorias</h3>
          <ul>{categorias.map(this.renderCategoria)}</ul>
          <div className="well">
            <input
              type="text"
              onKeyUp={this.handleNewCategoria}
              ref="categoria"
              placeholder="Nova Categoria"
            />
          </div>
        </div>
        <div className="col-md-10">
          <h1>Produtos</h1>
          <Route exact path={match.url} component={ProdutosHome} />
          <Route
            exact
            path={match.url + "/categoria/:catId"}
            component={Categoria}
          />
        </div>
      </div>
    );
  }
}

export default Produtos;
