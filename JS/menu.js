
window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    let botao = document.querySelector('#botao')
    header.classList.toggle('rolagem', window.scrollY > 350)
    botao.classList.toggle('rolagem', window.scrollY > 350)
})

const imagens = document.querySelectorAll('.gallery img');
let indiceAtual = 0;
let intervalo;

function mostrarImagem(indice) {
    imagens.forEach((imagem, index) => {
        if (index === indice) {
            imagem.style.opacity = 1;
        } else {
            imagem.style.opacity = 0;
        }
    });
}

function mostrarImagemProxima() {
    indiceAtual++;
    if (indiceAtual >= imagens.length) {
        indiceAtual = 0;
    }
    mostrarImagem(indiceAtual);
}

function iniciarSlideshow() {
    intervalo = setInterval(mostrarImagemProxima, 3000); // Muda de imagem a cada 3s
}

function pararSlideshow() {
    clearInterval(intervalo);
}

iniciarSlideshow(); // começa o slidwshow
