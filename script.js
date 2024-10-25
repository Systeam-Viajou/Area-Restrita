function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("menu-active");
}

function toggleTema() {
    const btTema = document.getElementById("selecionado");
    btTema.classList.toggle("selecionado");
}

// Função para alternar tema
function toggleTema(tema) {
    const body = document.body;
    const btSol = document.getElementById('btSol');
    const btLua = document.getElementById('btLua');

    if (tema === 'claro') {
        // Ativa o tema claro ao clicar no botão do Sol
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        btSol.style.backgroundColor = '#BEA4FF'; 
        btLua.style.backgroundColor = '#D9D9D9'; 

        // Armazena o tema no localStorage
        localStorage.setItem('tema', 'claro');
    } else if (tema === 'escuro') {
        // Ativa o tema escuro ao clicar no botão da Lua
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        btLua.style.backgroundColor = '#BEA4FF'; 
        btSol.style.backgroundColor = '#D9D9D9'; 

        // Armazena o tema no localStorage
        localStorage.setItem('tema', 'escuro');
    }
}

// Função para carregar o tema salvo ao abrir o site
function carregarTema() {
    const temaSalvo = localStorage.getItem('tema');

    if (temaSalvo === 'escuro') {
        // Se o tema salvo for escuro, aplica o tema escuro
        toggleTema('escuro');
    } else {
        // Caso contrário, mantém o tema claro como padrão
        toggleTema('claro');
    }
}
// Executa a função carregarTema ao carregar a página
window.onload = carregarTema;

