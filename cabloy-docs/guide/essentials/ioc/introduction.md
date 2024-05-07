# Introduction

We know that `IOC` is an effective architecture design for system decoupling and a supporting tool for large-scale business system development.

## Bean Containers

`Bean containers` are the basic component for implementing `IOC`, and there are two types of bean containers in Cabloy-Front:

1. `app bean container`: During system initialization, a unique global bean container will be automatically created
2. `ctx bean container`: When creating Vue component instances, the system will create a bean container for each of them

## Bean Classification

There are two types of beans in Cabloy-Front:

1. `store bean`: Create bean instances in the app bean container, making them globally unique and thus replacing the functionality of `pinia`
2. `local bean`: Create a bean instance in the ctx bean container, so it is only valid in the Vue component instance it belongs to
