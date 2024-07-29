# DesenWebI-lista-2024

Lista de exercícios para os alunos praticarem programação web na disciplina Desenvolvimento Web I no curso de ciência da computação do IFC Videira

## Estrutura de diretórios

Crie a estrutura de diretórios abaixo para organizar os exercícios:

```
DesenWebI-lista-2024
│   README.md
│
└───exercicios
│   │
│   └───exercicio-xx
│   │   │   index.html
│   │   │   style.css
│   │   │   main.js
│   │   │   ...
│   │
```

## Exercícios

Para cada exercício, crie um diretório `exercicio-xx` onde `xx` é o número do exercício. Dentro do diretório, crie os arquivos `index.html`, `style.css`, `main.js` e demais recursos para a solução do exercício.

Além disso, siga essas boas práticas em todos os exercícios:
   - [x] Adicionar meta tags para a codificação do documento (UTF-8), viewport.
   - [x] Adicionar responsividade ao sistema para ser acessível em dispositivos móveis.
   - [x] Normalizar o estilo do sistema com CSS. Pode usar uma biblioteca externa para isso ou normalizar pelo menos os espaçamentos e tamanhos de fonte.
   - [x] Usar tags semânticas no HTML.
   - [x] Adicionar um favicon ao sistema.
   - [x] Usar [funções puras no JavaScript]([https://](https://medium.com/@allangrds/o-que-%C3%A9-uma-fun%C3%A7%C3%A3o-pura-em-javascript-2b34edcad8e2)) sempre que possível.
   - [x] Não usar frameworks ou bibliotecas externas, apenas HTML, CSS e JavaScript puro.

1. Criar um sistema web para uma lista de tarefas. O sistema deve permitir adicionar, remover e marcar como concluída uma tarefa. Além disso, faça:
   - [x] Adicionar um campo de texto para filtrar as tarefas por nome.
   - [x] Armazenar as tarefas no `localStorage` para que elas não sejam perdidas ao recarregar a página.
   - [x] Popular a lista de tarefas com alguns dados fictícios, caso o `localStorage` esteja vazio.
   - [x] Adicionar animações de transição ao adicionar, remover e marcar como concluída uma tarefa.
   - [x] Identificar as tarefas concluídas de alguma maneira.
   - [x] Adicionar uma família de fonte externa ao sistema. Pode ser do Google Fonts ou de outra fonte de sua escolha.
   - [x] Adicionar a opção de escolher entre temas claro e escuro. Salvar a escolha no `localStorage`.
   - [x] **Acessibilidade**: respeitar o critério 1.3.1 sobre informações e relações da WCAG disponível em: [https://www.guia-wcag.com/](https://www.guia-wcag.com/).
   - [x] **Acessibilidade**: respeitar o critério 2.1.1 sobre teclado da WCAG disponível em: [https://www.guia-wcag.com/](https://www.guia-wcag.com/).

2. A página picsum.photos contém uma API que retorna imagens aleatórias. Crie um sistema web que tenha um formulário para o usuário informar a largura e a altura da imagem que deseja e a quantidade de imagens (escolher entre 3, 5, 10 ou 20). Ao clicar em um botão, o sistema deve exibir as imagens retornadas pela API. O resultado deve ser organizado como um grid de imagens. Permita que o usuário possa baixar a imagem que desejar em tamanho Full HD. As imagens precisam estar no formato `webp`. Leia a documentação da API para saber como fazer a requisição: [https://picsum.photos/](https://picsum.photos/). Além disso, faça:
   - [x] Adicionar validação de formulário para os campos de largura, altura e quantidade de imagens. Caso o usuário informe um valor inválido, exibir uma mensagem de erro. Use html5 e/ou JavaScript para fazer a validação. Traga valores padrões para os campos.
   - [x] Adicionar um botão/link para copiar o link da imagem. Use a API `navigator.clipboard` para fazer isso.
   - [x] Adicionar um botão/link para compartilhar a imagem no WhatsApp, por e-mail ou outra rede social.
   - [x] **Acessibilidade**: respeitar o critério 1.1.1 sobre conteúdo não textual da WCAG disponível em: [https://www.guia-wcag.com/](https://www.guia-wcag.com/).
   - [x] **Acessibilidade**: respeitar o critério 1.4.3 sobre contraste mínimo da WCAG disponível em: [https://www.guia-wcag.com/](https://www.guia-wcag.com/).
   - [x] **Acessibilidade**: respeitar o critério 2.4.4 sobre foco visível da WCAG disponível em: [https://www.guia-wcag.com/](https://www.guia-wcag.com/).

3. Criar um sistema web que permita ao usuário tirar uma foto com a câmera do dispositivo e marcar a localização da foto em um mapa. O sistema deve exibir a foto tirada e a localização no mapa. Além disso, faça:
   - [x] Adicionar um botão para tirar a foto. Use a API `navigator.mediaDevices.getUserMedia` para acessar a câmera do dispositivo. Caso o dispositivo não tenha câmera, permitir que o usuário faça o upload de uma foto.
   - [x] Adicionar um botão para marcar a localização da foto no mapa. Use a API `navigator.geolocation` para acessar a localização do dispositivo. Caso o dispositivo não tenha GPS, permitir que o usuário informe a localização manualmente.
   - [x] Adicionar um campo de texto para o usuário informar título (obrigatório) e descrição (opcional) da foto.
   - [x] Armazenar a foto e a localização no `localStorage` para que elas não sejam perdidas ao recarregar a página.
   - [x] Criar uma tabela para exibir id, título, descrição, localização e data da foto. Adicionar um botão para visualizar detalhes da foto em uma modal ou em outra página. Para a localização, exibir um mapa com a localização marcada.
   - [x] Adicionar um botão para excluir o registro. Exibir um modal de confirmação antes de excluir a foto.
   - [x] Adicionar um botão para editar o registro. Exibir um formulário com os campos preenchidos para que o usuário possa editar o registro.
   - [ ] (opcional) Adicionar um botão para compartilhar a foto e a localização em redes sociais.

4. Criar uma SinglePageApplication (SPA) para exibir informações básicas sobre o estudante. 

document.addEventListener("DOMContentLoaded", () => {

    // Função assíncrona para definir as rotas da SPA
    const router = async () => {
        const routes = [
            { path: "/", view: () => document.getElementById("home") },
            // TODO: Adicionar as rotas para as páginas "about" e "contact"
        ];

        // Função para verificar se a rota atual é válida
        const potentialMatches = routes.map(route => {
            return {
                route: route,
                isMatch: location.pathname === route.path
            };
        });

        // Verifica se a rota atual é válida, se não for, redireciona para a primeira rota
        // TODO: Adicionar a lógica para verificar se a rota atual é válida. Use a função find() para encontrar a rota correspondente em "potentialMatches"

        if (!match) {
            match = {
                route: routes[0],
                isMatch: true
            };
        }

        // Remove a classe "active" de todas as seções
        document.querySelectorAll("section").forEach(section => {
            // TODO: Remover a classe "active" de todas as seções
        });

        // TODO: Adicionar a classe "active" na seção correspondente à rota atual
    };

    // Função para navegar entre as páginas
    const navigateTo = url => {
        history.pushState(null, null, url);
        router();
    };

    // Adiciona o evento "popstate" para navegar entre as páginas com o botão de voltar do navegador
    window.addEventListener("popstate", router);

    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            console.log(e.target.href);
            // TODO: Adicionar a função navigateTo para navegar entre as páginas
        }
    });

    router();
});
