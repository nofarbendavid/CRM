import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';

class Button extends Component {

    render() {
        return (
            <button className="btn" onClick={this.props.handleClick}>{this.props.title}</button>
        )
    }
}


Button.PropTypes= {
    handleClick:PropTypes.func.isRequired,
    title:PropTypes.string.isRequired
}

export default Button;