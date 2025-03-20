import { Route, Router } from '@solidjs/router';
import { CanvasProvider } from './context/CanvasContext';
import { CanvasPage } from './features/Canvas';

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
