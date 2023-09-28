import {Dispatch} from "./store";
import {actions} from "./examSlice";
import axios, {AxiosError} from "axios";
import {ExamType, Questions} from "../types";
import {PayloadAction} from "@reduxjs/toolkit";


export const fetchExam = (examType: ExamType | string) => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.loading())

        const response: PayloadAction<{ questions: Questions }, "exam/startExam"> | PayloadAction<{ error: AxiosError }, "exam/catchException"> =
            await axios.get(`https://exam-236fc-default-rtdb.europe-west1.firebasedatabase.app/${examType}.json`)
            .then((response) => dispatch(actions.startExam({questions: response.data})))
            .catch((error: AxiosError) => dispatch(actions.catchException({error})));

        return response;
    }
}

export const fetchExamKeywords = () => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.loading())

        const response: PayloadAction<{exams: string[] }, "exam/chooseExam"> | PayloadAction<{ error: AxiosError }, "exam/catchException"> =
            await axios.get(`https://exam-236fc-default-rtdb.europe-west1.firebasedatabase.app/ALL.json`)
                .then((response) => dispatch(actions.chooseExam({exams: response.data})))
                .catch((error: AxiosError) => dispatch(actions.catchException({error})))

        return response;
    }
}