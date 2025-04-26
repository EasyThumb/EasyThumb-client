import { Route, Router } from '@solidjs/router';
import { CanvasProvider } from './context/CanvasContext';
import { CanvasPage } from './features/Canvas';
import { GoogleFontsProvider } from './context/GoogleFontsContext';

export default function App() {
    return (
        <div class="app-container">
            <main>
                <GoogleFontsProvider>
                    <CanvasProvider>
                        <Router>
                            <Route path="/" component={() => <p>Contenido principal de la página</p>} />
                            <Route path="/Canvas" component={CanvasPage} />
                        </Router>
                    </CanvasProvider>
                </GoogleFontsProvider>
            </main>
        </div>
    );
}
