<template>
    <div class="inventarios">
        <h1>Listagem de Inventários</h1>
        <router-link :to="{name:'inventario-novo'}">Novo Inventário</router-link>
        <table>
            <tr>
                <td>ID</td>
                <td>LOJA</td>
                <td>DATA INÍCIO</td>
                <td>DATA ÚLTIMA MODIFICAÇÃO</td>
                <td>STATUS</td>
                <td>OPÇÕES</td>
            </tr>
            <tr v-for="inv in inventarios" :key="inv.id">
                <td>{{ inv.id }}</td>
                <td>{{ inv.store }}</td>
                <td>{{ inv.created_at }}</td>
                <td>{{ inv.updated_at }}</td>
                <td>{{ inv.status }}</td>
                <td>
                    <router-link :to="{name:'inventario-alterar', params:{id:inv.id}}">Alterar</router-link> | 
                    <a @click.prevent="excluirInventario(inv.id)" href="">Excluir</a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'inventarios',
    mounted() {
        this.listarInventario()
    },
    data(){
        return {
            inventarios:[]
        }
    },
    methods:{
        listarInventario(){
            axios.get('http://localhost:8000/lojas/api/inventario_api/')
            .then((resposta) => {
            this.inventarios=resposta.data
        })
        },
        excluirInventario(id){

            var op = window.confirm("Deseja excluir este inventário?")

            if(op){
                axios.delete('http://localhost:8000/lojas/api/inventario_api/'+id+'/')
                .then((resposta)=>{
                    console.log(resposta)
                    this.listarInventario()
                })
            }
        }
    }
}

</script>
