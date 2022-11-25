<script setup>

import { auth } from '../firebase';
import router from "@/routes";
import { logout } from "../firebase";


function sair() {
    logout();
    router.push('/login')
}

</script>

<template>
    <div class="flex justify-between md:justify-end px-4 py-4 bg-gray-200 items-center gap-x-4">
        <span class="text-gray-600 hidden md:block">{{ auth.currentUser.email }}</span>
        <span class="text-gray-600 md:hidden">{{ auth.currentUser.email.substr(0, auth.currentUser.email.indexOf('@')) }}</span>
        <button @click="sair" class="font-semibold bg-red-600 text-white px-4 md:px-6 py-1 rounded-lg hover:bg-red-800">
            Sair
            <fa class="ml-1" icon='arrow-right-from-bracket' />
        </button>
    </div>
</template>
