// Shared response schemas for both English + Chinese graders.

export interface ErrorExample {
  original: string;
  corrected: string;
  type: string;
  explanation?: string;
}

export interface ParagraphFeedback {
  index: number;
  role: string;          // English: "Introduction"/"Body 1"/"Conclusion"; Chinese: "起"/"承"/"轉"/"合"
  comment: string;
  rating: 'strong' | 'ok' | 'weak';
}

export interface VocabUpgrade {
  weak: string;
  stronger: string[];
  context?: string;
}

// ── English ────────────────────────────────────────────────────────────────

export interface EnDomain {
  score: number;
  max: 7;
  band_label: string;
  strengths: string[];
  improvements: string[];
}

export interface EnLanguageDomain extends EnDomain {
  error_examples?: ErrorExample[];
  vocabulary_suggestions?: VocabUpgrade[];
}

export interface EnGraderResult {
  subject: 'english';
  essay_type: string;
  part: 'A' | 'B' | 'unspecified';
  word_count_estimate: number;
  response_lang: 'en' | 'zh';
  is_off_topic: boolean;
  scores: {
    content: EnDomain;
    language: EnLanguageDomain;
    organisation: EnDomain;
  };
  total_score: number;
  total_max: 21;
  dse_level: string;
  paragraph_feedback: ParagraphFeedback[];
  level_up_tips: string[];     // 2–3 concrete next-step actions
  overall_comment: string;
  disclaimer: string;
}

// ── Chinese ────────────────────────────────────────────────────────────────

export interface ChDomainShort {
  score: number;
  max: number;
  band_label: string;
  strengths: string[];
  improvements: string[];
}

export interface ChExpressionDomain extends ChDomainShort {
  error_examples?: ErrorExample[];
  vocabulary_suggestions?: VocabUpgrade[];
  修辭運用?: { device: string; example: string; effective: boolean }[];
}

export interface ChWrongChars {
  score: number;       // 0-3
  max: 3;
  count: number;
  examples: { wrong: string; correct: string; context?: string }[];
}

export interface ChGraderResult {
  subject: 'chinese';
  essay_type: string;
  word_count_estimate: number;
  is_off_topic: boolean;
  scores: {
    內容: ChDomainShort;        // /40
    表達: ChExpressionDomain;   // /30
    結構: ChDomainShort;        // /20
    標點: ChDomainShort;        // /10
    錯別字: ChWrongChars;       // /3
  };
  total_score: number;          // /103 effective
  total_max: 103;
  grade_band: string;
  dse_level: string;
  paragraph_feedback: ParagraphFeedback[];
  level_up_tips: string[];
  overall_comment: string;
  disclaimer: string;
}

export type GraderResult = EnGraderResult | ChGraderResult;

export interface GraderApiError {
  error: string;
  code?: 'quota' | 'rate' | 'turnstile' | 'validation' | 'parse' | 'upstream' | 'method';
  quota_left?: number;
}
