import { Check, Send } from 'lucide-react';
import Button from './shared/ui/Button';

function App() {
    return (
        <>
            <div className="flex gap-5">
                <div className="space-y-2">
                    <span>PC</span>
                    <Button color="default">
                        <Button.Icon icon={Send} />
                    </Button>
                    <Button color="danger">
                        <Button.Icon icon={Check} />
                        <Button.Label>확인</Button.Label>
                    </Button>
                    <Button color="secondary">
                        <Button.Label>확인</Button.Label>
                    </Button>
                    <Button color="primary">
                        <Button.Label>확인</Button.Label>
                    </Button>
                </div>

                <div className="space-y-2">
                    <span>Mobile</span>
                    <Button color="default" isMobile>
                        <Button.Icon icon={Send} />
                    </Button>

                    <Button color="danger" isMobile>
                        <Button.Icon icon={Check} />
                        <Button.Label>확인</Button.Label>
                    </Button>

                    <Button color="secondary" isMobile>
                        <Button.Label>확인</Button.Label>
                    </Button>

                    <Button color="primary" isMobile>
                        <Button.Label>확인</Button.Label>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default App;
