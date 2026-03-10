import ListGroup from "./components/ListGroup";
import Counter from "./components/Counter";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from "react";
import Notification from "./components/notification";
function App() {
  // let items = ["New York", "San Francisco", "Tokyo", "London"];
  // const handleSelectedItem=(item:string)=>{
  //   console.log(item);
  // }

  //hook
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    // <div>
    //    <ListGroup items={items} heading={"Cities"} onSelectedItem={handleSelectedItem} />
    // </div>
    // <div>
    //   <Alert>
    //     This is <span>an alert</span>!
    //   </Alert>{" "}
    // </div>

    // <div>
    //   {alertVisible && <Alert onClose={()=> setAlertVisible(false)}>My alert</Alert>}
    //   <Button color="secondary" onClick={() => setAlertVisible(true)}>my btn</Button>
    // </div>
    <div>
      <Notification />
    </div>
  );
}
export default App;
