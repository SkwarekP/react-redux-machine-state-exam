import classes from "./addExamModal.module.scss";
import {IModal} from "./modal";
import plusIcon from "../atoms/icons/icons8-plus-48.png";
import {useEffect, useState} from "react";

interface IAnswers {
    answer: string,
    isCorrect: boolean
}
interface IExamAnswers {
    answerId: number,
    answers: IAnswers[]
}

export const AddExamModal = ({onConfirm, onClose}: IModal) => {

    const [examAnswers, setExamAnswers] = useState<IExamAnswers[]>([])

    const addAnswer = () => {

        const newAnswer = [...examAnswers, {answerId: 1, answers: [{answer: "yes", isCorrect: false}]}]
        if(examAnswers.length === 4) return
        setExamAnswers(newAnswer);
    }

    useEffect(() => {
        console.log(examAnswers)
    }, [examAnswers])

    return (
        <div className={classes.wrapper}>
            <div className={classes.topHeader__wrapper}>
                <div className={classes.row}>
                    <div className={classes.row__item}>
                        <label>Test name</label>
                        <input type="text"/>
                    </div>
                    <div className={classes.row__item}>
                        <label>Category</label>
                        <div>
                            <select>
                                <option>programming</option>
                                <option>opt2</option>
                                <option>opt3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={classes.row}>
                    <div className={classes.row__item}>
                        <label>Difficulty level</label>
                        <input type="text"/>
                    </div>
                    <div className={classes.row__item}>
                        <div className={`${classes.row} ${classes.time}`}>
                            <input type="checkbox"/>
                            <label>Time</label>
                            <select>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>20</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.add__question__panel}>
                <div className={classes.question__content}>
                    <input type="text" placeholder="Pytanie testowe"/>
                </div>
                <div className={classes.add__answer__button}>
                    <button onClick={addAnswer}
                            className={classes.plus__icon__wrapper}>
                        <img src={plusIcon} alt="plus Icon"/>
                    </button>
                    <span>Add answer</span>
                </div>
                {examAnswers.map((answer) => {
                    return <div className={classes.add__answer}>
                        <div className={classes.select__answer}>
                            <input type="text"/>
                        </div>
                        <div className={classes.delete__and__selectCorrect}>
                            <input type="checkbox"/>
                            <button>X</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}