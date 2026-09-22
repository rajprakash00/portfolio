# 🐇 [byraj.dev](https://byraj.dev)

This is my personal portfolio, blogs and frequent writings space. The site is built around a seasons metaphor: spring, summer, autumn, and winter and everything adaptable to it.

## Tech stack

- [Next.js](https://nextjs.org/docs) (Pages Router) + [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [styled-components](https://styled-components.com/)
- [MDX](https://mdxjs.com/) via [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) + [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [Framer Motion](https://www.framer.com/motion/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [Supabase](https://supabase.com/) + [TanStack Query](https://tanstack.com/query) / [SWR](https://swr.vercel.app/)

## Development

Requires Node.js.

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build   # production build
npm run lint    # eslint
```

### View counter (optional)

The footer view counter uses Supabase. To enable it, create a `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Without these, the rest of the site runs fine.

## License

[MIT](./LICENSE)
