import classes from "./summary.module.scss"
import {Button} from "../../ui/atoms/buttons/button";
import {Questions} from "../exam/exam";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../redux/store";
import checkedIcon from "../../ui/atoms/icons/icons8-check-32.png";
import exitIcon from "../../ui/atoms/icons/icons8-exit-30.png";
import {useNote} from "../hooks/useNote";
import {ExamType} from "../../types";
import {fetchExamKeywords} from "../../redux/thunks";

export const Summary = ({examQuestions}: Questions) => {
    const state = useSelector((state: RootState) => state.exam)
    const dispatch: Dispatch = useDispatch();
    const summary = state.type === "SUMMARY";
    const percentageResult = summary && Math.floor((state?.result?.filter((item) => item.isCorrect).length * 100) / state.result.length);
    const name = summary && state.personalInfo.firstName;
    const examType = summary && state?.questions?.examType;
    const note = useNote(examType as ExamType, percentageResult as number, name as string)

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                {state.type === "SUMMARY" &&
                    <div className={classes.header__summary}>
                        <h2>Your score is</h2>
                        <p>{state?.result?.filter((item) => item.isCorrect).length}/{state.result.length} ({Math.floor((state?.result?.filter((item) => item.isCorrect).length * 100) / state.result.length)}%)</p>
                        <span className={classes.header__summary__note}>{note}</span>
                    </div>
                }
                <Button onClick={() => dispatch(fetchExamKeywords())}>Try again</Button>
            </div>
                {examQuestions.questions.map((item, index) => {
                if(state.type === "SUMMARY"){
                    return <div className={classes.question__wrapper} key={item.id}>
                        <div className={classes.question__header}>
                            <h4>QUESTION {index + 1}</h4>
                            <div className={classes.icon}>
                                <img src={state.result[index].isCorrect ? checkedIcon : exitIcon} alt="checked" />
                            </div>
                        </div>
                        <div className={classes.question__text}>
                            <span>{item.question}</span>
                        </div>
                        {item.options.map((opt) => (
                            <div
                                key={index + 4}
                                className={`${classes.option} 
                                    ${(state.result[index].isCorrect && state.result[index].answer === opt)
                                    ? classes.correctAnswer : (!state.result[index].isCorrect && state.result[index].answer === opt) ? classes.incorrectAnswer : ""}`}
                            >
                                <input
                                    type="radio"
                                    disabled={true}
                                    checked={state.result[index].answer === opt}
                                    readOnly={true}
                                    value={opt}
                                />
                                <span>{opt}</span>
                            </div>

                        ))}
                    </div>
                }
                return <></>
                })}
        </div>
    )
}