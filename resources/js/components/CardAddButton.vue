    <template>
        <button
            @click="addCard"
            class="flex w-full items-center pl-2 pr-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span class="ml-1">Add card</span>
        </button>
    </template>

    <script>
    import CardAdd from "./../graphql/CardAdd.gql";
    import BoardQuery from "./../graphql/BoardWithListsAndCards.gql";

    export default {
        methods: {
            addCard() {
                this.$apollo.mutate({
                    mutation: CardAdd,
                    variables: {
                        title: 'Added through mutation',
                        listId: 1,
                        order: 1
                    },
                    update(store, {data: {cardAdd} }) {
                        const data = store.readQuery({
                            query: BoardQuery,
                            variables: { id: 1 }
                        });

                        data.board.lists.find(list => (list.id = 1)).cards.push(cardAdd);

                        store.writeQuery({query: BoardQuery, data });
                    }
                });
            }
        }
    }
    </script>
