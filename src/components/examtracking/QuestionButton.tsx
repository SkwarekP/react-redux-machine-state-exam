import classes from "./QuestionButton.module.scss";
import {actions} from "../../redux/examSlice";
import {IQuestionsItem} from "../../types";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../redux/store";

interface IQuestionButton {
    item: IQuestionsItem
    index: number
    onShowTooltip: (message: string) => void
}

export const QuestionButton = ({item, index, onShowTooltip}: IQuestionButton) => {
    const state = useSelector((state: RootState) => state.exam.type === "QUESTION" && state.exam)
    const dispatch: Dispatch = useDispatch()

    return (
        <div key={item.id} className={classes.step}>
            <button
                onClick={() => {
                    if (state) {
                        if (item.id > state.answers.length + 1) {
                            onShowTooltip("Impossible to show next question before answer to previous.")
                            return
                        }
                        dispatch(actions.updateCounter({counter: item.id}))
                    }
                }}
                className=
                    {`${classes.circle}
                    ${state && (state?.answers[index]?.id === item.id) && classes.filledCircle} 
                    ${state && (state.counter === item.id) && classes.actual}`}>
                <span>{item.id}</span>
            </button>
            <div className={`${classes.line} ${state && (state?.answers[index]?.id === item.id) && classes.filledLine}`}/>
        </div>
    )
}