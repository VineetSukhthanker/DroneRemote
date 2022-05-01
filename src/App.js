import "./App.css";
import * as React from "react";
import { FormControlLabel, FormGroup, Switch, Slider } from "@mui/material";

function App() {
  const [value, setValue] = React.useState(0);
  const [pitch, setPitch] = React.useState(50);
  const [yaw, setYaw] = React.useState(0);
  const [roll, setRoll] = React.useState(50);

  return (
    <div className="App">
      <div className="remoteContainer">
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Arm" />
        </FormGroup>
        Throttle
        <Slider
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        Pitch
        <Slider
          value={pitch}
          onChange={(e) => {
            setPitch(e.target.value);
          }}
        />
        Roll
        <Slider
          value={roll}
          onChange={(e) => {
            setRoll(e.target.value);
          }}
        />
        Yaw
        <Slider
          value={yaw}
          onChange={(e) => {
            setYaw(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default App;
