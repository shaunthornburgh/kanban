<template>
    <div>
        <textarea
            class="rounded-md shadow py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
            placeholder="Please enter a title for this card"
            :value="value"
            ref="card"
            @keyup.esc="closed"
            @keyup.enter="saved"
            @input="$emit('input', $event.target.value)"
        ></textarea>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["value", "label"],
    mounted() {
        this.$refs.card.focus();
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
