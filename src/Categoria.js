import React, { Component } from "react";
import axios from "axios";

class Categoria extends Component {
  state = {
    produtos: [],
    categoria: {}
  };

  loadData(id) {
    axios
      .get("http://localhost:3001/produtos?categoria=" + id)
      .then(response => {
        this.setState({
          produtos: response.data
        });
      });
    axios
        .get("http://localhost:3001/categorias/" + id)
        .then(response => {
            this.setState({
            categoria: response.data
        });
    });
  }

  componentDidMount() {
    const id = this.props.match.params.catId;
    this.loadData(id);
  }

  componentWillReceiveProps(newProps) {
    this.loadData(newProps.match.params.catId);
  }

  renderProduto(produto) {
    return (
      <p className="well" key={produto.id}>
        {produto.produto}
      </p>
    );
  }

  render() {
    const { produtos } = this.state;
    return (
      <div>
          <h1>{this.state.categoria.categoria}</h1>
        {produtos.map(this.renderProduto)}
      </div>
    );
  }
}

export default Categoria;
