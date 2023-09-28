import classes from "./examReduxProcess.module.scss"
import {Button} from "./ui/atoms/buttons/button";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "./redux/store";
import {Exam} from "./components/exam/exam";
import {Loader} from "./ui/atoms/loader/loader";
import {Form} from "./components/form/form";
import {Introduction} from "./ui/introduction/introduction";
import {Summary} from "./components/summary/summary";
import {fetchExamKeywords, fetchExam} from "./redux/thunks";
import {Error} from "./ui/error/error";
import {useEffect} from "react";

export const ExamReduxProcess = () => {
    const state = useSelector((state: RootState) => state.exam);
    const examType = useSelector((state: RootState) => (state.exam.type === "QUESTION" || state.exam.type === "FINISH_EXAM" || state.exam.type === "SUMMARY")
        &&
    state?.exam?.questions?.examType);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExamKeywords())
    }, [dispatch])

    switch (state.type){
        case "QUESTION":
            switch (examType){
                case state.questions.examType:
                    return <Exam examQuestions={state.questions} />
                default:
                    return <></>
            }
        case "LOADING":
            return <Loader />
        case "FINISH_EXAM":
            switch (examType){
                case state.questions.examType:
                    return <Form examQuestions={state.questions} />
                default:
                    return <></>
            }
        case "SUMMARY":
            switch (examType) {
                case state.questions.examType:
                    return <Summary examQuestions={state.questions} />
                default:
                    return <></>
            }
        case "EXCEPTION":
            return <Error error={state.error}/>
        default:
            return  <>
            <Introduction />
            <div className={classes.wrapper}>
                {state?.exams?.map((exam, idx) => {
                    if(exam === "SEESHARP") return <Button key={idx} onClick={() => dispatch(fetchExam(exam))}>C#</Button>
                    if(exam === "FSHARP") return <Button key={idx} onClick={() => dispatch(fetchExam(exam))}>F#</Button>
                    return <Button key={idx} onClick={() => dispatch(fetchExam(exam))}>{exam}</Button>
                })}
            </div>
            </>
    }
    
}