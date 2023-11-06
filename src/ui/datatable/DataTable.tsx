import classes from "./DataTable.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../redux/store";
import {useEffect} from "react";
import {fetchAllExams, fetchExamKeywords2} from "../../redux/thunks";
import {ExamState} from "../../types";
import {Loader} from "../atoms/loader/loader";

const headers: string[] = ["ID", "Exam's name", "Questions amount", "Created at"]

export const DataTable = () => {

    const dispatch: Dispatch = useDispatch();
    const state: ExamState = useSelector((state: RootState) => state.exam);
    const examsListState = useSelector((state: RootState) => state.examsList)

    useEffect(() => {
        if(state.type === "CHOOSE_EXAM"){
            if(state.keywords) dispatch(fetchAllExams(state.keywords))
        }
        //eslint-disable-next-line
    }, [dispatch, state.type])

    useEffect(() => {
        // if(state.type === "CHOOSE_EXAM") return
        console.log("1");
        if(examsListState.length !== 0) return

        dispatch(fetchExamKeywords2())
    }, [examsListState, dispatch])

    useEffect(() => {
        // if(state.type === "CHOOSE_EXAM") return
        console.log("2");
        dispatch(fetchAllExams(examsListState))
    }, [examsListState, dispatch])


    return (
        <div className={classes.wrapper}>
            {headers.map((header, idx) => {
                return (
                    <div className={classes.row}>
                        <div className={classes.header}>
                            <h3>{header}</h3>
                        </div>
                        {state.type === "MANAGE_EXAMS" ? state?.existingExams?.map((item, index) => {
                            return <div className={classes.value}>
                                {idx === 0 && <span> {index + 1} </span>}
                                {idx === 1 && <span> {item.examType}</span>}
                                {idx === 2 && <span> {item?.questions?.length}</span>}
                                {idx === 3 && <span> 10.10.2023</span>}
                            </div>
                        }) : <Loader />}
                    </div>
                )})}
        </div>
    )
}