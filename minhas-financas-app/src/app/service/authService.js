import LocalStorageService from "./localStorageService"
import UsuarioService from "./usuarioService"

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService {
    
    static isAuth() {
        const user = LocalStorageService.obterItem(USUARIO_LOGADO)
        return user && user.id
    }

    static removeAuthUser() {
        LocalStorageService.removeItem(USUARIO_LOGADO)
    }

    static logar(usuario) {
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioAutenticado() {
        return LocalStorageService.obterItem(USUARIO_LOGADO)
    }

}