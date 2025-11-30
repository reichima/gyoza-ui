# registry-template

You can use the `shadcn` CLI to run your own component registry. Running your own
component registry allows you to distribute your custom components, hooks, pages, and
other files to any React project.

> [!IMPORTANT]  
> This template uses Tailwind v4. For Tailwind v3, see [registry-template-v3](https://github.com/shadcn-ui/registry-template-v3).

## Getting Started

This is a template for creating a custom registry using Next.js.

- The template uses a `registry.json` file to define components and their files.
- The `shadcn build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- The template also includes a route handler for serving registry items.
- Every registry item are compatible with the `shadcn` CLI.
- We have also added v0 integration using the `Open in v0` api.

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) to view the full documentation.

## Development

### Code Quality

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

#### Available Scripts

```bash
# Format code
pnpm format

# Check formatting without writing
pnpm format:check

# Lint code
pnpm lint:biome

# Lint and fix
pnpm lint:biome:fix

# Run all checks (format + lint)
pnpm check

# Run all checks and fix
pnpm check:fix
```

#### VS Code Integration

The Biome VS Code extension is recommended and will be suggested when you open the project. With the extension installed:

- Code will be automatically formatted on save
- Imports will be automatically organized on save
- Linting errors will be shown inline
