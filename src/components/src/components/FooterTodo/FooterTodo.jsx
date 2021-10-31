import React from 'react';
import PropTypes from 'prop-types';

import './FooterTodo.css';
import FooterTodoFilters from '../FooterTodoFilters';

const FooterTodo = ({ todos, filter, onFilterChage, deleteAll }) => {
  const todoCount = todos.filter((el) => !el.completed).length;
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <FooterTodoFilters filter={filter} onFilterChage={onFilterChage} />
      <button type="button" className="clear-completed" onClick={deleteAll}>
        Clear completed
      </button>
    </footer>
  );
};
FooterTodo.defaultProps = {
  todos: [],
  filter: 'All',
  deleteAll: () => {},
  onFilterChage: () => {},
};
FooterTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  deleteAll: PropTypes.func,
  onFilterChage: PropTypes.func,
};

export default FooterTodo;
