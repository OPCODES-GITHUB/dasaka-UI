import { processor } from './instructions';

const getPosOfOffset = (instructions, offset) => {
  let counter = 0;
  while (true) {
    let i = instructions[counter];
    if (i == undefined) return false;

    if (i.offset === offset) return counter;
    counter++;
  }

  return -1;
}

const createFakeState = () => {
  return  {
    v: {},
    eip: 0,
    stack: [],
  };
}

const variablesGenerator = {
    x: 4,
    I: 6,
    k: 8,
    C: 10,
    N: 12,
    z: 14
};
const alphabetObject = {
    T: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    U: 50
};

const getParameter = (state, instructionArray) => {
  var instruction = instructionArray[state.eip++];

  // if the instruct is odd
  // it means that the variable value is in fact the instruction shifted by 1
  // This why sometime we have some hugeeee number that are clearly out of range of the processor array
  if (1 & instruction) return instruction >> 1;

  // if the instruction == 4
  if (instruction === variablesGenerator.x) {
    var i = instructionArray[state.eip++],
        o = instructionArray[state.eip++],
        e = 2147483648 & i ? -1 : 1,
        u = (2146435072 & i) >> 20,
        f = (1048575 & i) * Math.pow(2, 32) + (o < 0 ? o + Math.pow(2, 32) : o);
    return 2047 === u ? f ? NaN : 1 / 0 * e : (0 !== u ? f += Math.pow(2, 52) : u++, e * f * Math.pow(2, u - 1075))
  }

  if (instruction !== variablesGenerator.I) {
    return instruction === variablesGenerator.k ||
    instruction !== variablesGenerator.C &&
    (instruction === variablesGenerator.N ? null : instruction !== variablesGenerator.z ? `$STORAGE[${instruction >> 5}]` : void 0);
  }

  for (var c = '', a = instructionArray[state.eip++], v = 0; v < a; v++) {
    var s = instructionArray[state.eip++];
    c += String.fromCharCode(4294967232 & s | 39 * s & 63)
  }
  return c;
}

const disassembleCode = (instructionArray) => {
  const state = createFakeState();
  const disassembleCode = [];

  for (;;) {
    const instructionId = instructionArray[state.eip++];

    // Let's check if we implemented the instruction in our custom processor
    if (!processor[instructionId]) {
      break;
      throw new Error(`Instruction ${instructionId} not found`);
    }

    const instruction = processor[instructionId];

    // The instruciton exsits, nice !
    // Let's check how many parameters does the instruction takes
    const numberOfParameters = instruction.parameter;
    let parameters = [];

    // Retrieving each parameter
    for (let i = 0; i < numberOfParameters; i++) {
      parameters.push(getParameter(state, instructionArray));
    }

    let write_to = '';
    if (instruction.writes > 0) {
      write_to = `$STORAGE[${instructionArray[state.eip] >> 5}]`;
    }

    // EXECUTE_BRANCH write into $STORAGE[2]
    if (instructionId === 20) {
      write_to = '$STORAGE[2]';
    }

    state.eip += instruction.writes;

    disassembleCode.push({
      instruction: instructionId,
      name: instruction.name,
      parameters: parameters,
      writes: instruction.writes,
      write_to: write_to,
      offset: state.eip
    });
  }

  return disassembleCode;
}

const retrieveFunction = (disassembleCode) => {
  let counter = 0;
  const functions = [];

  while (true){
    let i = disassembleCode[counter];

    if (i == undefined) break;

    if (i.instruction === 44) {
      const jump = disassembleCode[getPosOfOffset(disassembleCode, i.parameters[0])];
      functions.push({
        name: `func${counter++}`,
        start: i.offset,
        end: jump.parameters[0],
      });
    }

    counter++;
  }

  return functions;
}

export { disassembleCode, retrieveFunction };
