import Header from "./Header";
import {useEffect, useState} from "react";

function Todo() {
    const [todoList, setTodoList] = useState([]);
    useEffect(()=>{
        let url = "http://localhost:3001/todo-list"
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setTodoList(data);
            })
    },[]);
    console.log(todoList);
    return (
        <>
            <Header/>
            <div className={'flex flex-col'}>
                <div className={'-mt-56 m-auto lg:w-1/2'}>
                    <h1 className={'font-bold text-5xl text-white'}>TODO</h1>
                    <input placeholder={'Create a new Todo'}
                           className={'my-10 text-2xl p-4 bg-gray-800 text-white w-full'}></input>
                    {todoList && todoList.map((todo, index) => {
                        return (
                        <div key={index}>
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