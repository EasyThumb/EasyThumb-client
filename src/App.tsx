import { Route, Router } from '@solidjs/router';
import { CanvasPage } from './features/Canvas';

export default function App() {
    return (
        <div class="app-container">
            {/* <Sidebar /> */}
            <main>
                <Router>
                    <Route path="/" component={() => <p>Contenido principal de la página</p>} />
                    <Route path="/Canvas" component={CanvasPage} />
                </Router>
            </main>
        </div>
    );
}
