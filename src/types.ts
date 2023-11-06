import {ReactNode} from "react";
import {AxiosError} from "axios";

export interface IChildrenProps {
    children: ReactNode
}

export interface Questions {
    examType?: string | ExamType,
    questions: {
        id: number,
        question: string,
        options: string[],
        correctAnswer: string
    }[];
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
    existingExams: Questions[]
    }
    | {
    type: "LOADING"
    }
    | {
    type: "QUESTION"
    answers: IAnswer[]
    counter: number
    answer?: string
    questions: Questions
    }
    | {
    type: "EXCEPTION",
    error: AxiosError;
    }
    | {
    type: "FINISH_EXAM"
    result: IAnswer[]
    questions: Questions
    }
    | {
    type: "SUMMARY"
    personalInfo: IPersonalInfo
    result: IResult[]
    questions: Questions
    }
