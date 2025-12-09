---
title: How to avoid Race Conditions and Memory Leaks in React useEffect
description: undefined
slug: how-to-avoid-race-conditions-and-memory-leaks-in-react-useeffect
tags: ['react','design patterns','system design','web design']
---
# How to avoid Race Conditions and Memory Leaks in React useEffect

## useEffect practices

Pass an empty array to ensure useEffect will run only once - the first time.

      useEffect(()=> { do something on initialization }, [] );

Pass a list of id to ensure the useEffect runs everytime the component with the given id changes.

      useEffect(()=> { do something when component with 'id' changes }, [id] );

Return a clean up function to do something when the component is being unmounted.

      useEffect(()=> { do something when component with 'id' changes  return () => { this is the clean up function }, [id] );

Possible race conditions:

- if the useEffect function tries to fetch something from a server and the component is unmounted before the fetch returns.

- if the useEffect function tries to fetch info for one id, then for another id, and the second arrives before the first, then the first arrives. In this case the component will show data for the first but is expected to have shown data for the second.

How to address these issues:

- Use the abortController to abort any pending server request.


## Use Abort Controller

```
useEffect(() => {
  let abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            signal: abortController.signal,
          });
      const newData = await response.json();
        setTodo(newData);
      }
      catch(error) {
         if (error.name === 'AbortError') {
          // Handling error thrown by aborting request
        }
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    }
  }, []);
```

  