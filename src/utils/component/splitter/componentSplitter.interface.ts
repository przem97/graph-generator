import Component from "../../../models/component";

export default interface IComponentSplitter {
    split(component: Component): Component[];
}