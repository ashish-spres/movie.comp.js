/*  
  The debaounce function takes an input function and delays it by a 'delay'numbers of microseconds.
   The function is implemented returning the passed function after a specified delay. '...args' accepts any
   number of arguments passed. Initially any timeout set previously is cleared by subsequent calls to the
   debounce function. Only after a set amount of time has passed without the call, the settimeout call is 
   invoked. 
   Apply method, applys the argument to the passes function such that 'func().apply(null, args)' is equivalent to 
   func(arg1, arg2, arg3) if three arguments are passed to the function. 
*/
const debounce = (func, delay = 1000) => {
    let timeOutId;

    return (...args) => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout( () => {
            func.apply(null, args);
        }, delay);
    };
};