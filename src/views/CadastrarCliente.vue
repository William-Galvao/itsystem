<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useRoute } from 'vue-router';

const ativo = ref(true)
const cnpj = ref("")
const razaoSocial = ref("")
const endereco = ref("")
const nomeContato = ref("")
const cargo = ref("")
const telefone = ref("")
const celular = ref("")
const email = ref("")
const erro = ref(null)
const loading = ref(false)
const success = ref(false)

const route = useRoute();
const idCliente = route.params.id

if (idCliente) {
    async function getCliente() {
        const docRef = doc(db, "clientes", idCliente);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            
                ativo.value = docSnap.data().Ativo,
                cnpj.value = docSnap.data().CNPJ,
                razaoSocial.value = docSnap.data().RazaoSocial,
                endereco.value = docSnap.data().Endereco,
                nomeContato.value = docSnap.data().NomeContato,
                cargo.value = docSnap.data().Cargo,
                telefone.value = docSnap.data().Telefone,
                celular.value = docSnap.data().Celular,
                email.value = docSnap.data().Email
            
            console.log("Document data:", docSnap.data(), docSnap.id);
        } else {
            console.log("No such document!");
        }
    }
    getCliente()
}



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

async function postCliente() {

    loading.value = true;

    // Validação dos campos

    if(!cliente.value.CNPJ){
        erro.value = "O preenhcimento do campo 'CNPJ' é obrigatório."
        loading.value = false;
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if(!cliente.value.RazaoSocial){
        erro.value = "O preenhcimento do campo 'Razão Social' é obrigatório."
        loading.value = false;
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if(!cliente.value.Endereco){
        erro.value = "O preenhcimento do campo 'Endereço' é obrigatório."
        loading.value = false;
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if(!cliente.value.NomeContato){
        erro.value = "O preenhcimento do campo 'Nome do Contato' é obrigatório."
        loading.value = false;
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if(!cliente.value.Telefone && !cliente.value.Celular){
        erro.value = "É necessário informar pelo menos um número de contato, telefone ou celular."
        loading.value = false;
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if(!cliente.value.Email){
        erro.value = "O preenhcimento do campo 'E-mail' é obrigatório."
        loading.value = false;
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!isNaN(cliente.value.NomeContato) || cliente.value.NomeContato.length < 3) {
        erro.value = "O campo 'Nome do Contato' exige um valor de pelo menos três dígitos, somente letras."
        loading.value = false;
        setTimeout(() => erro.value = null, 5000)
        return
    }


    if (isNaN(cliente.value.CNPJ) || cliente.value.CNPJ.length != 14) {
        erro.value = "O campo 'CNPJ' deve conter 14 dígitos, apenas números."
        loading.value = false;
        setTimeout(() => erro.value = null, 5000)
        return
    }


    // ***

    if (idCliente) {
        const docRef = doc(db, "clientes", idCliente)
        await updateDoc(docRef, cliente.value)
        loading.value = false;
        success.value = true;
        setTimeout(() => success.value = false, 5000);
        return
    }



    const docRef = await addDoc(collection(db, "clientes"), cliente.value);
    loading.value = false;
    success.value = true;

    ativo.value = true
    cnpj.value = ""
    razaoSocial.value = ""
    endereco.value = ""
    nomeContato.value = ""
    cargo.value = ""
    telefone.value = ""
    celular.value = ""
    email.value = ""

    setTimeout(() => success.value = false, 5000);

}

</script>

<template>
    <Navbar />
    <div class="h-screen p-4">
        <div class="flex text-gray-600 text-2xl font-semibold border-b-2 border-gray-600 pb-2">
            <span v-if="!idCliente" >Cadastro de Novo Cliente</span>
            <span v-if="idCliente">Atualizar Cliente</span>
        </div>

        <form class="my-4 text-gray-600">
            <div class="flex gap-x-2 items-center mb-4 font-medium">
                <input type="checkbox" id="ativa" checked v-model="ativo">
                <label for="ativa"> Ativo </label>
            </div>
            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4">
                <div>
                    <label class="block mb-1 text-sm font-medium">CNPJ<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 px-2" v-model="cnpj" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Razão Social<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 w-80 px-2" v-model="razaoSocial" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">Endereço<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 w-full px-2" v-model="endereco" />
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4 my-2">
                <div>
                    <label class="block mb-1 text-sm font-medium">Nome do Contato<span class="text-xs">*</span></label>
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
                    <label class="block mb-1 text-sm font-medium">E-mail<span class="text-xs">*</span></label>
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
            <button @click="postCliente" class="bg-green-600 text-white px-8 py-1 rounded-lg hover:bg-green-800">
                <span v-if="loading">
                    <svg aria-hidden="true"
                        class="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                </span>
                <span v-if="!loading">
                    <fa icon="floppy-disk" class="mr-1" />
                    Salvar
                </span>
            </button>
            <div v-if="erro"
            class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center items-center">
                <div
                class="flex gap-x-4 text-center text-white text-sm font-semibold bg-red-500 rounded-lg py-2 px-4">
                    <fa class="text-xl" icon="circle-exclamation" />
                    <span class="font-semibold">{{ erro }}</span>
                </div>
            </div>

            <div v-if="success && !idCliente"
                class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center items-center">
                <div
                    class="text-white bg-green-600 rounded-lg flex justify-center items-center w-full py-4 gap-x-4 px-2 md:mx-2">
                    <fa class="text-xl" icon="check" />
                    <span class="font-semibold">A nova empresa foi cadastrada com sucesso.</span>
                </div>
            </div>

            <div v-if="success && idCliente"
                class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center items-center">
                <div
                    class="text-white bg-green-600 rounded-lg flex justify-center items-center w-full py-4 gap-x-4 px-2 md:mx-2">
                    <fa class="text-xl" icon="check" />
                    <span class="font-semibold">Os dados da empresa foram atualizados com sucesso.</span>
                </div>
            </div>
        </div>
    </div>
</template>