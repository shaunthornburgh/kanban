<template>
    <div class="w-80 pb-2">
        <div class="pt-3 px-3">
            <input
                type="text"
                class="rounded-md shadow py-2 px-2 mb-2 outline-none w-full text-gray-900 text-sm bg-white resize-none"
                ref="list"
                placeholder="Enter list title..."
                @keyup.esc="closed"
                @keypress.enter="saved"
                :value="value"
                @input="$emit('input', $event.target.value)"
            />
            <div class="flex">
                <button
                    @click="saved"
                    class="text-sm text-white mr-1 px-2 py-2 font-medium bg-gray-700 rounded-md hover:bg-gray-600 cursor pointer"
                >
                    <span>{{ label }}</span>
                </button>
                <button
                    @click="closed"
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
export default {
    props: ["value", "label"],
    mounted() {
        this.$refs.list.focus();
    },
    methods: {
        closed() {
            this.$emit("closed");
        },
        saved() {
            this.$emit("saved");
        }
    }
};
</script>
