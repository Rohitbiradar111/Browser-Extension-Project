import { useEffect, useState } from "react";
import { usebrowser } from "../../context/browser-context";
import { quotes } from "../../db/quotes";
import "../Task/Task.css";
import { Todo } from "../../components/Todo";

const index = Math.floor(Math.random() * quotes.length);
const quotations = quotes[index].quote;

export function Task() {

    const [ischecked, setIsChecked] = useState(false);
    const [isTodoButtonclicked, setIsTodoButtonClicked] = useState(false);

    const { name, time, message, task, browserDispatch } = usebrowser();

    useEffect(() => {
        const userTask = localStorage.getItem("task");
        browserDispatch({
            type: "TASK",
            payload: userTask
        })
        if (new Date().getDate() !== Number(localStorage.getItem("date"))) {
            localStorage.removeItem("task");
            localStorage.removeItem("date");
            localStorage.removeItem("checkedStatus");
        }
    }, []);

    useEffect(() => {
        const checkStatus = localStorage.getItem("checkedStatus");
        checkStatus === "true" ? setIsChecked(true) : setIsChecked(false);
    }, []);

    useEffect(() => {
        getCurrentTime()
    }, [time]);

    const getCurrentTime = () => {
        const today = new Date();
        const hour = today.getHours();
        const minute = today.getMinutes();
        const hours = hour < 10 ? `0${hour}` : hour;
        const minutes = minute < 10 ? `0${minute}` : minute;
        const time = `${hours}:${minutes}`;
        setTimeout(getCurrentTime, 1000);

        browserDispatch({
            type: "TIME",
            payload: time
        })

        browserDispatch({
            type: "MESSAGE",
            payload: hour
        })
    }

    const handleTask = (event) => {
        if (event.key === "Enter" && event.target.value.length > 0) {
            browserDispatch({
                type: "TASK",
                payload: event.target.value
            })
            localStorage.setItem("task", event.target.value);
            localStorage.setItem("date", new Date().getDate());
        }
    }

    const handleCompletedTask = (event) => {
        if (event.target.checked) {
            setIsChecked(ischecked => !ischecked);
        }
        else {
            setIsChecked(ischecked => !ischecked);
        }
        localStorage.setItem("checkedStatus", !ischecked);
    }

    const handleTaskClear = () => {
        browserDispatch({
            type: "CLEAR"
        })
        setIsChecked(false);
        localStorage.removeItem("task");
        localStorage.removeItem("checkedStatus");
    }

    const handleTodoButton = () => {
        setIsTodoButtonClicked(isTodoButtonclicked => !isTodoButtonclicked);
    }

    return (
        <>
            <div className="d-flex direction-column align-center justify-center">
                <h1 className="time">{time}</h1>
                <h1 className="message">{message}, {name.toUpperCase()}</h1>
                {
                    name !== null && task === null ? (
                        <div className="d-flex direction-column align-center justify-center">
                            <h1 className="focus-message">What is Your Focus Today ?</h1>
                            <input type="text" className="input" onKeyPress={handleTask} />
                        </div>
                    ) : (
                        <div className="d-flex direction-column align-center justify-center">
                            <h2 className="today-focus">Today's Focus</h2>
                            <div>
                                <input className="checkbox" id="input" type="checkbox" onChange={handleCompletedTask} checked={ischecked} />
                                <label id="label" className={ischecked ? "strike" : ""} for="input">{task}</label>
                                <button className="clear-button" onClick={handleTaskClear}>
                                    <span class="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                <div className="d-flex direction-column align-center justify-center">
                    <h3 className="quotes">{quotations}</h3>
                </div>
                {isTodoButtonclicked && <Todo />}
                <button className="todo-btn" onClick={handleTodoButton}>
                    TODO
                </button>
            </div>
        </>
    )
}
