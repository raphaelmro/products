import React, {Component} from 'react';

class Categoria extends Component {
    render() {
        return (
            <div>
                <h1>Categoria {this.props.match.params.catId}</h1>
            </div>
        );
    }
}

export default Categoria;