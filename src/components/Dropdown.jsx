export const Dropdown = ({score, color, content, titleSection}) => {
    return (
        <div className="py-5">
            <details className={`group ${color} `}>
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>{titleSection}</span>
                    <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                     stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path
                    d="M6 9l6 6 6-6"></path>
            </svg>
              </span>
                </summary>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn font-bold">
                    Score : {score}%
                </p>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                    {content}
                </p>
            </details>
        </div>
    )
}