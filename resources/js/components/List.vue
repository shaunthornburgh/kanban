<template>
    <div class="flex-shrink-0 flex flex-col w-80 bg-gray-100 rounded-md">
        <div
            v-if="!listEditing"
            class="flex justify-between pt-3 pb-1 px-3"
        >
            <h3 class="flex-shrink-0 text-sm font-medium text-gray-700">{{ list.title }}</h3>
            <div>
                <button class="text-gray-600 hover:text-gray-800 cursor pointer">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         class="h-5 w-5 pr-1"
                         viewBox="0 0 20 20"
                         fill="currentColor"
                         @click="listEditing=true"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
                <button class="text-gray-600 hover:text-gray-800 cursor pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        v-if="canDeleteList"
                        @click="listDelete"
                    >
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
        <ListEditor
            v-else
            v-model="title"
            label="Save List"
            @closed="listEditing=false"
            @saved="listUpdate"
        ></ListEditor>
        <div class="flex-1 min-h-0 overflow-y-auto">
            <ul class="pt-1 pb-3 px-3 space-y-3">
                <Card
                    v-for="card in list.cards"
                    :key="card.id"
                    :card="card"
                    @card-deleted="$emit('card-deleted', {...$event, listId: list.id})"
                    @card-updated="$emit('card-updated', {...$event, listId: list.id})"
                ></Card>
                <CardAddEditor
                    v-if="cardEditing"
                    @closed="cardEditing=false"
                    :list="list"
                    @added="$emit('card-added', {...$event, listId: list.id})"
                ></CardAddEditor>
                <CardAddButton v-if="!cardEditing && canAddCard" @click="cardEditing=true"></CardAddButton>
            </ul>
        </div>
    </div>
</template>

<script>
import Card from "./Card";
import CardAddButton from "./CardAddButton";
import CardAddEditor from "./CardAddEditor";
import {mapState} from "vuex";
import ListDelete from "../graphql/ListDelete.gql";
import {EVENT_LIST_UPDATED, EVENT_LIST_DELETED} from "../constants";
import ListEditor from "./ListEditor";
import ListUpdate from "../graphql/ListUpdate.gql";

export default {
    components: {
        ListEditor,
        CardAddButton,
        Card,
        CardAddEditor
    },
    props: {
        list: Object
    },
    data() {
        return {
            cardEditing: false,
            listEditing: false,
            title: this.list.title
        }
    },
    computed: mapState({
        canAddCard(state) {
            return this.list.board.owner.id === state.user.id
        },
        canDeleteList(state) {
            return this.list.board.owner.id === state.user.id
        }
    }),
    methods: {
        async listUpdate() {
            const self = this;

            try {
                await this.$apollo.mutate({
                    mutation: ListUpdate,
                    variables: {
                        id: this.list.id,
                        title: this.title
                    },
                    update(store, { data: listUpdate }) {
                        self.$emit("list-updated", {
                            store,
                            data: listUpdate,
                            type: EVENT_LIST_UPDATED
                        });
                        self.listEditing = false;
                    }
                });
            } catch (error) {}
        },
        async listDelete() {
            const self = this;

            try {
                await this.$apollo.mutate({
                    mutation: ListDelete,
                    variables: {
                        id: this.list.id
                    },
                    update(store, {data: {listDelete}}) {
                        self.$emit("list-deleted", {
                            store,
                            data: listDelete,
                            type: EVENT_LIST_DELETED
                        })
                    }
                });
            } catch (error) {
            }
        },
    }
}
</script>
