import classes from "./tooltip.module.scss"
import {useEffect, useState} from "react";
import bulbIcon from "../icons/icons8-bulb-emoji-32.png";

interface IToolTip {
    isError: boolean;
    message: string;
}

export const Tooltip = ({isError, message}: IToolTip) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 2500)
        return () => {
            clearTimeout(timer)
        };
    }, [isVisible]);

    return ( isVisible ?
        <div className={classes.wrapper} style={isError? {background: 'darkred', color: "white"} : {background: 'orangered', color: 'white'}}>
        <div className={classes.circle}>
            <img src={bulbIcon} alt='bulbIcon'/>
        </div>
        <span>{message}</span>
    </div> : <div> </div>
    )
}