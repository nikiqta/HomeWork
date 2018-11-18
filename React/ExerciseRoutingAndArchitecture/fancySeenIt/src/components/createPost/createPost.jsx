import React from 'react';
import SubmitForm from "../forms/SubmitForm";

export default function Submit(props) {
    return(
        <section id="viewSubmit">
            <div className="submitArea">
                <h1>Submit Link</h1>
                <p>Please, fill out the form. A thumbnail image is not required.</p>
            </div>
            <SubmitForm/>
        </section>
    )
}