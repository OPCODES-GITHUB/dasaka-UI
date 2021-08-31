<template>
  <div class="container mx-auto py-6 px-4">
<!--     <div class="mb-4 flex justify-between items-center">
      <div class="flex-1 pr-4">
        <div class="relative">
          <input type="search"
            class="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
            placeholder="Search...">
          <div class="absolute top-0 left-0 inline-flex items-center p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </div>
        </div>
      </div>
    </div>
 -->
    <modalInstruction />
    <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
      <div class="relative m-10">
        <div>
          <input type="range" v-model="boundariesDown" v-bind:max="max" class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">
          <input type="range" v-model="boundariesUp" v-bind:max="max" class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">
          <div class="relative z-10 h-2">
            <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
            <div class="absolute z-20 top-0 bottom-0 rounded-md bg-green-300" v-bind:style="{ left: minthumb + '%', width: maxthumb - minthumb + '%' }"></div>
            <div class="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2" v-bind:style="{ left: minthumb + '%' }"></div> 
            <div class="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2"  v-bind:style="{ left: maxthumb + '%' }"></div>
          </div>
        </div>
        <div class="flex items-center justify-between pt-5 space-x-4 text-sm text-gray-700">
          <div>
            <input type="text" v-model="boundariesDown"
              class="w-24 px-3 py-2 text-center border border-gray-200 rounded-lg bg-gray-50 focus:border-yellow-400 focus:outline-none">
          </div>
          <div>
            <input type="text" v-model="boundariesUp"
              class="w-24 px-3 py-2 text-center border border-gray-200 rounded-lg bg-gray-50 focus:border-yellow-400 focus:outline-none">
          </div>
        </div>
      </div>

      <table v-if="instructions" class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
        <thead>
          <tr class="text-left">
              <th class="bg-gray-100 sticky w-4 top-0 border-b border-gray-200 px-1 pl-4 py-1 text-gray-600 font-bold tracking-wider uppercase text-xs">Offset</th>
              <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">Instruction</th>
              <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">Parameter</th>
<!--               <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">Number of writes</th> -->
              <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">Write to</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-dashed border-t border-gray-200" v-for="instruction in instructions" :key="instruction.offset">
            <td class="text-gray-700 px-1 pl-4 py-1">
              {{ instruction.offset }}</span>
            </td>
            <td class="text-gray-700 px-1 pl-4 py-1">
              <InformationCircleIcon v-on:click="openModal(instruction.instruction)" class="cursor-pointer text-xs inline-flex bg-blue-200 text-blue-700 rounded-full float-left mr-2"/> {{ instruction.name }}
            </td>
            <td class="text-gray-700 px-1 pl-4 py-1">
             {{ instruction.parameters }}
            </td>
<!--             <td class="text-gray-700 px-1 pl-4 py-1">
              {{ instruction.writes }}
            </td> -->
            <td class="text-gray-700 px-1 pl-4 py-1">
              {{ instruction.write_to }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { InformationCircleIcon } from "@vue-hero-icons/outline";
import _ from 'lodash';

export default {
  components: {
    InformationCircleIcon,
  },
  data() {
    return {
      "max": 0,
      "instructions": [],
    }
  },
  computed: {
    minthumb () {
      return this.boundaries[0] / this.max * 100;
    },
    maxthumb () {
      return this.boundaries[1] / this.max * 100;
    },
    boundariesDown: {
      get () {
        return this.boundaries[0];
      },
      set (first) {
        this.updateBoundaries([first, this.boundaries[1]])
      }
    },
    boundariesUp: {
      get () {
        return this.boundaries[1];
      },
      set (second) {
        this.updateBoundaries([this.boundaries[0], second])
      }
    },
    ...mapState('code', ['boundaries'])
  },
  watch: {
    boundaries (boundaries) {
      this.filterInstructions(boundaries);
    }
  },
  methods: {
    ...mapMutations({
      openHelp: "code/openHelp",
      updateBoundaries: 'code/updateBoundaries',
    }),
    openModal (instruction) {
      this.openHelp(instruction);
    },
    filterInstructions: _.debounce(function (boundaries) {
      if (!boundaries) return;
      this.instructions = this.$store.state.code.disassemble.filter((o) => {
        return o.offset >= boundaries[0] && o.offset <= boundaries[1];
      });
    }, 1000)
  },
  created () {
    if (this.$store.state.code.disassemble.length === 0) return this.$router.push('/');
  },
  mounted () {
    this.max = this.$store.state.code.disassemble[this.$store.state.code.disassemble.length - 1].offset;
    this.filterInstructions(this.boundaries);
  }
};
</script>

<style>
input[type=range]::-webkit-slider-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
  
/* @apply w-6 h-6 appearance-none pointer-events-auto; */
}
</style>