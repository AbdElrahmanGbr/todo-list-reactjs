const AddTodo = ({newTodo, setNewTodo, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={'flex justify-between my-10 text-2xl p-4 dark:bg-gray-800 dark:text-white w-full'}>
                <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} autoFocus id={'addTodo'} placeholder={'Create a new Todo'} className={'dark:bg-gray-800 dark:text-white w-full'}></input>
                <button type={'submit'}>Add Todo</button>
            </div>
        </form>
    )
}

export default AddTodo;