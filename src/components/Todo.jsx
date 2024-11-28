import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import "./Todo.css";

export const Todo = () => {

    const [todo, setTodo] = useState();
    const [todolist, setTodoList] = useState([]);

    const handleTodoInput = (event) => {
        setTodo(event.target.value);
    }

    useEffect(() => {
        const todo = JSON.parse(localStorage.getItem("todo"));
        todo && setTodoList(todo);
    }, [])

    const handleTodoEnterKey = (event) => {
        if (event.key === "Enter" && event.target.value.length > 0) {
            const updatedTodoList = [...todolist, { _id: uuid(), todo, isCompleted: false }];
            setTodoList(updatedTodoList);
            setTodo("");
            localStorage.setItem("todo", JSON.stringify(updatedTodoList));
        }
    }

    const handleTodoCheckbox = (todoid) => {
        const updatedTodoList = todolist.map(todo => todoid === todo._id ? { ...todo, isCompleted: !todo.isCompleted } : todo);
        setTodoList(updatedTodoList);
        localStorage.setItem("todo", JSON.stringify(updatedTodoList));
    }

    const handleTodoDelete = (todoid) => {
        const updatedTodoList = todolist.filter(({ _id }) => _id !== todoid)
        setTodoList(updatedTodoList);
        localStorage.setItem("todo", JSON.stringify(updatedTodoList));
    }


    return (
        <div className="todo-container">
            <div className="todo-input-container">
                <input value={todo} className="todo-input" placeholder="Enter todo here" type="text" onChange={handleTodoInput} onKeyPress={handleTodoEnterKey} />
            </div>
            <div className="todo-list">
                {
                    todolist && todolist.map(({ todo, _id, isCompleted }) => {
                        return (
                            <div key={_id} className="todos-div">
                                <input type="checkbox" onChange={() => handleTodoCheckbox(_id)} className="todo-checkbox" checked={isCompleted} />
                                <label className={isCompleted ? "strike" : ""} id="todo-label">{todo}</label>
                                <button className="todo-clear-btn" onClick={() => handleTodoDelete(_id)}>
                                    <span class="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}