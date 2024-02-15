import React from 'react';
import p5 from 'p5';
import { SketchPicker } from 'react-color'; // Importa el componente SketchPicker de react-color

class Sketch extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            backgroundColor: { r: 30, g: 30, b: 50 }, // Color de fondo predeterminado
            starColor: { r: 255, g: 255, b: 255, a: 0.6 } // Color de las estrellas predeterminado (blanco con opacidad)
        };
    }

    Sketch = (p) => {
        let particles = [];

        p.setup = () => {
            p.createCanvas(2000, 1000);
            for (let i = 0; i < 2000; i++) { // Aumentar el número de estrellas a 7000
                particles.push(new Particle(p, this.state.starColor));
            }
        };

        p.draw = () => {
            p.background(this.state.backgroundColor.r, this.state.backgroundColor.g, this.state.backgroundColor.b);
            let mouse = p.createVector(p.mouseX, p.mouseY);
            particles.forEach((particle) => {
                let force = p5.Vector.sub(mouse, particle.position);
                let distanceSq = force.magSq();
                force.normalize();
                if (distanceSq < 30000) { // Ajusta el área de interacción del mouse
                    force.mult(-0.01); // Reduce la fuerza aplicada por el mouse
                    particle.applyForce(force);
                }
                particle.update();
                particle.display();
            });
        };

        p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
            if (newProps.backgroundColor) {
                this.setState({ backgroundColor: newProps.backgroundColor });
            }
            if (newProps.starColor) {
                this.setState({ starColor: newProps.starColor });
            }
        };
    };

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current);
    }

    handleChangeCompleteBackground = (color) => {
        this.setState({ backgroundColor: color.rgb });
    };

    handleChangeCompleteStarColor = (color) => {
        this.setState({ starColor: color.rgb });
    };

    render() {
        return (
            <div>
                <div ref={this.myRef}></div>
                <div>
                    <h2>Color de fondo</h2>
                    <SketchPicker color={this.state.backgroundColor} onChangeComplete={this.handleChangeCompleteBackground} />
                </div>
                <div>
                    <h2>Color de las estrellas</h2>
                    <SketchPicker color={this.state.starColor} onChangeComplete={this.handleChangeCompleteStarColor} />
                </div>
            </div>
        );
    }
}

class Particle {
    constructor(p, color) {
        this.p = p;
        this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height));
        this.velocity = this.p.createVector();
        this.acceleration = this.p.createVector();
        this.maxSpeed = 4;
        this.size = this.p.random(2, 6);
        this.color = color; // Utiliza el color pasado como argumento
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        if (this.position.x > this.p.width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = this.p.width;
        if (this.position.y > this.p.height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = this.p.height;
    }

    display() {
        this.p.noStroke();
        this.p.fill(this.color.r, this.color.g, this.color.b, this.color.a * 255); // Ajusta el color con la opacidad
        this.drawStar(this.position.x, this.position.y, 5, this.size, this.size / 2);
    }

    drawStar(x, y, npoints, radius1, radius2) {
        let angle = this.p.TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        this.p.beginShape();
        for (let a = 0; a < this.p.TWO_PI; a += angle) {
            let sx = x + this.p.cos(a) * radius2;
            let sy = y + this.p.sin(a) * radius2;
            this.p.vertex(sx, sy);
            sx = x + this.p.cos(a + halfAngle) * radius1;
            sy = y + this.p.sin(a + halfAngle) * radius1;
            this.p.vertex(sx, sy);
        }
        this.p.endShape(this.p.CLOSE);
    }
}

export default Sketch;
