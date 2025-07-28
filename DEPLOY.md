### 3. Deployment (vercel)

```bash
vercel project
vercel link --yes --project uvex-waiting
bun run build && vercel build --prod && vercel --prebuilt --prod
```
