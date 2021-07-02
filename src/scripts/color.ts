import AFRAME from 'aframe';

AFRAME.registerComponent('color-component', {
    schema: {
        color: {default: "blue"}
    },

    init: function () {
        let el = this.el;
        let data = this.data;

        el.setAttribute('material', `color: ${data.color}`);
    }
});