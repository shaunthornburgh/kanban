<template>
    <div>
        <MainNavBar
            :borderColor="borderColor"
        ></MainNavBar>
        <div class="h-screen flex overflow-hidden" :class="[bgColorMain, textColor]">
            <UserBoardsMenu
                :borderColor="borderColor"
                :textColor="textColor"
                :circleBorderColor="circleBorderColor"
            ></UserBoardsMenu>
            <div class="flex flex-1 flex-col min-w-0 overflow-hidden" :class="bgColorMain">
                <div v-if="$apollo.loading">Loading...</div>
                <BoardNavBar
                    v-else
                    :board="board"
                    :borderColor="borderColor"
                    :textColor="textColor"
                    :buttonFocusColor="buttonFocusColor"
                    :buttonHoverColor="buttonHoverColor"

                ></BoardNavBar>
                <div class="flex-1 overflow-auto">
                    <main class="p-3 flex inline-flex overflow-hidden h-full space-x-3" v-if="board">
                        <List
                            :list="list"
                            v-for="list in board.lists"
                            :key="list.id"
                            @card-added="updateQueryCache($event)"
                            @card-deleted="updateQueryCache($event)"
                            @card-updated="updateQueryCache($event)"
                            @card-placement-updated="updateQueryCache($event)"
                            @list-deleted="updateQueryCache($event)"
                            @list-updated="updateQueryCache($event)"
                            @board-updated="updateQueryCache($event)"
                        ></List>
                        <ListAddEditor
                            v-if="listEditing"
                            :board="board.id"
                            @closed="listEditing=false"
                            @list-added="updateQueryCache($event)"
                        ></ListAddEditor>
                        <ListAddButton
                            v-if="!listEditing && canAddList"
                            @click="listEditing=true"
                        ></ListAddButton>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import List from "./List";
import ListAddEditor from "./ListAddEditor";
import BoardQuery from "../../graphql/BoardWithListsAndCards.gql";
import {
    EVENT_CARD_ADDED,
    EVENT_CARD_DELETED,
    EVENT_CARD_UPDATED,
    EVENT_LIST_ADDED,
    EVENT_LIST_DELETED,
    EVENT_LIST_UPDATED,
    EVENT_BOARD_UPDATED, EVENT_CARD_PLACEMENT_UPDATED
} from "../../constants";
import { mapState } from "vuex";
import UserBoards from "../../graphql/UserBoards.gql";
import {colorBorder, buttonFocusColor, buttonHoverColor, colorMainBoard, textColor, circleBorderColor} from "../../utils";
import UserBoardsMenu from "./UserBoardsMenu";
import ListAddButton from "./ListAddButton";
import BoardNavBar from "./BoardNavBar";
import MainNavBar from "../navigation/MainNavBar";

export default {
    components: {
        MainNavBar,
        BoardNavBar,
        ListAddButton,
        List,
        UserBoardsMenu,
        ListAddEditor
    },
    computed: {
        bgColorMain() {
            return {
                "bg-white": this.$apollo.loading,
                [colorMainBoard[this.board?.color]]: true
            }
        },
        borderColor() {
            return {
                "bg-white": this.$apollo.loading,
                [colorBorder[this.board?.color]]: true
            }
        },
        buttonFocusColor() {
            return {
                "bg-white": this.$apollo.loading,
                [buttonFocusColor[this.board?.color]]: true
            }
        },
        buttonHoverColor() {
            return {
                "bg-white": this.$apollo.loading,
                [buttonHoverColor[this.board?.color]]: true
            }
        },
        textColor() {
            return {
                "bg-white": this.$apollo.loading,
                [textColor[this.board?.color]]: true
            }
        },
        circleBorderColor() {
            return {
                "bg-white": this.$apollo.loading,
                [circleBorderColor[this.board?.color]]: true
            }
        },
        ...mapState({
            isLoggedIn: "isLoggedIn",
            userId: state => state.user.id,
            name: state => state.user.name,
            email: state => state.user.email,
            canAddList(state) {
                return this.board.owner.id === state.user.id
            },
        })
    },
    apollo: {
        board: {
            query: BoardQuery,
            variables() {
                return {
                    id: Number(this.$route.params.id)
                };
            }
        },
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
    methods: {
        updateQueryCache(event) {
            const data = event.store.readQuery({
                query: BoardQuery,
                variables: { id: Number(this.board.id) }
            });

            const listById = () =>
                data.board.lists.find(list => (list.id === event.listId));

            switch (event.type) {
                case EVENT_LIST_ADDED:
                    data.board.lists.push(event.data);
                    break;
                case EVENT_LIST_DELETED:
                    data.board.lists = data.board.lists.filter(
                        list => list.id !== event.data.id
                    );
                    break;
                case EVENT_LIST_UPDATED:
                    data.board.lists.filter(list => list.id === event.id).title =
                        event.data.title;
                    break;
                case EVENT_CARD_ADDED:
                    listById().cards.push(event.data);
                    break;
                case EVENT_CARD_UPDATED:
                    listById().cards.filter(card => card.id === event.data.id).title =
                        event.data.title;
                    break;
                case EVENT_CARD_PLACEMENT_UPDATED:
                    // Check if card list has changed
                    console.log(listById().cards.filter(card => card.id === event.data.id).length);
                    const processedItems = [];
                    const card = function (card) {
                        return card.id === event.data.id;
                    };

                    listById().cards.filter(card);
                        // listById().cards = listById().cards.filter(
                        //     card => card.id !== event.data.id
                        // );
                        // listById().cards.push(event.data);

                    // If so remove from old list and add to new list
                    // listById().cards.filter(card => card.id === event.data.id).list.id =
                    //     event.data.list.id;
                    // listById().cards.filter(card => card.id === event.data.id).order =
                    //     event.data.order;
                    break;
                case EVENT_CARD_DELETED:
                    listById().cards = listById().cards.filter(
                        card => card.id !== event.data.id
                    );
                    break;
                case EVENT_BOARD_UPDATED:
                    data.board.title = event.data.title;
                    break;
            }

            event.store.writeQuery({
                query: BoardQuery,
                data,
                variables: { id: Number(this.board.id) }
            });
        }
    },
    data() {
        return {
            sidebarOpen: false,
            isDropDownOpen: false,
            listEditing: false
        }
    }
};
</script>
