<template>
    <div class="border-r" :class="borderColor">
        <div :class="sidebarOpen ? 'block' : 'hidden'" class="fixed inset-0 bg-black opacity-50 lg-hidden"></div>
        <div :class="sidebarOpen ? 'translate-x-0 ease-out transition-medium' : '-translate-x-full ease-in transition-medium'" class="sidebar fixed z-30 inset-y-0 left-0 w-64 px-8 py-4 overflow-auto lg:static lg:inset-auto lg:translate-x-0">

            <div class="-mx-3 pl-3 pr-1 flex items-center justify-between">
                <span><img class="h-9 w-9" src="/images/logo.svg"></span>
                <button @click="sidebarOpen = false" class="text-gray-700 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <nav class="mt-8">
                <h3 class="text-xs font-semibold uppercase tracking-wide" :class="textColor">Boards</h3>
                <div class="mt-2 -mx-3">
                    <router-link
                        :to="{name: 'board', params: {id: board.id}}"
                        v-for="board in userBoards"
                        :key="board.id"
                        class="flex justify-between items-center px-3 py-2 rounded-lg"
                    >
                        <span class="text-sm font-medium" :class="textColor">{{ board.title }}</span>
                        <div class="w-4 h-4 rounded-full border-2 border-white" :class="getBoardColor(board.color)"></div>
                    </router-link>
                </div>
                <h3 class="mt-8 text-xs font-semibold uppercase tracking-wide" :class="textColor">Tags</h3>
                <div class="mt-2 -mx-3">
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium" :class="textColor">Bug</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium" :class="textColor">Feature Request</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium" :class="textColor">Marketing</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium" :class="textColor">v2.0</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium" :class="textColor">Enhancement</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium" :class="textColor">Design</span>
                    </a>
                </div>
                <button class="mt-2 -ml-1 flex items-center text-sm font-medium" :class="textColor">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 20 20" fill="none">
                        <path stroke="currentColor" fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span class="ml-1">New Project</span>
                </button>
            </nav>
        </div>
    </div>
</template>

<script>
import UserBoards from "./../graphql/UserBoards.gql";
import { mapState } from "vuex";
import { colorMainBoard } from "../utils";

export default {
    props: {
        board: Object,
        borderColor: Object,
        textColor: Object
    },
    apollo: {
        userBoards: {
            query: UserBoards,
            variables() {
                return {
                    userId: this.userId
                };
            },
            skip() {
                return !this.userId;
            }
        }
    },
    data() {
        return {
            sidebarOpen: false,
            isDropDownOpen: false
        }
    },
    computed: {
        ...mapState({
            userId: state => state.user.id
        }),
    },
    methods: {
        getBoardColor(color) {
            return [colorMainBoard[color]];
        },
    }
};
</script>
