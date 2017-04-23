class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaPassada(),
            this.obterNegociacoesSemanaRetrasada()
        ])
        .then(periodos => {
            let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), []);
            return negociacoes;
        })
        .catch(error => {
            throw new Error(error);
        })
    }

    obterNegociacoesSemana() {
        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
        })
    }

    obterNegociacoesSemanaPassada() {
        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior')
        })
    }

    obterNegociacoesSemanaRetrasada() {
        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada')
        })
    }
}        
