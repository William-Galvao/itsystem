<script setup>
import { ref } from 'vue';
import { auth } from '../firebase';
import router from "@/routes";
import { signInWithEmailAndPassword } from "firebase/auth";


const email = ref('')
const senha = ref('')
const errorCode = ref('')

async function signIn() {
    await signInWithEmailAndPassword(auth, email.value, senha.value)
        .then(() => {
            router.push('/')
        })
        .catch((error) => {
            errorCode.value = error.code;
        });
}

</script>

<template>
    <form @submit.prevent="signIn" class="h-screen flex flex-col justify-center items-center gap-y-4 relative">
        <div v-if="errorCode"
            class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center">
            <div class="text-white bg-red-600 rounded-lg flex justify-center items-center w-full mx-8 py-4 gap-x-4">
                <fa class="text-xl" icon="circle-exclamation" />
                <span class="font-semibold">{{ errorCode }}</span>
            </div>
        </div>
        <input class="text-center w-80 h-8 border rounded-lg border-gray-600" v-model="email" placeholder="E-mail" />
        <input type="password" class="text-center w-80 h-8 border rounded-lg border-gray-600" v-model="senha" placeholder="Senha" />
        <button class="bg-gray-600 text-white px-8 py-1 rounded-lg hover:bg-gray-800">Acessar</button>
    </form>


</template>