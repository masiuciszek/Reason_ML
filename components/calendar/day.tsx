import { motion } from "framer-motion"
import Link from "next/link"
import styled from "styled-components"
import Image from "next/image"
import { forwardRef } from "react"
interface DayProps {
  dayIndex: number
  dayDate: string
}

interface StyledDayProps {
  currentDay: boolean
}

const StyledDay = styled(motion.div)<StyledDayProps>`
  background-color: ${({ currentDay }) =>
    currentDay ? "var(--danger);" : "var(--textColor);"};
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  color: ${({ currentDay }) => (currentDay ? "var(--black);" : "var(--background);")};
  font-size: 10px;
  min-height: 6rem;
  outline: none;
  padding: 2.45em 0.5em;
  transition: var(--main-trans);

  .front {
    background-color: ${({ currentDay }) =>
      currentDay ? "var(--danger);" : "var(--textColor);"};
  }

  &:active {
    box-shadow: var(--shadow2Xl);
    position: relative;
    top: 7px;
  }
  &:hover {
    box-shadow: var(--shadow2Xl);
  }
  .card {
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    width: 100%;
  }

  .face {
    backface-visibility: hidden;
    display: grid;
    font-size: 1rem;
    height: 100%;
    place-items: center;
    position: absolute;
    width: 100%;
  }

  .back {
    transform: rotateX(180deg);
    color: var(--background);
  }

  .front {
    color: var(--background);
    strong {
      cursor: pointer;
    }
  }
`

interface ImageWrapperProps {
  src: string
}

const ImageWrapper = forwardRef<HTMLAnchorElement, ImageWrapperProps>(
  ({ src, ...props }, ref) => {
    return (
      <a ref={ref} style={{ zIndex: 3 }} {...props}>
        <Image src={src} alt={`${src}-icon`} width={80} height={80} />
      </a>
    )
  }
)

const Day: React.FC<DayProps> = ({ dayIndex, dayDate }) => {
  const currentDay = dayIndex === Number(dayDate)

  return (
    <StyledDay
      className={`day-${dayIndex}`}
      currentDay={currentDay}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="card"
        whileHover={{ rotateX: 180 }}
        transition={{ duration: 0.25 }}
      >
        <div className="face front">
          <strong>{dayIndex}</strong>
        </div>
        <div className="face back">
          <Link href={`/post/day-${dayIndex}`} as={`/post/day-${dayIndex}`} passHref>
            <ImageWrapper src={`/icons/icon-${dayIndex}.svg`} />
          </Link>
        </div>
      </motion.div>
    </StyledDay>
  )
}
export default Day