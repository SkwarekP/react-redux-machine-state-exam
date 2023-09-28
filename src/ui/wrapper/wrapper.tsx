import classes from './wrapper.module.scss';
import {IChildrenProps} from "../../types";


export const Wrapper = ({children}: IChildrenProps) => {
    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    )
}