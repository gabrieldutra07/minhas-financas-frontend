import React from 'react'
import AuthService from '../app/service/authService'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const ProviderAuth = AuthContext.Provider

class AuthProvider extends React.Component {

    state = {
        usuarioAutenticado: null,
        isAuth: false
    }

    iniciarSessao = (usuario) => {
        AuthService.logar(usuario)
        this.setState({isAutenticado: true, usuarioAutenticado: usuario})
    }

    encerrarSessao = () => {
        AuthService.removeAuthUser()
        this.setState({isAutenticado: false, usuarioAutenticado: null})
    }

    render() {
        
        const context = {   
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.state.iniciarSessao,
            encerrarSessao: this.state.encerrarSessao
        }
        
        return (
            <ProviderAuth value={context}>
                {this.props.children}
            </ProviderAuth>
        )

    }

}

export default AuthProvider