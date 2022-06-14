"use strict";
class ConcreteFactory1 {
    createProductA() {
        return new ConcreteProductA1();
    }
    createProductB() {
        return new ConcreteProductB1();
    }
}
class ConcreteFactory2 {
    createProductA() {
        return new ConcreteProductA2();
    }
    createProductB() {
        return new ConcreteProductB2();
    }
}
class ConcreteProductA1 {
    usefulFunctionA() {
        return 'The result of the product A1.';
    }
}
class ConcreteProductA2 {
    usefulFunctionA() {
        return 'The result of the product A2.';
    }
}
class ConcreteProductB1 {
    usefulFunctionB() {
        return 'The result of the product B1.';
    }
    anotherUsefulFunctionB(collaborator) {
        const result = collaborator.usefulFunctionA();
        return `The result of the B1 collaborating with the (${result})`;
    }
}
class ConcreteProductB2 {
    usefulFunctionB() {
        return 'The result of the product B2.';
    }
    anotherUsefulFunctionB(collaborator) {
        const result = collaborator.usefulFunctionA();
        return `The result of the B1 collaborating with the (${result})`;
    }
}
function clientCode(factory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();
    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1());
console.log('');
console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());
console.log('');
const concreteFactory3 = () => {
    const createProductA = () => {
        return concreteProductA3();
    };
    const createProductB = () => {
        return concreteProductB3();
    };
    return { createProductA, createProductB };
};
const concreteProductA3 = () => {
    const usefulFunctionA = () => {
        return 'The restult of the product A3.';
    };
    return { usefulFunctionA };
};
const concreteProductB3 = () => {
    const usefulFunctionB = () => {
        return 'The result of the product B3.';
    };
    const anotherUsefulFunctionB = (collaborator) => {
        const result = collaborator.usefulFunctionA();
        return `The result of the B3 collaborating with the (${result})`;
    };
    return { usefulFunctionB, anotherUsefulFunctionB };
};
const functionalClientCode = (factory) => {
    const productA = factory.createProductA();
    const productB = factory.createProductB();
    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
};
console.log('Client: Testing client code with the first functional factory type...');
functionalClientCode(concreteFactory3());
