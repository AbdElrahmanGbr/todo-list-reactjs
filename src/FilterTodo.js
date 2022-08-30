
let FilterTodo = (props) => {
    function onFilterValueChanged(event){
        props.filterValueSelected(event.target.value)
    }

    return(
    <select className={'text-2xl p-4 dark:bg-gray-800 dark:text-white border-t'} onChange={onFilterValueChanged}>
        <option value={'all'}>All</option>
        <option value={'active'}>Active</option>
        <option value={'completed'}>Completed</option>
    </select>
    );
}



export default FilterTodo;