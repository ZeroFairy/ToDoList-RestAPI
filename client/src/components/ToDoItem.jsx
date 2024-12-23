export function ToDoItem({ completed, id, title, toggleTodo, deleteTodo }) {
    return (
        <li>
            <label>
                <input 
                    type="checkbox" 
                    checked={completed}
                    onChange={() => toggleTodo(id)} 
                />
                {title}
            </label>
            <button 
                onClick={() => deleteTodo(id)}
                className="btn btn-danger"
            >
                Delete
            </button>
        </li>
    )
}