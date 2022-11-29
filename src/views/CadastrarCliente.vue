<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const ativo = ref(true)
const cnpj = ref("")
const razaoSocial = ref("")
const endereco = ref("")
const nomeContato = ref("")
const cargo = ref("")
const telefone = ref("")
const celular = ref("")
const email = ref("")

const cliente = computed(() => ({
    Ativo: ativo.value,
    CNPJ: cnpj.value,
    RazaoSocial: razaoSocial.value,
    Endereco: endereco.value,
    NomeContato: nomeContato.value,
    Cargo: cargo.value,
    Telefone: telefone.value,
    Celular: celular.value,
    Email: email.value,
}))

async function postNovoCliente() {
    const docRef = await addDoc(collection(db, "clientes"), cliente.value);
    console.log("Document written with ID: ", docRef.id);

}

</script>

<template>
    <Navbar />
    <div class="h-screen p-4">
        <div class="flex text-gray-600 text-2xl font-semibold border-b-2 border-gray-600 pb-2">
            Cadastro de Novo Cliente
        </div>

        <form class="my-4 text-gray-600">
            <div class="flex gap-x-2 items-center mb-4 font-medium">
                <input type="checkbox" id="ativa" checked v-model="ativo">
                <label for="ativa"> Ativo </label>
            </div>
            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4">
                <div>
                    <label class="block mb-1 text-sm font-medium">CNPJ</label>
                    <input class="bg-gray-100 px-2" v-model="cnpj" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Razao Social</label>
                    <input class="bg-gray-100 w-80 px-2" v-model="razaoSocial" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">Endereco</label>
                    <input class="bg-gray-100 w-full px-2" v-model="endereco" />
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4 my-2">
                <div>
                    <label class="block mb-1 text-sm font-medium">Nome do Contato</label>
                    <input class="bg-gray-100 px-2" v-model="nomeContato" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Cargo</label>
                    <input class="bg-gray-100 px-2" v-model="cargo" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Telefone</label>
                    <input class="bg-gray-100 px-2" v-model="telefone" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Celular</label>
                    <input class="bg-gray-100 px-2" v-model="celular" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">E-mail</label>
                    <input class="bg-gray-100 w-full px-2" v-model="email" />
                </div>
            </div>
        </form>

        <div class="flex gap-x-4 justify-center">
            <button class="bg-red-600 text-white px-8 py-1 rounded-lg hover:bg-red-800">
                <a href="/">
                    <fa icon="rotate-left" class="mr-1" />
                    Voltar
                </a>
            </button>
            <button @click="postNovoCliente" class="bg-green-600 text-white px-8 py-1 rounded-lg hover:bg-green-800">
                <fa icon="floppy-disk" class="mr-1" />
                Salvar
            </button>
        </div>
    </div>
</template>