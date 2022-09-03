import {BsClipboardPlus} from "react-icons/bs";

const AddTodo = ({newTodo, setNewTodo, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={'dark:bg-todoBg-dark rounded-lg bg-white flex justify-between my-10 p-4 dark:to-todosText-dark w-full text-todosText-light'}>
                <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} autoFocus id={'addTodo'} placeholder={'Create a new Todo'} className={'focus:outline-none dark:bg-gray-800 dark:text-white w-full'}></input>
                <button><BsClipboardPlus className={'m-1 dark:text-white'} type={'submit'}/></button>
            </div>
        </form>
    )
}

export default AddTodo;