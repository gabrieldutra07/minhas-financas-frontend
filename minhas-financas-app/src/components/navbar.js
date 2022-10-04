import React from 'react'
import NavbarItem from './navbarItem'
import AuthService from '../app/service/authService'

const logout = () => {
    AuthService.removeAuthUser()
}

const isAuthUser = () => {
    return AuthService.isAuth()
}

function Navbar () {

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
            <a href="#/home" className="navbar-brand">Minhas Finanças</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem render={isAuthUser()} href="#/home" label="Home"/>
                <NavbarItem render={isAuthUser()} href="#/cadastro-usuarios" label="Usuários"/>
                <NavbarItem render={isAuthUser()} href="#/consulta-lancamentos" label="Lançamentos"/>
                <NavbarItem render={isAuthUser()} onClick={logout} href="#/login" label="Sair"/>
            </ul>
        </div>
      </div>
    </div>
    )
}

export default Navbar