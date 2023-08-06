import Edge from "../../../models/edge";
import Component from "../../../models/component";

export default interface IComponentMerger {
    merge(component1: Component, component2: Component, edge: Edge): Component | null;
    canBeMergedByEdge(component1: Component, component2: Component, edge: Edge): boolean;
}