import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        console.log(didMount.current)
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useDidMountEffect;