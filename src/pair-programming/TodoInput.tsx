import { FormEvent, useState } from "react"

interface InputProps{
addTodo: (text: string) => void
}

export const TodoInput: React.FC<InputProps> = ({addTodo}) =>{
    const [value, setValue] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        addTodo(value)
        setValue('')
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            style={{flex: 1,
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginRight: "10px",}}
            />
            <button type="submit" 
            style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",}} >Add</button>
        </form>
    )
}
