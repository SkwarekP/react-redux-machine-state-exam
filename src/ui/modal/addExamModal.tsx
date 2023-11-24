import classes from "./addExamModal.module.scss";
import {IModal} from "./modal";
import plusIcon from "../atoms/icons/icons8-plus-48.png";
import checkedIcon from "../atoms/icons/icons8-check-32.png";

import React, {useEffect, useState} from "react";
import {Button} from "../atoms/buttons/button";

interface IAnswers {
    answer: string | undefined,
    isCorrect: boolean
}

interface IExamAnswers {
    answerId: number,
    answers: IAnswers
}

type QuestionsAmount = 5 | 15 | 30 | 45 | 60
type AnswersAmount = 2 | 3 | 4;
type ExamTime = "No time limit" | 5 | 10 | 15 | 20 | 25 | 30 | 45 | 60

interface IGeneralData {
    testName: string | undefined
    category: string | undefined
    difficultyLevel: number | undefined
    questionsAmount: QuestionsAmount
    answersAmount: AnswersAmount | undefined
    examTime: ExamTime
}

export const AddExamModal = ({onConfirm, onClose}: IModal) => {

    const [examAnswers, setExamAnswers] = useState<IExamAnswers[]>([
        {answerId: 1, answers: {answer: undefined, isCorrect: false}},
        {answerId: 2, answers: {answer: undefined, isCorrect: false}},
        {answerId: 3, answers: {answer: undefined, isCorrect: false}},
        {answerId: 4, answers: {answer: undefined, isCorrect: false}},
    ])

    const [generalData, setGeneralData] = useState<IGeneralData>({
        answersAmount: 4,
        category: 'programming',
        difficultyLevel: undefined,
        examTime: "No time limit",
        questionsAmount: 5,
        testName: undefined
    })

    const [currentAnswer, setCurrentAnswer] = useState<number | undefined>(undefined)

    const addAnswer = () => {

        const newAnswer = [...examAnswers, {answerId: 1, answers: {answer: "yes", isCorrect: false}}]
        if (examAnswers.length === 4) return
        setExamAnswers(newAnswer);
    }

    const eachAnswerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target)

        const updateEachField = examAnswers.map((item) => {
            if (event.target.id === `answerField-1`) {
                console.log("hej1")
                return {...item, answers: {answer: event.target.value}}
            } else if (event.target.id === "answerField-2") {
                console.log("hej2")
                return {...item, answers: {...item.answers, answer: event.target.value}}
            } else if (event.target.id === "answerField-3") {
                console.log("hej3")
                return {...item, answers: {...item.answers, answer: event.target.value}}
            } else if (event.target.id === "answerField-4") {
                console.log("hej4")
                return {...item, answers: {...item.answers, answer: event.target.value}}
            }
            // return {...item}
        })
        console.log(updateEachField);

        // setExamAnswers(updateEachField);
    }

    // useEffect(() => {
    //     console.log(examAnswers)
    // }, [examAnswers])

    useEffect(() => {
        console.log(generalData)
    }, [generalData])

    return (
        <div className={classes.wrapper}>
            <div className={classes.topHeader__wrapper}>
                <div className={classes.row}>
                    <div className={classes.row__item}>
                        <label>Test name</label>
                        <input type="text" onChange={(event) => setGeneralData({...generalData, testName: event.target.value})}/>
                    </div>
                    <div className={classes.row__item}>
                        <label>Category</label>
                        <div>
                            <select onChange={(event) => setGeneralData({...generalData, category: event.target.value})}>
                                <option>programming</option>
                                <option>language</option>
                                <option>geography</option>
                                <option>chemistry</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={classes.row}>
                    <div className={classes.row__item}>
                        <div>
                            <label>Difficulty level</label>
                        </div>
                        <input type="number" onChange={(event) => setGeneralData({...generalData, difficultyLevel: +event.target.value})}/>
                    </div>
                    <div className={classes.row__item}>
                        <div>
                            <label>Questions amount</label>
                        </div>
                        <select onChange={(event) => setGeneralData({...generalData, questionsAmount: +event.target.value as QuestionsAmount}) }>
                            <option>5</option>
                            <option>15</option>
                            <option>30</option>
                            <option>45</option>
                        </select>
                    </div>
                </div>
                <div className={classes.row}>
                    <div className={classes.row__item}>
                        <div>
                            <label>Answers amount</label>
                        </div>
                        <select onChange={(event) => {
                            setGeneralData({...generalData, answersAmount: +event.target.value as AnswersAmount})
                            if(event.target.value.toString() === "2") {
                                setExamAnswers([
                                    {answerId: 1, answers: {answer: undefined, isCorrect: false}},
                                    {answerId: 2, answers: {answer: undefined, isCorrect: false}},
                                ])
                            }
                            else if(event.target.value.toString() === "3") {
                                setExamAnswers([
                                    {answerId: 1, answers: {answer: undefined, isCorrect: false}},
                                    {answerId: 2, answers: {answer: undefined, isCorrect: false}},
                                    {answerId: 3, answers: {answer: undefined, isCorrect: false}}
                                ])
                            }
                            else if(event.target.value.toString() === "4") {
                                setExamAnswers([
                                    {answerId: 1, answers: {answer: undefined, isCorrect: false}},
                                    {answerId: 2, answers: {answer: undefined, isCorrect: false}},
                                    {answerId: 3, answers: {answer: undefined, isCorrect: false}},
                                    {answerId: 4, answers: {answer: undefined, isCorrect: false}}
                                ])
                            }
                        }}>
                            <option>4</option>
                            <option>3</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.row__item}>
                            <div>
                                <label>Exam time</label>
                            </div>
                            <select>
                                <option defaultValue="No time limit">No time limit </option>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>45</option>
                                <option>60</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={classes.confirm__btn__wrapper}>
                    <Button disabled={!generalData.testName}>Confirm</Button>
                </div>
            </div>
            <div className={classes.add__question__panel}>
                <div className={classes.question__content}>
                    <input type="text" placeholder="Pytanie testowe"/>
                </div>
                {/*<div className={classes.add__answer__button}>*/}
                {/*    <button onClick={addAnswer}*/}
                {/*            className={classes.plus__icon__wrapper}>*/}
                {/*        <img src={plusIcon} alt="plus Icon"/>*/}
                {/*    </button>*/}
                {/*    <span>Add answer</span>*/}
                {/*</div>*/}
                {examAnswers.map((item, index) => {
                    return <div className={classes.add__answer}>
                        <div className={classes.select__answer}>
                            <input type="text"
                                   id={`answerField-${item.answerId.toString()}`}
                                   onChange={(event) => eachAnswerHandler(event)}
                            />
                        </div>
                        <div className={classes.delete__and__selectCorrect}>
                            <label htmlFor={`a-${item.answerId}`}>
                                <input
                                    type="radio"
                                    id={`a-${item.answerId}`}
                                    onChange={(e) => console.log(e.target)}
                                    value={item.answers.answer}
                                    name="correctAnswer"
                                />
                            </label>
                        </div>
                    </div>
                })}
            </div>
            <div className={`${classes.confirm__btn__wrapper} ${classes.next__question__wrapper}`}>
                <Button>Next question</Button>
            </div>
        </div>
    )
}