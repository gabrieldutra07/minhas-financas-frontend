import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import {withRouter} from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localStorageService'
import {mensagemErro} from '../components/toastr'
import {AuthContext} from '../main/provedorAutenticacao'

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
    }

    constructor() {
        super()
        this.service = new UsuarioService()
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(res => {
            LocalStorageService.adicionarItem('_usuario_logado', res.data)
            //this.context.iniciarSessao(res.data)
            this.props.history.push('/home')
            window.location.reload()
        }).catch(err => {
            mensagemErro(err.response.data)
        })
    }   

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-6' style={{position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className='col-lg-12'>
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o Email"/>
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input onChange={(e) => this.setState({senha: e.target.value})} value={this.state.senha} type="password" className="form-control" id="exampleInputPassword1" placeholder="Digite a senha"/>
                                            </FormGroup><br/>
                                            <button onClick={this.entrar} className='btn btn-success'><i className='pi pi-sign-in'></i>     Entrar</button>
                                            <button onClick={this.prepareCadastrar} className='btn btn-danger'><i className='pi pi-plus'></i>   Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>    
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

//Login.contextType = AuthContext

export default withRouter(Login)