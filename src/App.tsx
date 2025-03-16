import { Route, Router } from '@solidjs/router';
import { CanvasPage } from './features/Canvas';
import { CanvasProvider } from './features/Canvas/context/CanvasContext';

export default function App() {
    return (
        <div class="app-container">
            <main>
                <CanvasProvider>
                    <Router>
                        <Route path="/" component={() => <p>Contenido principal de la página</p>} />
                        <Route path="/Canvas" component={CanvasPage} />
                    </Router>
                </CanvasProvider>
            </main>
        </div>
    );
}
