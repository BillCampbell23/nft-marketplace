# NFT Marketplace

Built during the Frontend Simplified virtual internship, on the FES starter ([hannamitri/nft-marketplace-starter](https://github.com/hannamitri/nft-marketplace-starter)). Live demo: https://fes-internship-six.vercel.app

The starter was a static React UI with hard-coded data. I turned it into a data-driven app that pulls every section from a REST API (Firebase Cloud Functions endpoints provided by the course), adding loading states, carousels, filtering, dynamic routes and scroll animations. Each feature shipped as its own pull request (#1 to #7).

## Features

- **Hot Collections**: fetched from the API and shown in a responsive carousel, with skeleton loading
- **New Items**: API data in a carousel with a live countdown timer on each item that has an expiry date (the timer hides once it runs out)
- **Top Sellers**: seller list fetched from the API
- **Explore page**: sorting by price (low to high, high to low) and most liked, done by the API rather than in the browser; shows 8 items, then "Load more" adds 4 at a time
- **Author page** (`/author/:authorId`): profile and items fetched by route ID, with a follow/unfollow toggle that updates the follower count (client-side only; the API has no endpoint to save it)
- **Item details page** (`/item-details/:nftId`): NFT fetched by route ID, with skeleton placeholders while it loads
- **Shared NFT card component** reused across New Items, Explore and Author pages
- **Scroll animations** with AOS (sections fade in once as they enter the viewport)

## Tech stack

| Tool | Version |
|---|---|
| React / React DOM | 17.0.2 |
| React Router DOM | 6.2.2 |
| Create React App (react-scripts) | 5.0.0 |
| Axios | 1.20.0 |
| React Alice Carousel | 2.9.1 |
| AOS (animate on scroll) | 2.3.4 |
| React Icons | 4.3.1 |
| Bootstrap (CDN, from the starter) | 4.1 / 5.1 |
| Hosting | Vercel |

**Node:** 14 or newer (react-scripts 5's minimum). Built and tested on Node 24.14.1 with `npm ci && npm run build`; no extra flags needed.

## Getting started

```bash
git clone https://github.com/BillCampbell23/nft-marketplace.git
cd nft-marketplace
npm install
npm start
```

The app opens at http://localhost:3000. No environment variables are needed; the API endpoints are public.
