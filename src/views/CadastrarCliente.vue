<script setup>
import Navbar from '../components/Navbar.vue';

</script>

<template>
    <Navbar />
    <div class="h-screen p-4">
        <div class="flex text-gray-600 text-2xl font-semibold border-b-2 border-gray-600 pb-2">
            Cadastro de Novo Cliente
        </div>

        <form class="my-4">
            <div class="flex flex-col md:flex-row gap-x-4">
                <div>
                    <label class="block mb-1 text-sm font-medium text-gray-600">CNPJ</label>
                    <input class="bg-gray-100" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium text-gray-600">Razao Social</label>
                    <input class="bg-gray-100 w-80" />
                </div>
            </div>
        </form>

        <div class="flex gap-x-4 justify-center">
            <button class="bg-gray-600 text-white px-8 py-1 rounded-lg hover:bg-gray-800">Salvar</button>
            <button class="bg-red-600 text-white px-8 py-1 rounded-lg hover:bg-red-800"><a href="/">Voltar</a></button>
        </div>
    </div>
</template>