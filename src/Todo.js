import Header from "./Header";
import {useEffect, useState} from "react";
import apiRequest from "./apiRequest";
import AddTodo from "./AddTodo";
import crossIcon from "./images/icon-cross.svg"
import Toggle from "./toggle";
import FilterTodo from "./FilterTodo";
import checkIcon from "./images/icon-check.svg"
import React from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

function Todo() {
    const API_URL = "https://todolist-reactjs-nodejs.up.railway.app/todo-list";
    const [todoList, setTodoList] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [filteredTodosType, updateFilteredTodosType] = useState('all');
    const [filteredTodos, updateFilteredTodos] = useState(todoList);

    useEffect(() => {
        if (todoList.length > 0) {
            if (filteredTodosType === 'active') {
                updateFilteredTodos(todoList.filter(t => t.checked === false))
            } else if (filteredTodosType === 'completed') {
                updateFilteredTodos(todoList.filter(t => t.checked === true))
            } else if (filteredTodosType === 'all') {
                updateFilteredTodos(todoList)
            }
        }
    }, [filteredTodosType, todoList])


    const handleCheck = async (id) => {
        const listTodos = todoList.map((todo) => todo.id === id ? {...todo, checked: !todo.checked} : todo);
        setTodoList(listTodos);
        const myTodo = listTodos.filter((todo) => todo.id === id);
        const updateOptions = {
            method: 'PATCH', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({checked: myTodo[0].checked})
        };
        const requestUrl = `${API_URL}/${id}`;
        const result = await apiRequest(requestUrl, updateOptions);
        if (result) setError(result);
    }
    const addTodo = async (title) => {
        const id = todoList.length ? todoList[todoList.length - 1].id + 1 : 1;
        const myNewTodo = {id, title, 'checked': false};
        const listTodos = [...todoList, myNewTodo];
        setTodoList(listTodos);
        const postOptions = {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(myNewTodo)
        }
        const result = await apiRequest(API_URL, postOptions);
        if (result) setError(result);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTodo) return;
        console.log(newTodo);
        addTodo(newTodo);
        setNewTodo('');
        console.log('submitted');
    }

    useEffect(() => {
        fetch(API_URL)
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource!');
                }
                return res.json()
            })
            .then(data => {
                console.log('data from useffect', data);
                setTodoList(data);
                setIsPending(false);
                setError([]);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    }, []);
    console.log(todoList);

    function onFilterValueSelected(filterValue) {
        updateFilteredTodosType(filterValue)
    }

    function handleClearCompleted() {
        const listTodos = todoList.filter((todo) => (todo.checked === false));
        setTodoList(listTodos);
    }

    const handleDelete = async (id) => {
        const listTodos = todoList.filter((todo) => (todo.id !== id));
        setTodoList(listTodos);
        const deleteOptions = {method: 'DELETE'};
        const requestUrl = `${API_URL}/${id}`;
        const result = await apiRequest(requestUrl, deleteOptions);
        if (result) setError(result);
    }
    // Function to update list on drop
    const handleDrop = (droppedItem) => {
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        const updatedList = [...todoList];
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        // Update State
        setTodoList(updatedList);
    };
    return (<div className={'font-customSans text-lg dark:bg-containerBg-dark bg-containerBg-light'}>
        <Header/>
        <div className={'min-h-screen absolute top-16 w-full pt-4 drop-shadow-2xl'}>
            <div className={'flex flex-col m-auto lg:w-5/12 md:w-6/12 sm:w-7/12 w-8/12 h-full'}>
                <div className={'flex justify-between bg-transparent'}>
                    <h1 className={'font-bold text-white text-4xl'}>T O D O</h1>
                    <Toggle/>
                </div>
                <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} handleSubmit={handleSubmit}/>
                {error && <div className={'font-bold dark:text-todosTextColor-dark'}>{error}</div>}
                {isPending && <div className={'dark:text-todosTextColor-dark'}>Loading Data...</div>}
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps}
                                 ref={provided.innerRef}>
                                {filteredTodos && filteredTodos.map((todo, index) => {
                                    return (<Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                        {(provided) => (<div {...provided.draggableProps} {...provided.dragHandleProps}
                                                             ref={provided.innerRef}
                                                             className={`first:rounded-t-lg dark:bg-todoBg-dark dark:text-todosText-dark bg-todoBg-light  text-todosText-light hover:dark:text-filterText-darkHover hover:text-filterText-lightHover group bg-white flex justify-left p-4  border-t dark:border-borderColor ${todo.checked ? 'line-through dark:text-linedText-dark text-linedText-light' : null}`}
                                                             onDoubleClick={() => handleCheck(todo.id)}>
                                            {todo.checked ? <div className="grid place-items-center">
                                                <img src={checkIcon}
                                                     className="rounded-full p-1.5 w-5 h-5 bg-gradient-to-tl from-linear-gradient-1 to-linear-gradient-2 hover:cursor-pointer"
                                                     alt={'check icon'} onClick={() => handleCheck(todo.id)}/>
                                            </div> : <div className="block">
                                                <input type="checkbox"
                                                       className="p-1 dark:bg-todoBg-dark bg-todoBg-light w-5 h-5 rounded-full hover:border-purple-700 hover:cursor-pointer"
                                                       checked={todo.checked}
                                                       onChange={() => handleCheck(todo.id)}/>
                                            </div>}
                                            <p className={'ml-6'}>
                                                {todo.title}
                                            </p>
                                            <div className={'ml-auto'}>
                                                <img className={'w-5 h-5 hidden group-hover:inline-flex'}
                                                     src={crossIcon} alt={'crossIcon'}
                                                     onClick={() => handleDelete(todo.id)}/>
                                            </div>
                                        </div>)}
                                    </Draggable>);
                                })}
                                {provided.placeholder}
                            </div>)}
                    </Droppable>
                </DragDropContext>
                <FilterTodo filterValueSelected={onFilterValueSelected} todoList={todoList}
                            handleClearCompleted={handleClearCompleted}/>
            </div>
        </div>
    </div>);
}

export default Todo;
