---
title: Good reads on architectural patterns
description: This is a list of usefull links that helps you have a consistent idea on different Architectural Patterns.
createdAt: '12/10/2024'

slug: good-design-patterns-reads
tags: ['architectural patterns']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'architectural patterns, reads'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2022 Juan Labrada'
    - name: 'publish'
      content: '12/10/2024'
---

# Purpose of this post

With so many articles on the internet about architectural patterns it is difficult to decide which one is right about some topics. For example, if you look articles about MVC the model-view-controller, you can find literally thousands of them providing different perspectives and different implementations. This makes very hard to understand what the MVC pattern really is and how it should be implemented.

I'll try to collect a list of articles that clearly differenciate the canonical version of those patterns and to point out the key elements of them.

I will focus this list on the following architectural patterns:
- MVC  : Model View Controller
- MVP  : Model View Presenter
- MVI  : Model View Intent
- MVVM : Model View ViewModel
- VIPER: View Interactor Presenter Entity Router

# Key elements of MVC
- Both the Views and the Controller depends on the Model
- The View shows data from the Model
- The Controller request changes to the Model
- The Controller organize the Views 
- The Model notify its observers (Views and Controllers) about the changes it commits.

# Key elements of MVP
- In the MVP the Controller is changed by the Presenter.
- Structurally it means that the Views now depends on the Presenter, not on the Model, and the Presenter depends on both the Views and the Model.
- This means that the Views sends user interactions to the Presenter, and show the data when requested by the Presenter.
- In turn, the Presenter requests changes to the Model, and gets notified of changes by the Model.
- The biggest difference between MVP and MVC is that Presenter updates the View via an interface, where the View can open the information it wants to Presenter through the interface.
- One benefit of this change in the architecture is that the application functionality can be tested without any need to test the View. That makes the testing a little bit easier than with the original MVC model. 

# Key elements of MVI
- MVI was designed with reactive programming in mind.
- Unidirectional data flow: means data flows in a single direction — from the Model to the View and back as Intents. This ensures clarity, predictability, and ease of maintenance in the architecture. Model->View->User->Intent->Model
- Separation of concerns: means distinct roles for Model, View, and Intent components. The Model manages the state, the View handles UI rendering, and the Intent captures and communicates user actions.
- Immutability: ensures that the Model’s state remains unchanged once set. This guarantees predictability, eliminates unexpected side effects, and promotes a stable and reliable application state.
- Model: Holds all the app’s data and logic, like a single source of truth. It’s never directly changed, but updated by creating new states.
- View: View is the UI renderer, displaying the app’s state to the user without handling business logic. It updates based on the Model’s state changes.
- Intent: Represents user actions or the app itself, like button clicks or text input, it’s all about what the user wants to do in the app. The View catches these intentions and sends them to the Model, which then takes actions (like updating the app’s status)

# Key elements of MVVM
 At the core of this pattern is the ViewModel, which is a special type of model that represents the UI state of the app. It contains properties that detail the state of each and every UI control. For example, the current text for a text field, or whether a specific button is enabled. It also exposes the actions the view can perform, like button taps or gestures.

 It can help to think of the ViewModel as the model-of-the-view.

 The relationships between the three components of the MVVM pattern are simpler than the MVC equivalents, following these strict rules:

- The View has a reference to the ViewModel, but not vice-versa.
- The ViewModel has a reference to the Model, but not vice-versa.
- The View has no reference to the Model or vice-versa.

If you break these rules, you’re doing MVVM wrong!

# Key elements of VIPER
- ViewController: The View use the data from the presenter and the user interactions are channelled to the Presenter.

- Presenter: It is the bridge between View and Interactor. This layer should not contain UI or bussines logic operations. It is like a two ways adapter. 

- Interactor: We can say that it acts as the VM in the MVVM design pattern. It is the part of the application that we call Bussines Logic. UI operations are not performed here. Fetch, Update etc. operations take place here.

- Entity: It is the Model part of the application. Data models related to the application are found here. This part cooperates only with Interactor.

- Router: This layer is the layer that allows us to determine when the application’s pages are shown.


# Main challenge to solve
Behind all these patterns is the key rule that the more abstract element should not depend on less abstract ones. For example, the Model should not depend on the controller or view in the MVC pattern, as the Model is the abstraction of the Business and the View is the abtraction of the Device used to interact with the Business.

This rule is derived from the Dependency Inversion Principle.
The DIP states that:
- High-level modules should not depend on low-level modules
- Both high-level and low-level modules should depend on abstractions
- Abstractions should not depend on details, but details should depend on abstractions.

This makes easy to initiate changes in the most concret elements like the view, and make changes in the model, since they propagate in the right direction.

But rule comes with a problem: How the less abstract elements know about changes in the more abstract ones? How the View is aware of changes in the Model and shows them timely?

The way the original MVC pattern solved this problem was with the help of the observer pattern, which allowed the most abstract element (the Model) to notify its observers(the Views) about any changes.

The following patterns solve the issue with a more or less sofisticated implementation of the observer, like defining reactive properties, or using some kind of reactive programming, in some frameworks by implementing different kinds of data binding, and the last method is by creating communication protocols, 

# List of insightful articles about architectural patterns

- [History of MVC pattern](https://dev.to/dmitry-kabanov/model-view-controller-mvc-origins-of-design-pattern-1677#:~:text=The%20original%20version%20of%20MVC%20was%20developed%20by%20Trygve%20Reenskaug%20in%201979.&text=his%20webpage%20at%20the%20University,Views%2DControllers%2C%2010%20December%201979)

- [MVI Architecture Pattern in Android](https://medium.com/@mohammedkhudair57/mvi-architecture-pattern-in-android-0046bf9b8a2e)

- [MVI a Comprehensive Overview](https://www.geeksforgeeks.org/model-view-intent-mvi-pattern-in-reactive-programming-a-comprehensive-overview/)

- [MVVM with Combine](https://www.kodeco.com/4161005-mvvm-with-combine-tutorial-for-ios)

- [Understanding VIPER pattern](https://medium.com/@pinarkocak/understanding-viper-pattern-619fa9a0b1f1)

- [Getting started with the VIPER Architecture Pattern](https://www.kodeco.com/8440907-getting-started-with-the-viper-architecture-pattern)
