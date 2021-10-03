import { modeHelper } from "../utils/tags/modeHelper";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SearchBar = () => {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [mode, setMode] = useState("profile");
  const [showSelector, setShowSelector] = useState(false);
  const button = useRef();

  const onSubmit = (e) => e.preventDefault();

  const handleKeypress = (event) => {
    if (event.key === "Enter") {
      router.push(`/search/${encodeURIComponent(term)}?search=${mode}`);
    }
  };

  const changeModeOnInput = (event) => {
    if (event.target.value === "#") setMode("hashtag");
    else if (event.target.value === "@") setMode("profile");
    else setTerm(event.target.value);
    event.preventDefault;
  };

  return (
    <>
      <form
        className="form my-2"
        onSubmit={onSubmit}
        onKeyPress={handleKeypress}
      >
        <div className="input-group justify-content-center">
          <div className="col-12 col-lg-6 mb-4 mb-xl-0 p-0">
            <div
              className="pointer notSelectable mode-identifier"
              onClick={() => setShowSelector(!showSelector)}
            >
              <span className="d-flex">{modeHelper[mode].identifier}</span>
              <div
                className="search-bar-mode-selector"
                style={{ visibility: showSelector ? "visible" : "hidden" }}
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
              className="form-control m-auto"
              id="usernameInput"
              placeholder={`Search for ${modeHelper[mode].placeholder}`}
              aria-label="Username"
              onChange={changeModeOnInput}
            />
          </div>

          <div className="col-auto">
            <Link
              prefetch={false}
              href={`/search/${encodeURIComponent(term)}?search=${mode}`}
            >
              <a
                ref={button}
                type="submit"
                className="btn btn-lg p-2"
                id="submitInput"
              >
                Search
              </a>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
