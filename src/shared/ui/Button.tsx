import { LucideIcon } from 'lucide-react';
import React, { createContext, ReactNode, useContext } from 'react';
import { cn } from '@/shared/lib/utils';

const ButtonContext = createContext<{ isMobile?: boolean }>({});

const colorClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    default: 'bg-gray-200 hover:bg-gray-300 text-black',
};

const Icon = ({ icon: IconComponent }: { icon: LucideIcon }) => {
    const { isMobile } = useContext(ButtonContext);
    return <IconComponent className={cn('h-5 w-5', isMobile && 'h-4 w-4')} />;
};

const Label = ({ children }: { children: ReactNode }) => {
    return <span>{children}</span>;
};

Button.Icon = Icon;
Button.Label = Label;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isMobile?: boolean;
    color?: keyof typeof colorClasses;
};

export default function Button({
    isMobile,
    color = 'default',
    className,
    children,
    ...props
}: ButtonProps) {
    const hasIconOnly = React.Children.toArray(children).every(
        (child) => React.isValidElement(child) && child.type === Button.Icon
    );

    return (
        <ButtonContext.Provider value={{ isMobile }}>
            <button
                className={cn(
                    'flex items-center gap-2',
                    isMobile ? 'p-2 text-sm' : 'p-4 text-base',
                    colorClasses[color],
                    hasIconOnly ? 'rounded-full' : 'rounded-lg',
                    className
                )}
                {...props}>
                {children}
            </button>
        </ButtonContext.Provider>
    );
}
