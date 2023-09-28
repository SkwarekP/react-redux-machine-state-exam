import classes from "./form.module.scss"
import fireworksImg from "../../ui/atoms/icons/pexels-photo-634694.jpeg"
import {Button} from "../../ui/atoms/buttons/button";
import {Dispatch, RootState} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/examSlice";
import {FormEvent, useEffect, useState} from "react";
import {Gender, IResult} from "../../types";
import {IQuestions} from "../exam/exam";
import {fetchExamKeywords} from "../../redux/thunks";

export const Form = ({examQuestions}: IQuestions) => {
    const dispatch: Dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.exam);
    const [name, setName] = useState<string | undefined>(undefined);
    const [emailAddress, setEmailAddress] = useState<string | undefined>(undefined);
    const [gender, setGender] = useState<Gender>('Male');
    const [correctAnswersArr, setCorrectAnswersArr] = useState<IResult[]>([]);

    const leaveHandler = () => {
        dispatch(fetchExamKeywords());
    }

    const onFinish = (event: FormEvent) => {
        event.preventDefault();

        if(!name || !emailAddress) return

        dispatch(actions.summary({
            personalInfo: {
                firstName: name,
                emailAddress: emailAddress,
                gender: gender
            },
            result: correctAnswersArr,
        }))
    }

    useEffect(() => {
        if(state.type === "FINISH_EXAM") {
            const correctAnswers = examQuestions.questions.map((item) => {
                return {id: item.id, correctAnswer: item.correctAnswer}
            })

            const checkedAnswers = state?.result.map((item, index) => {
                if(correctAnswers[index]?.correctAnswer === item.answer) {
                    return {...item, isCorrect: true}
                }
                return {...item, isCorrect: false}
            })

            setCorrectAnswersArr(checkedAnswers);
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div className={classes.congratsImg}>
                    <img src={fireworksImg} alt="congrats"/>
                </div>
                <span>Congratulations, you just finished the exam. To check your result please provide your name and e-mail address.</span>
            </div>
            <div className={classes.formWrapper}>
                <form onSubmit={onFinish}>
                    <div className={classes.row}>
                        <div className={classes.eachField}>
                            <label>First Name</label>
                            <input type="text" onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                        <div className={classes.eachField}>
                            <label>Email Address</label>
                            <input type="email" onChange={(e) => setEmailAddress(e.target.value)}/>
                        </div>
                    <div className={`${classes.eachField}`} style={{margin: 0}}>
                        <label>Gender</label>
                        <select onChange={(e) => setGender(e.target.value as Gender)}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Prefer not say</option>
                        </select>
                    </div>
                    <div className={classes.buttonList}>
                        <Button onClick={leaveHandler}>Leave</Button>
                        <Button type="submit" disabled={!name || !emailAddress}>Continue</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}