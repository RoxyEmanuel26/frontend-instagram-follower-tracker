const GOOGLE_CLIENT_ID =
    "1055745080101-837ckjt9p5oduohkn5mbaq43tgovr5eo.apps.googleusercontent.com";

const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let scriptLoaded = false;
let scriptLoadPromise: Promise<void> | null = null;

/**
 * Dynamically load the Google Identity Services script
 */
function loadGoogleScript(): Promise<void> {
    if (scriptLoaded) return Promise.resolve();
    if (scriptLoadPromise) return scriptLoadPromise;

    scriptLoadPromise = new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
            scriptLoaded = true;
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            scriptLoaded = true;
            resolve();
        };
        script.onerror = () => {
            scriptLoadPromise = null;
            reject(new Error("Failed to load Google Sign In"));
        };
        document.head.appendChild(script);
    });

    return scriptLoadPromise;
}

/**
 * Trigger Google Sign In using the standard button popup approach.
 * This is more reliable than One Tap and works with FedCM.
 */
export async function signInWithGoogle(
    callback: (idToken: string) => void
): Promise<void> {
    await loadGoogleScript();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = (window as any).google;

    if (!g?.accounts?.id) {
        throw new Error("Google Identity Services not available");
    }

    return new Promise<void>((resolve, reject) => {
        g.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response: { credential?: string; error?: string }) => {
                if (response.credential) {
                    callback(response.credential);
                    resolve();
                } else {
                    reject(new Error(response.error || "Google sign in was cancelled"));
                }
                // Clean up container
                cleanup();
            },
            use_fedcm_for_prompt: true,
        });

        // Create a visible container for the Google button
        const container = document.createElement("div");
        container.id = "google-signin-container";
        container.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            cursor: pointer;
        `;

        const inner = document.createElement("div");
        inner.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 32px;
            min-width: 300px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        `;

        const title = document.createElement("p");
        title.textContent = "Sign in with Google";
        title.style.cssText = "margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #333;";
        inner.appendChild(title);

        const btnContainer = document.createElement("div");
        btnContainer.style.cssText = "display: flex; justify-content: center;";
        inner.appendChild(btnContainer);

        container.appendChild(inner);

        // Click backdrop to close
        container.addEventListener("click", (e) => {
            if (e.target === container) {
                cleanup();
                reject(new Error("Google sign in was cancelled"));
            }
        });

        const cleanup = () => {
            if (document.body.contains(container)) {
                document.body.removeChild(container);
            }
        };

        document.body.appendChild(container);

        // Render the official Google Sign In button
        g.accounts.id.renderButton(btnContainer, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "pill",
            width: 250,
        });
    });
}
