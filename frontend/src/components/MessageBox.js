import React from 'react'

export default function MessageBox(props) {
    console.log("in MessageBox.js")
    console.log(props)
   // children for the MessageBox props is the error >>>> MessageBox variant="danger">{error} MessageBox
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    );
}
