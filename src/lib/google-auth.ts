/* global google */

const GOOGLE_CLIENT_ID =
    "453461377318-d0mo8h978jipsi8k3b1civ3k0krtcbbv.apps.googleusercontent.com";

const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let scriptLoaded = false;

/**
 * Dynamically load the Google Identity Services script
 */
function loadGoogleScript(): Promise<void> {
    if (scriptLoaded) return Promise.resolve();

    return new Promise((resolve, reject) => {
        // Check if already in DOM
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
        script.onerror = () => reject(new Error("Failed to load Google Sign In"));
        document.head.appendChild(script);
    });
}

/**
 * Trigger Google Sign In popup and return the credential (id_token)
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

    g.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential: string }) => {
            if (response.credential) {
                callback(response.credential);
            }
        },
    });

    // Use the One Tap prompt; if dismissed, fall back to the button-style popup
    g.accounts.id.prompt((notification: { isNotDisplayed: () => boolean; isSkippedMoment: () => boolean }) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fall back to popup picker
            g.accounts.oauth2
                ? g.accounts.id.prompt()
                : // If One Tap is not available, render a temporary hidden button and click it
                renderAndClickGoogleButton(g, callback);
        }
    });
}

/**
 * Fallback: render an invisible Google Sign In button and programmatically click it
 */
function renderAndClickGoogleButton(
    g: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    callback: (idToken: string) => void
) {
    // Create a temporary container
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    g.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential: string }) => {
            if (response.credential) {
                callback(response.credential);
            }
            // Clean up
            document.body.removeChild(container);
        },
    });

    g.accounts.id.renderButton(container, {
        type: "standard",
        size: "large",
    });

    // Click the rendered button
    setTimeout(() => {
        const btn = container.querySelector("div[role=button]") as HTMLElement;
        if (btn) btn.click();
    }, 100);
}
