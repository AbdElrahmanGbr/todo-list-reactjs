let FilterTodo = (props) => {

    return (
        <>
            <div
                className={'border-gray-600 rounded-xl md:flex lg:flex xl:flex 2xl:flex hidden text-2xl p-4 dark:bg-gray-800 dark:text-white border-t border-gray-600 flex justify-between text-base font-bold'}>
                <span className={'text-gray-500 font-medium ml-5'}>{props.todoList.length} items left</span>
                <div className={'space-x-3'}>
                    <button onClick={() => props.filterValueSelected('all')}>All</button>
                    <button onClick={() => props.filterValueSelected('active')}>Active</button>
                    <button onClick={() => props.filterValueSelected('completed')}>Completed</button>
                </div>
                <button className={'mr-5'} onClick={props.handleClearCompleted}>Clear Completed</button>
            </div>

            <div className={'md:hidden lg:hidden sm:block'}>
                <div
                    className={'border-gray-600 rounded-xl flex text-2xl p-4 dark:bg-gray-800 dark:text-white border-t border-gray-600 justify-around text-base font-bold'}>
                    <span className={'text-gray-500 font-medium ml-5'}>{props.todoList.length} items left</span>
                    <button className={'mr-5'} onClick={props.handleClearCompleted}>Clear Completed</button>
                </div>
                <div
                    className={'border-gray-600 rounded-xl flex text-2xl p-4 dark:bg-gray-800 dark:text-white border-t border-gray-600 justify-center text-base font-bold space-x-5'}>
                    <button onClick={() => props.filterValueSelected('all')}>All</button>
                    <button onClick={() => props.filterValueSelected('active')}>Active</button>
                    <button onClick={() => props.filterValueSelected('completed')}>Completed</button>
                </div>
            </div>

        </>
    );
}


export default FilterTodo;