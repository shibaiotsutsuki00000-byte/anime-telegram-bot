import path from "node:path";

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export const config = {
  telegramToken: process.env.BOT_TOKEN ?? "",
  adminId: process.env.ADMIN_ID ? Number(process.env.ADMIN_ID) : undefined,
  databasePath:
    process.env.SQLITE_PATH ??
    path.resolve(process.cwd(), "data", "anime-bot.sqlite"),
  anilistEndpoint:
    process.env.ANILIST_API_URL ?? "https://graphql.anilist.co",
  jikanEndpoint: process.env.JIKAN_API_URL ?? "https://api.jikan.moe/v4",
  requestTimeoutMs: positiveInteger(process.env.API_TIMEOUT_MS, 12_000),
  apiRetries: positiveInteger(process.env.API_RETRIES, 3),
  cacheTtlMs: positiveInteger(
    process.env.CACHE_TTL_MS,
    6 * 60 * 60 * 1_000,
  ),
  ongoingCacheTtlMs: positiveInteger(
    process.env.ONGOING_CACHE_TTL_MS,
    60 * 60 * 1_000,
  ),
  imdbRefreshMs: positiveInteger(
    process.env.IMDB_REFRESH_MS,
    60 * 60 * 1_000,
  ),
  telegramPollTimeoutSeconds: positiveInteger(
    process.env.TELEGRAM_POLL_TIMEOUT_SECONDS,
    25,
  ),
  userRateLimitWindowMs: 60_000,
  userRateLimitMax: positiveInteger(process.env.USER_RATE_LIMIT_MAX, 12),
};

export function assertConfiguration(): void {
  if (!config.telegramToken) {
    throw new Error(
      "BOT_TOKEN is required. Set it as an environment variable before starting the bot.",
    );
  }
}
