export const ProgressCircle = ({score}) => {
    const progressScore = score => {
        const scorePercent = 439.8 * score /100
        const circlePercent = 439.8 - scorePercent
        return circlePercent
    }

    let setColor
    if (score >= 0.9) {
        setColor = "#369a49"
    } else if (score >= 0.85 && score < 0.9) {
        setColor = '#FFC300'
    } else if (score >= 0.8 && score < 0.85) {
        setColor = 'orange'
    } else {
        setColor = 'red'
    }

    return (
        <>
            <svg width="200" height="200">
                <g transform="rotate(-90 100 100)">
                    <circle r="70" cx="100" cy="100" fill="transparent" stroke="lightgrey" strokeWidth="2rem" strokeDasharray="439.8" strokeDashoffset="0"></circle>
                    <circle r="70" cx="100" cy="100" fill="transparent" stroke={setColor} strokeWidth="2rem" strokeDasharray="439.8" strokeDashoffset={progressScore(score)}>
                    </circle>
                </g>
                <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">{score}%</text>
            </svg>
        </>
    )
}