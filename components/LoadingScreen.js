import Spinner from "react-bootstrap/Spinner";

const LoadingScreen = () => (
  <div id="loading-screen">
    <Spinner
      width="100px"
      height="100px"
      animation="border"
      variant="info"
      className="mx-auto d-block"
      id="loading-spinner"
    />
  </div>
);

export default LoadingScreen;
