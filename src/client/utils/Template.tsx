import * as React from 'react';

const Template: React.FC<TemplateProps> = (props) => {
    return (
        <main className="container">
            <section className="row justify-content-center mt-3">
                <div className="col-12">
                    <h1 className="display-1 text-center">Template text</h1>
                    <p>{props.property_1}</p>
                </div>
            </section>
        </main>
    )
}

interface TemplateProps {
    property_1: string;
    property_2: number;
    property_3: boolean;
};


export default Template;