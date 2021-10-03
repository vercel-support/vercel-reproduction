import styles from "./AnalysisButton.module.css";
import Dropdown from "react-bootstrap/Dropdown";

const GraphDropdown = ({ children, onClick, currentGraph }) => {
  return (
    <Dropdown className="d-inline-flex">
      <Dropdown.Toggle
        as="div"
        variant="outline"
        className={`${styles.dropdown} ${styles.button}`}
        id={styles.active}
      >
        <span className="text-left">{children}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-0">
        <Dropdown.Item
          className={`btn py-1 ${styles.drowdown}`}
          onClick={() => onClick("dayAmount")}
        >
          Posts (Day)
        </Dropdown.Item>
        <Dropdown.Item
          className={`btn py-1 ${styles.drowdown}`}
          onClick={() => onClick("dayEngagement")}
        >
          Engagement (Day)
        </Dropdown.Item>
        <Dropdown.Item
          className={`btn py-1 ${styles.drowdown}`}
          onClick={() => onClick("weekAmount")}
        >
          Posts (Week)
        </Dropdown.Item>
        <Dropdown.Item
          className={`btn py-1 ${styles.drowdown}`}
          onClick={() => onClick("weekEngagement")}
        >
          Engagement (Week)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GraphDropdown;
