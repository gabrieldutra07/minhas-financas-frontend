import React from 'react'
import {Route, Switch, HashRouter} from 'react-router-dom'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import Login from '../views/login'
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastroLancamento'

function Rotas () {

    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/home" component={Home} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/cadastro-lancamentos/:id" component={CadastroLancamentos} />
                <Route path="/cadastro-lancamentos" component={CadastroLancamentos} />
                <Route path="/" component={Home} />
            </Switch>
        </HashRouter>
    )

}

export default Rotas