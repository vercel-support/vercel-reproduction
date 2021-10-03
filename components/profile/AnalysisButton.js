import dynamic from "next/dynamic";

const CaretRightFill = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.CaretRightFill)
);

const CaretDownFill = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.CaretDownFill)
);

import styles from "./AnalysisButton.module.css";
import GraphDropdown from "./GraphDropdown";

const AnalysisButton = ({
  children,
  active = false,
  arrowDown = false,
  leftItem,
  customIcon,
  mobileCustomOnly,
  dropdown,
  style,
  currentGraph,
  onClick,
}) => {
  if (dropdown === "graphs") {
    return (
      <GraphDropdown currentGraph={currentGraph} onClick={onClick}>
        {children}
      </GraphDropdown>
    );
  }

  return (
    <div
      className={styles.button}
      id={active ? styles.active : null}
      style={style}
      onClick={onClick}
    >
      {leftItem && customIcon}
      <span className="text-left">{children}</span>
      {!leftItem && customIcon && mobileCustomOnly ? (
        customIcon
      ) : arrowDown ? (
        <CaretDownFill />
      ) : (
        <CaretRightFill />
      )}
    </div>
  );
};

export default AnalysisButton;
