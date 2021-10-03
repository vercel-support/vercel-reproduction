import styles from "./HashtagBox.module.css";
import Link from "next/link";

const pHelper = (object, secondObject) => {
  if (object !== undefined) {
    if (secondObject !== undefined && secondObject.length > 0) {
      return <p className="m-2">{`${object}, ${secondObject}`}</p>;
    }

    return <p className="m-2">{object}</p>;
  }

  return "";
};

const LocationBox = ({ locations, locationPage = false }) => {
  if (locations) {
    return (
      <div className="container pt-5 searchBox">
        <div className="row justify-content-center">
          {locations?.length > 0 &&
            locations.map((location, index) => {
              return (
                <Link
                  prefetch={false}
                  href={`/location/${encodeURIComponent(
                    location.slug
                  )}/${encodeURIComponent(
                    location.id ?? location.location_id
                  )}`}
                  key={index}
                >
                  <a className={`${styles.tagLink}`} key={index}>
                    <div className={`${styles.tagContainer} col-auto mb-4`}>
                      {locationPage ? (
                        <>
                          {pHelper(location.address.street_address)}
                          {pHelper(
                            location.address.zip_code,
                            location.address.city_name
                          )}
                        </>
                      ) : (
                        <>
                          {pHelper(location.name)}
                          {pHelper(location.city)}
                          {pHelper(location.address)}
                        </>
                      )}
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container pt-5 searchBox">
        <p className="text-center">Could not find matching locations.</p>
      </div>
    );
  }
};

export default LocationBox;
