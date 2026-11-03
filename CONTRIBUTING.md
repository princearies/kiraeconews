# Contributing to MyKira Eco News

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## 🎯 How to Contribute

### Reporting Bugs

1. Check if the issue already exists in [Issues](../../issues)
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

### Suggesting Features

1. Open a new issue with the `enhancement` label
2. Describe the feature and its benefits
3. Provide examples or mockups if possible

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 💻 Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/mykira-eco-news.git
cd mykira-eco-news

# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests (when available)
npm test
```

## 📝 Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## 🧪 Testing

Before submitting a PR:

```bash
# Build the project
npm run build

# Check for TypeScript errors
npm run type-check

# Lint code (when configured)
npm run lint
```

## 📦 Project Structure

```
src/
├── components/     # React components
├── lib/           # Utilities and API client
├── server.ts      # Hono API server
└── App.tsx        # Main app component

functions/
└── [[path]].ts    # Cloudflare Pages Functions
```

## 🌐 API Guidelines

When adding new API endpoints:

1. Add route in `src/server.ts` and `functions/[[path]].ts`
2. Update API client in `src/lib/api.ts`
3. Add TypeScript types
4. Update README.md with new endpoint
5. Test with curl or Postman

Example:
```typescript
app.get('/api/new-endpoint', (c) => {
  return c.json({ data: 'value' })
})
```

## 🎨 UI Guidelines

- Use Tailwind CSS classes
- Follow dark theme color scheme
- Make components responsive
- Use existing components when possible
- Add loading states
- Handle error states

## 📚 Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for functions
- Update API documentation
- Include code examples

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Type Errors
```bash
# Regenerate types
npx tsc --noEmit
```

## 📞 Getting Help

- Check [GITHUB_SETUP.md](./GITHUB_SETUP.md)
- Review existing issues
- Ask in discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
