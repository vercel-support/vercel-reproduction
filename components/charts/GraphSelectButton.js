import dynamic from "next/dynamic";

const Hammer = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.Hammer)
);

import styles from "./GraphSelectButton.module.css";

function GraphSelectButton({ val, type, active, setActive, selectGraph }) {
  if (val == "custom") {
    return (
      <button
        type="button"
        className={`${styles.button} btn ${
          active == type ? styles.active : ""
        }`}
        onClick={() => {
          setActive(type);
          selectGraph("custom");
        }}
      >
        <Hammer fontSize="1.3em" />
      </button>
    );
  }

  return (
    <input
      type="button"
      className={`${styles.button} btn ${active == type ? styles.active : ""} `}
      value={val}
      onClick={() => {
        setActive(type);
        selectGraph(type);
      }}
    />
  );
}

export default GraphSelectButton;
