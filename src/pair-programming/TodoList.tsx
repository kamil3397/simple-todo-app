import { Todo } from "./TodoApp"

interface TodoListProps{
    todos: Todo[]
    toggleTodo: (id: number) => void
    deleteTodo: (id: number)=> void
}
export const TodoList: React.FC<TodoListProps> = ({todos, toggleTodo, deleteTodo})=>{
 if (todos.length === 0) return <p>No todos yet</p>

    return(
        <>
        <h5>Click checkbox if u completed the task</h5>
        
        <ul>
            {todos.map(({id, text, completed})=>(
                <li key={id} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #ddd",}}>

                <span style={{ textDecoration: completed ? "line-through" : "none" }}>
                {text}
                 </span>

                    <input
                    type="checkbox"
                    checked={completed}
                    onChange={()=> toggleTodo(id)}
                    style={{
                        transform: "scale(1.3)",
                        marginRight: "10px",}}
                    />
                    <button onClick={()=> deleteTodo(id)} 
                    style={{ 
                    padding: "5px 10px",
                    background: "#dc3545",
                    border: "none",
                    borderRadius: "5px",
                    color: "#fff",
                    cursor: "pointer",}}>Delete</button>
                </li>
            ))}
        </ul>
        </>
 )
}