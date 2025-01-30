// import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';
import { Link } from 'react-router';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from './components/ui/button';

setupIonicReact();

function App() {
    return (
        <>
            <Button variant="outline">Button</Button>
            <Button variant="destructive">Button</Button>
            <Button variant="secondary">Button</Button>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            Getting started
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/">
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                shadcn/ui
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Beautifully designed components
                                                that you can copy and paste into
                                                your apps. Accessible.
                                                Customizable. Open Source.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to="/camera"
                            className={navigationMenuTriggerStyle()}>
                            Camera Test
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to="/mic"
                            className={navigationMenuTriggerStyle()}>
                            Mic Test
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to="/r3f"
                            className={navigationMenuTriggerStyle()}>
                            React-Three-Fiber
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}

export default App;
