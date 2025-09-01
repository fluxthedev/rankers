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

## API

```
scoreHot(upvotes, downvotes, createdAt)
```
Returns a Reddit-style hot score (number).

```
upvotes (number) — non-negative integer
```
```
downvotes (number) — non-negative integer
```
```
createdAt (number) — post creation time in Unix seconds (UTC)
```
```
scoreBest(upvotes, downvotes, [z])
```

Returns a Wilson lower bound score (0–1).

`upvotes (number)`

`downvotes (number)`

```
z (number, optional, default 1.281551565545) — z-score for confidence interval.
```

rankPost({ upvotes, downvotes, createdAt })

Convenience wrapper returning an object with:

score — raw upvotes minus downvotes

hot — hot score

best — Wilson lower bound score


Examples

Sorting a list of posts by "hot":


posts.sort((a, b) => scoreHot(b.upvotes, b.downvotes, b.createdAt) -
                     scoreHot(a.upvotes, a.downvotes, a.createdAt));

Sorting by "best":


posts.sort((a, b) => scoreBest(b.upvotes, b.downvotes) -
                     scoreBest(a.up
votes
, a.downvotes));

License

MIT

