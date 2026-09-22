import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --max-width: 680px; /* prose measure ~65ch */
    --max-width-wide: 1100px; /* board / grid sections */
    --radius-card: 14px;
    --radius-note: 6px; /* sticky notes: tighter than cards */
    --font-display: "Fraunces", Georgia, serif;
    --font-body: "Inter", -apple-system, "Segoe UI", sans-serif;
    --font-mono: "JetBrains Mono", "Iosevka", ui-monospace, monospace;
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --dur-micro: 220ms; /* hover / press */
    --dur-reveal: 600ms; /* scroll reveals */

    color-scheme: light;

    /* Default season wash (pre-bootstrap first paint); script corrects before Main. */
    --bg: #fdf7f8; --surface: #ffffff; --ink: #2b2326; --muted: #7a6e73;
    --accent: #d6547e; --accent-ink: #a83a5e; --accent-soft: #f8e2e9;
    --vine: #5d8a5f; --vine-bloom: #e8a2b8; --particle: petal;
    --divider: rgba(43, 35, 38, 0.12);

    /* Legacy aliases — existing components resolve to seasonal tokens
       until slices 3–5 restyle them. Do not use in new code. */
    --color-primary: var(--accent);
    --color-primary-transparent: color-mix(in srgb, var(--accent-soft) 93%, transparent);
    --primary-background: var(--bg);
    --primary-background-transparent: color-mix(in srgb, var(--bg) 80%, transparent);
    --text-color-primary: var(--ink);
    --text-color-grey: var(--muted);
    --color-divider: var(--divider);
    --color-block-quote: var(--divider);
  }

  /* SPRING — blossom pink */
  [data-season="spring"] {
    --bg: #fdf7f8; --surface: #ffffff; --ink: #2b2326; --muted: #7a6e73;
    --accent: #d6547e; --accent-ink: #a83a5e; --accent-soft: #f8e2e9;
    --vine: #5d8a5f; --vine-bloom: #e8a2b8; --particle: petal;
    --divider: rgba(43, 35, 38, 0.12);
  }
  /* SUMMER — meadow green */
  [data-season="summer"] {
    --bg: #f5f9f2; --surface: #ffffff; --ink: #22291f; --muted: #67705f;
    --accent: #3f9147; --accent-ink: #2c6e34; --accent-soft: #ddedda;
    --vine: #3f7d33; --vine-bloom: #7cc47f; --particle: firefly;
    --divider: rgba(34, 41, 31, 0.12);
  }
  /* AUTUMN — amber */
  [data-season="autumn"] {
    --bg: #faf5ec; --surface: #fffdf8; --ink: #2e2620; --muted: #7d7264;
    --accent: #b96f1f; --accent-ink: #8d5412; --accent-soft: #f3e3c8;
    --vine: #7a5a2e; --vine-bloom: #d99a3d; --particle: leaf;
    --divider: rgba(46, 38, 32, 0.12);
  }
  /* WINTER — frost blue */
  [data-season="winter"] {
    --bg: #f2f6fa; --surface: #ffffff; --ink: #1f2a36; --muted: #647182;
    --accent: #3570a8; --accent-ink: #25567f; --accent-soft: #dbe8f4;
    --vine: #4a6572; --vine-bloom: #9fc3dd; --particle: snow;
    --divider: rgba(31, 42, 54, 0.12);
  }

  html {
    scroll-behavior: smooth;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: var(--font-body);
    color: var(--ink);
    background-color: var(--bg);
    font-size: 18px;
    line-height: 1.65;
    min-height: 100dvh;
    scroll-padding-top: 60px;
    scroll-behavior: smooth;
  }

  /* Season crossfade: cheap (bg + color only). */
  body {
    transition: background-color var(--dur-micro) var(--ease-out),
      color var(--dur-micro) var(--ease-out);
  }

  ::selection {
    background: var(--accent-soft);
    color: var(--ink);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  * {
    box-sizing: border-box;
    }

  ul {
    padding: 0;
    margin: 0;
    padding-left: 1.625rem;
    }

  h1,
	h2,
	h3,
	h4 {
		margin: 0;
		padding-top: 2rem;
		font-family: var(--font-display);
		text-wrap: balance;
	}

	h1 {
		font-size: 2.5rem;
		letter-spacing: -0.03em;
		line-height: 1.05; 
	}
	h2 {
		font-size: 2rem;
	}
	h3 {
		font-size: 1.5rem;
	}

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    body,
    * {
      transition-duration: 0.01ms !important;
    }
  }

	a {
		text-decoration: none;
		color: inherit;
		cursor: pointer;

		:visited {
			text-decoration: none;
		}
		:hover {
			text-decoration-color: currentColor;
			text-decoration-line: underline;
			text-decoration-style: solid;
			text-decoration-thickness: 2px;
		}
	}

  .intro {
    blockquote {
      border-left: 0.25rem solid var(--color-block-quote);
      margin: 0;
      padding-left: 1rem;
      font-style: italic;
      font-size: 16px;
      font-weight: 500;
      color: var(--text-color-grey);
    }
  }
`;
