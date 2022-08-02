import React from 'react';

interface IMainLayoutProps {
    header: JSX.Element;
    content: JSX.Element;
    footer: JSX.Element;
}

export const MainLayout = (
    {header, footer, content}:IMainLayoutProps
) => {
    return (
        <div>
            {header}
            {content}
            {footer}
        </div>
    );
};
