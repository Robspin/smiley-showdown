"use client"
import { ColoredStat, SmileyFace } from '@/components/smiley-card'
import { Button } from '@/components/ui/button'
import { Smiley } from '@/utils/smileys/config'
import { TypographyH4 } from '@/components/typography'
import RarityText from '@/components/typography/rarity-text'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'

library.add(far)

const bgStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
}

type HudProps = {
    type: 'Player' | 'Enemy'
    smiley: Smiley
    health: number
}

function Hud({ type, smiley, health }: HudProps) {
    return (
        <>
            <div className="relative mx-2">
                <div style={{ width: `${String(health)}%` }} className={`rounded h-2 bg-green-400 mb-2 absolute transition`}/>
                <div className="w-full rounded h-2 bg-red-400 mb-2 "/>
            </div>
            <div className="w-full border-slate-500 border rounded-xl h-full p-4" style={bgStyle}>
                <div className="flex justify-between">
                    <TypographyH4>
                        {type} smiley:
                    </TypographyH4>
                    <RarityText rarity={smiley.rarity}>
                        <TypographyH4>
                            {smiley.name}
                        </TypographyH4>
                    </RarityText>
                </div>
                <div>
                    <ul className="text-sm mt-4">
                        <ColoredStat title="Health" value={smiley.baseStats.health} rarity={smiley.rarity}/>
                        <ColoredStat title="Strength" value={smiley.baseStats.strength} rarity={smiley.rarity}/>
                        <ColoredStat title="Defense" value={smiley.baseStats.defense} rarity={smiley.rarity}/>
                    </ul>
                </div>
            </div>
        </>
    )
}

const playerAttackConfig = {
    player: {
        from: {
            x: 0,
            opacity: 1
        },
        to: {
            x: 140,
            opacity: 0.5
        },
        reverse: true
    },
    enemy: {
        from: {
            x: 0,
            opacity: 1
        },
        to: {
            x: 30,
            opacity: 0.2
        },
        reverse: true,
        delay: 100
    }
}

const enemyAttackConfig = {
    enemy: {
        from: {
            x: 0,
            opacity: 1
        },
        to: {
            x: -140,
            opacity: 0.5
        },
        reverse: true
    },
    player: {
        from: {
            x: 0,
            opacity: 1
        },
        to: {
            x: -30,
            opacity: 0.2
        },
        reverse: true,
        delay: 100
    }
}

type Props = {
    sceneData: {
        playerSmileys: Smiley[]
        enemySmileys: Smiley[]
    }
}

export default function BattleScene({ sceneData }: Props) {
    const playerSmiley = sceneData.playerSmileys[0]
    const enemySmiley = sceneData.enemySmileys[0]

    const [battleData, setBattleData] = useState({
        playerSmiley: {
            health: 100
        },
        enemySmiley: {
            health: 100
        }
    })

    const [playerSprings, playerSpringsApi] = useSpring(() => ({
        from: { x: 0, opacity: 1 }
    }))

    const [enemySprings, enemySpringsApi] = useSpring(() => ({
        from: { x: 0, opacity: 1 }
    }))

    const [damageSprings, damageApi] = useSpring(() => ({
        from: { opacity: 0, y: 0 }
    }))

    const attack = (type: 'Player' | 'Enemy') => {
        if (type === 'Player') {
            playerSpringsApi.start(playerAttackConfig.player)
            enemySpringsApi.start(playerAttackConfig.enemy)

            setTimeout(() => {
                setBattleData((prev) => ({
                    ...prev,
                    enemySmiley: {
                        health: prev.enemySmiley.health - 10
                    }
                }))
            }, 100)
        } else if (type === 'Enemy') {
            playerSpringsApi.start(enemyAttackConfig.player)
            enemySpringsApi.start(enemyAttackConfig.enemy)

            setTimeout(() => {
                setBattleData((prev) => ({
                    ...prev,
                    playerSmiley: {
                        health: prev.playerSmiley.health - 10
                    }
                }))
            }, 100)
        }

        damageApi.start({
            from: {
                opacity: 1,
                y: 0
            },
            to: {
                opacity: 0,
                y: 20
            },
            delay: 100,
            config: {
                duration: 500
            }
        })
    }

    return (
        <>
            <div className="grid grid-cols-9 rounded-xl overflow-hidden">
                <div className="w-full flex flex-col col-span-4">
                    <div className="w-full flex justify-center pt-16 pb-32">
                        <animated.div style={playerSprings}>
                            <SmileyFace smiley={playerSmiley} className="h-40 w-40"/>
                        </animated.div>
                    </div>
                    <Hud type="Player" smiley={playerSmiley} health={battleData.playerSmiley.health}/>
                </div>
                <div>
                    <animated.div className="text-center font-extrabold text-4xl tracking-tighter text-red-500" style={damageSprings}>
                        200
                    </animated.div>
                </div>
                <div className="w-full flex flex-col col-span-4">
                    <div className="w-full flex justify-center pt-16 pb-32">
                        <animated.div style={enemySprings}>
                            <SmileyFace smiley={enemySmiley} className="h-40 w-40"/>
                        </animated.div>
                    </div>
                    <Hud type="Enemy" smiley={enemySmiley} health={battleData.enemySmiley.health}/>
                </div>
            </div>
            <div className="py-4 flex justify-between">
                <Button onClick={() => attack('Player')}>Player attack</Button>
                <Button onClick={() => attack('Enemy')}>Enemy attack</Button>
            </div>
        </>
)
}