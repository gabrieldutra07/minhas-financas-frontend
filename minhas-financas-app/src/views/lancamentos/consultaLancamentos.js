import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'
import * as message from '../../components/toastr'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '', 
        mes: '', 
        tipo: '',
        lancamentos: [],
        descricao : '',
        showConfirmDialog: false,
        lancamentoDeletar: {}
    }

    constructor() {
        super()
        this.service = new LancamentoService()
    }

    buscar = () => {
        if(!this.state.ano) {
            message.mensagemErro("Você deve preencher o ano!")
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes, 
            tipo: this.state.tipo,
            usuario: usuarioLogado.id,
            descricao: this.state.descricao
        }
        
        this.service
            .consultar(lancamentoFiltro)
            .then(res => {
                this.setState({lancamentos: res.data})
            }).catch(err => {
                console.log(err)
            })
    }

    editar = (id) => {
        
    }

    prepareCadastrarLancamento = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
                    .then(res => {
                        const lancamentos = this.state.lancamentos
                        const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                        lancamentos.splice(index, 1)
                        this.setState({lancamentos: lancamentos, showConfirmDialog: false})
                        message.mensagemSucesso("Lançamento excluído com sucesso!")
                    }).catch(err => {
                        message.mensagemErro("Ocorreu um erro!")
                    })
    }
    
    render() {

        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterTipos()

        const confirmDialogFooter = () => {
               return (
                    <div>
                        <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar}  />
                        <Button label="Cancelar" className="p-button-text" onClick={this.cancelarDelecao}/>
                    </div>
                )
        }

        return (
            <Card title="Consulta de lançamentos">
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='bs-component'>
                            <FormGroup htmlFor="inputAno" label="Ano : *">
                                <input type="text" 
                                   id="inputAno" name="ano" 
                                   className='form-control'
                                   value={this.state.ano}
                                   onChange={e => this.setState({ano: e.target.value})}
                                   placeholder='Digite o ano'/>
                            </FormGroup> <br/>
                            <FormGroup htmlFor="inputMes" label="Mês : ">
                                <SelectMenu className="form-control" lista={meses}
                                value={this.state.mes} onChange={e => this.setState({mes: e.target.value})}/>
                            </FormGroup> <br/>
                            <FormGroup htmlFor="inputDesc" label="Descrição : ">
                            <input type="text" 
                                   id="inputDesc" name="descricao" 
                                   className='form-control'
                                   value={this.state.descricao} onChange={e => this.setState({descricao: e.target.value})}
                                   placeholder='Digite a descrição'/>
                            </FormGroup> <br/>
                            <FormGroup htmlFor="inputTipo" label="Tipo : ">
                                <SelectMenu className="form-control" lista={tipos}
                                value={this.state.tipo} onChange={e => this.setState({tipo: e.target.value})}/>
                            </FormGroup><br/>
                            <button type='button' className='btn btn-success' onClick={this.buscar}>Buscar</button>
                            <button type='button' className='btn btn-danger' onClick={this.prepareCadastrarLancamento}>Cadastrar</button>
                        </div>
                    </div>
                </div><br/>
                <div className='row'>
                    <div className='col-md-12'>
                        <div class="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                            deleteAction={this.abrirConfirmacao} 
                            editAction={this.editar}/>
                        </div>
                    </div>
                </div>
            <div>
                <Dialog header="Confirmação de exclusão" 
                        visible={this.state.showConfirmDialog} 
                        footer={confirmDialogFooter} 
                        style={{ width: '50vw' }} 
                        modal={true} 
                        onHide={() => this.setState({showConfirmDialog:false})}>
                    <p>Você tem certeza que deseja excluir esse lançamento?</p>
                </Dialog>
            </div>
            </Card>            
        )
    }
}

export default withRouter(ConsultaLancamentos)