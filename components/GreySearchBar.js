import dynamic from "next/dynamic";
import Link from "next/link";

const Search = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.Search)
);

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { useState, useRef } from "react";
import styles from "../components/GreySearchBar.module.css";
import { modeHelper } from "../utils/tags/modeHelper";

const GreySearchBar = ({ showGreySearch = false }) => {
  if (!showGreySearch) return null;

  const [mode, setMode] = useState("profile");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const button = useRef();

  const onSubmit = (e) => e.preventDefault();

  const handleKeypress = (event) => {
    if (event.key === "Enter") {
      const a = button.current;
      setLoading(!loading);
      a.click();
    }
  };

  const changeModeOnInput = (event) => {
    if (event.target.value === "#") setMode("hashtag");
    else if (event.target.value === "@") setMode("profile");
    else setTerm(event.target.value);
    event.preventDefault;
  };

  const setNextMode = (prevMode) => {
    const modes = Object.keys(modeHelper);

    for (let i = 0; i < modes.length; i++) {
      const node = modes[i];

      if (node === prevMode) {
        const nextIndex = i + 1 === modes.length ? 0 : i + 1;
        const nextNode = modes[nextIndex];

        setMode(nextNode);
        return;
      }
    }
  };

  return (
    <div className="row d-md-none w-100 px-2 m-auto pt-4">
      <div className="col-12">
        <form
          className={styles.form}
          onSubmit={onSubmit}
          onKeyPress={handleKeypress}
        >
          <InputGroup className="mb-3 m-auto border-none" id={styles.input}>
            <div
              className={`${styles.modeSelector} pointer notSelectable `}
              onClick={() => setNextMode(mode)}
            >
              <span className="d-flex" style={{ zIndex: 2 }}>
                {modeHelper[mode].identifier}
              </span>
            </div>

            <FormControl
              type="search"
              placeholder={`Search for ${mode}`}
              aria-label={`Search for ${mode}`}
              aria-describedby="searchbar"
              value={term}
              onChange={changeModeOnInput}
            />
            <Button variant="outline-none" id={styles.searchIcon}>
              <Link
                prefetch={false}
                href={"/search/" + encodeURIComponent(term)}
              >
                <a ref={button}>
                  <Search color="grey" />
                </a>
              </Link>
            </Button>
          </InputGroup>
        </form>
      </div>
    </div>
  );
};

export default GreySearchBar;
