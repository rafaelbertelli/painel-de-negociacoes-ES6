class NegociacaoController {
    
    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new BindHelper (
                new ListaNegociacoes(),
                new NegociacoesView($('#negociacoesView')),
                'adiciona', 'esvazia');
        
        this._mensagem = new BindHelper(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
    }
    
    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();   
    }

    importaNegociacoes() {
        let service = new NegociacaoService();
        
        service.obterNegociacoesSemana()
            .then(negociacoes => {
                    negociacoes.forEach(negociacoes => this._listaNegociacoes.adiciona(negociacoes));
                    this._mensagem.texto = 'Negociações importadas com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesSemanaPassada()
            .then(negociacoes => {
                    negociacoes.forEach(negociacoes => this._listaNegociacoes.adiciona(negociacoes));
                    this._mensagem.texto = 'Negociações importadas com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesSemanaRetrasada()
            .then(negociacoes => {
                    negociacoes.forEach(negociacoes => this._listaNegociacoes.adiciona(negociacoes));
                    this._mensagem.texto = 'Negociações importadas com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro)



/*
        service.obterNegociacoesSemana((erro, negociacoes) => {
            
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacoes => this._listaNegociacoes.adiciona(negociacoes));
            this._mensagem.texto = 'Negociações importadas com sucesso!';


            service.obterNegociacoesSemanaPassada((erro, negociacoes) => {
                
                if(erro) {
                    this._mensagem.texto = erro;
                    return;
                }

                negociacoes.forEach(negociacoes => this._listaNegociacoes.adiciona(negociacoes));
                this._mensagem.texto = 'Negociações importadas com sucesso!';


                service.obterNegociacoesSemanaRetrasada((erro, negociacoes) => {
                    
                    if(erro) {
                        this._mensagem.texto = erro;
                        return;
                    }

                    negociacoes.forEach(negociacoes => this._listaNegociacoes.adiciona(negociacoes));
                    this._mensagem.texto = 'Negociações importadas com sucesso!';
                });


            });


        });
*/



    }
    
    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Lista de negociações apagada com sucesso!';
    }

}