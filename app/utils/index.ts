export const appendArgs = (fn: CallableFunction, ...staticArgs: any[]) => (
    (...args: any[]): any => (fn(...args, ...staticArgs))
);