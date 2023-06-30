export const Dropdown = ({color, content, titleSection, quantity}) => {
    return (
        <div className="py-5">
            <details className={`group ${color} border-2`}>
                <summary className="flex p-2 justify-between items-center font-medium cursor-pointer list-none">
                    <span>{titleSection} [{quantity}]</span>
                    <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor"
                     strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path
                    d="M6 9l6 6 6-6"></path>
            </svg>
              </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                    {content}
                </div>
            </details>
        </div>
    )
}