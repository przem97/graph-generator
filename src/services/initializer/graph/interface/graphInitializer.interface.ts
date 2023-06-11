import Component from '../../../../models/component'

export default interface IGraphInitializer {
    initializeGraph(): Array<Component>;
}