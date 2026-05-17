// Types for the DSE English B1/B2 conversion tables.
// Data direction is always B1 raw mark -> equivalent B2 score.

export interface ConvRow {
  /** B1 raw mark */
  b1: number
  /** Equivalent B2 score for that B1 mark */
  b2: number
  /** Conversion factor (b2 / b1), as published. b1 = 0 -> 0 */
  factor: number
}

export interface YearData {
  paper1: ConvRow[]
  paper3: ConvRow[]
}

/** Keyed by year string, e.g. "2012" */
export type Conversions = Record<string, YearData>
