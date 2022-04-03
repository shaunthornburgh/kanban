<template>
    <div class="flex-shrink-1 ml-3 relative w-64 lg:ml-0">
        <input
            type="text"
            placeholder="Enter board title..."
            :value="value"
            class="block w-full rounded-md border border-gray-400 pl-2 pr-4 py-2 text-sm text-gray-900 placeholder-gray-600"
            ref="board"
            @keyup.esc="closed"
            @keypress.enter="saved"
            @input="$emit('input', $event.target.value)"
        />
    </div>
</template>

<script>
export default {
    props: ["value"],
    mounted() {
        this.$refs.board.focus();
    },
    methods: {
        closed() {
            this.$emit("closed");
        },
        saved() {
            this.$emit("saved");
        }
    }
}
</script>
