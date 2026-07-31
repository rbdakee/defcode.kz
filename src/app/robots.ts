import type { MetadataRoute } from "next";
import { company } from "@/content/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${company.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
