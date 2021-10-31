import React from 'react';
import PropTypes from 'prop-types';
import './TodoListItem.css';
import { formatDistanceToNow } from 'date-fns';

export default class TodoListItem extends React.Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    label: this.props.label,
  };

  addItemLabel = (eve) => {
    this.setState({ label: eve.target.value });
  };

  addItem = (eve) => {
    const { label } = this.state;
    const { id, updateTodo } = this.props;
    eve.preventDefault();
    updateTodo(label, id);
    this.setState({ label: '' });
  };

  render() {
    const { label, onDeleted, onCompleted, completed, onEditing, editing, date } = this.props;
    const { label: stLabel } = this.state;
    let className;
    const newDate = formatDistanceToNow(date, { includeSeconds: true });
    if (completed) {
      className += ' completed';
    }
    if (editing) {
      className += ' editing';
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onCompleted} />
          <label>
            <span className="description"> {label} </span>
            <span className="created"> {newDate} </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEditing}>
            {' '}
          </button>
          <button type="button" className="icon icon-destroy" onClick={onDeleted}>
            {' '}
          </button>
        </div>
        <form onSubmit={this.addItem}>
          <input type="text" className="edit" value={stLabel} onChange={this.addItemLabel} />
        </form>
      </li>
    );
  }
}

TodoListItem.propTypes = {
  label: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  onCompleted: PropTypes.func,
  onEditing: PropTypes.func,
  onDeleted: PropTypes.func,
  updateTodo: PropTypes.func,
  id: PropTypes.number,
  date: PropTypes.instanceOf(Date),
};

TodoListItem.defaultProps = {
  label: 'No name',
  completed: false,
  editing: false,
  onCompleted: () => {},
  onEditing: () => {},
  onDeleted: () => {},
  updateTodo: () => {},
  date: new Date(),
  id: 500,
};
