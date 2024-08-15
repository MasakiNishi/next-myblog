import { MetadataRoute } from "next";
// constant
import SeoConst from "..//constants/SeoConst";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SeoConst.domain}/sitemap.xml`,
  };
}
