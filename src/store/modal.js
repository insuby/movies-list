import {makeAutoObservable} from "mobx";

export default class ModalStore {
    constructor() {
        this._show = false

        makeAutoObservable(this)
    }

    setShow(show) {
        this._show = show
    }

    get show() {
        return this._show
    }
}