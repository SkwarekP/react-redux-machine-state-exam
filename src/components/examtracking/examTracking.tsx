import classes from "./examTracking.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../redux/store";
import {actions} from "../../redux/examSlice";
import {Questions} from "../../types";

interface IExamTracking {
    examQuestions: Questions
    onShowTooltip: (message: string) => void
}

export const ExamTracking = ({examQuestions, onShowTooltip}: IExamTracking) => {

    console.log('test commit');
    const state = useSelector((state: RootState) => state.exam.type === "QUESTION" && state.exam)
    const dispatch: Dispatch = useDispatch()

    return (
        <>
        {examQuestions ? <div className={classes.wrapper}>
            <div className={classes.step}>
                {examQuestions?.questions?.map((item, index) => {
                        return <div key={item.id} className={classes.step}>
                            <button
                                onClick={() => {
                                    if(state){
                                        if(item.id > state.answers.length +1){
                                            onShowTooltip("Impossible to show next question before answer to previous.")
                                            return
                                        }
                                        dispatch(actions.updateCounter({counter: item.id}))
                                    }
                                }}
                                className={`
                                ${classes.circle} 
                                ${state && (state?.answers[index]?.id === item.id) && classes.filledCircle} 
                                ${state && (state.counter === item.id) && classes.actual} 
                                `}>
                                <span>{item.id}</span>
                            </button>
                            <div className={`${classes.line} ${state && (state?.answers[index]?.id === item.id) && classes.filledLine}`} />
                        </div>
                    }
                )})
            </div>
        </div> : <div></div>}
        </>
    )
}