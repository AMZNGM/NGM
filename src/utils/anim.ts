import { cubicBezier } from 'motion/react'

export const easingsNums = {
  cubiz: [0.36, 0.34, 0.69, 1.01] as const,
}

export const easings = {
  cubiz: cubicBezier(...easingsNums.cubiz),
}
