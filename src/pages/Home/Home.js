import "../Home/Home.css";
import { usebrowser } from "../../context/browser-context";

function Home() {

    const { name, browserDispatch } = usebrowser();

    const handleInputChange = (event) => {
        if (event.key === "Enter" && event.target.value.length > 0) {
            browserDispatch({
                type: "NAME",
                payload: event.target.value
            })
            localStorage.setItem("name", event.target.value);
        }
    }

    return (
        <>
            <div className="d-flex direction-column align-center justify-center gap">
                <h1 className="heading-1 gap margin">Welcome to MyXtension</h1>
                <div className="heading-2 gap d-flex direction-column align-center justify-center gap margin">
                    <h2>Hello, What's Your Name ?</h2>
                    <input type="text" className="input" onKeyPress={handleInputChange} />
                </div>
            </div>
        </>
    )
}

export default Home;