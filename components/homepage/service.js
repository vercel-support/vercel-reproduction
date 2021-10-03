import dynamic from "next/dynamic";

const BarChartLine = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.BarChartLine)
);

const GraphUp = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.GraphUp)
);

const ShieldShaded = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ShieldShaded)
);

const Service = () => (
  <>
    <div className="container py-5">
      <div className="row justify-content-center mb-4">
        <h3 className="w-100 text-center">Our Service</h3>
      </div>

      <div className="row">
        <div className="col-12 col-lg-4 mb-3">
          <div className="card text-center px-4 py-3">
            <div className="card-body">
              <BarChartLine className="homepage-icon" fontSize="4em" />
            </div>
            <div className="spacer"></div>
            <div className="card-body card-content">
              <h3 className="card-title">Account Analysis</h3>
              <p className="card-text">
                We use state-of-the-art technology to provide you with an
                in-depth analysis of your chosen Instagram account. And with our
                revolutionary reporting services, you’ll be able to understand
                what’s working and what isn’t for maximum success!
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 mb-3">
          <div className="card text-center px-4 py-3">
            <div className="card-body">
              <GraphUp className="homepage-icon" fontSize="4em" />
            </div>
            <div className="spacer"></div>
            <div className="card-body card-content">
              <h3 className="card-title">Predict Trends</h3>
              <p className="card-text">
                It’s all about the hashtag, and with our trend tracking
                services, you’ll be able to stay on top of the current trends
                and hashtags to know right away what’s landing with your
                audience.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 mb-3">
          <div className="card text-center px-4 py-3">
            <div className="card-body">
              <ShieldShaded className="homepage-icon" fontSize="4em" />
            </div>
            <div className="spacer"></div>
            <div className="card-body card-content">
              <h3 className="card-title">Search Anonymously</h3>
              <p className="card-text">
                Search through Instagram profiles, posts, videos, subscribers,
                and more without ever having to log into your account. It’s
                instant access when you need it, and the best part is no one
                will know you were there!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Service;
