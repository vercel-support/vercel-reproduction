import dynamic from "next/dynamic";

import Link from "next/link";
import Head from "next/head";
import { useRef } from "react";

const SearchBar = dynamic(() => import("../components/SearchBar"));
const GreySearchBar = dynamic(() => import("../components/GreySearchBar"));
const BlackLogo = dynamic(() => import("../components/logo/black"));

// Icons
const X = dynamic(() => import("react-bootstrap-icons").then((icon) => icon.X));
const List = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.List)
);
const ShieldLock = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ShieldLock)
);
const CardChecklist = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.CardChecklist)
);
const InfoCircle = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.InfoCircle)
);

const Navbar = ({ showSearch, showGreySearch, black = true }) => {
  const logo = useRef(null);

  const openMenu = () => {
    logo.current.classList.add("d-none");

    const menuButton = document.getElementById("menuButton");
    const menu = document.getElementById("menu");
    const menuDiv = document.getElementById("menuContainer");
    const bg = document.getElementById("bg");

    menu.classList.remove("d-none");
    bg.classList.remove("d-none");
    menuDiv.classList.add("openMenu");
    menuButton.classList.add("d-none");
  };

  const closeMenu = () => {
    logo.current.classList.remove("d-none");

    const menuButton = document.getElementById("menuButton");
    const menu = document.getElementById("menu");
    const menuDiv = document.getElementById("menuContainer");
    const bg = document.getElementById("bg");

    menu.classList.add("d-none");
    bg.classList.add("d-none");
    menuDiv.classList.remove("openMenu");
    menuButton.classList.remove("d-none");
  };

  return (
    <>
      <Head>
        {process.env.NODE_ENV === "production" ? (
          <>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(47230344, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true
  });`,
              }}
            ></script>
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<div><img src="https://mc.yandex.ru/watch/47230344" style="position:absolute; left:-9999px;" alt="" /></div>`,
              }}
            ></noscript>
          </>
        ) : (
          ""
        )}
      </Head>

      <div className="d-none" id="bg" onClick={closeMenu}></div>
      <header className="py-1">
        <nav className="navbar navbar-white bg-white">
          {showSearch && (
            <div className="row w-100 position-absolute justify-content-center d-none d-lg-flex">
              <div className="col-6">
                <SearchBar />
              </div>
            </div>
          )}

          <div className="col-auto p-0 " id="menuContainer">
            <div ref={logo}>
              <List
                id="menuButton"
                className="pointer"
                fontSize="2.1em"
                style={{ verticalAlign: "text-top" }}
                onClick={openMenu}
              />

              {black && (
                <Link href="/">
                  <a aria-label="Logo">
                    <BlackLogo />
                  </a>
                </Link>
              )}
            </div>

            <div className="d-none" id="menu">
              <div className="col-auto pt-3 text-right">
                <X
                  id="closeButton"
                  className="pointer"
                  fontSize="3em"
                  color="black"
                  onClick={closeMenu}
                />
              </div>

              <div className="row mt-4">
                <div className="col text-center text-dark">
                  <p className="sidebar-domain m-0">
                    {process.env.NEXT_PUBLIC_DOMAIN_NAME}
                  </p>
                  <p className="sidebar-description">
                    The instagram analysis tool
                  </p>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col ml-3">
                  <Link href="/legal/privacy-policy">
                    <a className="sidebar-menu">
                      <ShieldLock />
                      <span className="menuText mb-4 ml-3">Privacy Policy</span>
                    </a>
                  </Link>
                  <Link href="/legal/terms-of-service">
                    <a className="sidebar-menu">
                      <CardChecklist />
                      <span className="menuText mb-4 ml-3">
                        Terms of service
                      </span>
                    </a>
                  </Link>
                  <Link href="/legal/contact">
                    <a className="sidebar-menu">
                      <InfoCircle />
                      <span className="menuText mb-4 ml-3">Contact</span>
                    </a>
                  </Link>
                </div>
              </div>

              <div className="sidebar-footer text-dark mb-3">
                <div>
                  <span>@{process.env.NEXT_PUBLIC_DOMAIN_NAME}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <GreySearchBar showGreySearch={showGreySearch} />
      </header>
    </>
  );
};

export default Navbar;
