import { heroDetails } from "../data/herp-details";
import Container from "./container.component";

export const Hero: React.FC = () => {
    return (
        <Container
            id="hero"
            className="pt-26"
        >
            <div className="text-center">
                <h1 
                    className="text-primary text-4xl lg:text-5xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">
                    {heroDetails.heading}
                </h1>
                <p className="mt-4 text-foreground max-w-xl mx-auto lg:text-xl">{heroDetails.subheading}</p>

                <img
                    src={heroDetails.centerImageSrc}
                    alt="app mockup"
                    className="bg-white relative mt-12 md:mt-16 mx-auto z-10 w-full h-auto rounded-md"
                />

            </div>
        </Container>
    );
};

