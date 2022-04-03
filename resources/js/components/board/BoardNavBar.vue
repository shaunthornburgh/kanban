<template>
    <div class="header border-b flex-shrink-0" :class="borderColor">
        <header class="px-6">
            <div class="flex items-center justify-between py-2">
                <div class="sm:flex sm:items-center">
                    <BoardEditor
                        v-if="boardEditing"
                        @closed="boardEditing=false"
                        @saved="boardUpdate"
                        v-model="title"
                    ></BoardEditor>
                    <div v-else class="flex">
                        <h2 class="text-2xl font-semibold text-gray-500 leading-tight">{{ board.title }}</h2>
                        <button class="text-gray-600 pl-1 hover:text-gray-800 cursor pointer">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 class="h-5 w-5"
                                 viewBox="0 0 20 20"
                                 fill="currentColor"
                                 @click="boardEditing=true"
                            >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                    </div>

                </div>
                <div class="flex">
                    <div class="mt-1 flex items-center sm:mt-0 sm:ml-6">
                        <span class="-ml-2 rounded-full border-2 border-white">
                            <img
                                class="h-6 w-6 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=144&h=144&q=80"
                            />
                        </span>
                        <span class="-ml-2 rounded-full border-2 border-white">
                            <img
                                class="h-6 w-6 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=144&h=144"
                            />
                        </span>
                        <span class="-ml-2 rounded-full border-2 border-white">
                            <img
                                class="h-6 w-6 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=144&h=144&q=80"
                            />
                        </span>
                        <span class="-ml-2 rounded-full border-2 border-white">
                            <img
                                class="h-6 w-6 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=144&h=144&q=80"
                            />
                        </span>
                    </div>
                    <button
                        v-if="isLoggedIn"
                        @click="showModal = true"
                        class="ml-4 inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                        :class="[borderColor, buttonHoverColor, buttonFocusColor]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span class="ml-1">Manage Collaborators</span>
                    </button>
                    <button
                        v-if="isLoggedIn"
                        @click="showModal = true"
                        class="ml-4 inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                        :class="[borderColor, buttonHoverColor, buttonFocusColor]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="ml-1">Delete Board</span>
                    </button>
                </div>
            </div>
        </header>
        <DeleteConfirmationModal
            :show="showModal"
            :model="'board'"
            :event="'board-delete'"
            @closed="showModal=false"
            @board-delete="boardDelete"
            :title="board.title"
            :id="getBoardId"
        ></DeleteConfirmationModal>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Logout from "../../graphql/Logout.gql";
import BoardEditor from "./BoardEditor";
import BoardUpdate from "../../graphql/BoardUpdate.gql";
import {EVENT_BOARD_DELETED, EVENT_BOARD_UPDATED} from "../../constants";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import BoardDelete from "../../graphql/BoardDelete.gql";

export default {
    components: {
        DeleteConfirmationModal,
        BoardEditor
    },
    props: {
        board: Object,
        borderColor: Object,
        textColor: Object,
        buttonHoverColor: Object,
        buttonFocusColor: Object
    },
    computed: {
        ...mapState({
            isLoggedIn: "isLoggedIn",
            userId: state => state.user.id
        }),
        getBoardId: function() {
            return Number(this.board.id);
        }
    },
    data() {
        return {
            sidebarOpen: false,
            isDropDownOpen: false,
            boardEditing: false,
            title: this.board.title,
            showModal: false
        }
    },
    methods: {
        async logout() {
            const response = await this.$apollo.mutate({
                mutation: Logout
            });

            if (response.data?.logout?.id) {
                this.$store.dispatch("logout");
            }
        },
        async boardUpdate() {
            const self = this;

            try {
                await this.$apollo.mutate({
                    mutation: BoardUpdate,
                    variables: {
                        id: this.board.id,
                        title: this.title
                    },
                    update(store, { data: boardUpdate }) {
                        self.$emit("board-updated", {
                            store,
                            data: boardUpdate,
                            type: EVENT_BOARD_UPDATED
                        });
                        self.boardEditing = false;
                    }
                });
            } catch (error) {}
        },
        async boardDelete() {
            const self = this;

            try {
                await this.$apollo.mutate({
                    mutation: BoardDelete,
                    variables: {
                        id: this.board.id
                    },
                    update(store, {data: {boardDelete}}) {
                        self.$emit("board-deleted", {
                            store,
                            data: boardDelete,
                            type: EVENT_BOARD_DELETED
                        })
                    }
                });
            } catch (error) {}
        },
    }
}
</script>
