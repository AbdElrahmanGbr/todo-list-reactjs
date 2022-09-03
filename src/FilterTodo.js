let FilterTodo = (props) => {

    return (
        <>
            <div
                className={'dark:bg-todoBg-dark bg-todoBg-light border-t dark:border-borderColor rounded-b-xl lg:flex xl:flex 2xl:flex hidden py-4 dark:text-filterText-dark text-filterText-light flex justify-between'}>
                <span className={'ml-5 dark:text-filterText-dark text-filterText-light'}>{props.todoList.length} items left</span>
                <div className={'space-x-3'}>
                    <button className="text-allBtn hover:cursor-pointer" onClick={() => props.filterValueSelected('all')}>All</button>
                    <button className={'filterButton'} onClick={() => props.filterValueSelected('active')}>Active</button>
                    <button className={'filterButton'} onClick={() => props.filterValueSelected('completed')}>Completed</button>
                </div>
                <button className={'mr-5 filterButton'} onClick={props.handleClearCompleted}>Clear Completed</button>
            </div>

            <div className={'md:block lg:hidden sm:block'}>
                <div
                    className={'dark:bg-todoBg-dark bg-todoBg-light border-t dark:border-borderColor rounded-b-xl flex p-4 dark:bg-todoBg-dark dark:text-filterText-dark text-filterText-light  justify-around'}>
                    <span className={'font-thin ml-5'}>{props.todoList.length} items left</span>
                    <button className={'mr-5 filterButton'} onClick={props.handleClearCompleted}>Clear Completed</button>
                </div>
                <div
                    className={'font-semiBold mt-4 dark:bg-todoBg-dark bg-todoBg-light dark:border-borderColor border-t rounded-xl flex text-2.5xl p-4 dark:text-filterText-dark text-filterText-light justify-center space-x-5'}>
                    <button className="text-allBtn hover:cursor-pointer" onClick={() => props.filterValueSelected('all')}>All</button>
                    <button className={'filterButton'} onClick={() => props.filterValueSelected('active')}>Active</button>
                    <button className={'filterButton'} onClick={() => props.filterValueSelected('completed')}>Completed</button>
                </div>
            </div>
            <div className={'m-auto mt-10 dark:text-filterText-dark text-filterText-light'}>
                Drag and drop to reorder list
            </div>

        </>
    );
}


export default FilterTodo;