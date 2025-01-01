# Alpine.js Wake Lock Plugin

A plugin for Alpine.js that provides easy access to the Screen Wake Lock API, preventing screens from dimming or locking while your application needs to stay active.

## Features

- Simple directive-based API for controlling screen wake lock
- Automatic wake lock restoration when tab becomes visible
- Automatic cleanup when elements are removed
- Reactive updates based on expressions
- Graceful fallback for unsupported browsers

## Installation

### NPM

```bash
npm install @alpine/wakelock
```

### CDN

```html
<script src="https://unpkg.com/@alpine/wakelock"></script>
```

### Manual Installation

```javascript
import Alpine from "alpinejs";
import AlpineWakeLock from "./alpine-wakelock";

Alpine.plugin(AlpineWakeLock);
Alpine.start();
```

## Usage

Add the `x-wakelock` directive to any element and provide a boolean expression to control when the wake lock should be active:

```html
<!-- Basic usage -->
<div x-data="{ keepAwake: false }">
	<button
		x-wakelock="keepAwake"
		@click="keepAwake = !keepAwake"
	>
		Toggle Wake Lock
	</button>
</div>

<!-- With reactive data -->
<div
	x-data="{ isPlaying: false }"
	x-wakelock="isPlaying"
>
	<video
		@playing="isPlaying = true"
		@pause="isPlaying = false"
	>
		<!-- video content -->
	</video>
</div>
```

## Browser Compatibility

The Wake Lock API is supported in:

- Chrome 84+
- Edge 84+
- Chrome Android 84+
- Opera 70+

For unsupported browsers, the plugin will log a warning and gracefully degrade without affecting your application's functionality.

## Events

The plugin handles several events automatically:

- Wake lock acquisition/release
- Visibility changes (restores wake lock when tab becomes visible)
- Element cleanup/removal

## Error Handling

The plugin includes built-in error handling for:

- Unsupported browsers
- Failed wake lock requests
- Permission denied scenarios

All errors are logged to the console with appropriate warning messages.

## Development

To contribute to this plugin:

1. Clone the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Submit a pull request

## License

MIT License

## Credits

Created for use with [Alpine.js](https://alpinejs.dev/)
