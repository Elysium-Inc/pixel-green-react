export const ProgressCircle = ({score}) => {
    const progressScore = (score) => {
        const scorePercent = 439.8 * score /100
        const circlePercent = 439.8 - scorePercent
        return circlePercent
    }
    return (
        <>
            <svg width="200" height="200">
                <g transform="rotate(-90 100 100)">
                    <circle r="70" cx="100" cy="100" fill="transparent" stroke="lightgrey" stroke-width="2rem" stroke-dasharray="439.8" stroke-dashoffset="0"></circle>
                    <circle r="70" cx="100" cy="100" fill="transparent" stroke="#369a49" stroke-width="2rem" stroke-dasharray="439.8" stroke-dashoffset={progressScore(score)}>
                    </circle>
                </g>
                <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">{score}%</text>
            </svg>
        </>
    )
}