import { Dispatch } from "./store";
import { actions, examsListActions } from "./examSlice";
import axios, { AxiosError } from "axios";
import { Exam, INewExamData, IQuestions } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

const URL: string = process.env.REACT_APP_REALTIME_DATABASE!

// export const fetchExam = (examType: ExamType | string) => {
//     return async (dispatch: Dispatch) => {
//         dispatch(actions.loading())

//         const response: PayloadAction<{ questions: IQuestions }, "exam/startExam"> | PayloadAction<{ error: AxiosError }, "exam/catchException"> =
//             await axios.get(`${URL}${examType}.json`)
//                 .then((response) => dispatch(actions.startExam({questions: response.data})))
//                 .catch((error: AxiosError) => dispatch(actions.catchException({error})));

//         return response;
//     }
// }

export const fetchExam = (examName: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.loading())

        const response: PayloadAction<{ questions: IQuestions }, "exam/startExam"> | PayloadAction<{ error: AxiosError }, "exam/catchException"> =
            await axios.get(`http://localhost:3002/exams/name/${examName}`)
                .then((response) => dispatch(actions.startExam({ questions: response.data })))
                .catch((error: AxiosError) => dispatch(actions.catchException({ error })));

        console.log(response);
        return response;
    }
}
export const fetchAllExams = (exams: Array<string>) => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.loading())
        const arr: IQuestions[] = []
        for (let i = 0; i < exams.length; i++) {
            await axios.get(`${URL}${exams[i]}.json`)
                .then((response) => arr.push(response.data))
                .catch((error: AxiosError) => dispatch(actions.catchException({ error })))
        }

        dispatch(actions.manageExams({ existingExams: arr }))

        return arr;
    }
}

export const fetchExamKeywords = () => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.loading())

        const response =
            await axios.get<Exam[]>(`http://localhost:3002/exams`)
                .then((res) => {
                    const keywords = res?.data?.map((exam) => exam.name)
                    dispatch(actions.chooseExam({keywords}))
                    return res?.data
                })
                .catch((error: AxiosError) => dispatch(actions.catchException({ error })))

        return response;
    }
}

export const fetchExamKeywords2 = () => {
    return async (dispatch: Dispatch) => {
        await axios.get(`${URL}ALL.json`)
            .then((response) => dispatch(examsListActions.setExamsList(response.data)))
            .catch((error: AxiosError) => dispatch(actions.catchException({ error })))
    }
}

export const addNewExamToDB = async (data: INewExamData) => {
    const convertedOptions = data.questions.map((item) => item.options)
        .map((option) => option.map((opt) => opt.answer))
    //TO CHANGE
    const convertedData = data.questions.map((item, index) => {
        return { ...item, options: convertedOptions[index] }
    })

    const convertedData_ = { ...data, questions: convertedData }

    return await axios.put<INewExamData>(`${URL}${data.examType}.json`, convertedData_)
}

export const addNewExamToKeywords = async (keyword: string) => {
    const response = await axios.get(`${URL}ALL.json`);
    const existingArray = response.data || [];

    existingArray.push(keyword)

    await axios.put(`${URL}ALL.json`, existingArray)
}

