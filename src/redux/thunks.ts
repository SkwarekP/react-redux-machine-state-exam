import {Dispatch} from "./store";
import {actions} from "./examSlice";
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

export const fetchExamKeywords = () => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.loading())

        const response: PayloadAction<{ exams: string[] }, "exam/chooseExam"> | PayloadAction<{ error: AxiosError }, "exam/catchException"> =
            await axios.get(`${URL}ALL.json`)
                .then((response) => dispatch(actions.chooseExam({exams: response.data})))
                .catch((error: AxiosError) => dispatch(actions.catchException({error})))

        return response;
    }
}