import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://projectbeacon.org.au";

export default function SEO({ title, description, image }) {
  const location = useLocation();

  const path = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const canonical =
    path === "" ? BASE_URL + "/" : BASE_URL + path;

  const defaultDescription =
    "Project Beacon delivers hands-on robotics STEM incursions for schools across Sydney. Students build and program real robots.";

  const defaultImage = "https://projectbeacon.org.au/logo/pb.png"; // must be absolute URL

  const finalDescription = description || defaultDescription;
  const finalTitle = title || "Project Beacon";

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{finalTitle}</title>
      <link rel="canonical" href={canonical} />

      <meta name="description" content={finalDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={defaultImage} />
    </Helmet>
  );
}