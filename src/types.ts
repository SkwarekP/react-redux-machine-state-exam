import {ReactNode} from "react";
import {AxiosError} from "axios";
import {AnswersAmount, ExamTime, IAnswers, QuestionsAmount} from "./ui/modal/addExamModal";

export interface IChildrenProps {
    children: ReactNode
}

type statusType = "Shared" | "Private" | "Public";

export interface IQuestions {
    examType?: string | ExamType,
    questions: {
        id: number,
        question: string,
        options: string[],
        correctAnswer: string
    }[];
    createdAt?: string;
    category?: string;
    time?: string;
    difficultyLevel?: number;
    questionsAmount?: QuestionsAmount;
    answersAmount?: AnswersAmount;
    status?: statusType;
}

export interface INewExamData {
    questions: {
        id: number,
        question: string | undefined,
        options: IAnswers[],
        correctAnswer: string | undefined
    }[],
    questionsCounter: number
    examType?: string | undefined
    category: string | undefined
    difficultyLevel: number | undefined
    questionsAmount: QuestionsAmount
    answersAmount: AnswersAmount | undefined
    examTime: ExamTime
}

export interface IQuestionsItem {
    id: number,
    question: string,
    options: string[],
    correctAnswer: string;
}

export interface IAnswer {
    id: number,
    answer: string | undefined
}

export interface IResult extends IAnswer {
    isCorrect: boolean
}

export type ExamType = "REACTJS" | "JAVASCRIPT" | "CSS" | "ANGULAR" | "VUE" | "CPP" |
    "PYTHON" | "JAVA" | "SEESHARP" | "RUBY" | "SWIFT" | "GO" | "R" | "PHP" | "KOTLIN" |
    "TYPESCRIPT" | "RUST" | "PERL" | "SCALA" | "FSHARP" | "HASKELL" | "OBJECTIVE_C" | "SQL" |
    "FLUTTER" | "SCSS" | "NEXTJS" | "C" | "DART"

export type Gender = "Male" | "Female" | "Prefer not say"

export interface IPersonalInfo {
    firstName: string | undefined,
    emailAddress: string | undefined,
    gender: Gender
}

export type ExamState =
    | {
    type: "CHOOSE_EXAM"
    keywords: string[]
}
    | {
    type: "MANAGE_EXAMS"
    existingExams: IQuestions[]
}
    | {
    type: "LOADING"
}
    | {
    type: "QUESTION"
    answers: IAnswer[]
    counter: number
    answer?: string
    questions: IQuestions
}
    | {
    type: "EXCEPTION",
    error: AxiosError;
}
    | {
    type: "FINISH_EXAM"
    result: IAnswer[]
    questions: IQuestions
}
    | {
    type: "SUMMARY"
    personalInfo: IPersonalInfo
    result: IResult[]
    questions: IQuestions
}
