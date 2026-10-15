import { createPreInitializationQueue } from "./pre-initialization-queue";

const person = {
  firstName: "",
  lastName: "",
  age: 0,
  initialized: false,
  async getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  async getAge() {
    return this.age;
  },
};

const personProxy = createPreInitializationQueue(
  person,
  ["getFullName", "getAge"],
  "initialized",
);

personProxy.getFullName().then(console.log);
personProxy.getAge().then(console.log);
personProxy.firstName = "John";
personProxy.lastName = "Doe";
personProxy.age = 30;
personProxy.initialized = true;
