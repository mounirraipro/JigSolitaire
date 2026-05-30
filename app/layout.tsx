import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdSenseLoader from './components/AdSenseLoader';
import CookieConsentBanner from './components/CookieConsentBanner';

export const metadata: Metadata = {
  title: {
    default: "JigSolitaire – Free Online Jigsaw Solitaire Puzzle Game",
    template: "%s | JigSolitaire",
  },
  description:
    "JigSolitaire online! A unique blend of jigsaw puzzle and solitaire card game. Drag, drop, and swap tiles to restore beautiful images across 25+ levels in 5 categories.",
  keywords: [
    "JigSolitaire",
    "jigsaw puzzle",
    "solitaire puzzle",
    "online puzzle game",
    "free puzzle game",
    "brain games",
    "tile swap puzzle",
    "jigsaw solitaire",
    "puzzle categories",
    "drag and drop puzzle",
  ],
  authors: [{ name: "JigSolitaire Team" }],
  creator: "JigSolitaire",
  publisher: "JigSolitaire",
  metadataBase: new URL("https://jigsolitaire.online"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "JigSolitaire",
    title: "JigSolitaire – Free Online Jigsaw Solitaire Puzzle Game",
    description:
      "jigsolitaire online! Drag, drop, and swap tiles to restore beautiful images. 25+ levels across 5 categories.",
    url: "https://jigsolitaire.online",
  },
  twitter: {
    card: "summary_large_image",
    title: "JigSolitaire – Free Online Jigsaw Solitaire Puzzle Game",
    description:
      "A unique blend of jigsaw puzzle and solitaire. Play free online with 25+ levels!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function getPublisherId() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!raw) return '';
  return raw.startsWith('ca-pub-') ? raw : `ca-pub-${raw}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publisherId = getPublisherId();

  return (
    <html lang="en">
        <head>
        <AdSenseLoader publisherId={publisherId} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "JigSolitaire",
              url: "https://jigsolitaire.online",
              description:
                "Free online jigsaw solitaire puzzle game with 25+ levels across 5 categories.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://jigsolitaire.online/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "JigSolitaire",
              url: "https://jigsolitaire.online",
              logo: {
                "@type": "ImageObject",
                url: "https://jigsolitaire.online/og-image.png",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://jigsolitaire.online/contact",
              },
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
