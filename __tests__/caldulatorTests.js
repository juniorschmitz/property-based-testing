const fc = require('fast-check');
const Calculator = require('../calculator');

describe('calculator', () => {
    let calculator = new Calculator();
    it('should add numbers', () => {
        expect(calculator.add(1, 2)).toBe(3);
    });

    it('should pass commutative property', () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), (a, b) => {
                expect(calculator.add(a, b)).toBe(b + a);
            })
        );
    });

    it('should pass associative property', () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) => {
                expect(calculator.add(a, calculator.add(b, c))).toBe(calculator.add(calculator.add(a, b), c));
            })
        );
    });

    it('should pass identity property', () => {
        fc.assert(
            fc.property(fc.integer(), (a) => {
                expect(calculator.add(a, 0)).toBe(a);
            })
        );
    });

    it('should pass inverse property', () => {
        fc.assert(
            fc.property(fc.integer(), (a) => {
                expect(calculator.add(a, -a)).toBe(0);
            })
        );
    });

    it('should pass distributive property', () => {
        fc.assert(
            fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) => {
                expect(calculator.multiply(a, calculator.add(b, c))).toBe(calculator.add(calculator.multiply(a, b), calculator.multiply(a, c)));
            })
        );
    });
});