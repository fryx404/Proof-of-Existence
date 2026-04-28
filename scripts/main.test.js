const { Particle } = require('./main');

describe('Particle', () => {
    let mockCanvas;

    beforeEach(() => {
        mockCanvas = {
            width: 800,
            height: 600
        };
    });

    test('should initialize with a life value', () => {
        const particle = new Particle(mockCanvas);
        expect(particle.life).toBeGreaterThan(0);
        expect(particle.life).toBeLessThanOrEqual(1);
    });

    test('should reset when life expires', () => {
        const particle = new Particle(mockCanvas);
        // We need to spy on the prototype because reset is called in constructor
        // or just spy on the instance after construction.
        const resetSpy = jest.spyOn(particle, 'reset');

        particle.life = 0;
        particle.update();

        expect(resetSpy).toHaveBeenCalled();
    });

    test('should reset when out of bounds (left)', () => {
        const particle = new Particle(mockCanvas);
        const resetSpy = jest.spyOn(particle, 'reset');

        particle.x = -1;
        particle.vx = 0; // Prevent movement from bringing it back in
        particle.update();

        expect(resetSpy).toHaveBeenCalled();
    });

    test('should reset when out of bounds (right)', () => {
        const particle = new Particle(mockCanvas);
        const resetSpy = jest.spyOn(particle, 'reset');

        particle.x = mockCanvas.width + 1;
        particle.vx = 0;
        particle.update();

        expect(resetSpy).toHaveBeenCalled();
    });

    test('should reset when out of bounds (top)', () => {
        const particle = new Particle(mockCanvas);
        const resetSpy = jest.spyOn(particle, 'reset');

        particle.y = -1;
        particle.vy = 0;
        particle.update();

        expect(resetSpy).toHaveBeenCalled();
    });

    test('should reset when out of bounds (bottom)', () => {
        const particle = new Particle(mockCanvas);
        const resetSpy = jest.spyOn(particle, 'reset');

        particle.y = mockCanvas.height + 1;
        particle.vy = 0;
        particle.update();

        expect(resetSpy).toHaveBeenCalled();
    });

    test('should not reset when within bounds and has life', () => {
        const particle = new Particle(mockCanvas);
        const resetSpy = jest.spyOn(particle, 'reset');

        particle.x = 100;
        particle.y = 100;
        particle.vx = 0;
        particle.vy = 0;
        particle.life = 0.5;
        particle.decay = 0.01;

        particle.update();

        expect(resetSpy).not.toHaveBeenCalled();
        expect(particle.life).toBeCloseTo(0.49);
    });
});
