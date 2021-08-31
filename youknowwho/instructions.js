const processor = [];
const addInstructionToProcessor = (instructionName, instructionId, parameterNumber, func, writes = 0) => {
  processor[instructionId] = {
    parameter: parameterNumber,
    func: func.toString().trim(),
    name: instructionName,
    writes: writes,
  }
}

addInstructionToProcessor('NOP', 50, 0, function(state) { });

addInstructionToProcessor('PUSH_PARAM', 37, 2, function(state, t, r) {
    state.stack[t] = r;
});

addInstructionToProcessor('CREATE_BRANCH', 44, 3, function(state, r, t, i) {
    let newFunction = function() {

            const newState = createState();

            newState.v[3] = arguments;
            for (var t = 0; t < arguments.length; t++) newState.v[t + 4] = arguments[t];

            return newState.v[1] = {
                u: this,
                v: function() {
                    return [0]
                },
                h: function() {
                    return [0]
                },
                $: l(state.v[1], d),
                a: newFunction
            }, newState.eip = r, executeCode(newState), newState.v[2]
        };
    try {
        Object.defineProperty(newFunction, "length", {
            value: i
        }), Object.defineProperty(newFunction, "name", {
            value: t
        })
    } catch (n) {
        debugger; for (var u = !1, f = "", c = 0; c < i; c++) u ? f += ",a".concat(c) : (f += "a".concat(c), u = !0);
        console.error("(function(fn){" + "return function ".concat(t, "(").concat(f, "){return fn.apply(this, arguments)}") + "})"); e = eval("(function(fn){" + "return function ".concat(t, "(").concat(f, "){return fn.apply(this, arguments)}") + "})")(e)
    }

    newFunction[seed] = {
        A: r,
        $: l(state.v[1], d),
        F: newFunction
    };

    writeTo(state, newFunction);
}, 1);

// Seems to replace a value on the stack if it the index "t" exists
// Seems to be used to place a BRANCH function on the stack
addInstructionToProcessor('REPLACE_INDEX_IF_EXISTS_BY', 39, 2, function(state, t, r) {
    if (t in state.stack) return state.stack[t] = r;

    if (t in state.stack) return state.stack[t] = r;

    // "Beat cybercriminals at their own game ;)"
    throw '¯\\_(ツ)_/¯'
});


// Replace EIP
// It's jumping somewhere
addInstructionToProcessor('JUMP_TO', 34, 1, function(state, t) {
    state.eip = t;
});

addInstructionToProcessor('STORE_EMPTY_OBJECT', 22, 0, function(state) {
    writeTo(state, {})
}, 1);

addInstructionToProcessor('CREATE_FUNC_ARGV', 23, 0, function(state) {
    writeTo(state, [])
}, 1);

addInstructionToProcessor('STORE_REGEX', 24, 2, function(state, t, r) {
  writeTo(state, new RegExp(t, r))
}, 1);

addInstructionToProcessor('EXECUTE_BRANCH', 20, 3, function(state, t, r, i) {
    if (void 0 === t && IsBrowserNotIE && (t = window), r[seed] && r[seed].F === r) {
        state.v = [r[seed].A, {
            u: t,
            a: r,
            v: l(state.v, h),
            h: l(h(), h),
            f: [],
            $: r[seed].$
        }, void 0, function() {
            return arguments
        }.apply(void 0, guessTypeAndCast(i))];

        state.eip = state.v[0];

        for (var o = 0; o < i.length; o++) state.v.push(i[o])

    } else if (r.toString) {

        var temp = r.apply(t, i);
        state.v[2] = temp;
    }
    else {
        var e = !1,
            u = g();
        if (u)
            for (var f = Object.keys(u.console), c = 0; c < f.length; c++)
                if (r === u.console[f[c]]) {
                    e = !0, state.v[2] = r(i);
                    break
                } e || (state.v[2] = r.apply(t, i))
    }
}, 0);


addInstructionToProcessor('STORE_FROM_GLOBAL', 40, 1, function(state, t) {
    for (let r = state.v[1]; r; r = r.$())
        if (t in state.stack) return writeTo(state, state.stack[t]), void 0;
    throw 'Â¯\\_(ãƒ„)_/Â¯'
}, 1);

addInstructionToProcessor('JUMP_EQ', 35, 2, function(state, t, r) {
  t ? r : state.eip = r;
}, 0);

addInstructionToProcessor('JUMP_NOT_EQ', 36, 2, function(state, t, r) {
  t ? state.eip = r : r;
}, 0);

addInstructionToProcessor('UNKNOW_38', 38, 1, function(state, t) {
  var r = state.v[1], i = r.a; r.f[t] = i
}, 0);

addInstructionToProcessor('CONTEXT_THIS', 41, 0, function(state) {
  writeTo(state, state.v[1].u)
}, 1);

addInstructionToProcessor('THROW_ERROR', 42, 1, function(state, t) {
  m(state, t)
}, 0);

addInstructionToProcessor('RETURN', 43, 1, function(state, t) {
  p(state, t)
}, 0);

addInstructionToProcessor('UNKNOW_45', 45, 1, function(state, t) {
  state.v[1].j = t
}, 0);

addInstructionToProcessor('UNKNOW_46', 46, 1, function(state, t) {
  state.v[1].S = t
}, 0);

addInstructionToProcessor('UNKNOW_47', 47, 0, function(state) {
  writeTo(state, state.M && state.M.O)
}, 1);

addInstructionToProcessor('UNKNOW_48', 48, 0, function(state) {
  state.M = void 0
}, 0);

addInstructionToProcessor('UNKNOW_49', 49, 0, function(state) {
  if (state.M) m(state, state.M.O);
  else {
    var t = state.v[1];
    t.w && p(state, t.w.O)
  }
}, 0);

addInstructionToProcessor('WRITE_POLYFILL', 51, 0, function(state) {
  writeTo(state, t.inj0)
}, 1);

addInstructionToProcessor('WRITE_ES6', 52, 0, function(state) {
  writeTo(state, t.inj1)
}, 1);

addInstructionToProcessor('APPLY_FUNCTION', 21, 2, function(state, t, r) {
  let l = r.slice();
  l.unshift(), writeTo(state, new(Function.bind.apply(t, l)))
}, 1);

addInstructionToProcessor('WEIRD_INSTRUCTION', 25, 1, function(state, t) {
  var r = [];
  for (var i in t) r.push(i);
  writeTo(state, r)
}, 1);

addInstructionToProcessor('STORE_IS_EQ', 26, 2, function(state, t, r) {
  writeTo(n, t == r)
}, 1);

addInstructionToProcessor('STORE_IS_STRICT_EQ', 27, 2, function(state, t, r) {
   writeTo(state, t === r)
}, 1);

addInstructionToProcessor('STORE_IS_EQ', 28, 2, function(state, t, r) {
   writeTo(state, t == r)
}, 1);

addInstructionToProcessor('STORE_IS_NOT_STRICT_EQ', 29, 2, function(state, t, r) {
   writeTo(state, t !== r)
}, 1);

addInstructionToProcessor('STORE_IS_LESS', 30, 2, function(state, t, r) {
  writeTo(state, t < r)
}, 1);

addInstructionToProcessor('STORE_IS_BIGGER', 31, 2, function(state, t, r) {
  writeTo(state, r > t)
}, 1);

addInstructionToProcessor('STORE_IS_LESS_EQ', 32, 2, function(state, t, r) {
  writeTo(state, r <= t)
}, 1);

addInstructionToProcessor('STORE_IS_BIGGER_EQ', 33, 2, function(state, t, r) {
  writeTo(state, t >= r)
}, 1);

addInstructionToProcessor('STORE_ADD', 0, 2, function(state, t, r) {
  writeTo(n, t + r)
}, 1);

addInstructionToProcessor('STORE_SUB', 1, 2, function(state, t, r) {
  writeTo(n, t - r)
}, 1);

addInstructionToProcessor('STORE_MUL', 2, 2, function(state, t, r) {
  writeTo(n, t * r)
}, 1);

addInstructionToProcessor('STORE_DIV', 3, 2, function(state, t, r) {
  writeTo(n, t / r)
}, 1);

addInstructionToProcessor('STORE_MOD', 4, 2, function(state, t, r) {
  writeTo(n, t % r)
}, 1);

addInstructionToProcessor('STORE_BOOL_INV', 5, 1, function(state, t) {
  writeTo(state, !t)
}, 1);

addInstructionToProcessor('STORE_BIN_LEFT_SHIFT', 6, 2, function(state, t, r) {
  writeTo(state, t >> r)
}, 1);

addInstructionToProcessor('STORE_BIN_RIGHT_SHIFT', 7, 2, function(state, t, r) {
  writeTo(state, t << r)
}, 1);

addInstructionToProcessor('STORE_BIN_TRIPLE_LEFT_SHIFT', 8, 2, function(state, t, r) {
  writeTo(state, t >>> r)
}, 1);

addInstructionToProcessor('STORE_BIN_OR', 9, 2, function(state, t, r) {
  writeTo(state, t | r)
}, 1);

addInstructionToProcessor('STORE_BIN_AND', 10, 2, function(state, t, r) {
  writeTo(state, t & r)
}, 1);

addInstructionToProcessor('STORE_POW', 11, 2, function(state, t, r) {
  writeTo(state, t ^ r)
}, 1);

addInstructionToProcessor('MOVE_VALUE', 12, 1, function(state, r) {
    writeTo(state, r)
}, 1);

addInstructionToProcessor('STORE_WINDOW_OBJECT', 13, 0, function(state) {
  writeTo(state, window)
}, 1);

addInstructionToProcessor('STORE_VALUE_OF_PARAMETER', 14, 2, function(state, t, r) {
  writeTo(state, t[r]);
}, 1);

addInstructionToProcessor('WRITE_TO', 15, 3, function(state, r, t, i){
    r[t] = i;
})

addInstructionToProcessor('STORE_IS_VALUE_IN', 16, 2, function(state, t, r) {
  writeTo(state, t in r)
}, 1);

addInstructionToProcessor('STORE_DELETE', 17, 2, function(state, t, r) {
  writeTo(state, delete t[r])
}, 1);

addInstructionToProcessor('STORE_INSTANCE_OF', 18, 2, function(state, t, r) {
  writeTo(state, t instanceof r)
}, 1);

addInstructionToProcessor('STORE_TYPE_OF', 19, 1, function(state, t) {
  writeTo(state, typeof t)
}, 1);

console.log(processor.length)
export { processor };
