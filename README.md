# Configuration

### config.json

```js
{
		"mode": "random", // or "set"
		"setContent": {
			"type": "link",
			"assetUrl": null,
			"url": "http://covers.i-d.co/",
			"newTab": true // Change to false to open in current tab
		},
		"randomContent": [
			// Link example:
			{
				"type": "link",
				"assetUrl": null,
				"url": "http://covers.i-d.co/",
				"newTab": true // Change to false to open in current tab
			},
			// Uploaded PDF example:
			{
				"type": "link",
				"assetUrl": null,
				"url": "./pages/v2/media/pdf-name.pdf",
				"newTab": true // Change to false to open in current tab
			},
			// Image example:
			{
				"type": "image",
				"assetUrl": './media/image-name.jpeg",
				"url": null, // Change this to a link if you want the image to be clickable
				"newTab": true
			},
		]
}
```
