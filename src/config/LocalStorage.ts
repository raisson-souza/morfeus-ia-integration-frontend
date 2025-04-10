/** Tipo com funções específicas para propriedades do local storage */
type LocalStorageDefiners<T> = {
    get: () => T | null
    set: (value: T) => void
    remove: () => void
}

type LocalStorageProps = {
    apiToken: LocalStorageDefiners<string>
}

export const LocalStorage: LocalStorageProps = {
    apiToken: {
        get() {
            return localStorage.getItem("api_token")
        },
        set(value) {
            localStorage.setItem("api_token", value)
        },
        remove() {
            localStorage.removeItem("api_token")
        },
    },
}