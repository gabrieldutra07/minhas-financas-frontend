class LocalStorageService {

    static adicionarItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static obterItem(key) {
        const item = localStorage.getItem(JSON.parse(key))
        return item
    }

}

export default LocalStorageService