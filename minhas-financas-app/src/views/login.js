import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        axios
        .post('http://localhost:8080/api/usuarios/autenticar', {
            email: this.state.email,
            senha: this.state.senha
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.response)
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
        window.location.reload(false);
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
                                                <input onChange={(e) => this.setState({senha: e.target.value})} value={this.state.senha} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                            </FormGroup><br/>
                                            <button onClick={this.entrar} className='btn btn-success'>Entrar</button>
                                            <button onClick={this.prepareCadastrar} className='btn btn-danger'>Cadastrar</button>
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

export default withRouter(Login)