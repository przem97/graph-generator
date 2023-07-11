import Component from '../../../models/component';
import ComponentInitializer from './componentInitializer';
import IComponentInitializer from './componentInitializer.interface';

describe('should initialize given number of components', () => {
    it('should initialize 7 comonents', () => {
        // given
        const totalComponents = 7;
        let componentInitializer: IComponentInitializer;

        // when
        componentInitializer = new ComponentInitializer(totalComponents);
        let components: Component[] = componentInitializer.initializeComponents();

        // then
        expect(components.length).toEqual(7);
    });

    it('should initialize -1 comonents', () => {
        // given
        const totalComponents = -1;
        let componentInitializer: IComponentInitializer;

        // when
        componentInitializer = new ComponentInitializer(totalComponents);
        let components: Component[] = componentInitializer.initializeComponents();

        // then
        expect(components.length).toEqual(0);
    });

    it('should initialize 0 comonents', () => {
        // given
        const totalComponents = 0;
        let componentInitializer: IComponentInitializer;

        // when
        componentInitializer = new ComponentInitializer(totalComponents);
        let components: Component[] = componentInitializer.initializeComponents();

        // then
        expect(components.length).toEqual(0);
    });

    it('should initialize 1220 comonents', () => {
        // given
        const totalComponents = 1220;
        let componentInitializer: IComponentInitializer;

        // when
        componentInitializer = new ComponentInitializer(totalComponents);
        let components: Component[] = componentInitializer.initializeComponents();

        // then
        expect(components.length).toEqual(1220);
    });
});