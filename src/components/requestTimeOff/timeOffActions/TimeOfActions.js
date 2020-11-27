import './TimeOffActions.css';
import React, {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const TimeOffActions = (() => {

    const onDelete = () => {

    }

    const onEdit = () => {

    }

    return (
        <div className="time_off_actions">
            <DeleteIcon
                style={{
                    fontSize: "2rem",
                    padding: ".6rem",
                    borderRadius: "50%",
                    color: "#898989",
                    boxShadow: "-1px 1px 5px rgba(0,0,0, 0.5)",
                }}
                onClick = {onDelete}
            />
            <EditIcon
                style={{
                    fontSize: "2rem",
                    padding: ".6rem",
                    marginLeft: "1rem",
                    borderRadius: "50%",
                    color: "#898989",
                    boxShadow: "-1px 1px 5px rgba(0,0,0, 0.5)",
                }}
                onClick = {onEdit}
            />
        </div>
    )
})

export default TimeOffActions;