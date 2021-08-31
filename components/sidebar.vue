<template>
  <div class="md:flex flex-col md:flex-row md:min-h-screen w-64">
    <div class="flex flex-col w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
      <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
        <a class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Dasaka UI</a>
      </div>
      <nav class="block flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">

        <p class="flex font-semibold text-sm text-gray-400 px-4 my-4 mb-0">Functions</p>
        <div class="relative">
          <ul v-for="func in functions" :key="func.start">
            <li class="block px-4 py-1 ml-2 text-sm font-medium text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline cursor-pointer" v-on:click="showFunction(func)">{{ func.name }}</li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      "functions": [],
    }
  },
  methods: {
    showFunction(func) {
      this.updateBoundaries([func.start, func.end]);
    },
    ...mapMutations({
      updateBoundaries: 'code/updateBoundaries',
    })
  },
  created () {
    this.functions = this.$store.state.code.functions;
  }
};
</script>
