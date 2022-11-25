<script setup></script>

<template>
    <div class="flex flex-col justify-center items-center gap-y-4 py-4">
        <h1 class="font-semibold text-xl text-gray-600">Cadastro de Novo Funcionario</h1>

        <div class="flex gap-x-2 items-center">
            <input type="checkbox" id="ativa" checked>
            <label for="ativa"> Ativo </label>
        </div>
        <input class="text-center h-8 w-1/3 border rounded-lg border-gray-600" placeholder="Nome" />
        <div class="flex gap-x-4">
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="CPF" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="RG" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Data de Nascimento" />
        </div>
        
        <input class="text-center h-8 w-1/2 border rounded-lg border-gray-600" placeholder="Endereco" />

        <div class="flex gap-x-4 border-t-2 border-gray-600 pt-4">
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Banco" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Agencia" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Conta" />
        </div>
        <div class="flex gap-x-4 border-b-2 border-gray-600 pb-4">
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Tipo PIX" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Codigo PIX" />
        </div>

        <button class="bg-blue-600 text-white px-8 py-1 rounded-lg hover:bg-blue-800">
            Adicionar Cliente <fa icon="plus" />
        </button>

        <p>
            Katrium Industria Quimica S/A | 12345678/0001-23
        </p>

        <div class="flex gap-x-4">
            <input class="text-center h-8 w-96 border rounded-lg border-gray-600" placeholder="Cargo" />
            <select class="text-center h-8 w-60 border rounded-lg border-gray-600">
                <option selected> Nivel </option>
            </select>
        </div>
        <div class="flex gap-x-4">
            <input class="text-center h-8 w-80 border rounded-lg border-gray-600" placeholder="E-mail Corporativo" />
            <input class="text-center h-8 w-80 border rounded-lg border-gray-600" placeholder="E-mail Pessoal" />
        </div>
        <div class="flex gap-x-4">
            <input class="text-center h-8 w-60 border rounded-lg border-gray-600" placeholder="Telefone Corporativo" />
            <input class="text-center h-8 w-60 border rounded-lg border-gray-600" placeholder="Telefone Pessoal" />
        </div>
        
        <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Data de Admissao" />



        <div class="flex gap-x-4">
            <select class="text-center h-8 w-60 border rounded-lg border-gray-600">
                <option selected> Tipo de Contratacao </option>
            </select>
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Valor Fixo" />
        </div>
        <div class="flex gap-x-4">
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Refeicao" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Transporte" />
        </div>
        <div class="flex gap-x-4">
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Auxilio" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Valor Hora" />
        </div>
        <div class="flex gap-x-4">
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Plano de Saude" />
            <input class="text-center h-8 border rounded-lg border-gray-600" placeholder="Plano Odonto" />
        </div>

        <div class="flex gap-x-4">
            <button class="bg-gray-600 text-white px-8 py-1 rounded-lg hover:bg-gray-800">Salvar</button>
            <button class="bg-red-600 text-white px-8 py-1 rounded-lg hover:bg-red-800"><a href="/">Voltar</a></button>
        </div>

    </div>
</template>