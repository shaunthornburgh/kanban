<template>
    <div class="header border-b flex-shrink-0" :class="borderColor">
        <header class="px-6">
            <div class="flex justify-between items-center py-3 border-b header" :class="borderColor">
                <div class="flex-1 min-w-0 flex">
                    <button @click="sidebarOpen = true" class="text-gray-600 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div class="flex-shrink-1 ml-3 relative w-64 lg:ml-0">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <svg class="h-5 w-5 text-gray-300" viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </span>
                        <input
                            class="block w-full rounded-md border border-gray-400 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-600"
                            placeholder="Search"
                        />
                    </div>
                </div>
                <div class="ml-6 flex-shrink-0 flex items-center">
                    <button :class="textColor">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                    </button>
                    <div class="ml-3 relative">
                        <div>
                            <button v-if="!isLoggedIn" v-on:click="isDropDownOpen=!isDropDownOpen" class="relative z-10 bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-haspopup="true">
                                <span class="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                    <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                            </button>
                            <button v-if="isLoggedIn" v-on:click="isDropDownOpen=!isDropDownOpen" class="relative z-10 bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-haspopup="true">
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </button>
                            <button v-if="isDropDownOpen" v-on:click="isDropDownOpen=false" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
                        </div>
                        <div v-if="isDropDownOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <div v-if="!isLoggedIn">
                                <router-link
                                    v-if="!isLoggedIn"
                                    :to="{name: 'auth-login'}"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >Sign-in</router-link>
                                <router-link
                                    v-if="!isLoggedIn"
                                    :to="{name: 'auth-register'}"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >Register</router-link>
                            </div>
                            <div v-if="isLoggedIn">
                                <div class="px-4 py-3" role="none">
                                    <p class="text-sm" role="none">Signed in as {{ name }}</p>
                                    <p class="text-sm font-medium text-gray-900 truncate" role="none">{{ email }}</p>
                                </div>
                                <div class="py-1" role="none">
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >Settings</a>
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        @click="logout"
                                    >Sign out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between py-2">
                <div class="sm:flex sm:items-center">
                    <BoardEditor
                        v-if="boardEditing"
                        @closed="boardEditing=false"
                        @saved="boardUpdate"
                        v-model="title"
                    ></BoardEditor>
                    <div v-else class="flex">
                        <h2

                            class="text-2xl font-semibold text-gray-900 leading-tight"
                        >
                            {{ board.title }}
                        </h2>
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
                </div>
                <div class="flex">
                    <button
                        v-if="isLoggedIn"
                        @click="showModal = true"
                        class="flex items-center pl-2 pr-4 py-2 text-sm font-medium text-white rounded-md"
                        :class="[buttonColor, buttonColorHover]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="ml-1">Delete Board</span>
                    </button>
                </div>
            </div>
        </header>
        <BoardDeleteModal
            :show="showModal"
            @closed="showModal=false"
            :board="board"
        ></BoardDeleteModal>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Logout from "./../graphql/Logout.gql";
import BoardEditor from "./BoardEditor";
import BoardUpdate from "../graphql/BoardUpdate.gql";
import {EVENT_BOARD_UPDATED} from "../constants";
import BoardDeleteModal from "./BoardDeleteModal";

export default {
    components: {
        BoardDeleteModal,
        BoardEditor
    },
    props: {
        board: Object,
        borderColor: Object,
        textColor: Object,
        buttonColor: Object,
        buttonColorHover: Object
    },
    computed: {
        ...mapState({
            isLoggedIn: "isLoggedIn",
            userId: state => state.user.id
        }),
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
    }
}
</script>
