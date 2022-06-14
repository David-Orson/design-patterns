interface Product {
    operation(): string 
}

abstract class Creator {
    public abstract factoryMethod(): Product

    public someOperation(): string {
        const product = this.factoryMethod()
        return `Creator: The same creator's code has just worked with ${product.operation()}`
    }
}

class ConcreteCreator1 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}'
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}'
    }
}

const clientCode = (creator: Creator) => {
    console.log('Client I am not aware of the creator class, but it still works.')
    console.log(creator.someOperation());
}

console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
console.log('')

// functional version

const creator = () => {
    const factoryMethod = ():any => {return};

    const someOperation = (operation: any) => {
        return `Creator: The same creator's code has just worked with ${operation()}`
    }

    return someOperation
}

const concreteCreator3 = () => {
    const someOperation = creator()
    const factoryMethod = () => concreteProduct3() 
    return { someOperation, factoryMethod }
}

const concreteProduct3 = () => {
    const operation = (): string => {
        return '{Result of the ConcreteProduct3}'
    }
    return operation
}

const concreteCreator4 = () => {
    const someOperation = creator()
    const factoryMethod = () => concreteProduct4() 
    return { someOperation, factoryMethod }
}

const concreteProduct4 = () => {
    const operation = (): string => {
        return '{Result of the ConcreteProduct4}'
    }
    return operation
}

const functionalCode = (creator: any) => {
    console.log('Client I am not aware of the creator function, but it still works.')
    console.log(creator.someOperation(creator.factoryMethod()));
}

console.log('App: Launched with the concreteCreator3.')
functionalCode(concreteCreator3())
console.log('')

console.log('App: Launched with the concreteCreator4.')
functionalCode(concreteCreator4())
console.log('')


