// @ts-nocheck
"use client"
import React, { useEffect, useRef } from 'react'
import * as Matter from 'matter-js'

const MatterExample: React.FC = () => {
    const sceneRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sceneRef.current) return

        const Example = () => {
            var Engine = Matter.Engine,
                Render = Matter.Render,
                Runner = Matter.Runner,
                Composites = Matter.Composites,
                Common = Matter.Common,
                MouseConstraint = Matter.MouseConstraint,
                Mouse = Matter.Mouse,
                Composite = Matter.Composite,
                Bodies = Matter.Bodies;


            var engine = Engine.create(),
                world = engine.world

            var render = Render.create({
                element: sceneRef.current,
                engine: engine,
                options: {
                    width: 800,
                    height: 600,
                    wireframes: false
                    // showAngleIndicator: true
                }
            })

            Render.run(render)

            var runner = Runner.create()
            Runner.run(runner, engine)



            var stack = Composites.stack(20, 20, 10, 5, 0, 0, function(x, y) {
                const size = Common.random(25, 50)

                console.log(size, size / 50)

                return Bodies.circle(x, y, size, {
                    friction: 0.001,
                    frictionAir: 0.01,
                    restitution: 0.8,
                    render: {
                        sprite: {
                            texture: '/awesome.png',
                            xScale: size / 40,
                            yScale: size / 40
                        },
                    }
                })
            });

            Composite.add(world, stack);

            Composite.add(world, [
                Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
                Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
                Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
                Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
            ]);

            var mouse = Mouse.create(render.canvas),
                mouseConstraint = MouseConstraint.create(engine, {
                    mouse: mouse,
                    constraint: {
                        stiffness: 0.2,
                        render: {
                            visible: false
                        }
                    }
                });

            Composite.add(world, mouseConstraint);

            render.mouse = mouse;

            Render.lookAt(render, {
                min: { x: 0, y: 0 },
                max: { x: 800, y: 600 }
            })

            return () => {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
                Render.stop(render);
            }
        };

        const cleanup = Example();

        return cleanup
    }, [])

    return <div ref={sceneRef} />
}

export default MatterExample
