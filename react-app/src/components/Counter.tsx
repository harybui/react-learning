import { useState } from "react"
function Counter(){
    //khai bao ban dau
    const[count,setCount] =useState(1);
    //xu ly add
    function handleAdd(){
        setCount(count+1);
    }
    return(
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}
export default Counter;