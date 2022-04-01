import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoCounter.css';

function TodoCounter() {
  const {totalTodos, completedTodos} = React.useContext(TodoContext)
  return (
    <h2 className="TodoCounter">You completed <span className='completedT'>{completedTodos}</span> of <span className='totalT'>{totalTodos}</span> TODOs</h2>
  );
}

export { TodoCounter };
