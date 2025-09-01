// rankers.js — idiomatic, documented, testable

/**
 * Compute a Reddit-like "hot" rank.
 * Blends vote balance with time since epoch to favor fresh, well-received posts.
 *
 * @param {number} upvotes   Non-negative integer
 * @param {number} downvotes Non-negative integer
 * @param {number} createdAt Unix time in seconds (UTC)
 * @returns {number}
 */
export function scoreHot(upvotes, downvotes, createdAt) {
  const u = Math.max(0, upvotes | 0);
  const d = Math.max(0, downvotes | 0);
  const net = u - d;

  const order = Math.log10(Math.max(Math.abs(net), 1));
  const sign = net > 0 ? 1 : net < 0 ? -1 : 0;

  // Dec 8, 2005 07:46:43 UTC
  const EPOCH = 1134028003;
  const seconds = (createdAt | 0) - EPOCH;

  return Number((order + (sign * seconds) / 45000).toFixed(7));
}

/**
 * Wilson score lower bound (≈“best”).
 * Good for sorting by confidence-adjusted quality.
 *
 * @param {number} upvotes
 * @param {number} downvotes
 * @param {number} [z=1.281551565545] z-score (≈80% confidence)
 * @returns {number} 0..1
 */
export function scoreBest(upvotes, downvotes, z = 1.281551565545) {
  const u = Math.max(0, upvotes | 0);
  const d = Math.max(0, downvotes | 0);
  const n = u + d;
  if (n === 0) return 0;

  const p = u / n;
  const z2 = z * z;
  const inner = (p * (1 - p) + z2 / (4 * n)) / n;
  return (p + z2 / (2 * n) - z * Math.sqrt(inner)) / (1 + z2 / n);
}

/**
 * Convenience wrapper to compute common ranks.
 */
export function rankPost({ upvotes, downvotes, createdAt }) {
  return {
    score: (upvotes | 0) - (downvotes | 0),
    hot: scoreHot(upvotes, downvotes, createdAt),
    best: scoreBest(upvotes, downvotes),
  };
}

// Example usage:
// const now = Math.floor(Date.now() / 1000);
// console.log(rankPost({ upvotes: 320, downvotes: 40, createdAt: now - 3600 }));
