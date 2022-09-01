import Header from "./Header";
import {useEffect, useState} from "react";
import apiRequest from "./apiRequest";
import AddTodo from "./AddTodo";
import crossIcon from "./images/icon-cross.svg"
import Toggle from "./toggle";
import FilterTodo from "./FilterTodo";
import checkIcon from "./images/icon-check.svg"
import React from "react";

function Todo() {
    const API_URL = "http://localhost:3001/todo-list";
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
    return (<>
        <Header/>
        <div className={'flex flex-col'}>
            <div className={'-mt-56 m-auto lg:w-1/2'}>
                <div className={'flex justify-between'}>
                    <h1 className={'font-bold text-5xl text-white'}>TODO</h1>
                    <Toggle/>
                </div>
                <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} handleSubmit={handleSubmit}/>
                {error && <div className={'font-bold dark:text-white'}>{error}</div>}
                {isPending && <div className={'dark:text-white'}>Loading Data...</div>}
                            <div className={'dark:border-2 border-gray-900 rounded-lg'}>
                                {filteredTodos && filteredTodos.map((todo, id) => {
                                    return (<div key={id}>
                                    <div
                                            className={`group bg-white flex justify-left text-2xl p-4 dark:bg-gray-800 dark:text-white border-t border-gray-600 ${todo.checked ? 'line-through' : null}`}
                                            onDoubleClick={() => handleCheck(todo.id)}>
                                            {todo.checked ? <div className="block">
                                                <img src={checkIcon}
                                                     className="p-1 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 via-cyan-300 to-fuchsia-800"
                                                     alt={'check icon'} onClick={() => handleCheck(todo.id)}/>
                                            </div> : <div className="block">
                                                <input type="checkbox"
                                                       className="p-1 dark:bg-gray-800 w-7 h-7 rounded-full hover:border-purple-700"
                                                       checked={todo.checked}
                                                       onChange={() => handleCheck(todo.id)}/>
                                            </div>}
                                            <p className={'ml-6'}>
                                                {todo.title}
                                            </p>
                                            <div className={'ml-auto'}>
                                                <img className={'w-6 h-6 hidden group-hover:inline-flex'}
                                                     src={crossIcon} alt={'crossIcon'}
                                                     onClick={() => handleDelete(todo.id)}/>
                                            </div>

                                        </div>
                                    </div>)
                                })}
                    </div>
                            <FilterTodo filterValueSelected={onFilterValueSelected} todoList={todoList} handleClearCompleted={handleClearCompleted}/>
                            </div>
                            </div>
                            </>);}

                        export default Todo;