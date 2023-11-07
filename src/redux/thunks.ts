import {Dispatch} from "./store";
import {actions, examsListActions} from "./examSlice";
import axios, {AxiosError} from "axios";
import {ExamType, Questions} from "../types";
import {PayloadAction} from "@reduxjs/toolkit";

const URL: string = process.env.REACT_APP_REALTIME_DATABASE!

export const fetchExam = (examType: ExamType | string) => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.loading())

        const response: PayloadAction<{ questions: Questions }, "exam/startExam"> | PayloadAction<{ error: AxiosError }, "exam/catchException"> =
            await axios.get(`${URL}${examType}.json`)
                .then((response) => dispatch(actions.startExam({questions: response.data})))
                .catch((error: AxiosError) => dispatch(actions.catchException({error})));

        return response;
    }
}

export const fetchAllExams = (exams: Array<string>) => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.loading())
        const arr: Questions[] = []
        for(let i=0; i<exams.length; i++){
           await axios.get(`${URL}${exams[i]}.json`)
                .then((response) => arr.push(response.data))
               .catch((error: AxiosError) => dispatch(actions.catchException({error})))
        }

        dispatch(actions.manageExams({existingExams: arr}))

        return arr;
    }
}

export const fetchExamKeywords = () => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.loading())

        const response: PayloadAction<{ keywords: string[] }, "exam/chooseExam"> | PayloadAction<{ error: AxiosError }, "exam/catchException"> =
            await axios.get(`${URL}ALL.json`)
                .then((response) => dispatch(actions.chooseExam({keywords: response.data})))
                .catch((error: AxiosError) => dispatch(actions.catchException({error})))

        return response;
    }
}

export const fetchExamKeywords2 = () => {
    return async (dispatch: Dispatch) => {
        await axios.get(`${URL}ALL.json`)
                .then((response) => dispatch(examsListActions.setExamsList(response.data)))
                .catch((error: AxiosError) => dispatch(actions.catchException({error})))
    }
}