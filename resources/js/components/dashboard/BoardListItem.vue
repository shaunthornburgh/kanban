<template>
    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <router-link :to="{ name: 'board', params: { id } }" class="block">
            <div class="flex-1 p-6 flex flex-col justify-between" :class="getBoardColor(color)">
            <div class="flex-1">
                <h3 class="text-xl leading-7 font-semibold text-gray-500">
                    {{ title }}
                </h3>
            </div>
            <div class="mt-6 flex justify-between">
                <div class="">
                    <p class="text-sm leading-5 font-medium text-gray-500">
                        <a href="#" class="hover:underline">
                            Last updated:
                        </a>
                    </p>
                    <div class="flex text-sm leading-5 text-gray-500">
                        <time datetime="2020-03-16">
                            Mar 16, 2020
                        </time>
                    </div>
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
        </div>
        </router-link>
    </div>
</template>

<script>

import {colorMainBoard} from "../../utils";

export default {
    props: {
        title: String,
        id: Number,
        color: String
    },
    methods: {
        getBoardColor(color) {
            return [colorMainBoard[this.color]];
        }
    }
}
</script>
