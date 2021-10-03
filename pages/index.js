import SearchBox from "../components/SearchBox";
import Navbar from "../components/Navbar";
import AboveServiceText from "../components/homepage/aboveServiceText";
import Service from "../components/homepage/service";

import indexUsers from "../utils/users.json";
import { modeHelper } from "../utils/tags/modeHelper";

import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import WhiteLogo from "../components/logo/white";

const ClipboardData = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ClipboardData)
);

export default function Home() {
  const router = useRouter();

  const [term, setTerm] = useState("");

  const [users, setUsers] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [locations, setLocations] = useState([]);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("profile");
  const [showSelector, setShowSelector] = useState(false);

  const onSubmit = (e) => e.preventDefault();

  const handleKeypress = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      router.push(`/search/${term}?search=${mode}`);
    }
  };

  const changeModeOnInput = (event) => {
    if (event.target.value === "#") setMode("hashtag");
    else if (event.target.value === "@") setMode("profile");
    else setTerm(event.target.value);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (term !== "") {
        axios
          .get(`/api/search?limit=5&term=${term}`)
          .then((response) => {
            const { userData, hashtagData, locationData } = response.data;
            setUsers(userData);
            setHashtags(hashtagData);
            setLocations(locationData);
          })
          .catch((err) => {});
        return;
      }

      setUsers([]);
      setHashtags([]);
      setLocations([]);
    }, 500);

    return () => clearTimeout(delay);
  }, [term]);

  return (
    <>
      <div className="container-fluid index p-0">
        <Head>
          <title>Instagram Analysis and Search Engine</title>
          <meta
            key="description"
            name="description"
            content={
              "View Instagram profiles, posts and videos without logging in"
            }
          />
          <meta
            key="og:title"
            property="og:title"
            content={"Instagram Analysis and Search Engine"}
          />
          <meta
            key="og:description"
            property="og:description"
            content={
              "View Instagram profiles, posts and videos without logging in"
            }
          />
          <link
            rel="canonical"
            href={`https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}`}
          />
        </Head>

        {/* Main */}
        <div className="bgContainer">
          <main id="homepage" className="bg-svg pb-3">
            <Navbar black={false} />

            <div className="container-fluid mt-5">
              <div
                className="row search-area"
                onClick={(e) => e.target === e.currentTarget && setShow(false)}
              >
                <div className="col-12 col-sm-6 text-center mx-auto my-2">
                  <WhiteLogo />
                  <form
                    className="form my-2"
                    onSubmit={onSubmit}
                    onKeyPress={handleKeypress}
                  >
                    <div className="input-group mt-4 justify-content-center">
                      <div
                        className="pointer notSelectable mode-identifier"
                        onClick={() => setShowSelector(!showSelector)}
                      >
                        <span className="d-flex">
                          {modeHelper[mode].identifier}
                        </span>

                        <div
                          className="search-bar-mode-selector"
                          style={{
                            visibility: showSelector ? "visible" : "hidden",
                          }}
                        >
                          {Object.keys(modeHelper).map(
                            (key, index) =>
                              key !== mode && (
                                <p
                                  className="pointer notSelectable mode-selector-options"
                                  key={index}
                                  onClick={() => setMode(key)}
                                >
                                  {modeHelper[key].identifier}
                                </p>
                              )
                          )}
                        </div>
                      </div>
                      <input
                        type="search"
                        value={term}
                        className="form-control"
                        id="usernameInput"
                        placeholder={`Search for ${modeHelper[mode].placeholder}`}
                        aria-label="Username"
                        onChange={changeModeOnInput}
                        onClick={(e) =>
                          e.target === e.currentTarget && setShow(true)
                        }
                      />
                      <a
                        className="btn btn-lg homepageSearchButton"
                        onClick={handleKeypress}
                      >
                        Search
                      </a>
                    </div>

                    <div className="row mt-4 justify-content-center searchOptions">
                      <div className="col-3 col-auto col-sm-2 px-1">
                        <button
                          type="button"
                          className={`btn searchSelection w-100 ${
                            mode === "profile" ? "searchSelected" : ""
                          }`}
                          onClick={() => setMode("profile")}
                        >
                          Profile
                        </button>
                      </div>
                      <div className="col-3 col-auto col-sm-2 px-1">
                        <button
                          type="button"
                          className={`btn searchSelection w-100 ${
                            mode === "hashtag" ? "searchSelected" : ""
                          }`}
                          onClick={() => setMode("hashtag")}
                        >
                          Hashtag
                        </button>
                      </div>
                      <div className="col-3 col-auto col-sm-2 px-1">
                        <button
                          type="button"
                          className={`btn searchSelection w-100 ${
                            mode === "location" ? "searchSelected" : ""
                          }`}
                          onClick={() => setMode("location")}
                        >
                          Location
                        </button>
                      </div>
                    </div>
                  </form>

                  {show &&
                    modeHelper[mode].searchResults({
                      users,
                      hashtags,
                      locations,
                      mode,
                    })}
                </div>
              </div>
            </div>
          </main>
        </div>

        <div className="spacer"></div>
        <div className="container py-5">
          <div className="row justify-content-center mb-4">
            <AboveServiceText />
          </div>
        </div>

        {/*  Service */}
        <div className="spacer"></div>
        <Service />

        {/* Trending Profiles */}
        <div className="spacer mt-5"></div>
        <div className="container py-5">
          <div className="row justify-content-center mb-4">
            <h4>Trending Profiles</h4>
          </div>
          <div className="row">
            <SearchBox users={indexUsers} images={false} />
          </div>
        </div>

        {/* API */}
        <div className="spacer mt-3"></div>
        <div className="bgContainer">
          <div className="container-fluid py-5 bg-svg-revert">
            <div className="row justify-content-center mb-5">
              <h5>Access to our API</h5>
            </div>

            <div className="row justify-content-center ">
              <div className="col-10 col-lg-8 col-auto p-3 request-api">
                <div className="row p-3 align-items-center">
                  <div className="col col-auto">
                    <ClipboardData fontSize="3em" />
                  </div>

                  <div className="col">
                    <p className="m-0">
                      <b>Request access to our API</b>
                    </p>
                    <p className="m-0">
                      Get the rights to include our data in your project.
                    </p>
                  </div>

                  <div className="col-12 col-sm-auto col-lg-2 mx-auto mt-2 mt-sm-0">
                    <Link href="/request-api">
                      <a type="button" className="btn apiButton w-100">
                        Request
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
