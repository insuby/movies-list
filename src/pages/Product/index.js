import './index.scss';
import React, {useContext} from 'react';
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {Context} from "../../index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faTimes} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal";
import FormComment from "../../components/Form/Comment";
import {observer} from "mobx-react-lite";

const Product = observer(() => {
    const {catalog, commentsStore, modal} = useContext(Context)
    const {id} = useParams()
    const {
        title, description_full, date_uploaded,
        large_cover_image, genres
    } = catalog.list.find(item => item.id === +id)

    return (
        <div className="product">
            <div className="product__image">
                <img src={large_cover_image} alt={title}/>
            </div>
            <div className="product__info info">
                <h1 className={'info__name'}>{title}</h1>
                <p className={'info__genre'}>{genres && genres.map(genre => <span
                    key={genre}>{genre}</span>)}</p>
                <button className={"info__btn"} onClick={() => {
                    modal.setShow(true)
                }}>
                    <FontAwesomeIcon icon={faComment}/>
                    leave comment
                </button>
                <p className={'info__uploaded'}>Uploaded: {date_uploaded}</p>
                <p className={'info__desc'}>{description_full}</p>
            </div>
            <div className={"product__comments comment"}>
                <h3>Comments</h3>
                {
                    commentsStore.comments[id] ?
                        <ul>
                            {
                                commentsStore.comments[id].map(({author, comment, commentID}) => {
                                    return <li key={commentID}>
                                            <span className={"product__comment__close"}
                                                  onClick={(event) => {
                                                      commentsStore.removeComment(+id, commentID)
                                                  }}>
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </span>
                                        <span className={"comment__text"} children={comment}/>
                                        <span className={"comment__author"} children={author}/>
                                    </li>
                                })
                            }
                        </ul> : <p>No comment yet</p>
                }
            </div>
            <Modal>
                <FormComment head={title}/>
            </Modal>
        </div>
    );
});

export default Product;
