import { FC, useState, useEffect } from 'react'

import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadAll } from '@tsparticles/all'
import type { Container, Engine } from '@tsparticles/engine'

import clsx from 'clsx'

import styles from './Background.module.scss'

interface BackgroundProps {
  mode?: string
  quantity?: number
  pushQuantity?: number
  particleColor?: string
  linkColor?: string
  delay?: boolean
}

const Background: FC<BackgroundProps> = ({
  mode = 'bubble',
  quantity = 100,
  pushQuantity = 3,
  particleColor = '#ffffff',
  linkColor = '#ffffff',
  delay = true,
}) => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadAll(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      console.log(container)
    }
  }

  return (
    <Particles
      className={clsx(styles.particles, delay && styles.delay)}
      particlesLoaded={particlesLoaded}
      options={{
        autoPlay: true,
        fullScreen: {
          enable: true,
          zIndex: 1,
        },
        detectRetina: true,
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode,
            },
            resize: {
              delay: 0.5,
              enable: true,
            },
          },
          modes: {
            attract: {
              distance: 200,
              duration: 0.4,
              easing: 'ease-out-quad',
              factor: 1,
              maxSpeed: 50,
              speed: 1,
            },
            bubble: {
              distance: 300,
              duration: 2,
              mix: false,
              opacity: 0.8,
              size: 30,
            },
            connect: {
              distance: 80,
              links: {
                opacity: 0.5,
              },
              radius: 60,
            },
            grab: {
              distance: 200,
              links: {
                blink: false,
                consent: false,
                opacity: 1,
              },
            },
            push: {
              quantity: pushQuantity,
            },
            remove: {
              quantity: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: 'ease-out-quad',
            },
            slow: {
              factor: 3,
              radius: 200,
            },
          },
        },
        particles: {
          bounce: {
            horizontal: {
              value: 1,
            },
            vertical: {
              value: 1,
            },
          },
          collisions: {
            absorb: {
              speed: 2,
            },
            bounce: {
              horizontal: {
                value: 1,
              },
              vertical: {
                value: 1,
              },
            },
            enable: false,
            mode: 'bounce',
            overlap: {
              enable: true,
              retries: 0,
            },
          },
          color: {
            value: particleColor,
            animation: {
              h: {
                enable: false,
                speed: 1,
                sync: true,
              },
              s: {
                enable: false,
                speed: 1,
                sync: true,
              },
              l: {
                enable: false,
                speed: 1,
                sync: true,
              },
            },
          },
          move: {
            angle: 90,
            attract: {
              enable: false,
              distance: 200,
              rotate: {
                x: 600,
                y: 1200,
              },
            },
            decay: 0,
            direction: 'none',
            drift: 0,
            enable: true,
            gravity: {
              acceleration: 9.81,
              enable: false,
              inverse: false,
              maxSpeed: 50,
            },
            path: {
              clamp: true,
              delay: {
                value: 0,
              },
              enable: false,
            },
            outModes: {
              default: 'out',
            },
            random: false,
            size: false,
            speed: 2,
            spin: {
              acceleration: 0,
              enable: false,
            },
            straight: false,
            trail: {
              enable: false,
              length: 10,
              fill: {},
            },
            vibrate: false,
            warp: false,
          },
          number: {
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
            limit: {
              mode: 'delete',
              value: 0,
            },
            value: quantity,
          },
          opacity: {
            value: {
              min: 0.1,
              max: 0.5,
            },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
              startValue: 'random',
            },
          },
          reduceDuplicates: false,
          shape: {
            type: 'char',
            options: {
              char: {
                value: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                font: 'Roboto',
                style: '',
                weight: '400',
                fill: true,
              },
            },
          },
          size: {
            value: 10,
            animation: {
              enable: false,
              speed: 10,
              sync: false,
            },
          },
          stroke: {
            width: 1,
            color: {
              value: '#ffffff',
            },
          },
          life: {
            count: 0,
            delay: {
              value: 0,
              sync: false,
            },
            duration: {
              value: 0,
              sync: false,
            },
          },
          links: {
            blink: false,
            color: {
              value: linkColor,
            },
            consent: false,
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        zLayers: 100,
      }}
    />
  )
}

export default Background
