<template>
    <div class="inventario-novo">
        <h1 v-if="inventario.id!=null">Editar Inventário</h1>
        <h1 v-else>Cadastrar Inventário</h1>
        <form action="">
            <label for="">Loja</label>
            <select name="" id="" v-model="inventario.store">
                <option v-for="loja in lojas" :key="loja.id" :value="loja.id">{{loja.name}}</option>
            </select><br>
            <label for="">Grupo de Produtos</label>
            <select name="" id="" v-model="inventario.group">
                <option v-for="grupo in grupos" :key="grupo.id" :value="grupo.id">{{grupo.name}}</option>
            </select><br>
            <button v-if="inventario.id!=null" @click.prevent="salvarInventario" type="button" name="button">Salvar</button>
            <button v-else @click.prevent="salvarInventario" type="button" name="button">Salvar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'inventario-novo',
    mounted() {

        var id = this.$route.params.id

        if(id!=null){

            axios.get('http://localhost:8000/lojas/api/inventario_api/'+id+'/')
            .then((resposta) => {
                this.inventario=resposta.data
            })
        }

        axios.get('http://localhost:8000/lojas/api/store_api/')
        .then((resposta) => {
            this.lojas=resposta.data
        })
        axios.get('http://localhost:8000/lojas/api/group_product_api/')
        .then((resposta) => {
            this.grupos=resposta.data
        })

    },

    data(){
        return {
            lojas:[],
            grupos:[],
            inventario:{store:null,group:null}
        }
    },
    methods:{
        salvarInventario(){
            var dados={
                store:this.inventario.store,
                group:this.inventario.group
            }

            var router = this.$router

            if(this.inventario.id!=null){
                axios.put('http://localhost:8000/lojas/api/inventario_api/'+this.inventario.id+'/', dados)
                .then((resposta)=>{
                    if(resposta.statusText=='OK'){
                        router.push('/inventarios')
                    }else{
                        console.log('error'+resposta.data)
                        alert('Erro ao editar inventário!')
                    }
                })
            }else{

                axios.post('http://localhost:8000/lojas/api/inventario_api/', dados)
                .then((resposta)=>{
                    if(resposta.statusText=='Created'){
                        router.push('/inventarios')
                    }else{
                        console.log('error'+resposta.data)
                        alert('Erro ao criar inventário!')
                    }
                })
            }

        }
    }
}

</script>
