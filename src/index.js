const wakelock = (Alpine) => {
    Alpine.directive('wakelock', (el, { value, expression }, { evaluate }) => {
        if (!expression) {
            console.error('Wake Lock directive requires a value/expression');
            return;
        }

        let screenLock = null;
        const isWakeLockSupported = 'wakeLock' in navigator;

        const acquireLock = async () => {
            if (!isWakeLockSupported) {
                console.warn('Wake Lock API is not supported in this browser');
                return;
            }

            try {
                screenLock = await navigator.wakeLock.request('screen');

                screenLock.addEventListener('release', () => {
                    console.log('Screen Wake Lock released');
                });
            } catch (err) {
                console.warn('Wake Lock error:', err.message);
            }
        };

        const releaseLock = async () => {
            if (screenLock) {
                await screenLock.release();
                screenLock = null;
            }
        };

        const handleVisibilityChange = async () => {
            if (screenLock !== null && document.visibilityState === 'visible') {
                await acquireLock();
            }
        };

        Alpine.effect(() => {
            const shouldLock = evaluate(expression);

            if (shouldLock) {
                acquireLock();
                document.addEventListener('visibilitychange', handleVisibilityChange);
            } else {
                releaseLock();
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            }
        });

        el._x_cleanups = el._x_cleanups || [];
        el._x_cleanups.push(() => {
            releaseLock();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        });
    });
}

export default wakelock;