import React from 'react';

export default function EditForm(props){

        return(
            <form id="editPostForm" className="submitForm" onSubmit={props.onSubmitFunc}>
                <label>Link URL:</label>
                <input
                    onChange={(e) => {props.onClickFunc(e)}}
                    name="url"
                    type="text"
                    value={props.data.url}/>
                <label>Link Title:</label>
                <input
                    onChange={(e) => {props.onClickFunc(e)}}
                    name="title"
                    type="text"
                    value={props.data.title}/>
                <label>Link Thumbnail Image (optional):</label>
                <input
                    onChange={(e) => {props.onClickFunc(e)}}
                    name="imageUrl"
                    type="text"
                    value={props.data.imageUrl}/>
                <label>Comment (optional):</label>
                <textarea
                    onChange={(e) => {props.onClickFunc(e)}}
                    name="description"
                    value={props.data.description}>
                </textarea>
                <input id="btnEditPost" type="submit" value="Edit Post"/>
            </form>
        );

}