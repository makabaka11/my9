import type { SubjectKind } from "@/lib/subject-kind";
import type { StoredShareV1, TrendPeriod, TrendResponse, TrendView, TrendYearPage } from "@/lib/share/types";

export type ShareSaveResult = {
  shareId: string;
  deduped: boolean;
};

export type TrendSampleSummary = {
  sampleCount: number;
  range: {
    from: number | null;
    to: number | null;
  };
};

export interface StorageBackend {
  readonly name: "d1";
  saveShare(env: any, record: StoredShareV1): Promise<ShareSaveResult>;
  getShare(env: any, shareId: string): Promise<StoredShareV1 | null>;
  touchShare(env: any, shareId: string, now?: number): Promise<boolean>;
  listAllShares(env: any): Promise<StoredShareV1[]>;
  countAllShares(env: any): Promise<number>;
  listSharesByPeriod(env: any, period: TrendPeriod): Promise<StoredShareV1[]>;
  getAggregatedTrendResponse(env: any, params: {
    period: TrendPeriod;
    view: TrendView;
    kind: SubjectKind;
    overallPage: number;
    yearPage: TrendYearPage;
  }): Promise<TrendResponse | null>;
  getTrendSampleSummary(env: any, period: TrendPeriod, kind: SubjectKind): Promise<TrendSampleSummary | null>;
  getTrendSampleSummaryCache(
    env: any,
    period: TrendPeriod,
    kind: SubjectKind,
    options?: { allowExpired?: boolean }
  ): Promise<TrendSampleSummary | null>;
  setTrendSampleSummaryCache(
    env: any,
    period: TrendPeriod,
    kind: SubjectKind,
    value: TrendSampleSummary,
    ttlSeconds?: number
  ): Promise<void>;
  getTrendsCache(
    env: any,
    period: TrendPeriod,
    view: TrendView,
    kind: SubjectKind,
    overallPage: number,
    yearPage: TrendYearPage,
    options?: { allowExpired?: boolean }
  ): Promise<TrendResponse | null>;
  setTrendsCache(
    env: any,
    period: TrendPeriod,
    view: TrendView,
    kind: SubjectKind,
    overallPage: number,
    yearPage: TrendYearPage,
    value: TrendResponse,
    ttlSeconds?: number
  ): Promise<void>;
  getShareViewRollupCheckpoint(env: any): Promise<number | null>;
  setShareViewRollupCheckpoint(env: any, checkpointMs: number): Promise<void>;
  upsertShareViewTotalCounts(
    env: any,
    rows: Array<{
      shareId: string;
      kind: SubjectKind;
      viewCount: number;
    }>,
    options?: { lastAggregatedAt?: number; mode?: "replace" | "increment" }
  ): Promise<number>;
  cleanupOldTrendCounts(env: any, params?: {
    cleanupTrendDays?: number;
  }): Promise<{
    cleanupTrendDays: number;
    cleanedTrendRows: number;
    cleanedDayRows: number;
    cleanedHourRows: number;
  }>;
}
