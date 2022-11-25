<script setup>

import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';


const selectedMenu = ref('')

function showClientes() {
    selectedMenu.value = "clientes"
}

function showFuncionarios() {
    selectedMenu.value = "funcionarios"
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
        <main class="flex justify-center my-4">
            <a v-if="selectedMenu == 'clientes'" href="/cadastrarcliente" class="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-800">
                <span class="hidden md:block">Novo Cliente</span>
                <fa class="md:hidden" icon="plus"/>
            </a>
            <a v-if="selectedMenu == 'funcionarios'" href="/cadastrarfuncionario" class="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-800">
                <span class="hidden md:block">Novo Funcionario</span>
                <fa class="md:hidden" icon="plus"/>
            </a>
        </main>

    </div>

</template>