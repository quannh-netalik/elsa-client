export enum ESocketEvent {
  SIGN_UP = "sign-up",
  LOGIN = "login",
  LOGIN_SUCCESS = "login-success",
  CREATE_QUIZ_SESSION = "create-quiz-session",
  JOIN_QUIZ_SESSION = "join-quiz-session",
  USER_JOINED = 'user-joined',
}

export enum QuizSessionStatus {
  Draft = "Draft",
  Active = "Active",
}

export interface IQuizContent {
  question: string;
  answers: string[];
  correctAnswer: string;
  point: number;
  timeout: number;
}

export interface IQuizSession {
  sessionId: string;
  userIds: string[];
  numberOfQuestions: number;
  questions: IQuizContent[];
  status: QuizSessionStatus;
}
