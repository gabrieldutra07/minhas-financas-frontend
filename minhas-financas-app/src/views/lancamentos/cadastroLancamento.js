import React from 'react'
import {withRouter} from 'react-router-dom'
import LocalStorageService from '../../app/service/localStorageService'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'
import * as messages from '../../components/toastr'
class CadastroLancamentos extends React.Component {

    state = {
        id: null, 
        descricao: '', 
        ano: '', 
        tipo: '', 
        status: '', 
        mes: '',
        valor: '',
        usuario: null,
        atualizando: false
    }

    constructor() {
        super()
        this.service = new LancamentoService()
    }

    handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        this.setState({ [name]: value })
    }

    componentDidMount() {
        const params = this.props.match.params
        if(params.id) {
            this.service.obterPorId(params.id)
                .then(res => {
                    this.setState( {...res.data, atualizando: true} )
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = this.state
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id }

        try {
            this.service.validar(lancamento)
        } catch(err) {
            const mensagens  = err.mensagens
            mensagens.forEach(msg => messages.mensagemErro(msg))
            return false
        }

        this.service.salvar(lancamento)
        .then(res => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso("Lançamento cadastrado com sucesso!")
        }).catch(err => {
            messages.mensagemErro(err.response.data)
        })
    }

    atualizar = () => {

        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state
        const lancamento = { descricao, valor, mes, ano, tipo, id, status, usuario }

        this.service.atualizar(lancamento)
        .then(res => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso("Lançamento atualizado com sucesso!")
        }).catch(err => {
            messages.mensagemErro(err.response.data)
        })
    }

    render() {

        const tipos = this.service.obterTipos()
        const meses = this.service.obterListaMeses()

        return (
            <Card title={this.state.atualizando ? 'Edição de lançamento' : 'Cadastro de lançamento'}>
                <div className='row'>
                    <div className='col-md-12'>
                        <FormGroup id='inputDescricao' label='Descrição: *'>
                            <input type='text' id="inputDescricao" name="descricao" value={this.state.descricao} onChange={this.handleChange} className='form-control'/>
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <FormGroup id="inputAno" label="Ano: *">
                            <input type='text' id="inputAno" name="ano" value={this.state.ano} onChange={this.handleChange} className='form-control'/>
                        </FormGroup>        
                </div>
                    <div className='col-md-6'>
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" lista={meses} name="mes" value={this.state.mes} onChange={this.handleChange} className='form-control'/>
                        </FormGroup>
                    </div>   
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <FormGroup id="inputValor" label="Valor: *">
                            <input type='text' id="inputValor" name="valor" value={this.state.valor} onChange={this.handleChange} className='form-control'/>
                        </FormGroup>        
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" value={this.state.tipo} name="tipo" onChange={this.handleChange} lista={tipos} className='form-control'/>
                        </FormGroup>        
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text" value={this.state.status} name="status" className='form-control' disabled/>
                        </FormGroup>        
                    </div><br/>
                    <div className='row'>
                        <div className='col-md-4'><br/>
                            {this.state.atualizando ?
                                (
                                     <button onClick={this.atualizar} className='btn btn-primary'>Atualizar</button>
                                )
                             : (
                                    <button onClick={this.submit} className='btn btn-success'>Salvar</button>
                                )
                            }
                            <button className='btn btn-danger' onClick={e => this.props.history.push('/consulta-lancamentos')}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(CadastroLancamentos)