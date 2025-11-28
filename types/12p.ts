export interface Question {
  id: string;
  sentence: string;
  target: string;
  meaning: string;
  acptAns: string[];
  notes: string;
}

export interface SubPassage {
  id: string;
  title: string;
  author: string;
}

export interface Passage {
  id: string;
  title: string;
  subtitle: string;
  file: string;
  emoji: string;
  subPassages?: SubPassage[];
}

export interface PassageConfig {
  passages: Passage[];
}

export interface QuizSettings {
  selectedPassages: string[];
  questionCount: number;
  timeLimited: boolean;
  timeLimit?: number; // in seconds
}

export interface QuizResult {
  questionId: string;
  userAnswer: string;
  correct: boolean;
  skipped: boolean;
  passage: string;
}

export interface QuizSession {
  settings: QuizSettings;
  questions: Question[];
  results: QuizResult[];
  startTime: number;
  endTime?: number;
}
