import classes from './header.module.scss'
import {IChildrenProps} from "../../types";
import linkedinIcon from "../atoms/icons/icons8-linkedin-48.png";
import githubIcon from "../atoms/icons/icons8-github-48.png";
import {NavLink} from "react-router-dom";
import {createPortal} from "react-dom";
import {Modal} from "../modal/modal";
import {Backdrop} from "../modal/backdrop";
import {useState} from "react";

const activeLinkColor =  (isActive: boolean) => {return {color: isActive ? 'orangered' : 'inherit'}}

export const Header = ({children}: IChildrenProps) => {

    const [isModalShown, setIsModalShown] = useState(false);

    const handleModal = () => {
        setIsModalShown(false);
    }

    return (
        <div className={classes.wrapper}>
        <div className={classes.wrapper__header}>
            <div className={classes.menu__item}>
                <NavLink style={({isActive, isPending}) => activeLinkColor(isActive)}
                         to="/"
                >
                    Exams
                </NavLink>
            </div>
            <div className={classes.menu__item}>
                {/*<NavLink style={({isActive, isPending}) => activeLinkColor(isActive)}*/}
                {/*         onClick={() => setIsModalShown(true)}*/}
                {/*         to={!isModalShown ? 'logs' : "/"}*/}
                {/*>*/}
                {/*    Logs*/}
                {/*</NavLink>*/}
            </div>
            <div className={classes.menu__item}>
                <div className={classes.social__media}>
                    <div className={classes.social__media__img__container}>
                        <button onClick={() => window.open('https://www.linkedin.com/in/patryk-skwara-93277625b/', '_blank')}>
                            <img src={linkedinIcon} alt="linkedin" />
                        </button>
                    </div>
                    <div className={classes.social__media__img__container}>
                        <button onClick={() => window.open("https://github.com/SkwarekP", "_blank")}>
                            <img src={githubIcon} alt="github" />
                        </button>
                    </div>
                    {/*<div className={classes.social__media__img__container}>*/}
                    {/*    <button onClick={() => window.open("https://github.com/SkwarekP", "_blank")}>*/}
                    {/*        <img src={mailIcon} alt="mail" />*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
            {isModalShown && createPortal(<Modal onConfirm={handleModal} onClose={() => setIsModalShown(false)}/>, document.getElementById('modal')!)}
            {isModalShown && createPortal(<Backdrop onClose={() => setIsModalShown(false)}/>, document.getElementById('backdrop')!)}
            {children}
        </div>
    )
}