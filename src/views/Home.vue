<script setup>

import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";


const selectedMenu = ref('')
const clientes = ref([])
const funcionarios = ref([])
const loading = ref(false)
const popupCliente = ref(false)
const popupFuncionario = ref(false)

const deleteSuccess = ref(false)

const cliente = ref({})
const funcionario = ref({})

async function getAllClientes() {
    let fetchedClientes = []
    loading.value = true;
    const querySnapshot = await getDocs(collection(db, "clientes"));
    querySnapshot.forEach((doc) => {
        const cliente = {
            id: doc.id,
            CNPJ: doc.data().CNPJ,
            RazaoSocial: doc.data().RazaoSocial,
            Endereco: doc.data().Endereco,
            NomeContato: doc.data().NomeContato,
            Cargo: doc.data().Cargo,
            Telefone: doc.data().Telefone,
            Celular: doc.data().Celular,
            Email: doc.data().Email
        }
        fetchedClientes.push(cliente)
        clientes.value = fetchedClientes;
        loading.value = false;


    });

}

async function getAllFuncionarios() {
    let fetchedFuncionarios = []
    loading.value = true;
    const querySnapshot = await getDocs(collection(db, "funcionarios"));
    querySnapshot.forEach((doc) => {
        const funcionario = {
            id: doc.id,
            Ativo: doc.data().Ativo,
            Nome: doc.data().Nome,
            CPF: doc.data().CPF,
            RG: doc.data().RG,
            Nascimento: doc.data().Nascimento,
            EmailPessoal: doc.data().EmailPessoal,
            EmailCorp: doc.data().EmailCorp,
            TelefonePessoal: doc.data().TelefonePessoal,
            TelefoneCorp: doc.data().TelefoneCorp,
            Endereco: doc.data().Endereco,
            Cargo: doc.data().Cargo,
            Nivel: doc.data().Nivel,
            Banco: doc.data().Banco,
            Agencia: doc.data().Agencia,
            Conta: doc.data().Conta,
            TipoPIX: doc.data().TipoPIX,
            ChavePIX: doc.data().ChavePIX,
            Admissao: doc.data().Admissao,
            TipoContratacao: doc.data().TipoContratacao,
            ValorFixo: doc.data().ValorFixo,
            ValorHora: doc.data().ValorHora,
            ValorTransporte: doc.data().ValorTransporte,
            ValorRefeicao: doc.data().ValorRefeicao,
            ValorAuxilio: doc.data().ValorAuxilio,
            ValorPlanoSaude: doc.data().ValorPlanoSaude,
            ValorPlanoOdonto: doc.data().ValorPlanoOdonto,
            Empresas: doc.data().Empresas,
            Admin: doc.data().Admin
        }
        fetchedFuncionarios.push(funcionario)
        funcionarios.value = fetchedFuncionarios;
        loading.value = false;


    });
    console.log(funcionarios.value)

}

function showClientes() {
    selectedMenu.value = "clientes"
    getAllClientes()

}

function showFuncionarios() {
    selectedMenu.value = "funcionarios"
    getAllFuncionarios()
}

async function getCliente(id) {
    const docRef = doc(db, "clientes", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        popupCliente.value = true
        cliente.value = {
            Ativo: docSnap.data().Ativo,
            CNPJ: docSnap.data().CNPJ,
            RazaoSocial: docSnap.data().RazaoSocial,
            Endereco: docSnap.data().Endereco,
            NomeContato: docSnap.data().NomeContato,
            Cargo: docSnap.data().Cargo,
            Telefone: docSnap.data().Telefone,
            Celular: docSnap.data().Celular,
            Email: docSnap.data().Email
        }
        console.log("Document data:", docSnap.data(), docSnap.id);
    } else {
        console.log("No such document!");
    }
}

async function getFuncionario(id) {
    const docRef = doc(db, "funcionarios", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        popupFuncionario.value = true
        funcionario.value = {
            Ativo: docSnap.data().Ativo,
            Nome: docSnap.data().Nome,
            CPF: docSnap.data().CPF,
            RG: docSnap.data().RG,
            Nascimento: docSnap.data().Nascimento,
            EmailPessoal: docSnap.data().EmailPessoal,
            EmailCorp: docSnap.data().EmailCorp,
            TelefonePessoal: docSnap.data().TelefonePessoal,
            TelefoneCorp: docSnap.data().TelefoneCorp,
            Endereco: docSnap.data().Endereco,
            Cargo: docSnap.data().Cargo,
            Nivel: docSnap.data().Nivel,
            Banco: docSnap.data().Banco,
            Agencia: docSnap.data().Agencia,
            Conta: docSnap.data().Conta,
            TipoPIX: docSnap.data().TipoPIX,
            ChavePIX: docSnap.data().ChavePIX,
            Admissao: docSnap.data().Admissao,
            TipoContratacao: docSnap.data().TipoContratacao,
            ValorFixo: docSnap.data().ValorFixo,
            ValorHora: docSnap.data().ValorHora,
            ValorTransporte: docSnap.data().ValorTransporte,
            ValorRefeicao: docSnap.data().ValorRefeicao,
            ValorAuxilio: docSnap.data().ValorAuxilio,
            ValorPlanoSaude: docSnap.data().ValorPlanoSaude,
            ValorPlanoOdonto: docSnap.data().ValorPlanoOdonto,
            Empresas: docSnap.data().Empresas,
            Admin: docSnap.data().Admin
        }
        console.log("Document data:", docSnap.data(), docSnap.id);
    } else {
        console.log("No such document!");
    }
}

async function deleteCliente(id, nome) {
    if (confirm(`Voce realmente deseja deletar as informacoes do cliente ${nome}?`)) {
        await deleteDoc(doc(db, "clientes", id));
        getAllClientes()
        deleteSuccess.value = true
        setTimeout(() => deleteSuccess.value = false, 5000);

    } else {
        return
    }
}

async function deleteFuncionario(id, nome) {
    if (confirm(`Você realmente deseja deletar as informações do funcionário ${nome}? O acesso ao sistema também será restrito.`)) {
        await deleteDoc(doc(db, "funcionarios", id));
        getAllFuncionarios()
        deleteSuccess.value = true
        setTimeout(() => deleteSuccess.value = false, 5000);

    } else {
        return
    }
}

function closePopup() {
    popupCliente.value = false;
    popupFuncionario.value = false;
}




</script>

<template>

    <Navbar />

    <div class="h-screen p-4">

        <!-- Define os botões de menu baseado no conteúdo do array 'menus' -->
        <div class="flex justify-evenly border-b-2 border-gray-400 pb-4">

            <button @click="showClientes"
                class="bg-gray-500 text-white font-semibold w-1/6 py-2 flex justify-center items-center rounded-lg hover:bg-gray-600">
                <span class="hidden md:block">Clientes</span>
                <fa class="md:hidden" icon="building" />
            </button>
            <button @click="showFuncionarios"
                class="bg-gray-500 text-white font-semibold w-1/6 py-2 flex justify-center items-center rounded-lg hover:bg-gray-600">
                <span class="hidden md:block">Funcionários</span>
                <fa class="md:hidden" icon="user" />
            </button>
            <button
                class="bg-gray-500 text-white font-semibold w-1/6 py-2 flex justify-center items-center rounded-lg hover:bg-gray-600">
                <span class="hidden md:block">Relatórios</span>
                <fa class="md:hidden" icon="clipboard-list" />
            </button>

        </div>

        <!-- Exibe as informa��es referentes ao que est� selecionado na vari�vel 'selectedMenu' -->
        <main class="flex flex-col gap-y-4 my-4">
            <a v-if="selectedMenu == 'clientes'" href="/cadastrarcliente"
                class="self-end text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800">
                <span class="hidden md:block">Novo Cliente</span>
                <fa class="md:hidden" icon="plus" />
            </a>
            <div v-if="loading" class="flex items-center justify-center">
                <img src="../assets/images/itlogo.png" class="w-40 animate-spin" />
            </div>

            <table v-if="selectedMenu == 'clientes'" class="text-center">
                <thead>
                    <tr class="bg-gray-500 text-white">
                        <th class="border-2 border-white">Razão Social</th>
                        <th class="border-2 border-white">CNPJ</th>
                        <th class="border-2 border-white">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="even:bg-gray-200" v-for="cliente in clientes">
                        <td>{{ cliente.RazaoSocial }}</td>
                        <td>{{ cliente.CNPJ }}</td>
                        <td>
                            <div class="flex content-center justify-evenly">
                                <button @click="getCliente(cliente.id)"
                                    class="text-white bg-blue-500 px-2 py-1 rounded-lg hover:bg-blue-600">
                                    <fa icon="magnifying-glass" />
                                </button>
                                <a :href="`/cadastrarcliente/${cliente.id}`"
                                    class="text-white bg-green-600 px-2 py-1 rounded-lg hover:bg-green-700">
                                    <fa icon="pencil" />
                                </a>
                                <button @click="deleteCliente(cliente.id, cliente.RazaoSocial)"
                                    class="text-white bg-red-600 px-2 py-1 rounded-lg hover:bg-gray-600">
                                    <fa icon="trash-can" />
                                </button>
                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>



            <a v-if="selectedMenu == 'funcionarios'" href="/cadastrarfuncionario"
                class="self-end text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800">
                <span class="hidden md:block">Novo Funcionario</span>
                <fa class="md:hidden" icon="plus" />
            </a>
            <table v-if="selectedMenu == 'funcionarios'" class="text-center">
                <thead>
                    <tr class="bg-gray-500 text-white">
                        <th class="border-2 border-white">Nome</th>
                        <th class="border-2 border-white">Clientes</th>
                        <th class="border-2 border-white">Telefone</th>
                        <th class="border-2 border-white">E-mail</th>
                        <th class="border-2 border-white">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="even:bg-gray-200" v-for="funcionario in funcionarios">
                        <td>{{ funcionario.Nome }}</td>
                        <td class="flex flex-col">
                            <template v-for="empresa in funcionario.Empresas">
                                <span>{{ empresa }}</span>
                            </template>
                        </td>
                        <td>
                            <div class="flex flex-col">
                                <span v-if="funcionario.TelefonePessoal">
                                    <fa icon="user" class="mx-1" /> {{ funcionario.TelefonePessoal }}
                                </span>
                                <span v-if="funcionario.TelefoneCorp">
                                    <fa icon="user-tie" class="mx-1" /> {{ funcionario.TelefoneCorp }}
                                </span>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-col">
                                <span v-if="funcionario.EmailPessoal">
                                    <fa icon="user" class="mx-1" /> {{ funcionario.EmailPessoal }}
                                </span>
                                <span v-if="funcionario.EmailCorp">
                                    <fa icon="user-tie" class="mx-1" /> {{ funcionario.EmailCorp }}
                                </span>
                            </div>
                        </td>
                        <td>
                            <div class="flex content-center justify-evenly">
                                <button @click="getFuncionario(funcionario.id)"
                                    class="text-white bg-blue-500 px-2 py-1 rounded-lg hover:bg-blue-600">
                                    <fa icon="magnifying-glass" />
                                </button>
                                <a class="text-white bg-green-600 px-2 py-1 rounded-lg hover:bg-green-700">
                                    <fa icon="pencil" />
                                </a>
                                <button @click="deleteFuncionario(funcionario.id, funcionario.Nome)"
                                    class="text-white bg-red-600 px-2 py-1 rounded-lg hover:bg-gray-600">
                                    <fa icon="trash-can" />
                                </button>
                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>

        </main>

        <!-- Detalhes do cliente -->
        <div v-if="popupCliente"
            class="animate__animated animate__fadeIn fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center ">
            <div
                class="py-4 md:py-0 mx-1 md:mx-0 bg-white md:w-1/2 md:h-1/2 flex flex-col justify-center px-4 gap-y-2 border-2 border-black">
                <div class="border-b-2 border-gray-800 pb-2">
                    <p><span class="font-semibold">{{ cliente.Ativo ? "Ativo" : "Inativo" }}</span></p>
                    <p><span class="text-sm font-semibold">Razao Social:</span> {{ cliente.RazaoSocial }}</p>
                    <p><span class="text-sm font-semibold">CNPJ:</span> {{ cliente.CNPJ }}</p>
                    <p><span class="text-sm font-semibold">Endereco:</span> {{ cliente.Endereco }}</p>
                </div>
                <div class="flex flex-col justify-start">
                    <p><span class="text-sm font-semibold">Contato:</span> {{ cliente.NomeContato }}</p>
                    <p><span class="text-sm font-semibold">Cargo:</span> {{ cliente.Cargo }}</p>
                    <p><span class="text-sm font-semibold">Telefone:</span> {{ cliente.Telefone }}</p>
                    <p><span class="text-sm font-semibold">Celular:</span> {{ cliente.Celular }}</p>
                    <p><span class="text-sm font-semibold">E-mail:</span> {{ cliente.Email }}</p>
                </div>
                <button @click="closePopup"
                    class="self-center mt-4 w-1/5 px-3 py-2 md:px-0 md:py-1 bg-red-600 text-white rounded-lg hover:bg-red-800 flex items-center justify-center gap-x-2">
                    <fa icon="rotate-left" class="mr-1" />
                    <span class="hidden md:block">Voltar</span>
                </button>
            </div>
        </div>

        <div v-if="popupFuncionario"
            class="animate__animated animate__fadeIn fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center ">
            <div class="py-4 md:py-8 bg-white flex flex-col justify-center px-8 gap-y-2 border-2 border-black">
                <div class="border-b-2 border-gray-800 pb-2">
                    <p><span class="font-semibold" :class="funcionario.Ativo ? 'text-blue-600' : 'text-red-600'">{{
                            funcionario.Ativo ? "Ativo" : "Inativo"
                    }}</span>
                    </p>
                    <p class="flex justify-start gap-x-1 my-2">
                        <template v-for="cliente in funcionario.Empresas">
                            <span
                                class="text-xs bg-blue-600 py-1 px-2 rounded-lg text-white font-semibold flex items-center gap-x-1">
                                {{ cliente.split(' ').slice(0, 2).join(' ') }}
                            </span>

                        </template>
                    </p>
                    <p><span class="text-sm font-semibold">Nome:</span> {{ funcionario.Nome }}</p>
                    <div class="flex justify-between gap-x-8">
                        <p><span class="text-sm font-semibold">CPF:</span> {{ funcionario.CPF }}</p>
                        <p><span class="text-sm font-semibold">RG:</span> {{ funcionario.RG }}</p>
                        <p><span class="text-sm font-semibold">Nascimento:</span> {{ `${new
                                Date(funcionario.Nascimento.seconds * 1000).getDate()} / ${new
                                    Date(funcionario.Nascimento.seconds * 1000).getMonth() + 1} / ${new
                                        Date(funcionario.Nascimento.seconds * 1000).getFullYear()}`
                        }}</p>
                    </div>

                </div>
                <div class="flex flex-col justify-start border-b-2 border-gray-800 pb-2">
                    <p><span class="text-sm font-semibold">Endereço:</span> {{ funcionario.Endereco }}</p>
                    <div class="flex justify-between">
                        <p><span class="text-sm font-semibold">Telefone Pessoal:</span> {{ funcionario.TelefonePessoal
                        }}</p>
                        <p v-if="funcionario.TelefoneCorp"><span class="text-sm font-semibold">Telefone
                                Corporativo:</span> {{ funcionario.TelefoneCorp }}</p>
                    </div>

                    <p v-if="funcionario.EmailPessoal"><span class="text-sm font-semibold">E-mail Pessoal:</span> {{
                            funcionario.EmailPessoal
                    }}</p>
                    <p><span class="text-sm font-semibold">E-mail Corporativo:</span> {{ funcionario.EmailCorp }}
                    </p>

                </div>
                <div class="flex flex-col justify-start border-b-2 border-gray-800 pb-2" v-if="funcionario.Banco || funcionario.TipoPIX">
                    <div class="flex justify-between gap-x-8">
                        <p v-if="funcionario.Banco"><span class="text-sm font-semibold">Banco:</span> {{
                                funcionario.Banco
                        }}</p>
                        <p v-if="funcionario.Agencia"><span class="text-sm font-semibold">Agência:</span> {{
                                funcionario.Agencia
                        }}</p>
                        <p v-if="funcionario.Conta"><span class="text-sm font-semibold">Conta:</span> {{
                                funcionario.Conta
                        }}</p>

                    </div>
                    <div class="flex justify-between gap-x-8">
                        <p v-if="funcionario.TipoPIX"><span class="text-sm font-semibold">Tipo PIX:</span> {{
                                funcionario.TipoPIX
                        }}</p>
                        <p v-if="funcionario.ChavePIX"><span class="text-sm font-semibold">Chave PIX:</span> {{
                                funcionario.ChavePIX
                        }} </p>
                    </div>
                </div>
                <div class="flex flex-col justify-start">
                    <div class="flex justify-between gap-x-8">
                        <p><span class="text-sm font-semibold">Admissão:</span> {{ `${new
                                Date(funcionario.Admissao.seconds * 1000).getDate()} / ${new
                                    Date(funcionario.Admissao.seconds * 1000).getMonth() + 1} / ${new
                                        Date(funcionario.Admissao.seconds * 1000).getFullYear()}`
                        }} </p>
                        <p v-if="funcionario.TipoContratacao"><span class="text-sm font-semibold">Tipo Contratação:</span> {{ funcionario.TipoContratacao }}</p>
                        <p><span class="text-sm font-semibold">Cargo:</span> {{ funcionario.Cargo }}</p>
                        <p><span class="text-sm font-semibold">Nível:</span> {{ funcionario.Nivel }}</p>

                    </div>
                    <div class="flex justify-between gap-x-8">
                        <p v-if="funcionario.ValorFixo"><span class="text-sm font-semibold">Valor Fixo:</span> {{ funcionario.ValorFixo.toFixed(2) }}</p>
                        <p v-if="funcionario.ValorHora"><span class="text-sm font-semibold">Valor Hora:</span> {{ funcionario.ValorHora.toFixed(2) }}</p>
                    </div>
                    <div class="flex justify-between gap-x-8">
                        <p v-if="funcionario.ValorTransporte"><span class="text-sm font-semibold">Valor Transporte:</span> {{ funcionario.ValorTransporte.toFixed(2) }}</p>
                        <p v-if="funcionario.ValorRefeicao"><span class="text-sm font-semibold">Valor Refeição:</span> {{ funcionario.ValorRefeicao.toFixed(2) }}</p>
                        <p v-if="funcionario.ValorAuxilio"><span class="text-sm font-semibold">Valor Auxílio:</span> {{ funcionario.ValorAuxilio.toFixed(2) }}</p>
                    </div>
                </div>
                <button @click="closePopup"
                    class="self-center mt-4 w-1/5 px-3 py-2 md:px-0 md:py-1 bg-red-600 text-white rounded-lg hover:bg-red-800 flex items-center justify-center gap-x-2">
                    <fa icon="rotate-left" class="mr-1" />
                    <span class="hidden md:block">Voltar</span>
                </button>
            </div>
        </div>

        <div v-if="deleteSuccess"
            class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center items-center">
            <div
                class="text-white bg-green-600 rounded-lg flex justify-center items-center w-full py-4 gap-x-4 px-2 md:mx-2">
                <fa class="text-xl" icon="check" />
                <span class="font-semibold">Os dados foram excluídos do sistema.</span>
            </div>
        </div>

    </div>

</template>