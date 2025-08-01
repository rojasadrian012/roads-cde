import { benefits } from "../../data/benefits"
import BenefitSection from "./benefits-section.component"

export const Benefits: React.FC = () => {
    return (
        <div id="how-work">
            <h2 className="sr-only">Features</h2>
            {benefits.map((item, index) => {
                return (<BenefitSection
                    key={index}
                    benefit={item}
                    imageAtRight={index % 2 !== 0}
                />)
            })}
        </div>
    )
}
