import styles from "./Lightbox.module.css";
import Slides from "./Slides";

const Lightbox = ({ prop, handler }) => {
  return (
    <div id={styles.lightboxContainer} onClick={handler}>
      {/* <div id={styles.imageContainer} dangerouslySetInnerHTML={{__html: sanitize(prop.innerHTML)}}>
      </div> */}
      <div id={styles.imageContainer}>
        <Slides slides={props} />
      </div>
    </div>
  );
};

export default Lightbox;
