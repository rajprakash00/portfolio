import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/burningTree.png" />
          <meta name="apple-mobile-web-app-title" content="Rajprakash's Blog" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,SOFT,WONK@9..144,0..100,0..1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{ __html: setClientInitialSeason }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Parenthesized IIFE survives minification: the function keeps its name in dev,
// loses it in prod, and must still parse as an expression, not a declaration.
const setClientInitialSeason = `(${setInitialSeason.toString()})();`;

// One `data-season` attribute drives the whole theme.
// Persisted choice in localStorage["season"] always wins;
// otherwise default by month: Mar–May spring, Jun–Aug summer,
// Sep–Nov autumn, Dec–Feb winter.
function setInitialSeason() {
  function getSeasonByMonth(month: number) {
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "autumn";
    return "winter";
  }

  function getInitialSeason() {
    try {
      const persisted = window.localStorage.getItem("season");
      if (
        persisted === "spring" ||
        persisted === "summer" ||
        persisted === "autumn" ||
        persisted === "winter"
      ) {
        return persisted;
      }
    } catch {
      // private-mode localStorage can throw — fall through to month default
    }
    return getSeasonByMonth(new Date().getMonth());
  }

  const season = getInitialSeason();
  const root = document.documentElement;
  root.style.setProperty("--initial-data-season", season);
  root.setAttribute("data-season", season);
}
