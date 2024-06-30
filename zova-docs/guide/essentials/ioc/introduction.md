# Introduction

We know that `IOC`(Inversion of Control) is an effective architectural design for system decoupling, and is also a supporting tool for the development of large-scale business systems

## Bean Containers

`Bean containers` are the basic component for implementing `IOC`, and there are two types of bean containers in Zova:

1. `app bean container`: During system initialization, a unique global bean container will be automatically created
2. `ctx bean container`: When creating Vue component instances, the system will create a bean container for each of them

## Bean Types

There are two types of beans in Zova:

1. `Anonymous bean`: The class decorated with `@Local` is an `anonymous bean`. This type of bean is only used within the module, there is no naming conflict, and it is easy to define and use

2. `Named bean`: Except for `@Local`, the classes decorated by the other decorator functions are `named beans`. Zova provides a naming convention for such beans, which can avoid naming conflicts and facilitate cross-module usage

## Injection Scope

In Zova, `Named Bean` has three injection scopes:

1. `app`: Inject in the app bean container

2. `ctx`: Inject in the ctx bean container to which the current Vue component instance belongs

3. `new`: Always create a new bean instance
