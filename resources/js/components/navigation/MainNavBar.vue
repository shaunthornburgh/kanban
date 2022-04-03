<template>
    <div class="w-full px-8 py-2 flex items-center justify-between bg-white border-b" :class="borderColor">
        <router-link :to="{ name: 'dashboard' }">
            <div class="flex">
                <span><img alt="Logo" class="h-9 w-9" src="/images/logo.svg" /></span>
                <h3 class="pt-1 pl-2 font-bold text-xl text-gray-500">Kanban</h3>
            </div>
        </router-link>
        <div class="flex justify-between items-center header">
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
                        class="block w-full rounded-md border pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-600"
                        :class="borderColor"
                        placeholder="Search"
                    />
                </div>
            </div>
            <div class="ml-4 flex-shrink-0 flex items-center">
                <button class="text-gray-500">
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
    </div>
</template>

<script>

import { mapState } from "vuex";
import Logout from "../../graphql/Logout.gql";

export default {
    computed: {
        ...mapState({
            isLoggedIn: "isLoggedIn",
            name: state => state.user.name,
            email: state => state.user.email,
        })
    },
    props: {
        borderColor: Object,
    },
    data() {
        return {
            sidebarOpen: false,
            isDropDownOpen: false,
            listEditing: false
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
    }
};
</script>
