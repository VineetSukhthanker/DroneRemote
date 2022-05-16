import "./App.css";
import * as React from "react";
import axios from "axios";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Slider,
  debounce,
} from "@mui/material";

function App() {
  const [value, setValue] = React.useState(0);
  const [pitch, setPitch] = React.useState(50);
  const [yaw, setYaw] = React.useState(0);
  const [roll, setRoll] = React.useState(50);
  const [arm, setArm] = React.useState(false);

  const handleArm = (state) => {
    if (state) {
      axios
        .post("http://192.168.0.108:8000/nav/arm/", { arm: true })
        .then(() => {
          setArm(state);
        });
    } else {
      axios
        .post("http://192.168.0.108:8000/nav/arm/", { arm: false })
        .then(() => {
          setArm(state);
        });
    }
  };

  const handleNav = (val) => {
    let thr = 1000 + val * 10;
    setValue(val);
    axios
      .post("http://192.168.0.108:8000/nav/throttle/", {
        thr: thr,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const delayedHandleNav = React.useCallback(
    debounce((e) => {
      handleNav(e);
    }, 50),
    []
  );

  return (
    <div className="App">
      <div className="remoteContainer">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={arm}
                onChange={(e) => {
                  handleArm(e.target.checked);
                }}
              />
            }
            label="Arm"
          />
        </FormGroup>
        Throttle
        <Slider
          value={value}
          onChange={(e) => {
            delayedHandleNav(e.target.value);
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
