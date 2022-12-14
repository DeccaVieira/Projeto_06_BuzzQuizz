//const api = require("./js/script")

//informacoes gerais do quiz

const infoGerais = document.querySelector(".info_gerais")

//HTML do quiz
const infoQuiz =
    `
<article class="c-forms__infos-quizz js_article">
    <h1> Comece pelo começo </h1>
    
    <div>
    <input type="text" class="js_info_titulo" placeholder="    Título do seu quizz">
    <input type="url" class="js_info_img" placeholder="    URL da imagem do seu quizz">
    <input type="text" class="js_info_qtd_perguntas" placeholder="    Quantidade de perguntas do quizz">
    <input type="text" class="js_info_qtd_niveis" placeholder="    Quantidade de níveis do quizz">
    </div>
    
</article> 
`
//botao de prosseguir
//chama a função concluirInfo
//falta fazer passar pra proxima pagina



infoGerais.innerHTML += infoQuiz + `<button class="js_button" onclick="concluirInfo()">Prosseguir pra criar perguntas</button>`

/*
//construtor do quiz - fazer ele pelas informacoes basicas do quiz
const quiz = {
    id: "meu id",
    title: "esse é o titulo do quiz",
    image: "essa é a imagem do quiz",
    questions: []
}
*/

const quiz = { id: "meu id" }

//funcao chamada quando apertar o botao
function concluirInfo() {
    //criar um quiz


    //criar uma lista para validar se os inputs estao dentro do esperado
    const validacaoFuncao = [false, false, false, false]

    //pegar os valores dos inputs e colocar em variaveis
    const tituloQuiz = document.querySelector(".js_info_titulo").value
    const urlImagemInfo = document.querySelector(".js_info_img").value
    const qtdPerguntas = Number(document.querySelector(".js_info_qtd_perguntas").value)
    const qtdLevels = Number(document.querySelector(".js_info_qtd_niveis").value)


    //ver se as variaveis passam nos criterios estabelecidos
    if (tituloQuiz.length >= 20 && tituloQuiz.length <= 65) {
        validacaoFuncao[0] = true
    }


    if (urlImagemInfo.includes(".jpg")) {
        validacaoFuncao[1] = true
    }

    if (qtdPerguntas >= 1) {
        validacaoFuncao[2] = true
    }

    if (qtdLevels >= 2) {
        validacaoFuncao[3] = true
    }

    //ver se existe algum elemento que nao passou nos criterios
    if (validacaoFuncao.some(elem => elem === false)) {
        alert("Você colocou um dado invalido, os dados devem ter:\nO titulo precisa ter entre 20 a 65 caracteres\nO url da imagem precisa ser valido\nO numero de perguntas precisa ser maior que 2\nO numero de niveis precisa ser mais que 1")
    } else {

        //adicionar essas variaveis no objeto quizz se elas passaram nos criterios
        quiz.title = tituloQuiz
        quiz.image = urlImagemInfo
        quiz.questions = qtdPerguntas
        quiz.levels = qtdLevels


        //teste
        console.log("info gerais do quiz ", quiz)

        //funçao para fazer as perguntas
        fazerPerguntas()
    }



}



//////////////////Perguntas do quiz////////////////////////////////////



//questions = [question0, question1, ...]
let questions = [];

//answers = [answer0, answer1,...]
let answers = [];

//alerta de erro
let alerta = ""



const formulario = document.querySelector(".perguntas")


function fazerPerguntas() {
    //pq nao ta escondendo o quiz?
    infoGerais.innerHTML = ""
    formulario.innerHTML += `<h1 class="crie_perguntas_txt">Crie suas perguntas</h1>`
    for (let i = 1; i < quiz.questions + 1; i++) {

        //construindo os modelos de pergunta, resposta certa e resposta errada

        formulario.innerHTML += `
        <article class="c-forms__forms-questions js_article pergunta${i}">


        
        <div>
            <label> Pergunta ${i} </label>
            <input type="text" class="js_texto_pergunta" placeholder="Texto da pergunta">
            <input type="color" class="js_cor_pergunta" placeholder="Cor de fundo da pergunta">
        </div>

        <div>
            <label>Resposta correta</label>
            <input type="text" class="js_texto_resposta correta" placeholder="Resposta correta">
            <input type="url" class="js_url_img_resposta correta" placeholder="URL da imagem">
        </div>
    
        <div>
            <label> Respostas incorretas </label>
            <input type="text" class="js_texto_resposta incorreta1" placeholder="Resposta incorreta 1">
            <input type="url" class="js_url_img_resposta incorreta1" placeholder="URL da imagem 1">
        </div>

        <div>
            <input type="text" class="js_texto_resposta incorreta2" placeholder="Resposta incorreta 2">
            <input type="url" class="js_url_img_resposta incorreta2" placeholder="URL da imagem 2">
        </div>
        
        <div>
            <input type="url" class="js_url_img_resposta incorreta3" placeholder="URL da imagem 3">
            <input type="text" class="js_texto_resposta incorreta3" placeholder="Resposta incorreta 3">
        </div>

    </article> 
    `
    }

    //adcionar butao com funcao de concluir as perguntas
    formulario.innerHTML += `<button class="js_button" onclick="concluirQuestions()">Prosseguir pra criar níveis</button>`
}


//criar uma variavel para controlar se os criterios foram atendidos
let validacaoResposta = true;

function createRightAnswer(numero) {

    const answer = {}

    //criar as variaveis com os inputs das respostaas
    const textoResposta = document.querySelector(`.pergunta${numero} > div > .js_texto_resposta.correta`)
    const urlResposta = document.querySelector(`.pergunta${numero} > div > .js_url_img_resposta.correta`)

    //conferir criterios
    if (textoResposta.value !== "") {
        answer.text = textoResposta.value
        validacaoResposta = true

    } else {
        alerta += "resposta correta: você precisa escrever algo"
        validacaoResposta = false
    }

    //nao tenho certeza ainda
    if (urlResposta.value.includes(".jpg")) {
        answer.image = urlResposta.value
    } else {
        alerta += "\nvoce nao colocou um URL valido"
        validacaoResposta = false
    }

    answer.isCorrectAnswer = true
    //adicionar na lista de respostas
    answers.push(answer)

    //teste
    console.log("validacao certa:" + validacaoResposta)
    console.log("lista de resposta certa: ", answers)
}



function createWrongAnswer(numero) {



    for (let i = 1; i <= 3; i++) {

        let answer = {}
        //criar as variaveis com os inputs das respostas

        const textoResposta = document.querySelector(`.pergunta${numero} > div > .js_texto_resposta.incorreta${i}`)
        const urlResposta = document.querySelector(`.pergunta${numero} > div > .js_url_img_resposta.incorreta${i}`)

        //conferir criterios
        if (textoResposta.value !== "") {
            answer.text = textoResposta.value
            validacaoResposta = true

        } else {
            alerta += `\nresposta errada numero ${i}:você precisa escrever algo para a resposta`
            validacaoResposta = false
        }

        //nao tenho certeza ainda
        if (urlResposta.value.includes(".jpg")) {
            answer.image = urlResposta.value
        } else {
            alerta += `\nresposta errada numero ${i}:voce nao colocou um URL valido`
            validacaoResposta = false
        }

        answer.isCorrectAnswer = false
        //adicionar na lista de respostas
        answers.push(answer)


    }


    //teste
    console.log("validacao errada:" + validacaoResposta)
    console.log("lista de resposta errada: ", answers)

}




//a funcao pega o texto e cor dos inputs e junta com a lista das respostas para gerar o objeto questao e colocá-lo na lista questoes
//a funcao retorna true ou false para garantir que os criterios que nao passem, nao entrem no quiz
function createQuestion(numero) {

    const question = {}

    //criar as variaveis com os inputs das perguntas
    const textoPergunta = document.querySelector(`.pergunta${numero} > div > .js_texto_pergunta`);
    const corPergunta = document.querySelector(`.pergunta${numero} > div > .js_cor_pergunta`);

    //condição para o textoPergunta ter mais de 20 caracteres, se True fazer o objeto com a questão
    if (textoPergunta.value.length >= 20) {
        question.title = textoPergunta.value //pelo menos 20 caracteres
    } else {
        alerta += "\no texto da pergunta deve ter pelo menos 20 caracteres"
        return false
    }

    if (corPergunta.value !== "" && corPergunta.value.length <= 6) {
        let testeCor = "0123456789abcdef"
        let validacaoCor = true
        for (let i = 0; i < corPergunta.value.length; i++) {
            validacaoCor = testeCor.includes(corPergunta.value[i])
            if (validacaoCor === false) {
                alerta += "\nvoce nao colocou uma cor valida"
                return false
                break
            } else {
                question.color = "#"+corPergunta.value //cor hexagonal
            }
        }
    } else {
        return false
    }



    console.log("question" + question)


    if (answers.length >= 2 && answers.length <= 4) {
        //criar dois contadores para garantir as condiçoes de resposta
        let correto = 0
        let incorreto = 0

        //rodar a lista de resposta e ver se tem resposta certa e errada
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].isCorrectAnswer === true) {
                correto += 1
            } else {
                incorreto += 1
            }
        }

        if (correto === 1 && incorreto > 0) {
            question.answers = answers

            questions.push(question)
        } else {
            alerta += "\nVocê não escreveu um numero correto de respostas corretas e incorretas"
            return false
        }


    }
    if (validacaoResposta === false) {
        return false
    }


    console.log("lista de questoes", questions)
    return true
}

//chamada quando aperta o botao
function concluirQuestions() {


    for (let i = 1; i < quiz.questions + 1; i++) {

        createRightAnswer(i)
        createWrongAnswer(i)
        //chama a funcao createQuestion e pega o valor retornado na variavel (true/false)
        validacao = createQuestion(i)
        answers = []


    }

    if (validacao === true) {

        quiz.questions = questions

        //teste
        console.log("esse é o obj questions: ", questions)
        console.log("esse é o obj quiz: ", quiz)

        createLevel()
    } else {
        alert(alerta)
    }



}



//niveis dos quiz

/*
levels: [
    {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0
    },
    {
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50
    }
]

level:{
    title: "Título do nível 1",
    image: "https://http.cat/411.jpg",
    text: "Descrição do nível 1",
    minValue: 0
}


*/

//pedaço do HTML 
const pagLevel = document.querySelector(".niveis")

//chamada quando partar o botao da sessao de perguntas
function createLevel() {
    formulario.innerHTML = ""
    pagLevel.innerHTML = `<h1 class"crie_perguntas_txt">Agora, decida os níveis</h1>`
    for (let i = 1; i < quiz.levels + 1; i++) {

        //construindo os modelos de pergunta, resposta certa e resposta errada

        pagLevel.innerHTML += `
        <article class="js_article">
    
            <label> Nível ${i} </label>
            <div class="nivel${i}"> 
            <input type="text" class="js_texto_nivel" placeholder="Título do nível">
            <input type="text" class="js_porcentagem_nivel" placeholder="% de acerto da pergunta">
            <input type="url" class="js_url_img_nivel" placeholder="URL da imagem do nivel">
            <input type="text" class="js_desc_nivel" placeholder="Resposta correta">
            </div>
        </article> 
        `
    }
    //adcionar butao com funcao de concluir as perguntas
    pagLevel.innerHTML += `<button class="js_button" onclick="verifyLevels()">Finalizar quiz</button>`
}

// levels = [level0, level1, level2, ...]
let levels = []

//obj com info do level
let level = {}

//variavel para garantir que os criterios sejam seguidos
let validacaoLevel = true


let alertaNivel = ""

function verifyLevels() {

    //criando variaveis com dados dos inputs, e refazendo isso para cada nivel
    for (let i = 1; i < quiz.levels + 1; i++) {
        const textoLevel = document.querySelector(`.nivel${i} > .js_texto_nivel`).value
        const porcentagemLevel = Number(document.querySelector(`.nivel${i} > .js_porcentagem_nivel`).value)
        const urlLevel = document.querySelector(`.nivel${i} > .js_url_img_nivel`).value
        const descLevel = document.querySelector(`.nivel${i} > .js_desc_nivel`).value


        //Criterios pre-estabelecidos
        //1° texto
        if (textoLevel.length >= 10) {
            level.title = textoLevel
            validacaoLevel = true
        } else {
            alertaNivel += "\nvoce colocou menos de 10 caracteres no texto do nivel"
            validacaoLevel = false
        }

        //2°porcentagem
        if (porcentagemLevel > 0 && porcentagemLevel < 100) {
            level.minValue = porcentagemLevel
            validacaoLevel = true
        } else {
            alertaNivel += "\nvoce colocou um numero que nao faz sentido como porcentagem"
            validacaoLevel = false
        }

        //3°url da img
        if (urlLevel.includes(".jpg")) {
            level.image = urlLevel
            validacaoLevel = true
        } else {
            alertaNivel += "\nvoce nao colocou um URL valido"
            validacaoLevel = false
        }

        //4° descricao do Level
        if (descLevel.length >= 30) {
            level.text = descLevel
            validacaoLevel = true
        } else {
            alertaNivel += "\nvoce colocou menos que 30 caracteres como descrição do nivel"
            validacaoLevel = false
        }

        //avaliar se os dados passaram nos criterios
        if (validacaoLevel === true) {
            levels.push(level)
            level = {}
        } else {
            alert(alerta)
        }
    }

    //add no obj o a lista de levels
    quiz.levels = levels


    endQuiz()

    //teste
    console.log("essa é a lista de niveis" + levels)

    //teste quiz
    console.log("quiz: " + quiz)
}


//finaliza o quiz
function endQuiz() {

    let templateURL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
    ////posta o quiz no servidor
    //api.makePost("/quizzes",quiz)
    ////carrega a pagina de sucesso do quiz
    carregarSucesso()


}

/////////////////Sucesso do quiz ///////////////////////


const sucessoQuiz = document.querySelector(".sucesso")
function carregarSucesso(){
pagLevel.innerHTML = ""

sucessoQuiz.innerHTML+=
`
<h1>Seu quizz está pronto!</h1>
-q
<p>Voltar a home</p>
`
//ainda dentro das aspas - colcoar no lugar do -q
// colocar para ver o quiz
//botao de acessar o quiz
}