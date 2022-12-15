<script setup>
import { ref } from 'vue';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth"

const cpf = ref("")
const password = ref("")
const confirmPassword = ref("")
const dadosFuncionario = ref({})

const firstScreen = ref(true)
const passwordScreen = ref(false)
const confirmPasswordScreen = ref(false)

const loading = ref(false)
const erro = ref("")
const checkPassword = ref(false)
const showPassword = ref(false)
function changeShowPassword() {
    showPassword.value = !showPassword.value
}

async function postCPF() {

    if (!cpf.value) {
        erro.value = "Por favor, preencha o campo CPF."
        setTimeout(() => erro.value = "", 5000)
        return
    }

    loading.value = true
    await getFuncionario()
    loading.value = false
    if (erro.value) {
        firstScreen.value = true;
        return
    }

    if (dadosFuncionario.value.UID) {
        erro.value = "Este usuário já está cadastrado no sistema."
        setTimeout(() => erro.value = "", 5000)
        return
    } else {
        firstScreen.value = false;
        passwordScreen.value = true;
    }
}

function createPassword() {

    if (!password.value) {
        erro.value = "Por favor, informe uma senha."
        setTimeout(() => erro.value = "", 5000)
        return
    }

    passwordScreen.value = false;
    confirmPasswordScreen.value = true;
    showPassword.value = false;
}

async function confirmCreatedPassword() {
    if (password.value != confirmPassword.value) {
        confirmPasswordScreen.value = false;
        passwordScreen.value = true;
        checkPassword.value = true;
        setTimeout(() => checkPassword.value = false, 5000);
        password.value = ""
        confirmPassword.value = ""
        return
    }

    await createUserWithEmailAndPassword(auth, dadosFuncionario.value.EmailCorp, password.value)
        .then(async (userCredential) => {
            
            console.log(userCredential.user.uid)
            const addUID = doc(db, "funcionarios", cpf.value)
            await updateDoc(addUID, {
                UID: userCredential.user.uid
            });
            

            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
        });

}

async function getFuncionario() {
    const docRef = doc(db, "funcionarios", cpf.value);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {

        dadosFuncionario.value = docSnap.data()
        console.log(dadosFuncionario.value)

    } else {

        erro.value = "CPF nao encontrado!"
        setTimeout(() => erro.value = "", 5000)
        cpf.value = ""

    }
}

</script>

<template>
    <div class="h-screen flex justify-center items-center">

        <div v-if="firstScreen && !loading" class="animate__animated animate__fadeIn flex flex-col gap-y-8">
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

        <div v-if="passwordScreen && !erro && !loading" class="animate__animated animate__fadeIn flex flex-col gap-y-4">
            <div>
                <p class="text-xl">
                    Olá, <span>{{ dadosFuncionario.Nome && dadosFuncionario.Nome.substring(0,
                            dadosFuncionario.Nome.indexOf(' '))
                    }}</span>!
                </p>
                <p>
                    Por favor, digite uma senha:
                </p>
                <p class="text-xs text-gray-600">
                    Esta será sua senha de acesso ao sistema de apontamentos.
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

        <div v-if="confirmPasswordScreen && !loading" class="animate__animated animate__fadeIn flex flex-col gap-y-4">
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

        <!-- Mensagens ao usuário -->

        <div v-if="checkPassword"
            class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center items-center">
            <div class="flex flex-col text-center text-white text-sm font-semibold bg-red-500 rounded-lg py-1 px-8">
                <p>Não foi possível confirmar a senha.</p>
                <p>Por favor, tente novamente.</p>
            </div>
        </div>

        <div v-if="erro"
            class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center items-center">
            <div class="flex flex-col text-center text-white text-sm font-semibold bg-red-500 rounded-lg py-1 px-8">
                <p>{{ erro }}</p>
            </div>
        </div>

        <div v-if="loading" class="flex justify-center items-center">
            <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
        </div>

    </div>
</template>