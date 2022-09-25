import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '', 
        mes: '', 
        tipo: '',
        lancamentos: []
    }

    buscar = () => {

    }
    
    render() {

        const lista = [
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 11},
        ]

        const tipos = [
            {label: 'Selecione...', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'},
        ]

        const lancamentos = [
            
        ]

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
                            <FormGroup htmlFor="inputMes" label="Mês : *">
                                <SelectMenu className="form-control" lista={lista}
                                value={this.state.mes} onChange={e => this.setState({mes: e.target.value})}/>
                            </FormGroup> <br/>
                            <FormGroup htmlFor="inputTipo" label="Tipo : *">
                                <SelectMenu className="form-control" lista={tipos}
                                value={this.state.tipo} onChange={e => this.setState({tipo: e.target.value})}/>
                            </FormGroup><br/>
                            <button type='button' className='btn btn-success' onClick={this.buscar}>Buscar</button>
                            <button type='button' className='btn btn-danger'>Cadastrar</button>
                        </div>
                    </div>
                </div><br/>
                <div className='row'>
                    <div className='col-md-12'>
                        <div class="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}/>
                        </div>
                    </div>
                </div>
            </Card>            
        )
    }
}

export default withRouter(ConsultaLancamentos)