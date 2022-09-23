import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import SelectMenu from '../components/selectMenu'

class ConsultaLancamentos extends React.Component {

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

        return (
            <Card title="Consulta de lançamentos">
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='bs-component'>
                            <FormGroup htmlFor="inputAno" label="Ano : *">
                                <input type="text" 
                                   id="inputAno" name="ano" 
                                   className='form-control'
                                   placeholder='Digite o ano'/>
                            </FormGroup> <br/>
                            <FormGroup htmlFor="inputMes" label="Mês : *">
                                <SelectMenu className="form-control" lista={lista}/>
                            </FormGroup>             
                        </div>
                    </div>
                </div>
            </Card>            
        )
    }
}

export default withRouter(ConsultaLancamentos)