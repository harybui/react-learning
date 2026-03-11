import { useState } from "react"
import { Button } from "antd"

const ToggleSwitch = () => {
    const [isOn, setIsOn]=useState(false)
    const handleToggle = () =>{
        setIsOn(!isOn)
    }
  return (
    <Button onClick={handleToggle}>
        {isOn ? "ON" : "OFF"}
    </Button>
  )
}

export default ToggleSwitch