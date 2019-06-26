import React from 'react'


const Alert = alert => {
    return (
        <div className="alert alert-danger alert-dismissible">
            <button className="close" type="button" data-dismiss="alert">
                <span>&times;</span>
            </button>
            {alert.alert.text}
        </div>
    )
}

export default Alert;
