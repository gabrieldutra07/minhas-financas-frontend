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
        valor: ''
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

    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = this.state
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id }

        this.service.salvar(lancamento)
        .then(res => {
            messages.mensagemSucesso("Lançamento cadastrado com sucesso!")
        }).catch(err => {
            messages.mensagemErro(err.response.data)
        })
    }

    render() {

        const tipos = this.service.obterTipos()
        const meses = this.service.obterListaMeses()

        return (
            <Card title="Cadastro de lançamentos">
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
                            <button onClick={this.submit} className='btn btn-success'>Salvar</button>
                            <button className='btn btn-danger'>Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(CadastroLancamentos)