import './index.scss';
import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Context} from "../../../index";
import {useParams} from "react-router-dom/cjs/react-router-dom";

const FormComment = ({head}) => {
    const {modal, commentsStore} = useContext(Context)
    const {id} = useParams()

    const [form, setForm] = useState({
        author: 'Noname',
        comment: ''
    })

    const onChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const setComment = () => {
        commentsStore.setComment({id, ...form})
        modal.setShow(false)
    }

    return (
        <div className={"form-comment"}>
            <div className={"form-comment__head"}>
                <p>{head}</p>
                <span className={"form-comment__close"}
                      onClick={() => {
                          modal.setShow(false)
                      }}>
                        <FontAwesomeIcon icon={faTimes}/>
                </span>
            </div>
            <div className={"form-comment__body"}>
                <label htmlFor="author">Your name:</label>
                <input onChange={onChange} type="text" name="author" id="author" value={form.author}/>
                <label htmlFor="form-comment">Your comment:</label>
                <textarea autoFocus={true} name="comment" id="comment" cols="30"
                          onChange={onChange} rows="10" required/>
            </div>
            <div className={"form-comment__foot"}>
                <button className={"btn form-comment__btn form-comment__btn_submit"}
                        children={"submit"} onClick={setComment}/>
                <button className={"btn form-comment__btn form-comment__btn_close"}
                        children={"cancel"}
                        onClick={() => {
                            modal.setShow(false)
                        }}/>
            </div>
        </div>
    );
};

export default FormComment;