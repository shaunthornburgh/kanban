<template>
    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div class="h-full p-6 flex flex-col bg-white justify-center items-center">
            <button
                @click="$emit('click')"
                class="flex text-gray-500 items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                <h3 class="text-xl leading-7 font-semibold ml-2">
                    Create Board
                </h3>
            </button>
        </div>
    </div>
</template>
