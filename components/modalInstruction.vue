<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-show="open">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <InformationCircleIcon class="h-6 w-6 text-blue-700" aria-hidden="true" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Instruction help
              </h3>
              <div class="mt-2">
                <template v-if="instruction">
                  <p  class="text-sm text-gray-500">
                    {{ instruction.name }}
                  </p>
                  <vue-code-highlight language="javascript"><pre>{{ instruction.func }}</pre></vue-code-highlight>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"  v-on:click="close()">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { InformationCircleIcon } from '@vue-hero-icons/outline'
import { component as VueCodeHighlight } from 'vue-code-highlight';

import { processor } from "~/youknowwho/instructions";

export default {
  components: {
    InformationCircleIcon,
    VueCodeHighlight,
  },
  data() {
    return {
      instruction: {},
    }
  },
  computed: {
    open () {
      return this.$store.state.code.help;
    },
    instructionId () {
      return this.$store.state.code.helpInstruction;
    },
  },
  watch: {
    instructionId (instructionId) {
      this.instruction = processor[instructionId];
    }
  },
  methods: {
    close() {
      this.closeHelp();
    },
    ...mapMutations({
      openHelp: 'code/openHelp',
      closeHelp: 'code/closeHelp',
    })
  }
};
</script>
