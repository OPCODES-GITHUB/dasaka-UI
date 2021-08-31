export const state = () => ({
  bytecode: '',
  instructions: [],
  disassemble: [],
  functions: [],
  boundaries: [500, 1000],
  help: false,
  helpInstruction: 0,
})

export const mutations = {
  insertBytecode(state, bytecode) {
    state.bytecode = bytecode;
  },
  insertInstructions(state, instructions) {
    state.instructions = instructions;
  },
  insertDisassemble(state, disassemble) {
    state.disassemble = disassemble;
  },
  insertFunction(state, functions) {
    state.functions = functions;
  },
  updateBoundaries(state, boundaries) {
    state.boundaries = boundaries;
  },
  openHelp(state, instruction) {
    state.helpInstruction = instruction;
    state.help = true;
  },
  closeHelp(state, instruction) {
    state.help = false;
  }
}
