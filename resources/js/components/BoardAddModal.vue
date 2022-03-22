<template>
    <Modal :show="show" @closed="$emit('closed')">
        <form>
            <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">Create Board</h3>
                    <div class="py-2">
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            v-model="title"
                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                            placeholder="Enter a title for your board"
                        />
                    </div>
                    <div class="py-2">
                        <label class="block text-sm font-medium text-gray-700">Color</label>
                        <v-swatches v-model="color" inline></v-swatches>
                    </div>
                </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    @click="addBoard"
                    :disabled="cannotCreate"
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-25"
                >Create board</button>
                <button
                    type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    @click="$emit('closed')"
                >Cancel</button>
            </div>
        </form>
    </Modal>
</template>

<script>
import Modal from './Modal'
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'
import BoardAdd from './../graphql/BoardAdd.gql';
import UserBoards from './../graphql/UserBoards.gql';
import {mapState} from 'vuex';

export default {
    props: {
        show: Boolean
    },
    components: { Modal, VSwatches },
    computed: {
        ...mapState({
            userId: state => state.user.id
        }),
        cannotCreate() {
            return this.title === null || this.title.length === 0 || this.color === null || this.color.length === 0;
        }
    },
    data() {
        return {
            color: null,
            title: null,
        }
    },
    methods: {
        addBoard() {
            const self = this;
            this.$apollo.mutate({
                mutation: BoardAdd,
                variables: {
                    title: this.title,
                    color: this.color
                },
                update(store, { data: { boardAdd } }) {
                    const data = store.readQuery({
                        query: UserBoards,
                        variables: { userId: self.userId }
                    })
                    data.userBoards.push(boardAdd);
                    store.writeQuery({
                        query: UserBoards,
                        data,
                        variables: { userId: self.userId }
                    });

                    self.$emit('closed');
                }
            });
        }
    }
}
</script>
