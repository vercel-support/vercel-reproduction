import Navbar from "./Navbar";

const Layout = ({ children, showSearch, showGreySearch }) => (
  <>
    <Navbar showSearch={showSearch} showGreySearch={showGreySearch} />
    <div id="profile" className="container-fluid mt-5 px-0">
      {children}
    </div>
  </>
);

export default Layout;
