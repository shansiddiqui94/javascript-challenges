const stackMachineCalculator = (instructions) => {
    if (!instructions.length) {
        return -1
    }
    const stack = [];
    const push = n => stack.push(Number(n));
    var error = false;
    const pop = () => {
        if (stack.length) { return stack.pop() }
        return (error = true, -1);
    }
    const ops = {
        POP: pop,
        DUP() {
            const dup = pop();
            push(dup);
            push(dup);
        },
        "+" () { push(pop() + pop()) },
        "-" () { push(pop() - pop()) }
    };
    for (const item of instructions.split(" ")) {
        if (!isNaN(item)) {
            push(item);
        } else {
            const op = ops[item];
            if (op) { op() }
            if (error) { return -1 }
        }
    }
    return pop();
}
console.log(stackMachineCalculator("123+45**+"));
console.log(stackMachineCalculator("4 10 -"));
console.log(stackMachineCalculator("13 DUP 4 POP 5 DUP + DUP + -"));
