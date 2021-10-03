import Navbar from "../components/Navbar";
import Head from "next/head";
import Link from "next/link";

const RequestAPI = () => {
  const handleAPI = (e) => {
    e.preventDefault();

    const apiForm = document.getElementById("apiForm");
    const submitContainer = document.getElementById("submitContainer");

    apiForm.classList.add("d-none");
    submitContainer.classList.remove("d-none");
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col col-lg-10">
            <form id="apiForm" onSubmit={handleAPI} method="POST">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Website</label>
                <input
                  type="url"
                  name="website"
                  className="form-control"
                  placeholder="Website name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">
                  Describe your project
                </label>
                <textarea
                  className="form-control"
                  name="details"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn apiButton text-dark">
                Send request
              </button>
            </form>

            <div className="d-none text-center mt-5" id="submitContainer">
              <p>Request is processing.</p>
              <p>You'll receive an email in the next few work days.</p>

              <Link href="/">
                <a className="btn apiButton">Back to the homepage</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestAPI;

