<script setup>
import { ref } from 'vue';

const cpf = ref("")
const password = ref("")
const confirmPassword = ref("")

const firstScreen = ref(true)
const passwordScreen = ref(false)
const confirmPasswordScreen = ref(false)

const checkPassword = ref(false)
const showPassword = ref(false)
function changeShowPassword() {
    showPassword.value = !showPassword.value
}

function postCPF() {
    firstScreen.value = false;
    passwordScreen.value = true;
}

function createPassword() {
    passwordScreen.value = false;
    confirmPasswordScreen.value = true;
    showPassword.value = false;
}

function confirmCreatedPassword() {
    if (password.value != confirmPassword.value) {
        confirmPasswordScreen.value = false;
        passwordScreen.value = true;
        checkPassword.value = true;
        setTimeout(() => checkPassword.value = false, 5000);
    }

}

</script>

<template>
    <div class="h-screen flex justify-center items-center">

        <div v-if="firstScreen" class="animate__animated animate__fadeIn flex flex-col gap-y-8">
            <div>
                <label class="block mb-1 text-sm font-medium">CPF</label>
                <input class="bg-gray-100 px-2" v-model="cpf" />
            </div>
            <div class="flex justify-end">
                <button @click="postCPF"
                    class="text-sm font-medium bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-800">

                    <fa icon="share" class="mr-1" />
                    Enviar

                </button>
            </div>
        </div>

        <div v-if="passwordScreen" class="animate__animated animate__fadeIn flex flex-col gap-y-4">
            <div>
                <p>
                    Por favor, digite uma senha:
                </p>
                <p class="text-xs text-gray-600">
                    Esta sera sua senha de acesso ao sistema de apontamentos.
                </p>
            </div>
            <span class="flex items-center">
                <input class="bg-gray-100 px-2 w-72" :type="showPassword ? 'text' : 'password'" v-model="password" />
                <fa @click="changeShowPassword" icon="eye" class="-ml-7 z-10 text-gray-400 hover:text-gray-600" />
            </span>
            <div class="flex justify-end">
                <button @click="createPassword"
                    class="text-sm font-medium bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-800">

                    <fa icon="share" class="mr-1" />
                    Definir

                </button>
            </div>

        </div>

        <div v-if="confirmPasswordScreen" class="animate__animated animate__fadeIn flex flex-col gap-y-4">
            <div>
                <p>
                    Por favor, confirme a senha:
                </p>

            </div>
            <span class="flex items-center">
                <input class="bg-gray-100 px-2 w-72" :type="showPassword ? 'text' : 'password'"
                    v-model="confirmPassword" />
                <fa @click="changeShowPassword" icon="eye" class="-ml-7 z-10 text-gray-400 hover:text-gray-600" />
            </span>
            <div class="flex justify-end">
                <button @click="confirmCreatedPassword"
                    class="text-sm font-medium bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-800">

                    <fa icon="share" class="mr-1" />
                    Confirmar

                </button>
            </div>
        </div>
        <div v-if="checkPassword" class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center items-center">
            <div class="flex flex-col text-center text-white text-sm font-semibold bg-red-500 rounded-lg py-1 px-8">
                <p>A senha nao foi confirmada.</p>
                <p>Por favor, tente novamente.</p>
            </div>
        </div>
    </div>
</template>