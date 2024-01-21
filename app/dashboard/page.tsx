import { Button } from "antd";

export default function Dashboard() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1>
                    Welcome to Crazy Frog
                    <Button>Click for Magic</Button>
                </h1>
            </div>
        </main>
    )
}
