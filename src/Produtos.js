import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ProdutosHome from "./ProdutosHome";
import Categoria from "./Categoria";
import axios from "axios";

class Produtos extends Component {
  state = {
    categorias: []
  };

  componentDidMount() {
    axios
        .get("http://localhost:3001/categorias")
        .then(response => {
            this.setState({
            categorias: response.data
        });
    });
  }

  renderCategoria(categoria) {
      return(
          <li><Link key={categoria.id} to={`/produtos/categoria/${categoria.id}`}>
              {categoria.categoria}
          </Link></li>
      )
  }

  render() {
    const { match } = this.props;
    const {categorias} = this.state
    return (
      <div className="row">
        <div className="col-md-2">
          <h3>Categorias</h3>
            <ul>
            {categorias.map(this.renderCategoria)}
            </ul>
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
