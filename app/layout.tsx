import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JigSolitaire – Free Online Jigsaw Solitaire Puzzle Game",
    template: "%s | JigSolitaire",
  },
  description:
    "Play JigSolitaire free online! A unique blend of jigsaw puzzle and solitaire card game. Drag, drop, and swap tiles to restore beautiful images across 25+ levels in 5 categories.",
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
  metadataBase: new URL("https://jigsolitaire.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "JigSolitaire",
    title: "JigSolitaire – Free Online Jigsaw Solitaire Puzzle Game",
    description:
      "jigsolitaire free online! Drag, drop, and swap tiles to restore beautiful images. 25+ levels across 5 categories.",
    url: "https://jigsolitaire.com",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "JigSolitaire",
              url: "https://jigsolitaire.com",
              description:
                "Free online jigsaw solitaire puzzle game with 25+ levels across 5 categories.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://jigsolitaire.com/categories?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
