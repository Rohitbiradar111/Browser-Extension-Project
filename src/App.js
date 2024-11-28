import './App.css';
import Home from './pages/Home/Home';
import { Task } from './pages/Task/Task';
import { images } from "./db/images";
import { usebrowser } from './context/browser-context';
import { useEffect } from 'react';

const index = Math.floor(Math.random() * images.length);
const imageArr = images[index].image;
console.log(imageArr);

function App() {

  const { name, browserDispatch } = usebrowser();

  useEffect(() => {
    const userName = localStorage.getItem("name");
    browserDispatch({
      type: "NAME",
      payload: userName
    })
  }, [])

  return (
    <div className="app" style={{ backgroundImage: `url("${imageArr}")` }}>
      {name ? <Task /> : <Home />}
    </div>
  );
}

export default App;
