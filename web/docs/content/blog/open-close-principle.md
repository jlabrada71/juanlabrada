---
title: Open Close Principle
description: Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

slug: open-close-principle
tags: ['design principles']
---
# Open Close Principle

“Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.”
A class is closed, since it may be compiled, stored in a library, baselined, and used by client classes. But it is also open, since any new class may use it as parent, adding new features. When a descendant class is defined, there is no need to change the original or to disturb its clients.
But, inheritance introduces tight coupling if the subclasses depend on implementation details of their parent class.
It uses interfaces instead of superclasses to allow different implementations which you can easily substitute without changing the code that uses them. The interfaces are closed for modifications, and you can provide new implementations to extend the functionality of your software.
The main benefit of this approach is that an interface introduces an additional level of abstraction which enables loose coupling. The implementations of an interface are independent of each other and don’t need to share any code. If you consider it beneficial that two implementations of an interface share some code, you can either use inheritance or composition.

  