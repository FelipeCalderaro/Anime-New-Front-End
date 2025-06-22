[![Netlify Status](https://api.netlify.com/api/v1/badges/be2b5bcd-2301-4e30-80f9-d62d07bfd4cf/deploy-status)](https://app.netlify.com/sites/animenew-seasons/deploys)
# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```
---

## 🛠️ Production Deployment on cPanel/WHM with Apache Reverse Proxy (Pre VirtualHost Include)

### Overview:

When deploying this Nuxt 3 application to a **VPS running cPanel/WHM**, with **Apache as the main web server**, special configurations are required to make the app accessible under a custom URL prefix (in this case `/temporadas`) while still running the Nuxt server (Node.js) separately on a local port (e.g., `localhost:3000`).

Apache acts as a **reverse proxy**, forwarding requests to the Node.js backend while keeping the application accessible under the desired public path.

---

### ✅ Why we use Apache Reverse Proxy (Pre VirtualHost Include):

1. **Apache is the primary web server** on WHM/cPanel systems and listens on ports 80/443.
   Running Nuxt directly on those ports is **not possible** without breaking cPanel’s services.

2. **Using a subpath (e.g., `/temporadas`) avoids needing a dedicated subdomain**, making it easier to host multiple apps on the same domain.

3. **The Pre VirtualHost Include mechanism in WHM** allows us to safely add reverse proxy rules **without breaking cPanel’s automated Apache configuration rebuilds**.

4. It ensures that even after cPanel updates or domain reconfigurations, the reverse proxy rules remain intact.

---

### ✅ Apache Configuration (via WHM → Apache Include Editor → Pre VirtualHost Include):

We add this inside the **Pre VirtualHost Include for All Versions**:

```apache
<IfModule mod_proxy.c>
    ProxyPass "/temporadas/" "http://127.0.0.1:3000/temporadas/"
    ProxyPassReverse "/temporadas/" "http://127.0.0.1:3000/temporadas/"
</IfModule>
```

**What this does:**

| Incoming Request        | Apache Forwards To                           | Backend Receives        |
| ----------------------- | -------------------------------------------- | ----------------------- |
| `/temporadas/media/...` | `http://127.0.0.1:3000/temporadas/media/...` | `/temporadas/media/...` |

This ensures that all traffic under `/temporadas/` is forwarded to the Nuxt server **with the prefix intact**, keeping routing consistent.

---

### ✅ Nuxt Configuration (`nuxt.config.ts`):

```ts
export default defineNuxtConfig({
  app: {
    baseURL: '/temporadas/',
  },
})
```

**Why this is needed:**

* Nuxt must **generate internal links, assets, and SSR routing** that starts with `/temporadas/`.
* This prevents 404 errors when accessing internal pages or when Nuxt generates asset URLs like:

```
/temporadas/_nuxt/app.js
/temporadas/favicon.ico
```

---

### ✅ Common Problems Avoided with this Setup:

| Problem                                               | This Setup Fixes It                                                         |
| ----------------------------------------------------- | --------------------------------------------------------------------------- |
| 404s on subpaths like `/temporadas/media/...`         | ✅ By keeping the path prefix in Apache and Nuxt                             |
| Missing static assets like `_nuxt/` and `favicon.ico` | ✅ Because all `/temporadas/*` paths are proxied                             |
| cPanel overwriting manual Apache config               | ✅ By using the official WHM Apache Include Editor (Pre VirtualHost Include) |
| Nuxt SSR generating wrong asset URLs                  | ✅ By setting `app.baseURL = '/temporadas/'`                                 |

---

### ✅ Deployment Checklist for WHM / VPS production:

* ✅ Place the Apache proxy config inside **WHM → Apache Include Editor → Pre VirtualHost Include (All Versions)**
* ✅ Rebuild and restart Apache from WHM or command line
* ✅ Build Nuxt for production:

```bash
npm run build
```

* ✅ Start Nuxt server listening on port `3000`
* ✅ Test accessing:

```
https://yourdomain.com/temporadas/
```

And subpaths like:

```
https://yourdomain.com/temporadas/media/123/slug
```

---

✅ **Optional Tip:**
If you deploy more apps like this (on other paths like `/blog`, `/api`, etc), just repeat the pattern with different prefixes and backend ports.

---

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


Ok, now create a Markdown entry for the README.md file explaining why those configurations are needed to run in production when deploying to a VPS and also why proxying using the Apache Configuration, Include editor and Pre VirtualHost is needed