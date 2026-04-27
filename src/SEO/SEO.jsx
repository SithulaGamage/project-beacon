// src/SEO.jsx
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://projectbeacon.org.au";

export default function SEO({ title }) {
  const location = useLocation();

  const path = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const canonical =
    path === "" ? BASE_URL + "/" : BASE_URL + path;

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}