<template>
    <div class="h-screen flex overflow-hidden" id="app">
        <div :class="sidebarOpen ? 'block' : 'hidden'" class="fixed inset-0 bg-black opacity-50 lg-hidden"></div>
        <div :class="sidebarOpen ? 'translate-x-0 ease-out transition-medium' : '-translate-x-full ease-in transition-medium'" class="fixed z-30 inset-y-0 left-0 w-64 px-8 py-4 bg-gray-100 border-r overflow-auto lg:static lg:inset-auto lg:translate-x-0">

            <div class="-mx-3 pl-3 pr-1 flex items-center justify-between">
                <span><img class="h-9 w-9" src="images/logo.svg"></span>
                <button @click="sidebarOpen = false" class="text-gray-700 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <nav class="mt-8">
                <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Issues</h3>
                <div class="mt-2 -mx-3">
                    <a href="#" class="flex justify-between items-center px-3 py-2 bg-gray-200 rounded-lg">
                        <span class="text-sm font-medium text-gray-900">All</span>
                        <span class="text-xs font-semibold text-gray-700">36</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">Assigned to me</span>
                        <span class="text-xs font-semibold text-gray-700">2</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">Created by me</span>
                        <span class="text-xs font-semibold text-gray-700">1</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">Archived</span>
                    </a>
                </div>
                <h3 class="mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wide">Tags</h3>
                <div class="mt-2 -mx-3">
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">Bug</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">Feature Request</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">Marketing</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">v2.0</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">Enhancement</span>
                    </a>
                    <a href="#" class="flex justify-between items-center px-3 py-2 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">Design</span>
                    </a>
                </div>
                <button class="mt-2 -ml-1 flex items-center text-sm font-medium text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="none">
                        <path stroke="currentColor" fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span class="ml-1">New Project</span>
                </button>
            </nav>
        </div>
        <div class="flex flex-1 flex-col min-w-0 bg-white overflow-hidden">
            <div class="border-b-2 border-gray-200 flex-shrink-0">
                <header class="px-6">
                    <div class="flex justify-between items-center py-3 border-b border-gray-200">
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
                            <button>
                                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                                    <path
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>
                            <button class="ml-6">
                                <img
                                    class="h-9 w-9 rounded-full object-cover"
                                    src="https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=144&h=144"
                                />
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center justify-between py-2">
                        <div class="sm:flex sm:items-center">
                            <span v-if="$apollo.queries.board.loading" class="text-2xl font-semibold text-gray-900 leading-tight">Loading...</span>
                            <h2 v-else class="text-2xl font-semibold text-gray-900 leading-tight">
                                {{ board.title }}
                            </h2>
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
                            <button class="flex items-center pl-2 pr-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                </svg>
                                <span class="ml-1">New Issue</span>
                            </button>
                        </div>
                    </div>
                </header>
            </div>
            <div class="flex-1 overflow-auto">
                <main class="p-3 flex inline-flex overflow-hidden h-full space-x-3" v-if="board">
                    <List :list="list" v-for="list in board.lists" :key="list.id"></List>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import List from "./components/List";
import BoardQuery from "./graphql/BoardWithListsAndCards.gql";

export default {
    components: {
        List
    },
    apollo: {
        board: {
            query: BoardQuery,
            variables() {
                return {
                    id: 1
                };
            }
        }
    },
    data() {
        return {
            sidebarOpen: false
        }
    }
};
</script>
