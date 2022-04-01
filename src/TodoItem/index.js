import React from 'react';
import './TodoItem.css';
import { TodoIcon } from '../TodoIcon';
import { TodoDeleteIcon } from '../TodoDeleteIcon';


function TodoItem(props) {
  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete}
      >
        <TodoIcon />
      </span>
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
        {props.text}
      </p>
      <span
        className="Icon Icon-delete"
        onClick={props.onDelete}
      >
        <TodoDeleteIcon/>
      </span>
    </li>
  );
}

export { TodoItem };
