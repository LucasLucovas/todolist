import React from "react";
import { TodoCounter } from "../../todolist/src/TodoCounter";
import { TodoSearch } from "../../todolist/src/TodoSearch";
import { TodoList } from "../../todolist/src/TodoList";
import { TodoItem } from "../../todolist/src/TodoItem";
import { CreateTodoButton } from "../../todolist/src/CreateTodoButton";
// import './App.css';


// const defaultTodos =[
//   { text: 'Cortar cebolla', completed: true},
//   { text: 'Tomar el curso', completed: false},
//   { text: 'Comprar pan', completed: false},
// ];

function useLocalStorage(itemName, initialValue) {
  
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;
  

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItem);

  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  };

  return [
    item,
    saveItem,
  ];

};

function App() {

  const [todos,saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');


  const completedTodos = todos.filter(todo => todo.completed == true).length; /*Filtra los todos que esten completados y luego dice cuantos son*/
  const totalTodos = todos.length;  //Total de todos completados o no

  let searchedTodos = [];

  //filtrador de busqueda
  if (!searchValue.length >= 1) { //aca pone que si no se escribio ninguna letra entonces que le pase  todos los todos al array vacio searchedTodos y ya de ahi se lo pasas al .map() para que lo recorra y muestre 
    searchedTodos= todos;
  }else{
    searchedTodos = todos.filter(todo => { /* por cada uno de los todos estamos filtrando y convirtiendo todo a minusculas a ver 
                            cuales de todos estos todos incluyen en alguna parte el texto que escribimos en nuestro imput de busqueda */ 
      const todoText = todo.text.toLowerCase() //este convierte el texto de los todos a minusculas para compararlos
      const searchText = searchValue.toLowerCase();//este convierte lo que escribimos a minusculas para compararlo con los todos
      return todoText.includes(searchText);// este compara si los todos contienen alguna letra o palabra de lo que escribimos y lo retorna a searchedTodos para mostrarlos
    })

  }



  const completeTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text );
      
      const newTodos=[...todos]//lista de todos con los todos que teniamos antes con el metodo spread ...
      newTodos[todoIndex].completed = !newTodos[todoIndex].completed; //buscamos la posicion del todo y le indicamos que cuando se complete es igual a true y si le damos denuevo lo desmarca
       /* esta fucion cada vez que reciba un texto va a buscar cual de todos los todos en nuestra lista de todos
       cumple con esa condicion estamos clonando nuestros todos (creando una nueva lista de todos)
       y estamos marcandole a ese todo que cumple con las condiciones de tener el mismo texto  la propiedad completed como true
       y luego de eso mandamos a actualizar nuestro estado para volver a renderizar nuestra aplicacion
       */
      saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);//splice corta el array desde donde se le diga en el primer parametro que es el todoIndex y el segundo es la cantidad de todos
    saveTodos(newTodos);
  }



  
 

  return (
    <>
      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />


      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>


        {searchedTodos.map(todo =>(
          <TodoItem 
          key={todo.text}
          text={todo.text}
          completed={todo.completed}
          onComplete ={()=> completeTodo(todo.text)}/*esta propiedad llama a la funcion completeTodos enviandole el texto de ese todo*/
          onDelete ={()=> deleteTodo(todo.text)}
           />
        ))}
      </TodoList>

      <CreateTodoButton/>
      
    </>
  );
}

export default App;
