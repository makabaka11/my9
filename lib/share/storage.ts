import type { TrendPeriod, TrendResponse, TrendView, TrendYearPage, StoredShareV1 } from "@/lib/share/types";
import type { SubjectKind } from "@/lib/subject-kind";
import d1StorageBackend from "@/lib/share/storage-d1";

export function saveShare(env: any, record: StoredShareV1) {
  return d1StorageBackend.saveShare(env, record);
}

export function getShare(env: any, shareId: string) {
  return d1StorageBackend.getShare(env, shareId);
}

export function touchShare(env: any, shareId: string, now = Date.now()) {
  return d1StorageBackend.touchShare(env, shareId, now);
}

export function listAllShares(env: any) {
  return d1StorageBackend.listAllShares(env);
}

export function countAllShares(env: any) {
  return d1StorageBackend.countAllShares(env);
}

export function listSharesByPeriod(env: any, period: TrendPeriod) {
  return d1StorageBackend.listSharesByPeriod(env, period);
}

export function getAggregatedTrendResponse(env: any, params: {
  period: TrendPeriod;
  view: TrendView;
  kind: SubjectKind;
  overallPage: number;
  yearPage: TrendYearPage;
}): Promise<TrendResponse | null> {
  return d1StorageBackend.getAggregatedTrendResponse(env, params);
}

export function getTrendSampleSummary(env: any, period: TrendPeriod, kind: SubjectKind) {
  return d1StorageBackend.getTrendSampleSummary(env, period, kind);
}

export function getTrendSampleSummaryCache(
  env: any,
  period: TrendPeriod,
  kind: SubjectKind,
  options?: { allowExpired?: boolean }
) {
  return d1StorageBackend.getTrendSampleSummaryCache(env, period, kind, options);
}

export function setTrendSampleSummaryCache(
  env: any,
  period: TrendPeriod,
  kind: SubjectKind,
  value: { sampleCount: number; range: { from: number | null; to: number | null } },
  ttlSeconds = 3600
) {
  return d1StorageBackend.setTrendSampleSummaryCache(env, period, kind, value, ttlSeconds);
}

export function getTrendsCache(
  env: any,
  period: TrendPeriod,
  view: TrendView,
  kind: SubjectKind,
  overallPage: number,
  yearPage: TrendYearPage,
  options?: { allowExpired?: boolean }
) {
  return d1StorageBackend.getTrendsCache(env, period, view, kind, overallPage, yearPage, options);
}

export function setTrendsCache(
  env: any,
  period: TrendPeriod,
  view: TrendView,
  kind: SubjectKind,
  overallPage: number,
  yearPage: TrendYearPage,
  value: TrendResponse,
  ttlSeconds = 3600
) {
  return d1StorageBackend.setTrendsCache(env, period, view, kind, overallPage, yearPage, value, ttlSeconds);
}

export function getShareViewRollupCheckpoint(env: any) {
  return d1StorageBackend.getShareViewRollupCheckpoint(env);
}

export function setShareViewRollupCheckpoint(env: any, checkpointMs: number) {
  return d1StorageBackend.setShareViewRollupCheckpoint(env, checkpointMs);
}

export function upsertShareViewTotalCounts(
  env: any,
  rows: Array<{
    shareId: string;
    kind: SubjectKind;
    viewCount: number;
  }>,
  options?: { lastAggregatedAt?: number; mode?: "replace" | "increment" }
) {
  return d1StorageBackend.upsertShareViewTotalCounts(env, rows, options);
}

export function cleanupOldTrendCounts(env: any, params?: { cleanupTrendDays?: number }) {
  return d1StorageBackend.cleanupOldTrendCounts(env, params);
}
