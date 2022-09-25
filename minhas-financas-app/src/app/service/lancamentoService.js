import ApiService from "./apiservice"

export default class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos')
    }

    consultar(lancamentoFiltro) {
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes) {
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo) {
            params = `${params}&mes=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status) {
            params = `${params}&mes=${lancamentoFiltro.status}`
        }

        return this.get(params)
    }

}