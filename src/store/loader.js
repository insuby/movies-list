import {makeAutoObservable} from "mobx";

export default class LoaderStore {
    constructor() {
        this._load = false

        makeAutoObservable(this)
    }

    setLoading(load) {
        this._load = load
    }

    get load() {
        return this._load
    }
}