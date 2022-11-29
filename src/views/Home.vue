<script setup>

import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";


const selectedMenu = ref('')
const clientes = ref([])
const loading = ref(false)
const popup = ref(false)
const cliente = ref({})

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

function showClientes() {
    selectedMenu.value = "clientes"
    getAllClientes()

}

function showFuncionarios() {
    selectedMenu.value = "funcionarios"
}

async function getCliente(id) {
    const docRef = doc(db, "clientes", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        popup.value = true
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
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}

function closePopup() {
    popup.value = false;
}



</script>

<template>

    <Navbar />

    <div class="h-screen p-4">

        <!-- Define os botões de menu baseado no conteúdo do array 'menus' -->
        <div class="flex justify-evenly border-b-2 border-gray-400 pb-4">

            <button @click="showClientes"
                class="bg-gray-500 text-white font-semibold w-1/6 py-4 flex justify-center items-center rounded-lg hover:bg-gray-600">
                <span class="hidden md:block">CLIENTES</span>
                <fa class="md:hidden" icon="building" />
            </button>
            <button @click="showFuncionarios"
                class="bg-gray-500 text-white font-semibold w-1/6 py-4 flex justify-center items-center rounded-lg hover:bg-gray-600">
                <span class="hidden md:block">FUNCIONARIOS</span>
                <fa class="md:hidden" icon="user" />
            </button>
            <button
                class="bg-gray-500 text-white font-semibold w-1/6 py-4 flex justify-center items-center rounded-lg hover:bg-gray-600">
                <span class="hidden md:block">RELATORIOS</span>
                <fa class="md:hidden" icon="clipboard-list" />
            </button>

        </div>

        <!-- Exibe as informações referentes ao que está selecionado na variável 'selectedMenu' -->
        <main class="flex flex-col gap-y-4 my-4">
            <a v-if="selectedMenu == 'clientes'" href="/cadastrarcliente"
                class="self-center w-1/6 text-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-800">
                <span class="hidden md:block">Novo Cliente</span>
                <fa class="md:hidden" icon="plus" />
            </a>
            <svg v-if="loading" aria-hidden="true" class="self-center w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
            <table v-if="selectedMenu == 'clientes'" class="text-center">
                <thead>
                    <tr class="bg-gray-500 text-white">
                        <th class="border-2 border-white">Razao Social</th>
                        <th class="border-2 border-white">CNPJ</th>
                        <th class="border-2 border-white">Acoes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientes">
                        <td>{{ cliente.RazaoSocial }}</td>
                        <td>{{ cliente.CNPJ }}</td>
                        <td>
                            <div class="flex content-center justify-evenly">
                                <button @click="getCliente(cliente.id)"
                                    class="text-white bg-gray-500 px-3 py-2 rounded-lg hover:bg-gray-600">
                                    <fa icon="magnifying-glass" />
                                </button>
                                <button class="text-white bg-gray-500 px-3 py-2 rounded-lg hover:bg-gray-600">
                                    <fa icon="pencil" />
                                </button>
                                <button class="text-white bg-red-600 px-3 py-2 rounded-lg hover:bg-gray-600">
                                    <fa icon="trash-can" />
                                </button>
                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>



            <a v-if="selectedMenu == 'funcionarios'" href="/cadastrarfuncionario"
                class="self-center w-1/6 text-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-800">
                <span class="hidden md:block">Novo Funcionario</span>
                <fa class="md:hidden" icon="plus" />
            </a>
        </main>
        <div v-if="popup"
            class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div class="py-4 md:py-0 mx-1 md:mx-0 bg-white md:w-1/2 md:h-1/2 flex flex-col justify-center px-4 gap-y-2">
                <div class="border-b-2 border-gray-800 pb-2">
                    <p><span class="font-semibold">{{cliente.Ativo? "Ativo" : "Inativo"}}</span></p>
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
                    class="self-center mt-2 w-1/5 px-3 py-2 md:px-0 md:py-1 bg-red-600 text-white rounded-lg hover:bg-red-800 flex items-center justify-center gap-x-2">
                    <fa icon="rotate-left" class="mr-1" />
                    <span class="hidden md:block">Voltar</span>
                </button>
            </div>
        </div>
    </div>

</template>