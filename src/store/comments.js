import {makeAutoObservable} from "mobx";

export default class CommentsStore {
    constructor() {
        this._comments = JSON.parse(localStorage.getItem('comments')) || {}

        makeAutoObservable(this)
    }

    setComment({id, comment, author}) {
        if (!comment.length) return;
        if (!this._comments[id]) this._comments[id] = []
        this._comments[id].push({author, comment, commentID: Math.ceil(Math.random() * 10000)})
        localStorage.setItem('comments', JSON.stringify(this._comments))
    }

    removeComment(id, commentID) {
        this._comments[id] = this._comments[id].filter(comment => comment.commentID !== commentID)
        localStorage.setItem('comments', JSON.stringify(this._comments))
    }

    get comments() {
        return this._comments
    }

}