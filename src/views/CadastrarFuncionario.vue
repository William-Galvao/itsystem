<script setup>

import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { computed } from '@vue/reactivity';


const ativo = ref(true)
const nomeCompleto = ref("")
const cpf = ref("")
const rg = ref("")
const dataNasc = ref("")
const pessoalEmail = ref("")
const corporativoEmail = ref("")
const pessoalTelefone = ref("")
const corporativoTelefone = ref("")
const endereco = ref("")
const cargo = ref("")
const nivel = ref("")
const banco = ref("")
const agencia = ref("")
const conta = ref("")
const tipoPIX = ref("")
const chavePIX = ref("")
const dataAdmissao = ref("")
const contratacao = ref("")
const fixoValor = ref(0)
const horaValor = ref(0)
const transporteValor = ref(0)
const refeicaoValor = ref(0)
const auxilioValor = ref(0)
const saudePlano = ref(0)
const odontoPlano = ref(0)
const empresas = ref([])

const cliente = ref("")
const clientes = ref([])

const erro = ref("")

async function getAllClientes() {
    let fetchedClientes = []

    const querySnapshot = await getDocs(collection(db, "clientes"));
    querySnapshot.forEach((doc) => {
        const cliente = {
            id: doc.id,
            CNPJ: doc.data().CNPJ,
            RazaoSocial: doc.data().RazaoSocial,
            Endereco: doc.data().Endereco,
            NomeContato: doc.data().NomeContato,
            Cargo: doc.data().Cargo,
            Telefone: doc.data().Telefone,
            Celular: doc.data().Celular,
            Email: doc.data().Email
        }
        fetchedClientes.push(cliente)
        clientes.value = fetchedClientes;
    });
}

getAllClientes()

function addToEmpresas() {
    if (empresas.value.indexOf(cliente.value) == -1) {
        empresas.value.push(cliente.value)
    }

    console.log(empresas.value)
}

function fixoValorToCurrency() {
    fixoValor.value = parseFloat(fixoValor.value).toFixed(2)
}
function horaValorToCurrency() {
    horaValor.value = parseFloat(horaValor.value).toFixed(2)
}
function transporteValorToCurrency() {
    transporteValor.value = parseFloat(transporteValor.value).toFixed(2)
}
function refeicaoValorToCurrency() {
    refeicaoValor.value = parseFloat(refeicaoValor.value).toFixed(2)
}
function auxilioValorToCurrency() {
    auxilioValor.value = parseFloat(auxilioValor.value).toFixed(2)
}
function saudePlanoToCurrency() {
    saudePlano.value = parseFloat(saudePlano.value).toFixed(2)
}
function odontoPlanoToCurrency() {
    odontoPlano.value = parseFloat(odontoPlano.value).toFixed(2)
}

function dateConvert(date) {
    const splited = date.split('-');
    return new Date(splited[0], splited[1] - 1, splited[2])
}



const funcionario = computed(() => ({
    Ativo: ativo.value,
    Nome: nomeCompleto.value,
    CPF: cpf.value,
    RG: rg.value,
    Nascimento: dateConvert(dataNasc.value),
    EmailPessoal: pessoalEmail.value,
    EmailCorp: corporativoEmail.value,
    TelefonePessoal: pessoalTelefone.value,
    TelefoneCorp: corporativoTelefone.value,
    Endereco: endereco.value,
    Cargo: cargo.value,
    Nivel: nivel.value,
    Banco: banco.value,
    Agencia: agencia.value,
    Conta: conta.value,
    TipoPIX: tipoPIX.value,
    ChavePIX: chavePIX.value,
    Admissao: dateConvert(dataAdmissao.value),
    TipoContratacao: contratacao.value,
    ValorFixo: parseFloat(fixoValor.value),
    ValorHora: parseFloat(horaValor.value),
    ValorTransporte: parseFloat(transporteValor.value),
    ValorRefeicao: parseFloat(refeicaoValor.value),
    ValorAuxilio: parseFloat(auxilioValor.value),
    ValorPlanoSaude: parseFloat(saudePlano.value),
    ValorPlanoOdonto: parseFloat(odontoPlano.value),
    Empresas: empresas.value

}))

async function postFuncionario() {

    // Validação dos campos

    if (!funcionario.value.Nome) {
        erro.value = "O preenhcimento do campo 'Nome Completo' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!funcionario.value.CPF) {
        erro.value = "O preenhcimento do campo 'CPF' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!funcionario.value.RG) {
        erro.value = "O preenhcimento do campo 'RG' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!dataNasc.value) {
        erro.value = "O preenhcimento do campo 'Data Nascimento' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!funcionario.value.EmailCorp) {
        erro.value = "O preenhcimento do campo 'E-mail Corporativo' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!funcionario.value.TelefonePessoal) {
        erro.value = "O preenhcimento do campo 'Telefone Pessoal' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!funcionario.value.Endereco) {
        erro.value = "O preenhcimento do campo 'Endereço' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!funcionario.value.Cargo) {
        erro.value = "O preenhcimento do campo 'Cargo' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!funcionario.value.Nivel) {
        erro.value = "O preenhcimento do campo 'Nível' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    if (!dataAdmissao.value) {
        erro.value = "O preenhcimento do campo 'Data Admissão' é obrigatório."
        setTimeout(() => erro.value = null, 5000)
        return
    }

    // ***

    const docRef = await setDoc(doc(db, "funcionarios", cpf.value), funcionario.value);
    console.log(docRef)
}

</script>

<template>
    <Navbar />
    <div class="h-screen p-4">
        <div class="flex text-gray-600 text-2xl font-semibold border-b-2 border-gray-600 pb-2">
            <span>Cadastro de Novo Funcionário</span>

        </div>

        <form class="my-4 text-gray-600">
            <div class="flex gap-x-2 items-center mb-4 font-medium">
                <input type="checkbox" id="ativa" checked v-model="ativo">
                <label for="ativa"> Ativo </label>
            </div>

            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4">

                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">Nome Completo <span class="text-xs">*</span></label>
                    <input class="bg-gray-100 w-full px-2" v-model="nomeCompleto" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">CPF<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 px-2" v-model="cpf" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">RG<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 px-2" v-model="rg" />
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4 my-2">

                <div>
                    <label class="block mb-1 text-sm font-medium">Data Nascimento<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 px-2" type="date" v-model="dataNasc" />
                </div>

                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">E-mail Pessoal</label>
                    <input class="bg-gray-100 w-full px-2" v-model="pessoalEmail" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">E-mail Corporativo<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 w-full px-2" v-model="corporativoEmail" />
                </div>

            </div>

            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4 my-2">


                <div>
                    <label class="block mb-1 text-sm font-medium">Telefone Pessoal<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 px-2" v-model="pessoalTelefone" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Telefone Corporativo</label>
                    <input class="bg-gray-100 px-2" v-model="corporativoTelefone" />
                </div>

                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">Endereço<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 w-full px-2" v-model="endereco" />
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4 my-2">


                <div>
                    <label class="block mb-1 text-sm font-medium">Cargo<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 px-2" v-model="cargo" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Nível<span class="text-xs">*</span></label>
                    <select class="bg-gray-100 px-2" v-model="nivel">
                        <option>Junior</option>
                        <option>Pleno</option>
                        <option>Senior</option>
                        <option>Especialista</option>
                    </select>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">Banco</label>
                    <input class="bg-gray-100 px-2" v-model="banco" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Agência</label>
                    <input class="w-16 bg-gray-100 px-2" v-model="agencia" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Conta</label>
                    <input class="w-24 bg-gray-100 px-2" v-model="conta" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">PIX Tipo</label>
                    <select class="bg-gray-100 px-2" v-model="tipoPIX">
                        <option>CPF/CNPJ</option>
                        <option>E-mail</option>
                        <option>Celular</option>
                    </select>
                </div>

                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">PIX Chave</label>
                    <input class="bg-gray-100 w-full px-2" v-model="chavePIX" />
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4 my-2">


                <div class="w-full">
                    <label class="block mb-1 text-sm font-medium">Data Admissão<span class="text-xs">*</span></label>
                    <input class="bg-gray-100 w-full px-2" type="date" v-model="dataAdmissao" />
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Contratação</label>
                    <select class="bg-gray-100 px-2" v-model="contratacao">
                        <option>CLT</option>
                        <option>CNPJ</option>
                    </select>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">Valor Fixo</label>
                    <span class="flex items-center">
                        <span class="-mr-6 z-10">R$</span>
                        <input class="bg-gray-100 px-2 text-end w-32" @blur="fixoValorToCurrency"
                            v-model.number="fixoValor">

                    </span>

                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Valor Hora</label>
                    <span class="flex items-center">
                        <span class="-mr-6 z-10">R$</span>
                        <input class="bg-gray-100 px-2 text-end w-32" @blur="horaValorToCurrency" v-model="horaValor">

                    </span>
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Transporte</label>
                    <span class="flex items-center">
                        <span class="-mr-6 z-10">R$</span>
                        <input class="bg-gray-100 px-2 text-end w-32" @blur="transporteValorToCurrency"
                            v-model="transporteValor">

                    </span>
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Refeição</label>
                    <span class="flex items-center">
                        <span class="-mr-6 z-10">R$</span>
                        <input class="bg-gray-100 px-2 text-end w-32" @blur="refeicaoValorToCurrency"
                            v-model="refeicaoValor">

                    </span>
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Auxílio</label>
                    <span class="flex items-center">
                        <span class="-mr-6 z-10">R$</span>
                        <input class="bg-gray-100 px-2 text-end w-32" @blur="auxilioValorToCurrency"
                            v-model="auxilioValor">

                    </span>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">Plano Saúde</label>
                    <span class="flex items-center">
                        <span class="-mr-6 z-10">R$</span>
                        <input class="bg-gray-100 px-2 text-end w-32" @blur="saudePlanoToCurrency" v-model="saudePlano">

                    </span>
                </div>
                <div>
                    <label class="block mb-1 text-sm font-medium">Plano Odonto</label>
                    <span class="flex items-center">
                        <span class="-mr-6 z-10">R$</span>
                        <input class="bg-gray-100 px-2 text-end w-32" @blur="odontoPlanoToCurrency"
                            v-model="odontoPlano">

                    </span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-y-2 gap-x-4 my-2">




                <div>
                    <label class="block mb-1 text-sm font-medium">Clientes</label>
                    <div class="flex items-center gap-x-2">
                        <select class="bg-gray-100 px-2" v-model="cliente">

                            <option v-for="cliente in clientes">{{ cliente.RazaoSocial }}</option>
                        </select>
                        <button @click.prevent="addToEmpresas"
                            class="px-2 py-1 bg-blue-600 text-white text-sm rounded-lg">
                            <fa icon="plus"></fa>
                        </button>
                    </div>
                </div>

                <div class="w-full flex items-end gap-x-1">
                    <div v-for="empresa, index in empresas">
                        <span @click="empresas.splice(index, 1)"
                            class="bg-blue-600 py-1 px-2 rounded-lg text-white font-semibold flex items-center gap-x-1 cursor-pointer hover:bg-blue-800">{{
                                    empresa.split(' ').slice(0, 2).join(' ')
                            }}
                            <fa class="text-sm hover:scale-125" icon="delete-left" />
                        </span>
                    </div>
                </div>
            </div>



        </form>

        <div class="flex items-center justify-center gap-x-4">


            <button class="bg-red-600 text-white px-8 py-1 rounded-lg hover:bg-red-800">
                <a href="/">
                    <fa icon="rotate-left" class="mr-1" />
                    Voltar
                </a>
            </button>

            <button @click.prevent="postFuncionario"
                class="bg-green-600 text-white px-8 py-1 rounded-lg hover:bg-green-800">

                <fa icon="floppy-disk" class="mr-1" />
                Salvar

            </button>
        </div>


        <div v-if="erro"
            class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center items-center">
            <div class="flex flex-col text-center text-white text-sm font-semibold bg-red-500 rounded-lg py-1 px-8">
                <p>{{ erro }}</p>
            </div>
        </div>

    </div>
</template>