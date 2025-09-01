# Reddit-Style Post Ranking

A small JavaScript/TypeScript utility that implements Reddit-inspired algorithms for ranking posts.  
It includes the classic **hot** algorithm (time-decayed score) and the **Wilson lower bound** ("best") score for confidence-based ranking.

## Features

- 🔥 **Hot score** — blends vote balance with recency to favor fresh, popular posts.
- ⭐ **Best score** — confidence-adjusted ranking of post quality.
- 📊 **Raw score** — simple upvotes minus downvotes.
- ✅ Written in modern, idiomatic JavaScript with optional TypeScript types.

## Installation

You can copy the `rankers.js` file into your project or install via npm after publishing.

```bash
npm install reddit-rankers

(or just include the file directly if not publishing to npm)
```

## Usage

```javascript
import { rankPost, scoreHot, scoreBest } from './rankers.js';

// Example post
const now = Math.floor(Date.now() / 1000);
const post = {
  upvotes: 350,
  downvotes: 40,
  createdAt: now - 3600, // 1 hour ago
};

// Compute ranks
const result = rankPost(post);

console.log(result);
/*
{
  score: 310,
  hot: 5.8371042,
  best: 0.8631473
}
*/
```


# API Reference

This document describes the available functions for Reddit-style post ranking.

`scoreHot(upvotes, downvotes, createdAt)`

Compute a Reddit-style **hot score**.  
This blends a post’s vote balance with recency to favor fresh, popular content.

### Parameters
- `upvotes` (number) — non-negative integer, count of upvotes  
- `downvotes` (number) — non-negative integer, count of downvotes  
- `createdAt` (number) — Unix timestamp in **seconds (UTC)**

### Returns
- (number) — hot score (higher = ranks earlier)

### Example
```js
import { scoreHot } from './rankers.js';

const now = Math.floor(Date.now() / 1000);
const hot = scoreHot(350, 40, now - 3600);

console.log(hot); // 5.8371042
```
License

MIT
