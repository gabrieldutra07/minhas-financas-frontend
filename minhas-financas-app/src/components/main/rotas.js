import React from 'react'
import {Route, Switch, HashRouter} from 'react-router-dom'
import CadastroUsuario from '../../views/cadastroUsuario'
import Home from '../../views/home'
import Login from '../../views/login'

function Rotas () {

    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/home" component={Home} />
                <Route path="/" component={Login} />
            </Switch>
        </HashRouter>
    )

}

export default Rotas