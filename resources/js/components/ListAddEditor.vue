<template xmlns="http://www.w3.org/1999/html">
    <div v-if="!editing" class="w-80">
        <button
            @click="startEditing"
            class="flex w-full items-center pl-2 pr-4 py-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span class="ml-1">Add list</span>
        </button>
    </div>
    <div
        v-else
        class="flex-shrink-0 flex flex-col w-80 bg-gray-100 rounded-md"
        v-on-clickaway="hideEditor"

    >
        <div class="pt-4 pb-3 px-3">
            <textarea
                class="rounded-md shadow py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
                ref="title"
                placeholder="Enter list title..."
                @keyup.esc="hideEditor"
                @keypress.enter="addList"
                v-model="title"
            ></textarea>
            <div class="flex">
                <button
                    @click="addList"
                    class="text-sm text-white mr-1 px-2 py-2 font-medium bg-gray-700 rounded-md hover:bg-gray-600 cursor pointer"
                >
                    <span>Add List</span>
                </button>
                <button
                    @click="hideEditor"
                    class="text-sm px-2 py-2 text-white font-medium bg-gray-400 bg-gray-100 rounded-md hover:bg-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import { EVENT_LIST_ADDED } from "../constants";

import ListAdd from "./../graphql/ListAdd.gql";

export default {
    props: ["board"],
    data() {
        return {
            editing: false,
            title: null
        };
    },
    directives: { onClickaway },
    methods: {
        hideEditor() {
            this.editing = false;
        },
        startEditing() {
            this.editing = true;
            this.$nextTick(() => this.$refs.title.focus());
        },
        addList() {
            const self = this;

            this.$apollo.mutate({
                mutation: ListAdd,
                variables: {
                    title: this.title,
                    board: this.board
                },
                update(store, {data: { listAdd } }) {
                    self.$emit("added", { store, data: listAdd, type: EVENT_LIST_ADDED });
                    self.hideEditor();
                }
            });
        }
    }
};
</script>
