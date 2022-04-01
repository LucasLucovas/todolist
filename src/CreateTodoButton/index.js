import React from 'react';
import './CreateTodoButton.css';
import { TodoButtonIcon } from '../TodoButtonIcon'

function CreateTodoButton(props) {
  const onClickButton = () => {
     props.setOpenModal(prevState => !prevState)
  };

  
  return (
    <button
      className="CreateTodoButton"
      onClick={onClickButton}
    >
      <TodoButtonIcon />
    </button>
  );
}

export { CreateTodoButton };
