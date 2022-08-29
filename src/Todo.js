import Header from "./Header";
import {useEffect, useState} from "react";
import apiRequest from "./apiRequest";
import AddTodo from "./AddTodo";

function Todo() {
    const API_URL = "http://localhost:3001/todo-list";
    const [todoList, setTodoList] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = async (title) => {
        const id = todoList.length ? todoList[todoList.length - 1].id + 1 : 1;
        const myNewTodo = {id, title};
        const listTodos = [...todoList, myNewTodo];
        setTodoList(listTodos);
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myNewTodo)
        }
        const result = await apiRequest(API_URL, postOptions);
        if (result) setError(result);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newTodo) return;
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

    return (
        <>
            <Header/>
            <div className={'flex flex-col'}>
                <div className={'-mt-56 m-auto lg:w-1/2'}>
                    <h1 className={'font-bold text-5xl text-white'}>TODO</h1>
                    <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} handleSubmit={handleSubmit} />
                    {error && <div className={'font-bold text-white'}>{error}</div>}
                    {isPending && <div className={'text-white'}>Loading Data...</div>}
                    {todoList && todoList.map((todo, id) => {
                        return (
                            <div key={id}>
                                <div className={'text-2xl p-4 bg-gray-800 text-white border-t'}>{todo.title}</div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>

        </>
    );
}

export default Todo;