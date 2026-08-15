# 2026-08-15 — Upgrade dependencies

## Changes made

- Upgraded the application to Next.js 16, React 19, and current compatible runtime dependencies.
- Moved TypeScript and ESLint to development dependencies using supported versions.
- Removed `contentlayer` and `next-contentlayer` because they do not support modern Next.js releases.
- Replaced Contentlayer-backed home and about page rendering with a local MDX loader using `gray-matter` and `next-mdx-remote`.
- Removed obsolete Contentlayer and Webpack configuration.
- Replaced the obsolete `next lint` command with ESLint's CLI and added flat ESLint configuration.
- Updated TypeScript module resolution for modern package exports.
- Updated TypeScript's former ES5/base URL configuration for TypeScript 6 compatibility.
- Updated React 19 type usage in icon and MDX list components, and removed the final placeholder-page Contentlayer imports.
- Removed unused `react-is` packages after replacing their only usage with React's built-in element guard.
- Moved ESLint and TypeScript declaration packages to development dependencies.
- Removed the obsolete generated `.contentlayer` directory.
