

const livrosContainer = document.getElementById('livros-container');
const adicionarLivroBtn = document.getElementById('adicionar-livro');
const modal = document.getElementById('modal');
const fecharModalBtn = document.querySelector('.fechar-modal');
const formulario = document.getElementById('formulario');
const tituloInput = document.getElementById('titulo');
const autorInput = document.getElementById('autor');
const anoInput = document.getElementById('ano');

// Array para armazenar os livros
const livros = [];

function exibirLivros() {
    livrosContainer.innerHTML = '';

    // Recupere os livros do Armazenamento Local, se houver algum
    const livrosArmazenados = JSON.parse(localStorage.getItem('livros')) || [];
    
    console.log('Livros armazenados:', livrosArmazenados);

    for (let i = 0; i < livrosArmazenados.length; i++) {
        const livro = livrosArmazenados[i];
        const pdfBlob = new Blob([livro.pdfFile], { type: 'application/pdf' });


        const livroElement = document.createElement('div');
        livroElement.className = 'livro';
        livroElement.innerHTML = `<strong>${livro.titulo}</strong> - ${livro.autor}, ${livro.ano}`;

        const nomeLivroElement = document.createElement('strong');
        nomeLivroElement.innerText = livro.titulo;
        

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(pdfBlob);
        downloadLink.download = `${livro.titulo}.pdf`;

        const imagemDownload = document.createElement('img');
        imagemDownload.src = 'images/baixar.png';
        imagemDownload.alt = 'Download PDF';
        imagemDownload.classList.add('icones')

        downloadLink.appendChild(imagemDownload);
        
        const removerLivroBtn = document.createElement('img');
        removerLivroBtn.src = 'images/lixeira (2).png';
        removerLivroBtn.alt = 'Remover Livro'
        removerLivroBtn.classList.add('icones')
        removerLivroBtn.addEventListener('click', function() {
            // Remova o livro da lista
            livrosArmazenados.splice(i, 1);
            
            // Atualize a lista no Armazenamento Local
            localStorage.setItem('livros', JSON.stringify(livrosArmazenados));
            
            // Atualize a exibição dos livros
            exibirLivros();
        });

        livroElement.appendChild(downloadLink);
        livroElement.appendChild(removerLivroBtn);

        livrosContainer.appendChild(livroElement);
    }
}

exibirLivros();


// Função para abrir o modal
function abrirModal() {
    modal.style.display = 'block';
}

// Função para fechar o modal
function fecharModal() {
    modal.style.display = 'none';
}

// Evento para abrir o modal ao clicar no botão "Adicionar Livro"
adicionarLivroBtn.addEventListener('click', abrirModal);

// Evento para fechar o modal ao clicar no botão de fechar
fecharModalBtn.addEventListener('click', fecharModal);

// Evento para adicionar um livro quando o formulário for enviado
formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    console.log('Formulário submetido');

    const titulo = tituloInput.value;
    const autor = autorInput.value;
    const ano = anoInput.value;
    const pdfFile = document.getElementById('pdf').files[0];

    console.log(titulo, autor, ano, pdfFile);

    if (titulo && autor && ano && pdfFile) {
        const novoLivro = {
            titulo,
            autor,
            ano,
            pdfFile
        };

        // Carregue os livros existentes do Armazenamento Local
        const livrosArmazenados = JSON.parse(localStorage.getItem('livros')) || [];

        // Adicione o novo livro à lista existente
        livrosArmazenados.push(novoLivro);

        // Salve a lista atualizada no Armazenamento Local
        localStorage.setItem('livros', JSON.stringify(livrosArmazenados));

        console.log('Livro adicionado com sucesso');

        // Após salvar o livro no localStorage, exiba os livros
        exibirLivros();

        fecharModal();
        formulario.reset();
    } else {
        alert('Por favor, preencha todos os campos, incluindo o arquivo PDF.');
    }
});

