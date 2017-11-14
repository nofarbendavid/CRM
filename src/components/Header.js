import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';


class Header extends Component {

    render() {
        return (
            <div className="header">{this.props.text}</div>
        )
    }
}

Header.PropTypes= {
    text:PropTypes.string.isRequired
}

export default Header;