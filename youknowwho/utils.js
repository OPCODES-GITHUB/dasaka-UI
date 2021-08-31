const decodeBytecode = (n) => {
	let l = {};
   	l.R = {
        x: 4,
        I: 6,
        k: 8,
        C: 10,
        N: 12,
        z: 14
    };

    l.L = {
        T: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        U: 50
    }

    for (var t = l.L, r = t.T, i = t.U, o = r.length - i, e = [], u = 0; u < n.length;)
        for (var f = 0, c = 1;;) {
            var a = r.indexOf(n[u++]);
            if (f += c * (a % i), a < i) {
                e.push(0 | f);
                break
            }
            f += i * c, c *= o
        }
    return e
}

export { decodeBytecode };
