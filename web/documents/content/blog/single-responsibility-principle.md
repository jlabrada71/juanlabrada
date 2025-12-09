---
title: Single Responsibility Principle
description: A class should have one, and only one, reason to change.
slug: single-responsibility-principle
tags: []
---
# Single Responsibility Principle

We all know that requirements change over time. Each of them also changes the responsibility of at least one class. The more responsibilities your class has, the more often you need to change it. If your class implements multiple responsibilities, they are no longer independent of each other.
You need to change your class as soon as one of its responsibilities changes. That is obviously more often than you would need to change it if it had only one responsibility.
That might not seem like a big deal, but it also affects all classes or components that depend on the changed class. Depending on your change, you might need to update the dependencies or recompile the dependent classes even though they are not directly affected by your change. They only use one of the other responsibilities implemented by your class, but you need to update them anyway.
The single responsibility principle provides another substantial benefit. Classes, software components and microservices that have only one responsibility are much easier to explain, understand and implement than the ones that provide a solution for everything. This reduces the number of bugs, improves your development speed, and makes your life as a software developer a lot easier.
However, make sure to not oversimplify your code. Some developers take the single responsibility principle to the extreme by creating classes with just one function. Later, when they want to write some actual code, they have to inject many dependencies which makes the code very unreadable and confusing.

Therefore, the single responsibility principle is an important rule to make your code more understandable but don’t use it as your programming bible. Use common sense when developing code. There is no point in having multiple classes that just contain one function.

What is the responsibility of your class/component/microservice?

If your answer includes the word “and”, you’re most likely breaking the single responsibility principle. Then it’s better to take a step back and rethink your current approach. There is most likely a better way to implement it.


  