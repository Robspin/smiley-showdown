"use client"
import { ColoredStat, SmileyFace } from '@/components/smiley-card'
import { Button } from '@/components/ui/button'
import { Smiley } from '@/utils/smileys/config'
import { TypographyH4 } from '@/components/typography'
import RarityText from '@/components/typography/rarity-text'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/pro-solid-svg-icons/faXmark'
import { useRouter } from 'next/navigation'

library.add(far)
// @ts-ignore
library.add(fas)

const bgStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
}

type HudProps = {
    type: 'PLAYER' | 'ENEMY'
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
            <div className="w-full border-slate-500 border rounded-xl h-full p-4 bg-slate-700" style={bgStyle}>
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

function SmileyRosterCard({ smiley, alive }: { smiley: Smiley, alive: boolean }) {
    return (
        <div className="border-slate-500 border rounded-2xl overflow-hidden flex justify-center items-center relative">
            <SmileyFace className={`w-12 h-12 ${!alive && 'opacity-50'}`} smiley={smiley}/>
            {!alive && <FontAwesomeIcon icon={faXmark as IconProp} className="absolute h-14 w-14 text-red-600" />}
        </div>
    )
}

function SmileyRoster({ smileys, activeSmileyIndex, className }: { smileys: Smiley[], activeSmileyIndex: number, className?: string }) {
    return (
        <div className={`flex gap-2 mt-2 ${className}`}>
            {smileys.map((s, i) => <SmileyRosterCard smiley={s} key={i} alive={activeSmileyIndex <= i} />)}
        </div>
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

const calculateHealth = (baseHealth: number) => baseHealth * 50
const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min
const calculateAttack = (baseStrength: number) => Math.round(baseStrength * getRandomNumber(0.8, 1.2) * 14)

type Props = {
    sceneData: {
        playerSmileys: Smiley[]
        enemySmileys: Smiley[]
    }
}

export default function BattleScene({ sceneData }: Props) {
    const [battleData, setBattleData] = useState({
        playerSmiley: {
            activeSmileyIndex: 0,
            health: calculateHealth(sceneData.playerSmileys[0].baseStats.health),
            healthPercentage: 100
        },
        enemySmiley: {
            activeSmileyIndex: 0,
            health: calculateHealth(sceneData.enemySmileys[0].baseStats.health),
            healthPercentage: 100
        }
    })
    const [attackDamage, setAttackDamage] = useState(0)
    const [attacker, setAttacker] = useState<'PLAYER' | 'ENEMY'>('PLAYER')
    const [gameLoop, setGameLoop] = useState<'RUNNING' | 'PLAYER_VICTORY' | 'ENEMY_VICTORY'>('RUNNING')

    const attackerRef = useRef(attacker)
    attackerRef.current = attacker

    const battleDataRef = useRef(battleData)
    battleDataRef.current = battleData

    const gameLoopRef = useRef(gameLoop)
    gameLoopRef.current = gameLoop

    const playerSmiley = sceneData.playerSmileys[battleDataRef.current.playerSmiley.activeSmileyIndex]
    const enemySmiley = sceneData.enemySmileys[battleDataRef.current.enemySmiley.activeSmileyIndex]

    const [playerSprings, playerSpringsApi] = useSpring(() => ({
        from: { x: 0, opacity: 1 }
    }))

    const [enemySprings, enemySpringsApi] = useSpring(() => ({
        from: { x: 0, opacity: 1 }
    }))

    const [damageSprings, damageApi] = useSpring(() => ({
        from: { opacity: 0, y: 0 }
    }))

    const attack = (type: 'PLAYER' | 'ENEMY') => {
        let damage = 0

        if (type === 'PLAYER') {
            playerSpringsApi.start(playerAttackConfig.player)
            enemySpringsApi.start(playerAttackConfig.enemy)

            damage = calculateAttack(sceneData.playerSmileys[battleDataRef.current.playerSmiley.activeSmileyIndex].baseStats.strength)

            setAttackDamage(damage)

            setTimeout(() => {
                setBattleData((prev) => {
                    const newEnemyHealth = prev.enemySmiley.health - damage
                    const newEnemyHealthPercentage = (newEnemyHealth / calculateHealth(sceneData.enemySmileys[prev.enemySmiley.activeSmileyIndex].baseStats.health)) * 100

                    if (newEnemyHealth < 1) {
                        return {
                            ...prev,
                            enemySmiley: {
                                activeSmileyIndex: prev.enemySmiley.activeSmileyIndex + 1 > 4 ? 4 : prev.enemySmiley.activeSmileyIndex + 1,
                                health: calculateHealth(sceneData.enemySmileys[prev.enemySmiley.activeSmileyIndex + 1 > 4 ? 4 : prev.enemySmiley.activeSmileyIndex + 1].baseStats.health),
                                healthPercentage: 100
                            }
                        }
                    } else {
                        return {
                            ...prev,
                            enemySmiley: {
                                ...prev.enemySmiley,
                                health: newEnemyHealth,
                                healthPercentage: newEnemyHealthPercentage
                            }
                        }
                    }
                })
            }, 100)
        } else if (type === 'ENEMY') {
            playerSpringsApi.start(enemyAttackConfig.player)
            enemySpringsApi.start(enemyAttackConfig.enemy)
            damage = calculateAttack(sceneData.enemySmileys[battleDataRef.current.enemySmiley.activeSmileyIndex].baseStats.strength)
            setAttackDamage(damage)

            setTimeout(() => {
                setBattleData((prev) => {
                    const newPlayerHealth = prev.playerSmiley.health - damage
                    const newPlayerHealthPercentage = (newPlayerHealth / calculateHealth(sceneData.playerSmileys[prev.playerSmiley.activeSmileyIndex].baseStats.health)) * 100

                    if (newPlayerHealth < 1) {
                        return {
                            ...prev,
                            playerSmiley: {
                                activeSmileyIndex: prev.playerSmiley.activeSmileyIndex + 1 > 4 ? 4 : prev.playerSmiley.activeSmileyIndex + 1,
                                health: calculateHealth(sceneData.playerSmileys[prev.playerSmiley.activeSmileyIndex + 1 > 4 ? 4 : prev.playerSmiley.activeSmileyIndex + 1].baseStats.health),
                                healthPercentage: 100
                            }
                        }
                    } else {
                        return {
                            ...prev,
                            playerSmiley: {
                                ...prev.playerSmiley,
                                health: newPlayerHealth,
                                healthPercentage: newPlayerHealthPercentage
                            }
                        }
                    }
                })
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

        if (battleDataRef.current.enemySmiley.health - damage < 1 && battleDataRef.current.enemySmiley.activeSmileyIndex === 4) {
            return setGameLoop('PLAYER_VICTORY')
        } else if (battleDataRef.current.playerSmiley.health - damage < 1 && battleDataRef.current.playerSmiley.activeSmileyIndex === 4) {
            return setGameLoop('ENEMY_VICTORY')
        }
    }

    useEffect(() => {
        const attackLoop: NodeJS.Timeout = setInterval(() => {
            if (gameLoopRef.current !== 'RUNNING') return clearInterval(attackLoop)
            console.log('runs')
            attack(attackerRef.current)
            setAttacker(prevAttacker => prevAttacker === 'PLAYER' ? 'ENEMY' : 'PLAYER')
        }, 750)

        return () => clearInterval(attackLoop)
    }, [])

    return (
        <>
            <div className="grid grid-cols-9 rounded-xl overflow-hidden bg-slate-950 p-4">
                {gameLoop === 'RUNNING' && (
                    <>
                        <div className="w-full flex flex-col col-span-4">
                        <div className="w-full flex justify-center pt-16 pb-32">
                            <animated.div style={playerSprings}>
                                <SmileyFace smiley={playerSmiley} className="h-40 w-40 text-slate-950" />
                            </animated.div>
                        </div>
                        <Hud type="PLAYER" smiley={playerSmiley} health={battleData.playerSmiley.healthPercentage}/>
                        <SmileyRoster smileys={sceneData.playerSmileys} activeSmileyIndex={battleData.playerSmiley.activeSmileyIndex} />
                        </div>
                        <div>
                            <animated.div className="text-center font-extrabold text-6xl tracking-tighter text-red-500" style={damageSprings}>
                                {attackDamage}
                            </animated.div>
                        </div>
                        <div className="w-full flex flex-col col-span-4">
                            <div className="w-full flex justify-center pt-16 pb-32">
                                <animated.div style={enemySprings}>
                                    <SmileyFace smiley={enemySmiley} className="h-40 w-40 text-slate-950"/>
                                </animated.div>
                            </div>
                            <Hud type="ENEMY" smiley={enemySmiley} health={battleData.enemySmiley.healthPercentage}/>
                            <SmileyRoster smileys={sceneData.enemySmileys} activeSmileyIndex={battleData.enemySmiley.activeSmileyIndex} className="self-end" />
                        </div>
                    </>
                )}
                {gameLoop === 'PLAYER_VICTORY' && (
                    <div className="col-span-9 px-8 py-40 text-center space-y-12">
                        <div className="text-center font-extrabold text-6xl tracking-tighter text-green-400">
                            PLAYER VICTORY!
                        </div>
                        <Button onClick={() => location.reload()}>BATTLE AGAIN</Button>
                    </div>
                )}
                {gameLoop === 'ENEMY_VICTORY' && (
                    <div className="col-span-9 px-8 py-40 text-center space-y-12">
                        <div className="text-center font-extrabold text-6xl tracking-tighter text-red-500">
                            ENEMY VICTORY!
                        </div>
                        <Button onClick={() => location.reload()}>BATTLE AGAIN</Button>
                    </div>
                )}
            </div>
            <div className="py-4 flex justify-between">
                <Button onClick={() => attack('PLAYER')}>Player attack</Button>
                <Button onClick={() => attack('ENEMY')}>Enemy attack</Button>
            </div>
        </>
    )
}