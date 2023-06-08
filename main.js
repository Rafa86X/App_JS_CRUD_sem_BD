
'use strict'

const openModal = () => {
    document.getElementById('modal').classList.add('active')
    document.getElementById('nome').dataset.index ='novo'
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    limpaCampos()
}


//////////////////////////////////////////////////////////////////////////////

//////////////////////  Inicio do CRUD //////////////////////////////////////

// tempcliente é um cliente falso, serve para testar o CRUD e parametrizar o banco

const tempCliente = {
    nome: 'Rafa23', email: 'rafa@gmail.com2', celular: '12345678998', cidade:'São Leopoldolo'
}

//CRUD - Create read Update delete

const GetLocalStorege = () => JSON.parse(localStorage.getItem('BancoDados_Clientes')) ?? []
const SetLocalStorage = (info) => localStorage.setItem('BancoDados_Clientes', JSON.stringify(info))

// CRUD - create - ok
const createCliente = (cliente) =>{
    const db_cliente = GetLocalStorege(cliente)
    db_cliente.push(cliente)
    SetLocalStorage(db_cliente)
    
}

// CRUD - read - ok
const readBanco = () => GetLocalStorege()


// CRUD - update - ok
const updateCliente = (index, cliente) =>{
    const banco = GetLocalStorege()
    banco[index] = cliente
    SetLocalStorage(banco)

}

// CRUD - delete - ok

const deleteCliente = (index) =>{
    const banco = GetLocalStorege()
    banco.splice(index,1)
    SetLocalStorage(banco)
}
////////////////////// Fim do CRUD //////////////////////////////////////////

////////////////////// Trabalhando na Tela //////////////////////////////////

{/* <tr>
        <td>João Pedro</td>
        <td>joao@gmail.com</td>
        <td>(11) 97165-2222</td>
        <td>Jandira</td>
        <td>
            <button type="button" class="button green">editar</button>
            <button type="button" class="button red">excluir</button>
        </td>
    </tr> 
*/}

const camposValidos = () =>{
    return document.getElementById('formulario').reportValidity()
}

const limpaCampos = ()=> {
    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('telefone').value = ''
    document.getElementById('cidade').value = ''
}

const salvarCliente = ()=>{
    if(camposValidos()){
        const client = {
            nome:document.getElementById('nome').value,
            email:document.getElementById('email').value,
            telefone:document.getElementById('telefone').value,
            cidade:document.getElementById('cidade').value,
            indice:document.getElementById('nome').dataset.index          
        }
        const editando = document.getElementById('nome').dataset.index
        if(editando=='novo'){
            createCliente(client)

        }else{
            updateCliente(client.indice,client)
            }
        closeModal()
        atualizaTela()
    }
}

const criarCliente = (nome,email,telefone,cidade,indice) => {

    const cliente = document.createElement('tr')
    cliente.innerHTML = `
    <td>${nome}</td>
    <td>${email}</td>
    <td>${telefone}</td>
    <td>${cidade}</td>
    <td>
        <button id="editar" data-tipo=${indice} type="button" class="button green">editar</button>
        <button id="deletar" data-tipo=${indice} type="button" class="button red">excluir</button>
    </td>
    `
    document.getElementById('clientes').appendChild(cliente)
}

const atualizaTela = () =>{
    limpaTela() 
    const bancoDados = GetLocalStorege()
    bancoDados.forEach((cliente, indice)=> criarCliente(cliente.nome,cliente.email,cliente.telefone,cliente.cidade, indice))
}

const limpaTela = () => {
    const clientes = document.getElementById('clientes')
    while(clientes.firstChild){
        clientes.removeChild(clientes.lastChild)
    }
}

const carregaClientenaTela = (indice) =>{
    document.getElementById('modal').classList.add('active')
    const cliente = GetLocalStorege()[indice]
    cliente.indice = indice
    document.getElementById('nome').value = cliente.nome
    document.getElementById('email').value = cliente.email
    document.getElementById('telefone').value = cliente.telefone
    document.getElementById('cidade').value = cliente.cidade
    document.getElementById('nome').dataset.index = cliente.indice
}


const editaApaga = (evento) =>{
    const indice = evento.target.dataset.tipo
    const botao = evento.target.id

    if(botao=='editar'){
        carregaClientenaTela(indice)
    }
    if(botao=='deletar'){
        const cliente = GetLocalStorege()[indice]
        const response = confirm(`Deseja realmente excluir o cliente ${cliente.nome}`)
        if(response){
            deleteCliente(indice)
            atualizaTela()
        }
    }
}

atualizaTela()


/////////////////////  Eventos   /////////////////////////////////////////////
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', salvarCliente)

document.getElementById('cancelar').addEventListener('click', closeModal)

document.getElementById('clientes').addEventListener('click', editaApaga)

