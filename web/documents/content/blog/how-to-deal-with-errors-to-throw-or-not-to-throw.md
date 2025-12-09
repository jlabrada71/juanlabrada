---
title: How to deal with errors? To throw or not to throw
description: undefined
slug: how-to-deal-with-errors-to-throw-or-not-to-throw
tags: ['refactoring']
---
# How to deal with errors? To throw or not to throw

Use try catch to deal with errors that doesn't depend on your input to the function call.
-----------------------------------------------------------------------------------------------------------------
try {
    fn();
}
catch(e) {
  something unexpected happened
}
If the function is part of the class Interface, validate preconditions and throw on missing
----------------------------------------------------------------------------------------------------------------------
If the function is not part of the class Interface(private), validate parameters before calling the function. And take actions.
-----------------------------------------------------------------------------------------------------------------------
Allow the exceptions to surface, this serves the purpose the finding errors.
----------------------------------------------------------------------------------------------------------------------
When an exception is thrown a previous validation is missing
-------------------------------------------------------------------------------


Best practices
-------------------------------------------------------------------------------
Don't
try {
  away myAsyncFn()
} catch (e) {
   console.log(e);
}

Do
await myAsyncFn().catch(console.error);


Alternative:
Never throw:   https://github.com/supermacro/neverthrow



  