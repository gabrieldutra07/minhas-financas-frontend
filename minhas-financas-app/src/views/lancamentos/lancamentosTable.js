import React from 'react'

export default props => {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr>
                <td>{lancamento.descricao}</td>
                <td>{lancamento.valor}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>

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