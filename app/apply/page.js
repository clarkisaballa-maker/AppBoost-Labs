import React from "react";
import Apply from "./Content";

const page = () => {
  return (
    <>
      <Apply />
    </>
  );
};

export default page;

export async function generateMetadata() {
  const careersSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Careers & Job Opportunities at AppBoost Labs",
    description:
      "Join AppBoost Labs! Explore career opportunities in mobile app performance, QA testing, UX optimization, and product growth consulting. Submit your application and become part of a dynamic team driving digital innovation from Miami, Florida.",
    hiringOrganization: {
      "@type": "Organization",
      name: "AppBoost Labs",
      sameAs: "https://appboostlabs.org",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1450 S Miami Ave",
        addressLocality: "Miami",
        addressRegion: "FL",
        postalCode: "33130",
        addressCountry: "US",
      },
    },
    employmentType: ["FULL_TIME", "PART_TIME", "CONTRACTOR"],
    datePosted: new Date().toISOString(),
    validThrough: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
  };

  return {
    title: "AppBoost Labs | Careers & Job Opportunities",
    description:
      "Join AppBoost Labs! Explore career opportunities in mobile app performance, QA testing, UX optimization, and product growth consulting. Submit your application and become part of a dynamic team driving digital innovation from Miami, Florida.",
    keywords:
      "Careers at AppBoost Labs, Job Opportunities, Mobile App Consulting Jobs, QA Testing Careers, UX Optimization Jobs, Product Growth Careers, Digital Product Jobs, Application Submission, On-Site Jobs, Tech Jobs Miami",
    author: "AppBoost Labs",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
    openGraph: {
      title: "AppBoost Labs | Careers & Job Opportunities",
      description:
        "Professional career opportunities in mobile app performance, QA testing, UX optimization, and product growth consulting at AppBoost Labs. Join our team on-site to drive digital innovation and growth.",
      url: "https://appboostlabs.org/apply",
      type: "website",
      siteName: "AppBoost Labs",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "AppBoost Labs Careers & Job Opportunities",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AppBoost Labs | Careers & Job Opportunities",
      description:
        "Join AppBoost Labs for on-site career opportunities in app performance, QA testing, UX optimization, and product growth consulting.",
      images: ["/images/og-image.jpg"],
    },
    alternates: {
      canonical: "https://appboostlabs.org/apply",
    },
    other: {
      "application/ld+json": JSON.stringify(careersSchema),
    },
  };
}