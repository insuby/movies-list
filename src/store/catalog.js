import {makeAutoObservable, runInAction} from "mobx";

export default class CatalogStore {
    constructor() {
        this._list = []
        this._page = 1
        this._pageLimit = 5
        this._total = null
        this._blackList = []

        makeAutoObservable(this)
    }

    setList(list) {
        this.checkBlackList()

        runInAction(() => {
            this._list = this.updateList(list)
        })
    }

    setPage(page) {
        runInAction(() => {
            this._page = page
        })
    }

    setPageLimit(pageLimit) {
        runInAction(() => {
            this._pageLimit = pageLimit
        })
    }

    setTotal(total) {
        runInAction(() => {
            this._total = total
        })
    }

    setToBlackList(id) {
        const movie = this._list.find(movie => movie.id === id)

        this._blackList.push(movie)

        localStorage.setItem('blackList', JSON.stringify(this._blackList))

        this.setList(this._list)
    }

    returnFromBlackList(id) {
        let blackList = JSON.parse(localStorage.getItem('blackList'))
        const movie = blackList.filter(item => item.id === id)[0]

        this._blackList = blackList.filter(item => item.id !== id)
        this._list.push(movie)

        localStorage.setItem('blackList', JSON.stringify(this._blackList))
    }

    checkBlackList() {
        const blackList = JSON.parse(localStorage.getItem('blackList')) || [];

        runInAction(() => {
            this._blackList = blackList
        })
    }

    updateList(list) {
        const blackListIds = this.blackList.map(({id}) => id)
        return list.filter(item => !blackListIds.includes(item.id))
    }

    get list() {
        return this._list
    }

    get removed() {
        return this._blackList
    }

    get page() {
        return this._page
    }

    get pageLimit() {
        return this._pageLimit
    }

    get total() {
        return this._total
    }

    get blackList() {
        return this._blackList
    }
}