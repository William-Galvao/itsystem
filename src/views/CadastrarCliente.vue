<script setup>
import Navbar from '../components/Navbar.vue';

</script>

<template>
    <Navbar />
    <div class="h-screen p-4">
        <div class="flex text-gray-600 text-2xl font-semibold border-b-2 border-gray-600 pb-2">
            Cadastro de Novo Cliente
        </div>

        <form class="my-4 text-gray-600">
            <div class="flex gap-x-2 items-center mb-4 font-medium">
                <input type="checkbox" id="ativa" checked>
                <label for="ativa"> Ativo </label>
            </div>
            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4">
                <div>
                    <label class="block mb-1 text-sm font-medium">CNPJ</label>
                    <input class="bg-gray-100 px-2" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Razao Social</label>
                    <input class="bg-gray-100 w-80 px-2" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">Endereco</label>
                    <input class="bg-gray-100 w-full px-2" />
                </div>
            </div>
        </form>

        <div class="flex gap-x-4 justify-center">
            <button class="bg-green-600 text-white px-8 py-1 rounded-lg hover:bg-green-800">Salvar</button>
            <button class="bg-red-600 text-white px-8 py-1 rounded-lg hover:bg-red-800"><a href="/">Voltar</a></button>
        </div>
    </div>
</template>