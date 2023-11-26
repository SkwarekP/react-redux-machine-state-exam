import classes from "./addExamModal.module.scss";
import {IModal} from "./modal";
import starIcon from "../atoms/icons/star.svg";
import filledStarIcon from "../atoms/icons/filledStar.svg";
import crossIcon from "../atoms/icons/cross.png";

import React, {useEffect, useState} from "react";
import {Button} from "../atoms/buttons/button";

interface IAnswers {
    answerId: number,
    answer: string | undefined,
    isCorrect: boolean
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

interface IQuestionsAndAnswers {
    questions: {
        id: number,
        question: string | undefined,
        options: IAnswers[],
        correctAnswer: string | undefined
    },
    // testName: string | undefined
    // category: string | undefined
    // difficultyLevel: number | undefined
    // questionsAmount: QuestionsAmount
    // answersAmount: AnswersAmount | undefined
    // examTime: ExamTime
}

const stars: number[] = [1, 2, 3, 4, 5];


export const AddExamModal = ({onConfirm, onClose}: IModal) => {

    const [examAnswers, setExamAnswers] = useState<IAnswers[]>([
        {answerId: 1, answer: undefined, isCorrect: false},
        {answerId: 2, answer: undefined, isCorrect: false},
        {answerId: 3, answer: undefined, isCorrect: false},
        {answerId: 4, answer: undefined, isCorrect: false},
    ])

    const [generalData, setGeneralData] = useState<IGeneralData>({
        answersAmount: 4,
        category: 'programming',
        difficultyLevel: undefined,
        examTime: "No time limit",
        questionsAmount: 5,
        testName: undefined
    })

    const [questionsAndAnswers, setQuestionsAndAnswers] = useState<IQuestionsAndAnswers[]>(
        [
            {
                questions: {
                    id: 1,
                    question: undefined,
                    options: [
                        {answerId: 1, answer: undefined, isCorrect: false},
                        {answerId: 2, answer: undefined, isCorrect: false},
                        {answerId: 3, answer: undefined, isCorrect: false},
                        {answerId: 4, answer: undefined, isCorrect: false},
                    ],
                    correctAnswer: undefined
                },
                // testName: generalData.testName,
                // answersAmount: 4,
                // category: 'programming',
                // difficultyLevel: undefined,
                // examTime: "No time limit",
                // questionsAmount: 5,
            },
        ]
    )

    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const [currentQuestion, setCurrentQuestion] = useState<string | undefined>(undefined)

    const eachAnswerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const update = examAnswers.map((item, index) => {
            if (item.answerId.toString() === event.target.id) {
                return {...item, answer: event.target.value}
            }
            return {...item}
        })
        setExamAnswers(update)
    }

    const chooseAnswersAmountHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {

        setGeneralData({...generalData, answersAmount: +event.target.value as AnswersAmount})
        // setQuestionsAndAnswers()
        if (event.target.value.toString() === "2") {
            setExamAnswers([
                {answerId: 1, answer: undefined, isCorrect: false},
                {answerId: 2, answer: undefined, isCorrect: false},
            ])
            setQuestionsAndAnswers(
                [
                    {
                        questions: {
                            id: 1,
                            question: undefined,
                            options: [
                                {answerId: 1, answer: undefined, isCorrect: false},
                                {answerId: 2, answer: undefined, isCorrect: false},
                            ],
                            correctAnswer: undefined
                        },
                        // testName: generalData.testName,
                        // answersAmount: 4,
                        // category: 'programming',
                        // difficultyLevel: undefined,
                        // examTime: "No time limit",
                        // questionsAmount: 5,
                    },
                ]
            )
        } else if (event.target.value.toString() === "3") {
            setExamAnswers([
                {answerId: 1, answer: undefined, isCorrect: false},
                {answerId: 2, answer: undefined, isCorrect: false},
                {answerId: 3, answer: undefined, isCorrect: false},
            ])
            setQuestionsAndAnswers(
                [
                    {
                        questions: {
                            id: 1,
                            question: undefined,
                            options: [
                                {answerId: 1, answer: undefined, isCorrect: false},
                                {answerId: 2, answer: undefined, isCorrect: false},
                                {answerId: 3, answer: undefined, isCorrect: false},
                            ],
                            correctAnswer: undefined
                        },
                        // testName: generalData.testName,
                        // answersAmount: 4,
                        // category: 'programming',
                        // difficultyLevel: undefined,
                        // examTime: "No time limit",
                        // questionsAmount: 5,
                    },
                ]
            )
        } else if (event.target.value.toString() === "4") {
            setExamAnswers([
                {answerId: 1, answer: undefined, isCorrect: false},
                {answerId: 2, answer: undefined, isCorrect: false},
                {answerId: 3, answer: undefined, isCorrect: false},
                {answerId: 4, answer: undefined, isCorrect: false},
            ])
            setQuestionsAndAnswers(
                [
                    {
                        questions: {
                            id: 1,
                            question: undefined,
                            options: [
                                {answerId: 1, answer: undefined, isCorrect: false},
                                {answerId: 2, answer: undefined, isCorrect: false},
                                {answerId: 3, answer: undefined, isCorrect: false},
                                {answerId: 4, answer: undefined, isCorrect: false},
                            ],
                            correctAnswer: undefined
                        },
                        // testName: generalData.testName,
                        // answersAmount: 4,
                        // category: 'programming',
                        // difficultyLevel: undefined,
                        // examTime: "No time limit",
                        // questionsAmount: 5,
                    },
                ]
            )
        }
    }

    useEffect(() => {
        console.log(examAnswers)
    }, [examAnswers])


    useEffect(() => {
        console.log(questionsAndAnswers)
    }, [questionsAndAnswers])

    const confirmGeneralOptionsHandler = () => {
        if (isDisabled) return

        if (generalData.testName && generalData.difficultyLevel) setIsDisabled(true);
    }

    const nextQuestionHandler = () => {
        const correctAnswer_ = examAnswers.find((item) => {
            if(item.isCorrect) return item.answer;
            else return undefined
        });

        const update = questionsAndAnswers.map((item, index) => {
            return {
                ...item,
                questions: {
                    ...item.questions,
                    question: currentQuestion,
                    correctAnswer: correctAnswer_!.answer ,
                    options: examAnswers
                }
            }
        })
        setQuestionsAndAnswers(update)
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.close__modal}>
                <button onClick={onClose}><img src={crossIcon} alt="crossIcon"/></button>
            </div>
            <div className={classes.topHeader__wrapper}>
                <div className={classes.row}>
                    <div className={classes.row__item}>
                        <div>
                            <label>Test name</label>
                        </div>
                        <input type="text"
                               onChange={(event) => setGeneralData({...generalData, testName: event.target.value})}
                               disabled={isDisabled}
                               className={isDisabled ? classes.input__disabled : undefined}
                        />
                    </div>
                    <div className={classes.row__item}>
                        <div>
                            <label>Category</label>
                        </div>
                        <div>
                            <select
                                onChange={(event) => setGeneralData({...generalData, category: event.target.value})}
                                disabled={isDisabled}
                                className={isDisabled ? classes.input__disabled : undefined}
                            >
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
                        <div className={classes.stars__wrapper}>
                            {stars.map((item) => (
                                !generalData.difficultyLevel ? <img
                                    id={(item).toString()}
                                    onClick={(event: any) => setGeneralData({
                                        ...generalData,
                                        difficultyLevel: +event.target.id
                                    })} src={starIcon} alt="starIcon"
                                /> : item <= generalData.difficultyLevel && <img src={filledStarIcon} alt="filledStar"/>
                            ))}
                        </div>
                    </div>
                    <div className={classes.row__item}>
                        <div>
                            <label>Questions amount</label>
                        </div>
                        <select
                            onChange={(event) => setGeneralData({
                                ...generalData,
                                questionsAmount: +event.target.value as QuestionsAmount
                            })}
                            disabled={isDisabled}
                            className={isDisabled ? classes.input__disabled : undefined}
                        >
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
                        <select
                            onChange={(event) => chooseAnswersAmountHandler(event)}
                            disabled={isDisabled}
                            className={isDisabled ? classes.input__disabled : undefined}
                        >
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
                            <select
                                onChange={(event) => setGeneralData({
                                    ...generalData,
                                    examTime: +event.target.value as ExamTime
                                })}
                                disabled={isDisabled}
                                className={isDisabled ? classes.input__disabled : undefined}
                            >
                                <option defaultValue="No time limit">No time limit</option>
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
                    <Button disabled={(!generalData.testName || !generalData.difficultyLevel) || isDisabled}
                            onClick={confirmGeneralOptionsHandler}>
                        Confirm
                    </Button>
                </div>
            </div>
            <div className={classes.add__question__panel}>
                <div className={classes.question__content}>
                    <input
                        type="text"
                        placeholder="Question..."
                        disabled={!isDisabled}
                        onChange={(event) => setCurrentQuestion(event.target.value)}
                    />
                </div>
                <div className={classes.questions__amount}>
                    <span>{questionsAndAnswers.length}/{generalData.questionsAmount}</span>
                </div>
                {questionsAndAnswers.map((item, index) => (
                    item.questions.options.map((option, idx) => (
                        <div className={classes.add__answer}>
                            <div className={classes.select__answer}>
                                <input type="text"
                                       id={(idx + 1).toString()}
                                       placeholder={`Answer... #${idx + 1}`}
                                       className={!isDisabled ? classes.border__gray : undefined}
                                       disabled={!isDisabled}
                                       onChange={(event) => eachAnswerHandler(event)}
                                />
                            </div>
                            <div className={classes.delete__and__selectCorrect}>
                                <label htmlFor={`a-${item.questions.id}`}>
                                    <input
                                        type="radio"
                                        id={(idx + 1).toString()}
                                        disabled={!isDisabled}
                                        onChange={(event) => {
                                            const update = examAnswers.map((item) => {
                                                if (+event.target.id === item.answerId) {
                                                    return {...item, isCorrect: true}
                                                }
                                                return {...item, isCorrect: false}
                                            })
                                            setExamAnswers(update);
                                        }}
                                        value={item.questions.correctAnswer}
                                        name="correctAnswer"
                                    />
                                </label>
                            </div>
                        </div>
                    ))
                ))}
            </div>
            <div className={`${classes.next__question__wrapper}`}>
                <Button
                    disabled={!isDisabled}
                    onClick={nextQuestionHandler}
                >
                    Add question
                </Button>
            </div>
        </div>
    )
}