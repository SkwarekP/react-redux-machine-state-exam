import {DataTable} from "../../ui/datatable/DataTable";
import classes from "./ManageExamsPage.module.scss"
import {Button} from "../../ui/atoms/buttons/button";
import plusIcon from "../../ui/atoms/icons/icons8-plus-48.png"

export const ManageExamsPage = () => {

    return (
        <div>
            <div className={classes.add__exam}>
                <Button>
                    <img src={plusIcon} alt="plus_Icon" />
                    <span>Add</span>
                </Button>
            </div>
            <DataTable />
        </div>
    )
}