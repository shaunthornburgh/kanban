<template>
    <li>
        <a href="#" class="block p-5 rounded-md shadow bg-white">
            <div class="flex justify-between">
                <p class="text-sm font-medium leading-snug text-gray-900">{{ card.title }}</p>
                <span>
                    <img
                        class="rounded-full h-6 w-6"
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=144&h=144&q=80" />
                </span>
            </div>
            <div class="flex justify-between items-baseline">
                <p class="text-sm text-gray-600">
                    Sep 14
                </p>
                <div class="mt-2">
                    <span class="px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded">
                        <svg class="h-2 w-2 text-teal-500" viewBox="0 0 8 8" fill="currentColor">
                            <circle cx="4" cy="4" r="3"/>
                        </svg>
                        <span class="ml-2 text-sm font-medium text-teal-900">Feature request</span>
                    </span>
                </div>
            </div>
        </a>
    </li>
</template>

<script>
export default {
    props: {
        card: Object
    }
}
</script>
