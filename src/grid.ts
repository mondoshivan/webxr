AFRAME.registerComponent('comp-grid', {
    schema: {
        color: { default: "green" }
    },
    init: function () {
        let el = this.el;
        let data = this.data;

        let width = el.components.geometry.data.width;
        let height = this.el.components.geometry.data.height;
        let rotation = this.el.components.rotation.data;
        let position = this.el.components.position.data;

        let scene = document.querySelector("a-scene");

        for (let i = width * -0.5; i < width * 0.5; i++) {
            let gridLine = document.createElement("a-entity");
            gridLine.setAttribute('position', {
                x: position.x,
                y: position.y,
                z: i
            }); 
            gridLine.setAttribute('material', `color: ${data.color}`);
            gridLine.setAttribute('geometry', 'width', width);
            gridLine.setAttribute('geometry', 'height', '0.01');
            gridLine.setAttribute('geometry', 'depth', '0.01');
            gridLine.setAttribute('rotation', rotation);
            scene.appendChild(gridLine);
        }

        for (let i = height * -0.5; i < height * 0.5; i++) {
            let gridLine = document.createElement("a-entity");
            gridLine.setAttribute('position', {x: i, y: position.y, z: position.z});
            gridLine.setAttribute('material', `color: ${data.color}`);
            gridLine.setAttribute('geometry', 'width', '0.01');
            gridLine.setAttribute('geometry', 'height', height);
            gridLine.setAttribute('geometry', 'depth', '0.01');
            gridLine.setAttribute('rotation', rotation);
            scene.appendChild(gridLine);
        }
    },
    update: function () {},
    tick: function () {},
    remove: function () {},
    pause: function () {},
    play: function () {}
});