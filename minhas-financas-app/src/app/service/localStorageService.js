class LocalStorageService {

    static adicionarItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static obterItem(key) {
        const item = localStorage.getItem(key)
        return JSON.parse(item)
    }

    static removeItem(key) {
        localStorage.removeItem(key)
    }

}

export default LocalStorageService