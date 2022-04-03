<template>
    <div>
        <MainNavBar
            :borderColor="borderColor"
        ></MainNavBar>
        <div class="max-w-7xl mx-auto px-3.5 sm:px-4 lg:px-6">
            <div class="mt-6">
                <h1 class="text-xl font-bold text-gray-500">Your Boards</h1>
            </div>
            <div v-if = "$apollo.loading">
                Data is loading
            </div>
            <div v-else>
                <div class="mt-6 grid gap-5 max-w-lg mx-auto lg:grid-cols-4 lg:max-w-none">
                    <BoardListItem
                        v-bind="userBoards"
                        v-for="(board, index) in userBoards"
                        :key="index"
                        :title="board.title"
                        :id="getBoardId(board.id)"
                        :color="board.color"
                    ></BoardListItem>
                    <AddBoardButton
                        @click="showModal=true"
                    ></AddBoardButton>
                </div>
            </div>
        </div>
        <BoardAddModal
            :show="showModal"
            @closed="showModal=false"
        ></BoardAddModal>
    </div>
</template>

<script>
import MainNavBar from "../navigation/MainNavBar";
import BoardListItem from "./BoardListItem";
import {colorBorder} from "../../utils";
import UserBoards from "../../graphql/UserBoards.gql";
import {mapState} from "vuex";
import AddBoardButton from "./AddBoardButton";
import BoardAddModal from "./../board/BoardAddModal";

export default {
    components: {
        AddBoardButton,
        MainNavBar,
        BoardListItem,
        BoardAddModal
    },
    computed: {
        borderColor() {
            return {
                "bg-white": this.$apollo.loading,
                [colorBorder[this.board?.color]]: true
            }
        },
        ...mapState({
            isLoggedIn: "isLoggedIn",
            userId: state => state.user.id,
        })
    },
    apollo: {
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
        getBoardId: function(id) {
            return Number(id);
        }
    },
    data() {
        return {
            showModal: false
        }
    }
}
</script>
