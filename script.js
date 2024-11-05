function toggleMenu(event) {
    const menu = document.getElementById("menu");
    
    if (menu) {
        menu.classList.toggle("menu-active");
    }

    // Log para depuração
    if (event) {
        console.log("Menu clicado:", event.target);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const menu = document.querySelector(".menu");

    function ajustarMenu() {
        if (header && menu) {
            const headerHeight = header.offsetHeight;
            menu.style.top = `${headerHeight}px`;
        }
    }

    // Define a posição do menu ao carregar a página e ao redimensionar
    ajustarMenu();
    window.addEventListener("resize", ajustarMenu);
});


function toggleTema(tema, event) {
    const body = document.body;
    const btSol = document.getElementById('btSol');
    const btLua = document.getElementById('btLua');
    const imgSol = btSol ? btSol.querySelector("img") : null;
    const imgLua = btLua ? btLua.querySelector("img") : null;
    const imgHome = document.getElementById('imgHomePeople');

    // Log do evento para inspeção, se disponível
    if (event) {
        console.log("Botão de tema clicado:", event.target);
        console.log("Posição X do clique:", event.clientX);
        console.log("Posição Y do clique:", event.clientY);
    }

    if (tema === 'claro') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (btSol && btLua) {
            btSol.style.backgroundColor = '#BEA4FF';
            btLua.style.backgroundColor = '#D9D9D9';
            imgSol.src = "./assets/iconSol.svg";
            imgLua.src = "./assets/iconLua.svg";
        }
        if (imgHome) {
            imgHome.src = "./assets/imgHomePeople.svg";
        }
        localStorage.setItem('tema', 'claro'); // Armazena o tema no localStorage
    } else if (tema === 'escuro') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (btSol && btLua) {
            btLua.style.backgroundColor = '#674DA3';
            btSol.style.backgroundColor = '#828282';
            imgSol.src = "./assets/iconSolBranco.svg";
            imgLua.src = "./assets/iconLuaBranco.svg";
        }
        if (imgHome) {
            imgHome.src = "./assets/imgHomePeopleDark.svg";
        }
        localStorage.setItem('tema', 'escuro'); // Armazena o tema no localStorage
    }
}

// Função para carregar o tema salvo do localStorage
function aplicarTemaSalvo() {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo) {
        toggleTema(temaSalvo); // Aplica o tema salvo ao carregar a página
    }
}

// URLs das dashboards
const dashboards = {
    avaliacao: {
        titulo: "Avaliação do app",
        descricao: "Esse painel exibe a avaliação do aplicativo, com dados atualizados em tempo real conforme os usuários compartilham seus feedbacks.",
        desktopUrl: "https://app.powerbi.com/reportEmbed?reportId=d020c712-32f0-4269-abeb-145e5cf22cea&autoAuth=true&ctid=b148f14c-2397-402c-ab6a-1b4711177ac0",
        mobileUrl: "https://app.powerbi.com/reportEmbed?reportId=d020c712-32f0-4269-abeb-145e5cf22cea&autoAuth=true&ctid=b148f14c-2397-402c-ab6a-1b4711177ac0"
        // Colocar a url da dash do 3° ano
    },
    pesquisa: {
        titulo: "Pesquisa de usuário",
        descricao: "Esse painel apresenta dados sobre a pesquisa realizada com os usuários, oferecendo insights sobre suas preferências e comportamentos.",
        desktopUrl: "https://app.powerbi.com/reportEmbed?reportId=01a3ce57-7e18-490a-86bc-ae3dbac4371a&autoAuth=true&ctid=b148f14c-2397-402c-ab6a-1b4711177ac0",
        mobileUrl: "https://app.powerbi.com/reportEmbed?reportId=6adb1f84-cd23-48d9-af7c-bd47e4ef9c12&autoAuth=true&ctid=b148f14c-2397-402c-ab6a-1b4711177ac0"
    }
};

// Função para atualizar o iframe e o texto ao trocar de dashboard
function trocarDashboard(pagina) {
    const titulo = document.getElementById("tituloDash");
    const descricao = document.getElementById("descricaoDash");

    if (dashboards[pagina]) {
        titulo.textContent = dashboards[pagina].titulo;
        descricao.textContent = dashboards[pagina].descricao;
        
        // Atualiza o iframe com base na responsividade
        updateIframeSrc(pagina);
    }
}

// Função para atualizar o link da dashboard com base no tamanho da tela
function updateIframeSrc(pagina) {
    const iframe = document.getElementById("iframeDash");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        iframe.src = dashboards[pagina].mobileUrl;
    } else {
        iframe.src = dashboards[pagina].desktopUrl;
    }
}

// Verifica o tamanho da janela ao carregar a página
window.onload = function() {
    aplicarTemaSalvo(); // Aplica o tema salvo ao carregar a página

    const params = new URLSearchParams(window.location.search);
    const dashboardParam = params.get('dashboard');

    if (dashboardParam) {
        trocarDashboard(dashboardParam);
    } else {
        trocarDashboard('avaliacao'); 
    }

    updateIframeSrc(dashboardParam || 'avaliacao'); 
};

// Verifica o tamanho da janela quando redimensionada
window.onresize = function() {
    const currentDashboard = document.getElementById("tituloDash").textContent; 
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile && currentDashboard === "Avaliação do app") {
        console.log("Mudando para 'Pesquisa de usuário' ao redimensionar para mobile.");
        // Troca para o dashboard de Pesquisa de usuário
        trocarDashboard('pesquisa'); 
    } else {
        const pageKey = Object.keys(dashboards).find(key => dashboards[key].titulo === currentDashboard);
        if (pageKey) {
            updateIframeSrc(pageKey);
        }
    }
};

// Aplicação de eventos com event listener
document.getElementById("btSol").addEventListener("click", (e) => toggleTema('claro', e));
document.getElementById("btLua").addEventListener("click", (e) => toggleTema('escuro', e));
