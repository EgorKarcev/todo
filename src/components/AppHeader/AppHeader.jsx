import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppHeader.css';

export default class AppHeader extends Component {
  // static get propTypes() {
  //   return {
  //     addTodo: PropTypes.func.isRequired,
  //   };
  // }

  // static defaultProps = {
  //   addTodo: () => {},
  // };

  state = {
    label: ' ',
  };

  addItemLabel = (eve) => {
    this.setState({ label: eve.target.value });
  };

  addItem = (eve) => {
    const { addTodo } = this.props;
    const { label } = this.state;
    eve.preventDefault();
    addTodo(label);
    this.setState({ label: '' });
  };

  render() {
    const { label } = this.state;
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.addItem}>
          <input className="new-todo" placeholder="What needs to be done?" value={label} onChange={this.addItemLabel} />
        </form>
      </header>
    );
  }
}
AppHeader.propTypes = {
  addTodo: PropTypes.func,
};

AppHeader.defaultProps = {
  addTodo: () => {},
};
