import Link from "next/link";

const LocationResults = ({ locations }) => {
  return (
    <ul className="searchResults m-auto">
      {locations.map((location, index) => (
        <li key={index}>
          <Link
            prefetch={false}
            href={`/location/${encodeURIComponent(
              location.slug
            )}/${encodeURIComponent(location.id)}`}
          >
            <a className="btn my-auto">
              <div className="col-md-auto text-left">
                <b>
                  <u>{location.title}</u>
                </b>
                <p>{location.subtitle}</p>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LocationResults;
