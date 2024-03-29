<template>
    <div>
        <li v-if="!editing">
            <a href="#" class="block p-5 rounded-md shadow bg-white relative hover:bg-gray-50 group">
                <div class="flex justify-between">
                    <p class="text-sm font-medium leading-snug text-gray-900">{{ card.title }}</p>
                    <span>
                        <img
                            class="rounded-full h-6 w-6"
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=144&h=144&q=80" />
                    </span>
                </div>
                <div class="mt-2 flex justify-between items-baseline">
                    <p class="text-sm text-gray-400">
                        Sep 14
                    </p>
                    <div class="mt-2">
                        <span class="px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded">
                            <svg class="h-2 w-2 text-teal-500" viewBox="0 0 8 8" fill="currentColor">
                                <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span class="ml-2 text-sm font-medium text-teal-900">Feature request</span>
                        </span>
                    </div>
                </div>
                <div
                    class="flex font-bold absolute top-0 right-0 p-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500"
                    v-if="card.owner.id === userId"
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         class="h-4 w-4 hover:text-gray-700 pr-1"
                         viewBox="0 0 20 20"
                         fill="currentColor"
                         @click="editing=true"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         class="h-4 w-4 hover:text-gray-700"
                         viewBox="0 0 20 20"
                         fill="currentColor"
                         @click="showModal=true"
                    >
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </div>
            </a>
        </li>
        <CardEditor
            v-else
            v-model="title"
            label="Save Card"
            @closed="editing=false"
            @saved="cardUpdate"
        ></CardEditor>
        <DeleteConfirmationModal
            :show="showModal"
            :model="'card'"
            :event="'card-delete'"
            @closed="showModal=false"
            @card-delete="cardDelete"
            :title="card.title"
            :id="getCardId"
        ></DeleteConfirmationModal>
    </div>
</template>

<script>
import CardDelete from "../../graphql/CardDelete.gql";
import CardUpdate from "../../graphql/CardUpdate.gql";
import {EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from "../../constants";
import CardEditor from "./CardEditor";
import { mapState } from "vuex";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default {
    components: {
        CardEditor,
        DeleteConfirmationModal
    },
    props: {
        card: Object
    },
    computed: {
        getCardId: function() {
            return Number(this.card.id);
        },
        ...mapState({
            userId: state => state.user.id
        })
    },
    data() {
        return {
            editing: false,
            title: this.card.title,
            showModal: false
        }
    },
    methods: {
        async cardDelete() {
            const self = this;

            try {
                await this.$apollo.mutate({
                    mutation: CardDelete,
                    variables: {
                        id: this.card.id
                    },
                    update(store, {data: {cardDelete}}) {
                        self.$emit("card-deleted", {
                            store,
                            data: cardDelete,
                            type: EVENT_CARD_DELETED
                        })
                    }
                });
            } catch (error) {}
        },
        async cardUpdate() {
            const self = this;

            try {
                await this.$apollo.mutate({
                    mutation: CardUpdate,
                    variables: {
                        id: this.card.id,
                        title: this.title
                    },
                    update(store, { data: cardUpdate }) {
                        self.$emit("card-updated", {
                            store,
                            data: cardUpdate,
                            type: EVENT_CARD_UPDATED
                        });
                        self.editing = false;
                    }
                });
            } catch (error) {}
        }
    }
}
</script>
