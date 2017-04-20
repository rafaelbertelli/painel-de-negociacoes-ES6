class NegociacaoService {

    obterNegociacoesSemana() {

        let xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {

            xhr.open('GET', 'negociacoes/semana');

            xhr.onreadystatechange = () => {
                // 0: requisição ainda não iniciada
                // 1: conexão com o servidor estabelecida
                // 2: requisição recebida
                // 3: processando requisição
                // 4: requisição concluída e resposta pronta

                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        console.log(JSON.parse(xhr.responseText));
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações');
                    }
                }
            }

            xhr.send();

        });

    }



    obterNegociacoesSemanaPassada(callback) {
        let xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {

            xhr.open('GET', 'negociacoes/anterior');

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        console.log(JSON.parse(xhr.responseText));
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações');
                    }
                }
            }

            xhr.send();

        });
    }



    obterNegociacoesSemanaRetrasada(callback) {
        let xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {

            xhr.open('GET', 'negociacoes/retrasada');

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        console.log(JSON.parse(xhr.responseText));
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações');
                    }
                }
            }

            xhr.send();

        });
    }        

}