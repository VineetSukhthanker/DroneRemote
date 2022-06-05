import "./App.css";
import * as React from "react";
import axios from "axios";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Slider,
  debounce,
  Button,
} from "@mui/material";

function App() {
  const [value, setValue] = React.useState(0);
  const [pitch, setPitch] = React.useState(50);
  const [yaw, setYaw] = React.useState(50);
  const [roll, setRoll] = React.useState(50);
  const [arm, setArm] = React.useState(false);

  const handleArm = (state) => {
    if (state) {
      axios.post("http://localhost:8000/nav/arm/", { arm: true }).then(() => {
        setArm(state);
      });
    } else {
      axios.post("http://localhost:8000/nav/arm/", { arm: false }).then(() => {
        setArm(state);
      });
    }
  };

  const handleNav = (thr, pit, rol, ya) => {
    thr = 1000 + thr * 10;
    pit = 1000 + pit * 10;
    rol = 1000 + rol * 10;
    ya = 1000 + ya * 10;
    axios
      .post("http://localhost:8000/nav/throttle/", {
        thr: thr,
        pitch: pit,
        roll: rol,
        yaw: ya,
      })
      .then((res) => {
        console.log(thr, pit, rol, ya);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delayedHandleNav = React.useCallback(
    debounce((e, f, g, h) => {
      handleNav(e, f, g, h);
    }, 50),
    []
  );

  const setDefault = () => {
    setPitch(50);
    setRoll(50);
    setYaw(50);
    delayedHandleNav(value, 50, 50, 50);
  };

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
            setValue(e.target.value);
            delayedHandleNav(e.target.value, pitch, roll, yaw);
          }}
        />
        <p>{value * 10 + 1000}</p>
        Pitch
        <Slider
          value={pitch}
          onChange={(e) => {
            setPitch(e.target.value);
            delayedHandleNav(value, e.target.value, roll, yaw);
          }}
        />
        <p>{pitch * 10 + 1000}</p>
        Roll
        <Slider
          value={roll}
          onChange={(e) => {
            setRoll(e.target.value);
            delayedHandleNav(value, pitch, e.target.value, yaw);
          }}
        />
        <p>{roll * 10 + 1000}</p>
        Yaw
        <Slider
          value={yaw}
          onChange={(e) => {
            setYaw(e.target.value);
            delayedHandleNav(value, pitch, roll, e.target.value);
          }}
        />
        <p>{yaw * 10 + 1000}</p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setDefault();
          }}
        >
          Set default
        </Button>
      </div>
    </div>
  );
}

export default App;
