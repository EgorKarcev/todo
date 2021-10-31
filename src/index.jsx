import React, { Component } from 'react';
import ReactDom from 'react-dom';

import AppHeader from './components/AppHeader';
import TodoMain from './components/TodoMain';

class App extends Component {
  state = {
    infoTodo: [
      { label: 'drink', completed: false, editing: false, id: 100, date: new Date() },
      { label: 'sleep', completed: false, editing: false, id: 101, date: new Date() },
      {
        label: 'Creat React',
        completed: false,
        editing: false,
        id: 102,
        date: new Date(),
      },
    ],
    filter: 'All',
  };

  onFilterChage = (filter) => {
    this.setState({ filter });
  };

  onCompleted = (id) => {
    this.setState(({ infoTodo }) => {
      const index = this.indexEll(infoTodo, id);
      const oldItem = infoTodo[index];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      return { infoTodo: [...infoTodo.slice(0, index), newItem, ...infoTodo.slice(index + 1)] };
    });
  };

  onEditing = (id) => {
    this.setState(({ infoTodo }) => {
      const index = this.indexEll(infoTodo, id);
      const oldItem = infoTodo[index];
      const newItem = { ...oldItem, editing: !oldItem.editing };
      return { infoTodo: [...infoTodo.slice(0, index), newItem, ...infoTodo.slice(index + 1)] };
    });
  };

  onFilter = (item, filter) => {
    switch (filter) {
      case 'All':
        return item;
      case 'Active':
        return item.filter((el) => !el.completed);
      case 'Completed':
        return item.filter((el) => el.completed);
      default:
        return item;
    }
  };

  addTodo = (label) => {
    const now = new Date();
    const newItem = {
      label,
      completed: false,
      editing: false,
      id: (this.maxid += 1),
      date: now,
    };
    this.setState(({ infoTodo }) => ({ infoTodo: [...infoTodo, newItem] }));
  };

  deleteTodo = (id) => {
    this.setState(({ infoTodo }) => {
      const index = this.indexEll(infoTodo, id);
      const newInfoTodo = [...infoTodo.slice(0, index), ...infoTodo.slice(index + 1)];
      return {
        infoTodo: newInfoTodo,
      };
    });
  };

  deleteAll = () => {
    const { infoTodo } = this.state;
    const newArrTodo = infoTodo.filter((el) => el.completed);
    newArrTodo.forEach((el) => {
      this.deleteTodo(el.id);
    });
  };

  updateTodo = (label, id) => {
    const { infoTodo } = this.state;
    const [item] = infoTodo.filter((el) => el.id === id);
    const newItem = { ...item, label, editing: false };
    this.setState(({ infoTodo: infoTodoNew }) => {
      const index = this.indexEll(infoTodoNew, id);
      const newInfo = { infoTodo: [...infoTodoNew.slice(0, index), newItem, ...infoTodoNew.slice(index + 1)] };
      return newInfo;
    });
  };

  indexEll = (infoTodo, id) => infoTodo.findIndex((el) => el.id === id);

  maxid = 104;

  render() {
    const { infoTodo, filter } = this.state;
    const todoData = this.onFilter(infoTodo, filter);
    return (
      <section className="todoapp">
        <AppHeader addTodo={this.addTodo} />
        <TodoMain
          todosData={infoTodo}
          todos={todoData}
          onEditing={this.onEditing}
          onDeleted={this.deleteTodo}
          onCompleted={this.onCompleted}
          filter={filter}
          onFilterChage={this.onFilterChage}
          deleteAll={this.deleteAll}
          updateTodo={this.updateTodo}
        />
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
