import Header from "./Header";
import {useEffect, useState} from "react";
import apiRequest from "./apiRequest";
import AddTodo from "./AddTodo";
import crossIcon from "./images/icon-cross.svg"
import Toggle from "./toggle";
import FilterTodo from "./FilterTodo";

function Todo() {
    const API_URL = "http://localhost:3001/todo-list";
    const [todoList, setTodoList] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [filteredTodos, updateFilteredTodos] = useState('all');
    let filteredTodoList = todoList.filter((todo)=>{
        if(filteredTodos === 'active'){
            return todo.checked === false;
        }else if(filteredTodos === 'completed'){
            return todo.checked === true;
        }else{
            return todo;
        }
    })

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
        const myNewTodo = {id, title};
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

    const handleDelete = async (id) => {
        const listTodos = todoList.filter((todo) => (todo.id !== id));
        setTodoList(listTodos);
        const deleteOptions = {method: 'DELETE'};
        const requestUrl = `${API_URL}/${id}`;
        const result = await apiRequest(requestUrl, deleteOptions);
        if (result) setError(result);
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
                // console.log(data);
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

    function onFilterValueSelected(filterValue){
        updateFilteredTodos(filterValue)
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
                    {filteredTodoList && filteredTodoList.map((todo, id) => {
                        return (<div key={id}>
                                <div
                                    className={`flex justify-between text-2xl p-4 dark:bg-gray-800 dark:text-white border-t ${todo.checked ? 'line-through' : null}`}
                                    onDoubleClick={() => handleCheck(todo.id)}>
                                    <input type={'checkbox'} checked={todo.checked}
                                           onChange={() => handleCheck(todo.id)}/>
                                    {todo.title}
                                    <img className={''} src={crossIcon} alt={'crossIcon'}
                                         onClick={() => handleDelete(todo.id)}/>
                                </div>
                            </div>)
                    })}
                    <FilterTodo filterValueSelected={onFilterValueSelected}/>
                </div>
            </div>
        </>);
}

export default Todo;