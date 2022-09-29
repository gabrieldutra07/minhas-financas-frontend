import React from 'react'
import formatter from 'currency-formatter'

export default props => {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{formatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')} className='btn btn-success' type="button"
                    title="Efetivar" disabled={ lancamento.status !== 'PENDENTE' }>
                        <i className="pi pi-check"></i>
                    </button>
                    <button onClick={e => props.alterarStatus(lancamento, 'CANCELADO')} className='btn btn-warning' type="button" title="Efetivar"
                    disabled={ lancamento.status !== 'PENDENTE' }>
                    <i className="pi pi-times"></i>
                    </button>
                    <button type='button' className='btn btn-success' 
                            onClick={e => props.editAction(lancamento.id)}><i className='pi pi-pencil' title="Editar"></i></button>
                    <button type='button' className='btn btn-danger'
                            onClick={e => props.deleteAction(lancamento)}><i className='pi pi-trash' title="Excluir"></i></button>
                </td>
            </tr>
        )
    })

    return (
        <table className='table table-hover'>
            <thead>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Tipo</th>
                <th scope="col">Mês</th>
                <th scope="col">Situação</th>
                <th scope="col">Ações</th>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}