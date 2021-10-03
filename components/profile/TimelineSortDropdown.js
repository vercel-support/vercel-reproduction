import styles from "./AnalysisButton.module.css";
import Dropdown from "react-bootstrap/Dropdown";

const TimelineSortDropdown = ({ children, onClick, style }) => {
  return (
    <Dropdown className="d-inline-flex">
      <Dropdown.Toggle
        as="div"
        variant="outline"
        className={`${styles.dropdown} ${styles.button}`}
        id={styles.active}
        style={style}
      >
        <span className="text-left">{children}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-0">
        <Dropdown.Item
          className={`btn py-1 ${styles.drowdown}`}
          onClick={() => onClick("id")}
        >
          Date
        </Dropdown.Item>
        <Dropdown.Item
          className={`btn py-1 ${styles.drowdown}`}
          onClick={() => onClick("liked")}
        >
          Likes
        </Dropdown.Item>
        <Dropdown.Item
          className={`btn py-1 ${styles.drowdown}`}
          onClick={() => onClick("comment_count")}
        >
          Comments
        </Dropdown.Item>
        <Dropdown.Item
          className={`btn py-1 ${styles.drowdown}`}
          onClick={() => onClick("engagement_rate")}
        >
          Engagement
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TimelineSortDropdown;
