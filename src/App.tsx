import { Route, Router } from '@solidjs/router';
import { CanvasProvider } from './context/CanvasContext';
import { GoogleFontsProvider } from './context/GoogleFontsContext';
import { CanvasPage } from './features/Canvas';

export default function App() {
    return (
        <div class="app-container">
            <main>
                <GoogleFontsProvider>
                    <CanvasProvider>
                        <Router>
                            <Route path="/" component={CanvasPage} />
                            <Route path="/Canvas" component={CanvasPage} />
                        </Router>
                    </CanvasProvider>
                </GoogleFontsProvider>
            </main>
        </div>
    );
}
