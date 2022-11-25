<script setup></script>

<template>
    <div class="h-screen flex flex-col justify-center items-center gap-y-4">
        <h1 class="font-semibold text-xl text-gray-600">Cadastro de Novo Cliente</h1>

        <div class="flex gap-x-2 items-center">
            <input type="checkbox" id="ativa" checked>
            <label for="ativa"> Ativo </label>
        </div>
        <div class="flex gap-x-4">
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Codigo" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="CNPJ" />
        </div>
        <input class="text-center h-8 w-80 border rounded-lg border-gray-600" placeholder="Razao Social" />


        <input class="text-center h-8 w-96 border rounded-lg border-gray-600" placeholder="Endereco" />
        <input class="text-center h-8 w-40 border rounded-lg border-gray-600" placeholder="Valor Hora" />


        <div class="flex gap-x-4 items-center border-t-2 border-gray-600 pt-4 ">
            <input class="text-center h-8 w-80 border rounded-lg border-gray-600" placeholder="Nome Contato" />
            <input class="text-center h-8 w-60 border rounded-lg border-gray-600" placeholder="Cargo" />
            <input type="checkbox" id="ativa" checked>
            <label for="ativa"> Principal </label>
        </div>
        <div class="flex gap-x-4">
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Telefone 1" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Ramal" />
        </div>
        <div class="flex gap-x-4">
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Telefone 2" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Ramal" />
        </div>
        <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Celular" />
        <input class="text-center h-8 w-80 border rounded-lg border-gray-600" placeholder="E-mail" />

        <button class="bg-blue-600 text-white px-8 py-1 rounded-lg hover:bg-blue-800">
            Adicionar Contato
            <fa icon="plus" />
        </button>
        <div class="flex gap-x-4">
            <button class="bg-gray-600 text-white px-8 py-1 rounded-lg hover:bg-gray-800">Salvar</button>
            <button class="bg-red-600 text-white px-8 py-1 rounded-lg hover:bg-red-800"><a href="/">Voltar</a></button>
        </div>
    </div>
</template>