class Contato {
    constructor(nome, email, telefone) {
        this._nome = nome;
        this._email = email;
        this._telefone = telefone;
    }

    get nome() { return this._nome; }
    get email() { return this._email; }
    get telefone() { return this._telefone; }

    set nome(valor) {
        if (valor.trim() === '') throw new Error('Nome não pode ser vazio');
        this._nome = valor;
    }
    set email(valor) {
        if (!valor.includes('@')) throw new Error('E-mail deve conter @');
        this._email = valor;
    }
    set telefone(valor) {
        if (valor.trim() === '') throw new Error('Telefone não pode ser vazio');
        this._telefone = valor;
    }
}

let contatos = [];

function carregarContatos() {
    try {
        const dados = localStorage.getItem('contatos');
        if (dados) {
            contatos = JSON.parse(dados).map(c => new Contato(c._nome, c._email, c._telefone));
        }
        listarContatos();
    } catch (e) {
        console.error('Erro ao carregar contatos:', e);
    }
}

function salvarContatos() {
    try {
        localStorage.setItem('contatos', JSON.stringify(contatos));
    } catch (e) {
        console.error('Erro ao salvar contatos:', e);
    }
}

function adicionarContato(event) {
    event.preventDefault();
    const form = event.target;
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const telefone = form.telefone.value.trim();
    try {
        if (!nome || !email || !telefone) {
            throw new Error('Todos os campos devem ser preenchidos');
        }
        const contato = new Contato(nome, email, telefone);
        contatos.push(contato);
        salvarContatos();
        listarContatos();
        form.reset();
        console.log('Contato adicionado com sucesso');
    } catch (e) {
        console.error('Erro ao adicionar contato:', e.message);
        alert('Erro: ' + e.message);
    }
}

function removerContato(index) {
    try {
        console.log('Removendo contato no índice:', index);
        contatos.splice(index, 1);
        salvarContatos();
        listarContatos();
    } catch (e) {
        console.error('Erro ao remover contato:', e);
    }
}

function listarContatos() {
    try {
        const tbody = document.getElementById('tabela-contatos');
        if (!tbody) {
            throw new Error('Elemento tabela-contatos não encontrado');
        }
        tbody.innerHTML = '';
        contatos.forEach((contato, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${contato.nome}</td>
                <td>${contato.email}</td>
                <td>${contato.telefone}</td>
                <td><button class="excluir" onclick="removerContato(${index})">Excluir</button></td>
            `;
            tbody.appendChild(tr);
        });
        console.log('Contatos listados:', contatos);
    } catch (e) {
        console.error('Erro ao listar contatos:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const form = document.getElementById('form-contato');
        if (!form) {
            throw new Error('Formulário form-contato não encontrado');
        }
        form.addEventListener('submit', adicionarContato);
        carregarContatos();
        console.log('Aplicação inicializada com sucesso');
    } catch (e) {
        console.error('Erro na inicialização:', e);
    }
});