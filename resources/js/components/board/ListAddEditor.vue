<template xmlns="http://www.w3.org/1999/html">
    <ListEditor v-model="title" @closed="closed" @saved="addList" label="Add List"></ListEditor>
</template>

<script>
import { EVENT_LIST_ADDED } from "../../constants";
import ListEditor from "./ListEditor";
import ListAdd from "../../graphql/ListAdd.gql";

export default {
    components: {ListEditor},
    props: ["board"],
    data() {
        return {
            title: null
        };
    },
    methods: {
        startEditing() {
            this.editing = true;
            this.$nextTick(() => this.$refs.title.focus());
        },
        addList() {
            const self = this;

            this.$apollo.mutate({
                mutation: ListAdd,
                variables: {
                    title: this.title,
                    board: this.board
                },
                update(store, {data: { listAdd } }) {
                    self.$emit("list-added", {
                        store,
                        data: listAdd,
                        type: EVENT_LIST_ADDED
                    });
                    self.closed();
                }
            });
        },
        closed() {
            this.$emit('closed');
        }
    }
};
</script>
