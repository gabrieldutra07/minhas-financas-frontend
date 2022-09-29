import ApiService from "./apiservice"
import ErroValidacao from "./exception/erroValidacao"

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorIdUsuario(id) {
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario) {
        return this.post('/', usuario)
    }

    validar(usuario) {
        const errors = []

        if(!usuario.nome) {
            errors.push('O campo nome é obrigatório.')
        }
        if(!usuario.email) {
            errors.push('O campo e-mail é obrigatório.')
        } else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            errors.push('Informe um e-mail válido.')
        }
        if(!usuario.senha || !usuario.senhaRepeticao) {
            errors.push('Digite a senha 2x.')
        } else if(usuario.senha !== usuario.senhaRepeticao) {
            errors.push('As senhas precisam ser iguais.')
        }

        if (errors && errors.length > 0) {
            throw new ErroValidacao(errors)
        }
    }

}

export default UsuarioService