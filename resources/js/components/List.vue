<template>
    <div class="flex-shrink-0 flex flex-col w-80 bg-gray-100 rounded-md">
        <h3 class="flex-shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-gray-700">{{ list.title }}</h3>
        <div class="flex-1 min-h-0 overflow-y-auto">
            <ul class="pt-1 pb-3 px-3 space-y-3">
                <Card v-for="card in list.cards" :key="card.id" :card="card"></Card>
                <CardAddButton></CardAddButton>
            </ul>
        </div>
    </div>
</template>

<script>
import Card from "./Card";
import CardAddButton from "./CardAddButton";

export default {
    components: {
        CardAddButton,
        Card
    },
    props: {
        list: Object
    }
}
</script>
