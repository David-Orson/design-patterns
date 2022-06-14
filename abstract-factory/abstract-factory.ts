interface AbstractFactory {
    createProductA(): AbstractProductA;

    createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}

class ConcreteFactory2 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA2();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB2();
    }
}

interface AbstractProductA {
    usefulFunctionA(): string
}

class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A1.';
    }
}

class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A2.';
    }
}

interface AbstractProductB {
    usefulFunctionB(): string

    anotherUsefulFunctionB(collaborator: AbstractProductA): string
}

class ConcreteProductB1 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'The result of the product B1.';
    }

    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B1 collaborating with the (${result})`;
    }
}

class ConcreteProductB2 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'The result of the product B2.';
    }

    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B1 collaborating with the (${result})`;
    }
}

function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}

console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1())
console.log('')

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());
console.log('')

const concreteFactory3 = () => {
    const createProductA = () => {
        return concreteProductA3()
    }

    const createProductB = () => {
        return concreteProductB3()
    }

    return {createProductA, createProductB}
}

const concreteProductA3 = () => {
    const usefulFunctionA = (): string => {
        return 'The restult of the product A3.';
    }

    return { usefulFunctionA }
}

const concreteProductB3 = () => {
    const usefulFunctionB = (): string => {
        return 'The result of the product B3.';
    }

    const anotherUsefulFunctionB = (collaborator: any): string => {
        const result = collaborator.usefulFunctionA();
        return `The result of the B3 collaborating with the (${result})`;
    }

    return { usefulFunctionB, anotherUsefulFunctionB }
}

const functionalClientCode = (factory: any) => {
    const productA = factory.createProductA()
    const productB = factory.createProductB()

    console.log(productB.usefulFunctionB())
    console.log(productB.anotherUsefulFunctionB(productA))
}

console.log('Client: Testing client code with the first functional factory type...');
functionalClientCode(concreteFactory3())
