import styles from "./GraphButton.module.css";

function GraphButton({ showGraphSection, toggleGraph }) {
  return (
    <div
      className={`col-xs-12 col-lg-4 ml-auto pointer align-items-center ${styles.graphButton}`}
      id={showGraphSection ? styles.reverseGraphButton : ""}
      onClick={toggleGraph}
    >
      <div className={styles.imageBox}>
        <div
          className={`${styles.image} align-self-center`}
          id={showGraphSection ? styles.reverseImage : ""}
        ></div>
      </div>

      <div
        className={styles.imgText}
        id={showGraphSection ? styles.reverseImgText : ""}
      >
        <p id={styles.title} className={styles.clickable}>
          Graph Representation
        </p>
        {showGraphSection ? (
          <>
            <p className="mb-2">Hide Analysis</p>
            <div className={styles.buttonWrapper}>
              <div className={styles.buttonText}>Click Here</div>
            </div>
          </>
        ) : (
          <>
            <p id={styles.body} className="mb-2">
              Statistical Analysis
            </p>
            <div className={styles.buttonWrapper}>
              <div className={styles.buttonText}>Click Here</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GraphButton;
